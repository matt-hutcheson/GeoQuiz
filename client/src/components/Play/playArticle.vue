<template>
<section>
    <h1>You are now in Play mode.</h1>
    <flag-to-guess v-if="randomCountry" :randomCountry="randomCountry"></flag-to-guess>
    <select name="flagCountry" id="">
        <option selected disabled value="">--Select A Country--</option>
        <option v-for="(country, alpha3Code) in countriesRemaining" :key="alpha3Code" value="">{{ country.name }}</option>
    </select>
    <button v-if="randomCountry" v-on:click.prevent="getRandomCountry(countriesRemaining)">Change Flag</button>
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
        countriesCorrect: []
        }
    },
    methods: {
        getRandomCountry (array) {
        this.randomCountry = array[Math.floor(Math.random() * array.length)]
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
