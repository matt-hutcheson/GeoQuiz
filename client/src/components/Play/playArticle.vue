<template>
    <section>
        <h2>Have you played before?</h2>
        <button v-on:click="selectIsHidden = !selectIsHidden && newUserFormIsHidden">Yes, I've played before!</button>
        <button v-on:click="newUserFormIsHidden = !newUserFormIsHidden && selectIsHidden">No - let me create a username!</button>
        <user-select v-if="!selectIsHidden" :currentUser="currentUser" :allUsers="allUsers"></user-select>
        <user-form v-if="!newUserFormIsHidden" :countries='countries'></user-form>
        <h1>Flag Game!</h1>
        <instructions></instructions>
        <div id="container">
            <div id="container-flag">
                <div id="change-flag-button">
                    <button v-if="randomCountry" v-on:click.prevent="getRandomCountry(countriesRemaining)">Change Flag</button>
                </div>
                <flag-to-guess id="flag" v-if="randomCountry" :randomCountry="randomCountry"></flag-to-guess>
            </div>
            <section id="flag-results">
                <p v-if="result==='correct'">Correct! This is {{ randomCountry.name }}'s flag.</p>
                <p v-if="result==='incorrect'">Sorry, that's the wrong country. Please try again.</p>
            </section>
            <div v-if="result==='correct'" id="correct-next-flag">
                <p v-if="result==='correct'">Great job!!</p>
                <button id= "next-flag" v-on:click.prevent="getRandomCountry(countriesRemaining); scrollTop();">Next Flag</button>
                <button id= "details-answers" v-on:click="scrollBottom()">Check your answers:</button>
            </div>
        </div>
        <play-map :currentUser="currentUser" :countries="countries" :correctCountry="randomCountry" :correctAnswers="countriesCorrect" :countriesRemaining="countriesRemaining"></play-map>
        <list-countries :countriesCorrect="countriesCorrect" ></list-countries>

    </section>
</template>

<script>
import playMap from './playMap';
import flagToGuess from './flagToGuess';
import { eventBus } from '@/main.js';
import userForm from './userForm';
import userSelect from './userSelect';
import User from '../../assets/user';
import UserService from '../../services/UserService';
import instructions from './instructions'
import listCountries from './listCountries'

export default {
    name: 'playArticle',
    props: ['currentMode', 'countries', 'allUsers'],
    components: {
        'play-map': playMap,
        'flag-to-guess': flagToGuess,
        'user-form': userForm,
        'user-select': userSelect,
        'instructions' : instructions,
        'list-countries': listCountries
    },
    data () {
        return {
        randomCountry: null,
        countriesRemaining: [],
        countriesCorrect: [],
        countryListSelected: null,
        result: null,
        currentUser: null,
        username: "",
        selectIsHidden: true,
        newUserFormIsHidden: true
        }
    },
    methods: {
        getRandomCountry (array) {
            this.randomCountry = array[Math.floor(Math.random() * array.length)]
            this.result = null
            },

        checkAnswer () {
            if (this.randomCountry.alpha3Code === this.countryListSelected.alpha3Code) {
                this.countriesCorrect = [...this.countriesCorrect, this.countryListSelected]
                const index = this.countriesRemaining.indexOf(this.countryListSelected)
                this.countriesRemaining.splice(index, 1)
                this.result = "correct"
                this.currentUser[this.randomCountry.alpha3Code]["flagGame"] = true
                UserService.updateUser(this.currentUser)
                .then((updatedUser) => eventBus.$emit('country-correct', updatedUser))
                // this.getRandomCountry(this.countriesRemaining)
                this.countryListSelected = null
            } else {this.result = "incorrect"}
        },

        scrollTop () {
            window.scrollTo({
                top: 400,
                left: 100,
                behavior: 'smooth'
            })
        },
        scrollBottom () {
            window.scrollTo({
                top: 800,
                left: 100,
                behavior: 'smooth'
            })
        }

    },
    mounted() {
        this.countriesRemaining = this.countries
        this.getRandomCountry(this.countriesRemaining)

        eventBus.$on('map-country-selected', (alpha2Code) => {
            const selectedCountry = this.countries.find(country => country.alpha2Code.toLowerCase() === alpha2Code)
            this.countryListSelected = selectedCountry
            if (this.result != 'correct') {
                this.checkAnswer();
            }
        });

        eventBus.$on('add-user', (user) => {
            UserService.addUser(user)
            .then(userWithId => this.currentUser = userWithId)
        });

        eventBus.$on('user-selected', (user) => {
          this.currentUser = user;
        });

    }
}
</script>

<style scoped>
#container {
    display:flex;
    height: 25vh;
}

#container-flag {
    width: 40%;
    display: flex;
}

#flag{
    position: relative;
    margin: 20px auto auto 50px;
}

#change-flag-button > button {
    width: 10em;
    margin: 20px 25px 0 40px;
    border-radius: 5px;
    text-align: center;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
    outline: none;
    padding: 8px 10px;
    background-color: #ffd30d;
    border: #ebb810 solid 2px;
}

#flag-results {
    margin: auto;
}

#correct-next-flag {
    border: solid;
    position: absolute;
    margin: 50vh 35vw;
    padding: 6px 25px;
    text-align: center;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.5) ;
    /* margin: 0 auto; */


}
#next-flag, #details-answers {
    margin: 10px;
    border-radius: 5px;
    text-align: center;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
    outline: none;
    padding: 8px 10px;
    background-color: #ffd30d;
    border: #ebb810 solid 2px;
}

</style>
