<template>
    <section>
        <h1>Flag Game!</h1>
        <article>
            <p>All you need to do is click on the part of the map where the country matching that flag is.<br>
            If you are right the country will change to green, then click ‘next flag’ button and continue playing. <br>
            Keep going until you paint the whole globe green! </p>
        </article>
        <div id="container">
            <div id="container-flag">
                <div id="change-flag-button">
                    <button v-if="randomCountry" v-on:click.prevent="getRandomCountry(countriesRemaining)">Change Flag</button>
                </div>
                <flag-to-guess id="flag" v-if="randomCountry" :randomCountry="randomCountry"></flag-to-guess>
            </div>
        <!-- <select v-if="countriesRemaining" @change="checkAnswer()" name="flagCountry" id="" v-model="countryListSelected">
            <option selected disabled :value="null">--Select A Country--</option>
            <option v-for="(country, alpha3Code) in countriesRemaining" :key="alpha3Code" :value="country">{{ country.name }}</option>
        </select> -->
            <div id="correct-answer-container">
                <div id="counter">
                    <p id="text-correct-answers">Correct answers: </p> 
                    <p class="num-correct-answers">{{correctAnswers}}</p>  
                </div>
                <section id="flag-results">
                    <p v-if="result==='correct'">Correct! This is {{ randomCountry.name }}'s flag.</p>
                    <p v-if="result==='incorrect'">Sorry, that's the wrong country. Please try again.</p>
                </section>
                <button id= "next-flag" v-if="result==='correct'" v-on:click.prevent="getRandomCountry(countriesRemaining)">Next Flag</button>
            </div>
        </div>
        <play-map :countries="countries" :correctCountry="randomCountry" :correctAnswers="countriesCorrect"></play-map>

    </section>
</template>

<script>
import playMap from './playMap';
import flagToGuess from './flagToGuess';
import { eventBus } from '@/main.js'

export default {
    name: 'playArticle',
    props: ['currentMode', 'countries'],
    components: {
        'play-map': playMap,
        'flag-to-guess': flagToGuess
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

    computed: {
        correctAnswers: function () {
            this.countriesCorrect
            return this.countriesCorrect.length
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
#container {
    display:flex;
    height: 200px;
}
#correct-answer-container{
    width: 30%;
}
#container-flag {
    width: 60%;
    display: flex;
}

#flag{
    position: relative;
    margin: 20px 50px;
}

#change-flag-button > button {
    margin: 20px auto auto 50px;
    border-radius: 5px;
    text-align: center;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
    outline: none;
    padding: 8px 10px;
    background-color: #ffd30d;
    border: #ebb810 solid 2px;
}

#counter {
    display: flex;
    padding: 4px;
    /* margin: 20px auto auto ; */
    /* position: absolute */
}
.num-correct-answers{
    padding: 8px 10px;
    border: solid #47b647 1px;
    border-radius: 0 5px 5px 0;
    text-align: center;  
}
#text-correct-answers {
    background-color: #47b647;
    color: black;
    border-radius: 5px 0 0 5px;
    text-align: center;
    padding: 8px 10px;
}
#flag-results {
    margin: -20px auto auto 5px;
}
#next-flag {
    margin: 40px auto auto 10px;
    border-radius: 5px;
    text-align: center;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
    outline: none;
    padding: 8px 10px;
    background-color: #62cae4;
    border: #71aee7 solid 1px;
}
article {
    border: solid;
    padding: 10px 20px;
    margin: 30px;
    width: 500px;
}

</style>
