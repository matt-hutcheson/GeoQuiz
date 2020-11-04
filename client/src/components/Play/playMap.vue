<template>
    <section>
        <p>Currently hovering: {{ tooltip }}</p>
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
        <checkbox-svg-map @click="selectCountry" @mouseenter="hoverCountry" :location-class="isCorrect" :map="world"/>
    </section>
</template>

<script>
import { CheckboxSvgMap } from "vue-svg-map";
import World from "@svg-maps/world"
import { eventBus } from "@/main.js"

export default {
    name: 'play-map',
    props: ['countries', 'correctAnswers', 'countriesRemaining', 'currentUser'],
    components: {
        'checkbox-svg-map': CheckboxSvgMap
    },
    data() {
        return {
          selectedCountries: [],
          world: World,
          tooltip: ""
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
      }
    }
}
</script>

<style scoped>
section {
    padding: 10px;
    border: solid black 1px;
    margin: 5px 20px;
    background-color: rgb(172,237,243);
    width: 95%;
}

section > p {
    position: absolute;
}
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

/* counters */

#counters {
    position:absolute;
    right:5%;
}
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
</style>
