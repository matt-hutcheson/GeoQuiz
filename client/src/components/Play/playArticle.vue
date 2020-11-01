<template>
<section>
    <h1>You are now in Play mode.</h1>
    <button v-if="randomCountry" v-on:click.prevent="getRandomCountry(countriesRemaining)">Change Flag</button>
    <flag-to-guess v-if="randomCountry" :randomCountry="randomCountry"></flag-to-guess>
        <select v-if="countriesRemaining" @change="checkAnswer()" name="flagCountry" id="" v-model="countryListSelected">
            <option selected disabled value="">--Select A Country--</option>
            <option v-for="(country, alpha3Code) in countriesRemaining" :key="alpha3Code" :value="country">{{ country.name }}</option>

        </select>

    <play-map :countries="countries"></play-map>
</section>
</template>

<script>
import playMap from './playMap';
import flagToGuess from './flagToGuess';

export default {
    name: 'playArticle',
    props: ['currentMode', 'countries'],
    components: {
        'play-map': playMap,
        'flag-to-guess': flagToGuess
    },
    data () {
        return {
        currentFlag: null,
        randomCountry: null,
        countriesRemaining: [],
        countriesCorrect: [],
        countryListSelected: null
        }
    },
    methods: {
        getRandomCountry (array) {
            this.randomCountry = array[Math.floor(Math.random() * array.length)]
            },

        checkAnswer () {
            console.log(this.countryListSelected.alpha3Code)
            if (this.randomCountry.alpha3Code === this.countryListSelected.alpha3Code) {
                this.countriesCorrect.push(this.countryListSelected)
                const index = this.countriesRemaining.indexOf(this.countryListSelected)
                this.countriesRemaining.splice(index, 1)
                this.getRandomCountry(this.countriesRemaining)
                this.countryListSelected = null
            }
    }

    },


    mounted() {
        this.countriesRemaining = this.countries
        this.getRandomCountry(this.countriesRemaining)
    }

}
</script>

<style>

</style>
