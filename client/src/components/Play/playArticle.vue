<template>
    <section>
        <h1>You are now in Play mode.</h1>
        <user-form></user-form>
        <button v-if="randomCountry" v-on:click.prevent="getRandomCountry(countriesRemaining)">Change Flag</button>
        <flag-to-guess v-if="randomCountry" :randomCountry="randomCountry"></flag-to-guess>
        <!-- <select v-if="countriesRemaining" @change="checkAnswer()" name="flagCountry" id="" v-model="countryListSelected">
            <option selected disabled :value="null">--Select A Country--</option>
            <option v-for="(country, alpha3Code) in countriesRemaining" :key="alpha3Code" :value="country">{{ country.name }}</option>
        </select> -->
        <section id="flag-results">
            <p v-if="result==='correct'">Correct! This is {{ randomCountry.name }}'s flag.</p>
            <p v-if="result==='incorrect'">Sorry, that's the wrong country. Please try again.</p>
            <button v-if="result==='correct'" v-on:click.prevent="getRandomCountry(countriesRemaining)">Next Flag</button>
        </section>
        <play-map :countries="countries" :correctCountry="randomCountry" :correctAnswers="countriesCorrect"></play-map>
    </section>
</template>

<script>
import playMap from './playMap';
import flagToGuess from './flagToGuess';
import { eventBus } from '@/main.js';
import userForm from './userForm'

export default {
    name: 'playArticle',
    props: ['currentMode', 'countries'],
    components: {
        'play-map': playMap,
        'flag-to-guess': flagToGuess,
        'user-form': userForm,
    },
    data () {
        return {
        randomCountry: null,
        countriesRemaining: [],
        countriesCorrect: [],
        countryListSelected: null,
        result: null
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
                // this.getRandomCountry(this.countriesRemaining)
                this.countryListSelected = null
            } else {this.result = "incorrect"}
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
        })
    }
}
</script>

<style scoped>

</style>
