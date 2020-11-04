<template>
    <section>
        <h1>Flag Game!</h1>
        <choose-user :currentUser="currentUser" :allUsers="allUsers"></choose-user>
        <button v-on:click='handleClick("intructions")'>Instructions</button>
        <!-- <select v-if="countriesRemaining" @change="checkAnswer()" name="flagCountry" id="" v-model="countryListSelected">
            <option selected disabled :value="null">--Select A Country--</option>
            <option v-for="(country, alpha3Code) in countriesRemaining" :key="alpha3Code" :value="country">{{ country.name }}</option>
        </select> -->
        <play-map :currentUser="currentUser" :countries="countries" :correctCountry="randomCountry" :correctAnswers="countriesCorrect" :countriesRemaining="countriesRemaining" :randomCountry="randomCountry" :result="result"></play-map>
        <list-countries :countriesCorrect="countriesCorrect" ></list-countries>
    </section>
</template>

<script>
import playMap from './playMap';
import { eventBus } from '@/main.js';
import User from '../../assets/user';
import UserService from '../../services/UserService';
import instructions from './instructions'
import listCountries from './listCountries'
import chooseUser from './chooseUser'
import userForm from './userForm'
import userSelect from './userSelect'

export default {
    name: 'playArticle',
    props: ['currentMode', 'countries', 'allUsers'],
    components: {
        'play-map': playMap,
        'user-form': userForm,
        'user-select': userSelect,
        'instructions' : instructions,
        'list-countries': listCountries,
        'choose-user': chooseUser
    },
    data () {
        return {
        randomCountry: null,
        countriesRemaining: [],
        countriesCorrect: [],
        countryListSelected: null,
        result: null,
        currentUser: null,
        username: ""
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

        setCorrectCountries () {
            for (const country of this.countries) {
                if (this.currentUser[country.alpha3Code]["flagGame"] === "true") {
                    const index = this.countriesRemaining.indexOf(country)
                    if (index > -1) {
                        this.countriesCorrect.push(this.countriesRemaining.splice(index, 1)[0])
                    }
                }
            }
        },
        handleClick: function(change) {
            eventBus.$emit('mode-changed', change);
        }
    },
    mounted() {
        this.countriesRemaining = this.countries.slice()
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
            this.countriesCorrect = [];
            this.countriesRemaining = this.countries.slice()
            this.setCorrectCountries();
        });

        eventBus.$on('change-flag-pressed', (array) => {
            this.getRandomCountry(this.countriesRemaining)
        });

    }
}
</script>

<style scoped>

</style>
