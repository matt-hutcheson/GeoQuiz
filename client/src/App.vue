<template>
  <div id="app">
    <router-view v-if="countries" :countries="countries" :currentUser="currentUser" :randomCountry="randomCountry" :countriesRemaining="countriesRemaining" :countriesCorrect="countriesCorrect" :countryListSelected="countryListSelected" :result="result" :loggedIn="loggedIn"></router-view>
  </div>
</template>

<script>

import { eventBus } from './main';
import UserService from '../../client/src/services/UserService';
import User from './assets/user';
import mapCountries from "../node_modules/@svg-maps/world/index.js";
import swal from 'sweetalert2';

export default {
  name: 'App',
    data(){
      return{
        countries: [],
        currentUser: null,
        randomCountry: null,
        countriesRemaining: [],
        countriesCorrect: [],
        countryListSelected: null,
        result: null,
        loggedIn: false
      }
    },

    mounted(){
      fetch('https://restcountries.eu/rest/v2/all') //API
        .then(res => res.json())
        .then((countries) => (this.countries = countries))
        .then(() => this.removeImpossibleCountries())
        .then(() => {
          if (localStorage.getItem("jwt")){
            this.checkToken()
          } else {
            console.log("App mounted guest")
            this.generateGuest()
          }
        }
      )

      eventBus.$on('add-user', (user) => {
        UserService.addUser(user)
        .then(userWithId => this.currentUser = userWithId)
        .then( () => this.allUsers.push(this.currentUser))
        .then( () => this.countriesCorrect = [])
        .then( () => this.countriesRemaining = this.removeImpossibleCountries())
        .then( () => this.getRandomCountry(this.countriesRemaining))
      });

      eventBus.$on('user-loggedin', (user) => {
        this.currentUser = user;
        this.countriesCorrect = [];
        this.countriesRemaining = [...this.countries];
        this.setCorrectCountries();
        this.getRandomCountry(this.countriesRemaining);
        this.loggedIn = true;
      });

      eventBus.$on('check-token', () => {
        this.checkToken();
      });

      eventBus.$on('logout-requested', () => {
        this.logoutUser();
      });

      eventBus.$on('username-updated', (username) => {
        this.currentUser.username = username;
      })

      eventBus.$on('country-correct', (updatedUser) => {
        this.currentUser = updatedUser;
      });

      eventBus.$on('map-country-selected', (alpha2Code) => {
        const selectedCountry = this.countries.find(country => country.alpha2Code.toLowerCase() === alpha2Code)
        this.countryListSelected = selectedCountry
        if (this.result != 'correct') {
          this.checkAnswer();
        }
      });

      eventBus.$on('change-flag-pressed', (array) => {
        this.getRandomCountry(this.countriesRemaining)
      });

      eventBus.$on('try-again-pressed', () => {
        this.result = null
      })

    },

    methods: {

      generateGuest() {
        this.currentUser = new User("guest", null, this.countries);
        this.countriesRemaining = this.countries;
        this.countriesCorrect = [];
        this.getRandomCountry(this.countriesRemaining);
        this.loggedIn = false;
      },

      checkToken () {
        UserService.getUserDetails(localStorage.getItem("jwt"))
        .then(res => {
          if (res.status===200){
            const user = {_id:res._id, username:res.username, results:res.results};
            eventBus.$emit('user-loggedin', user)
            return true;
          } else if (res.status===401) {
            console.log("refreshing token")
            UserService.refreshToken(localStorage.getItem("refreshjwt"))
            .then(res => {
              if (res.status===201){
                localStorage.setItem("jwt", res.accessToken);
                console.log("token refreshed")
                this.checkToken();
              } else {
                console.log("refresh failed")
                this.logoutUser()
              }
            })
            .catch(err => {
              console.log("refresh error");
              this.logoutUser();
            })
          }
        })
        .catch(response => {
          return false;
        })
      },

      refreshToken() {
        console.log("refreshing token")
        UserService.refreshToken(localStorage.getItem("refreshjwt"))
        .then(res => {
          if (res.status===201){
            localStorage.setItem("jwt", res.accessToken);
            console.log("token refreshed")
            return true;
          } else {
            return false
          }
        })
        .catch(err => {
          return false
        })
      },

      logoutUser () {
        if (this.loggedIn && localStorage.getItem("jwt") && localStorage.getItem("refreshjwt") && this.currentUser){
          const payload = {
            _id: this.currentUser._id,
            token: localStorage.getItem("refreshjwt")
          }
          UserService.logoutUser(payload, localStorage.getItem("jwt"))
          .then(res => {
            localStorage.clear()
            this.generateGuest()
            swal.fire({
              icon:'success',
              title: "Success",
              text: 'Logout successful'
            }).then( () => {
              this.$router.push("/");
            })
          })
          .catch(err => console.log(err))
        } else {
        localStorage.clear();
        this.generateGuest();
        }
      },

      getRandomCountry(countriesRemaining) {
        this.randomCountry = countriesRemaining[Math.floor(Math.random() * countriesRemaining.length)]
        this.result = null
      },

      checkAnswer() {
        if (this.randomCountry.alpha3Code === this.countryListSelected.alpha3Code) {
          this.countriesCorrect = [...this.countriesCorrect, this.countryListSelected]
          const index = this.countriesRemaining.indexOf(this.countryListSelected)
          this.countriesRemaining.splice(index, 1)
          this.result = "correct"
          this.currentUser.results[this.randomCountry.alpha3Code]["flagGame"] = "true"
          if (this.loggedIn && localStorage.getItem("jwt")){
            // this.checkToken();
            UserService.updateUserResults(this.currentUser, localStorage.getItem("jwt"))
            .then((updatedUser) => eventBus.$emit('country-correct', updatedUser))
            .catch( response => {
              console.log(response.status);
            })
          }
          this.countryListSelected = null
        } else {this.result = "incorrect"}
      },

      setCorrectCountries () {
        for (const country of this.countries) {
          if (this.currentUser.results[country.alpha3Code]["flagGame"] === "true") {
            const index = this.countriesRemaining.indexOf(country)
            if (index > -1) {
              this.countriesCorrect.push(this.countriesRemaining.splice(index, 1)[0])
            }
          }
        }
      },

      removeImpossibleCountries() {
        const svgMapCountries = mapCountries.locations
        const filteredCountries = []
        svgMapCountries.forEach((mapCountry) => {
          this.countries.forEach((apiCountry) => {
            if (apiCountry.alpha2Code.toLowerCase()===mapCountry.id){
              filteredCountries.push(apiCountry)
            }
          })
        })
        this.countries = filteredCountries;
      },

// sort by name
      sortByName(arrayToSort) {
        arrayToSort.sort(function(a, b) {
          var nameA = a.name.toUpperCase(); // ignore upper and lowercase
          var nameB = b.name.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
        })
      }
    },

    components: {

    }
  }
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fredericka+the+Great&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Grandstander:ital,wght@0,400;1,300&display=swap');

#app {
  height: 100%;
  width: 100%;
}

* {
  font-family: Tahoma, Verdana;
  font-size: 20px;
  margin: 0;
}

#current-user {
  display: flex;
  flex-flow: row;
  align-items: center;
}

#change-user-button {
    font-size: 15px;
    width: 10em;
    border-radius: 5px;
    text-align: center;
    outline: none;
    padding: 8px 10px;
    background-color: #ffd30d;
    border: #ebb810 solid 2px;
    margin-left: 10px;
}
#change-user-button:hover {
    background-color: #ffc811;
    border: #ffdb12 solid 2px;
}

.button-instructions {
    margin: 5px 20px;
    /* width: 10em; */
    border-radius: 5px;
    text-align: center;
    outline: none;
    padding: 8px 10px;
    background-color: #ffd30d;
    border: #ebb810 solid 2px;
    font-size: 15px;
}

.button-instructions:hover {
    background-color: #ebb810;
    border: #ebb810 solid 2px;
}

#user-instructions-container {
  display: flex;
  flex-flow: row;
  justify-content: flex-start;
  align-items: center;
  padding: 4px;
}
</style>
