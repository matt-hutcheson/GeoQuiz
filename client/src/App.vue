<template>
  <main id='main-container'>
    <div id="nav-container" class="modeActive">
      <h1 v-on:click="returnHomepageClick">GeoQuiz</h1>
      <geo-nav v-if="!currentMode"></geo-nav>
      <swap-mode v-if="currentMode" :currentMode="currentMode"></swap-mode>
    </div>
    <div id="current-user">
      <p v-if="currentUser && currentMode==='play'">Player: {{ currentUser.username }}</p>
      <button id="change-user-button" v-if="currentUser && currentMode==='play'" v-on:click.prevent="changeUser()">Change player</button>
    </div>
    <instructions v-if="currentMode==='intructions'"></instructions>
    <play-article v-if="currentMode==='play'" :allUsers="allUsers" :countries="countries" :currentUser="currentUser" :randomCountry="randomCountry" :countriesRemaining="countriesRemaining" :countriesCorrect="countriesCorrect" :countryListSelected="countryListSelected" :result="result"></play-article>
    <learn-article v-if="currentMode==='learn'" :countries="countries"></learn-article>
  </main>
</template>

<script>
import geoNav from './components/geoNav';
import swapMode from './components/swapMode';
import learnArticle from './components/Learn/learnArticle';
import playArticle from './components/Play/playArticle';
import { eventBus } from './main';
import UserService from '../../client/src/services/UserService';
import User from './assets/user';
import Intructions from "./components/Play/instructions";

export default {
  name: 'App',
    data(){
      return{
        currentMode: null,
        countries: [],
        allUsers: [],
        currentUser: null,
        randomCountry: null,
        countriesRemaining: [],
        countriesCorrect: [],
        countryListSelected: null,
        result: null,
      }
    },

    mounted(){
      fetch('https://restcountries.eu/rest/v2/all') //API
        .then(res => res.json())
        .then((countries) => (this.countries = countries))

      this.fetchUsers();

      eventBus.$on('mode-changed', (change) => {
        this.currentMode = change;
        this.currentUser = null
      }),

      eventBus.$on('swap-mode', (mode) => {
        this.currentMode = mode;
      }),

      eventBus.$on('add-user', (user) => {
        UserService.addUser(user)
        .then(userWithId => this.currentUser = userWithId)
        .then( () => this.allUsers.push(this.currentUser))
        .then( () => this.countriesCorrect = [])
        .then( () => this.countriesRemaining = this.countries.slice())
        .then( () => this.getRandomCountry(this.countriesRemaining))
      });

      eventBus.$on('country-correct', (currentUser) => {
        this.fetchUsers();
      });

      eventBus.$on('map-country-selected', (alpha2Code) => {
        const selectedCountry = this.countries.find(country => country.alpha2Code.toLowerCase() === alpha2Code)
        this.countryListSelected = selectedCountry
        if (this.result != 'correct') {
          this.checkAnswer();
        }
      });

      eventBus.$on('user-selected', (user) => {
        this.currentUser = user;
        this.countriesCorrect = [];
        this.countriesRemaining = this.countries.slice();
        this.getRandomCountry(this.countriesRemaining)
        this.setCorrectCountries();
      });

      eventBus.$on('change-flag-pressed', (array) => {
        this.getRandomCountry(this.countriesRemaining)
      });

      eventBus.$on('request-user-change', (previousUser) => {
        this.currentUser = null
      });
    },

    methods: {
      fetchUsers() {
        UserService.getUsers()
        .then((users) => this.allUsers = users)
      },

      returnHomepageClick() {
        this.currentMode = null
      },

      changeUser() {
        eventBus.$emit('request-user-change', this.currentUser)
        this.currentUser = null
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
          this.currentUser[this.randomCountry.alpha3Code]["flagGame"] = "true"
          UserService.updateUser(this.currentUser)
          .then((updatedUser) => eventBus.$emit('country-correct', updatedUser))
          this.countryListSelected = null
        } else {this.result = "incorrect"}
      },

      setCorrectCountries () {
        for (const country of this.countries) {
          if (this.currentUser[country.alpha3Code]["flagGame"] === "true") {
            const index = this.countriesRemaining.indexOf(country)
            if (index > -1) {
              this.countriesCorrect.push(this.countriesRemaining.splice(index, 1)[0])
              }
            }
          }
        }
      },

    components: {
      'geo-nav': geoNav,
      'play-article': playArticle,
      'learn-article': learnArticle,
      'instructions': Intructions,
      'swap-mode': swapMode
    }
  }
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fredericka+the+Great&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Grandstander:ital,wght@0,400;1,300&display=swap');

* {
  font-family: Tahoma, Verdana;
  font-size: 20px;
  margin: 0;
}


h1 {
    font-family: 'Fredericka the Great', cursive;
    font-size: 60px;
    padding: 10px;
}

h1:hover {
  cursor: pointer;
}

.modeActive {
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
}

#current-user {
  display: flex;
  flex-flow: row;
  margin: 20px 25px 0 80px;
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
</style>
