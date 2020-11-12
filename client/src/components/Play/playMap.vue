<template>
    <section id="map-section">
      <div id="map-header">
        <div id="container-flag">
          <flag-to-guess id="flag" v-if="randomCountry" :randomCountry="randomCountry"></flag-to-guess>
        <div id="button-result">
          <div id="change-flag-button">
              <button v-if="randomCountry" v-on:click.prevent="getRandomCountry(countriesRemaining)">Change Flag</button>
          </div>
          <section id="flag-results">
            <p v-if="result==='correct'" class="result-attempt">Correct! This is {{ randomCountry.name }}'s flag.</p>
            <p v-if="result==='incorrect'" class="result-attempt">Sorry, that's the wrong country. Please try again.</p>
          </section>
        </div>
          <div v-if="result==='correct'" id="correct-next-flag">
              <p v-if="result==='correct'">Great job!!</p>
              <button id= "next-flag" v-on:click.prevent="getRandomCountry(countriesRemaining); scrollTop();">Next Flag</button>
              <button id= "details-answers" v-on:click="scrollBottom()">Check your answers</button>
          </div>
        </div>
        <div id="counters">
            <div id="counters-container">
                <div id="counter-correct">
                    <p class="text-correct-answers">Correct answers: </p>
                    <p class="num-correct-answers">{{correctAnswers.length}}</p>
                </div>
                <div id="counter-remaining">
                    <p class="text-remaining">Countries Remaining: </p>
                    <p class="num-remaining">{{countriesRemaining.length}}</p>
                </div>
            </div>
        </div>
      </div>
      <checkbox-svg-map @click="selectCountry" @mouseenter="hoverCountry" :location-class="isCorrect" :map="world"/>
      <p class="tooltip" >Currently hovering: {{ tooltip }}</p>
    </section>
</template>

<script>
import { CheckboxSvgMap } from "vue-svg-map";
import World from "@svg-maps/world"
import { eventBus } from "@/main.js"
import flagToGuess from './flagToGuess';

export default {
    name: 'play-map',
    props: ['countries', 'correctAnswers', 'countriesRemaining', 'currentUser', 'randomCountry', 'result'],
    components: {
        'checkbox-svg-map': CheckboxSvgMap,
        'flag-to-guess': flagToGuess
    },
    data() {
        return {
          selectedCountries: [],
          world: World,
          tooltip: "",
        }
    },
    computed: {
      apiSelectedCountries: function() {
        return this.selectedCountries.map(alpha2Code => this.countries.find(country => country.alpha2Code.toLowerCase() === alpha2Code.toLowerCase()))
        }
    },

    methods: {
      isCorrect: function(location) {
        if (this.correctAnswers.map(country => country.alpha2Code.toLowerCase()).includes(location.id)) {
          return "correct"
        }
      },
      selectCountry(event) {
        const selectedAlpha2Code = event.target.id
        eventBus.$emit('map-country-selected', selectedAlpha2Code)
      },
      hoverCountry(event) {
        const alpha2Code = event.target.id
        const country = this.countries.find(country => country.alpha2Code.toLowerCase() === alpha2Code)
        if (country) {
          this.tooltip = country.name
        }
      },
      getRandomCountry (countriesRemaining) {
        eventBus.$emit('change-flag-pressed', countriesRemaining)
      },

      scrollTop () {
        window.scrollTo({
            top: 200,
            left: 100,
            behavior: 'smooth'
        })
    },
        scrollBottom () {
            window.scrollTo({
                top: 1000,
                left: 100,
                behavior: 'smooth'
            })
        },
    }
}
</script>

<style scoped>
#map-section {
    padding: 10px;
    border: solid black 1px;
    margin: 5px 20px;
    background-color: rgb(172,237,243);
    width: 95%;
}

/* section > p {
    position: absolute;
} */
.svg-map {
    stroke: #b6b6b6;
    stroke-width: 1;
    width: 90%;
    height: auto;
    stroke-linecap: round;
    stroke-linejoin: round;
    outline: 0;
    margin: 10px 0 10px 5%;
}

.svg-map >>> .svg-map__location {
  fill: #FFBDED;
  outline: 0;
}

.svg-map >>> .svg-map__location:hover{
    fill: palevioletred;
    outline: 0;
}

.svg-map >>> [aria-checked="true"] {
  fill: palevioletred;
  outline: 0
}

.svg-map >>> .correct {
  fill: #34e734;
  outline: 0
}

#map-header {
  display: flex;
  flex-flow: row no-wrap;
  justify-content: space-between;
  align-items: center;
  margin: 0 30px;
}

#flag-results {
  width: 20em;
}

.result-attempt {
  width: 15em;
  margin: 30px 40px;
}
/* counters */

/* #counters {
    position:absolute;
    right:5%;
} */
#counter-remaining, #counter-correct {
    display: flex;
    margin: -10px;
}
.num-correct-answers{
    padding: 8px 10px;
    border: solid #47b647 1px;
    border-radius: 0 5px 5px 0;
    text-align: center;
}
.num-remaining {
    padding: 8px 10px;
    border: solid #5c64cf 1px;
    border-radius: 0 5px 5px 0;
    text-align: center;
}
.text-correct-answers {
    background-color: #47b647;
    color: black;
    border-radius: 5px 0 0 5px;
    text-align: center;
    padding: 8px 10px;
}
.text-remaining {
    background-color: #5c64cf;
    color: black;
    border-radius: 5px 0 0 5px;
    text-align: center;
    padding: 8px 10px;
}

.tooltip {
    position: relative;
    width: fit-content;
    border: solid 1px;
    padding: 5px 20px;
    text-align: center;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.5) ;
}

#container-flag {
    width: 40%;
    display: flex;
}

#flag{
    position: relative;
    margin: 20px auto auto 7em;
}

#change-flag-button > button {
    font-size: 15px;
    width: 10em;
    margin: 20px 25px 0 80px;
    border-radius: 5px;
    text-align: center;
    outline: none;
    padding: 8px 10px;
    background-color: #ffd30d;
    border: #ebb810 solid 2px;
}
#change-flag-button > button:hover {
    background-color: #ffc811;
    border: #ffdb12 solid 2px;
}

#button-result {
    order: -1;
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
    background-color: rgba(255, 255, 255, 0.5)
    /* margin: 0 auto; */


}
#next-flag, #details-answers {
    margin: 10px;
    border-radius: 5px;
    text-align: center;
    outline: none;
    padding: 8px 10px;
    background-color: #ffd30d;
    border: #ebb810 solid 2px;
}

#next-flag:hover, #details-answers:hover {
    background-color: #ffc811;
    border: #ffdb12 solid 2px;
}

</style>
