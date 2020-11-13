<template>
    <section id="map-section">
      <p class="tooltip" >Currently hovering: {{ tooltip }}</p>
      <div v-if="result==='correct'" id="correct-next-flag">
        <p v-if="result==='correct'">Great job!!</p>
        <button id= "next-flag" v-on:click.prevent="getRandomCountry(countriesRemaining); scrollTop();">Next Flag</button>
        <button id= "details-answers" v-on:click="scrollBottom()">Check your answers</button>
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
    props: ['countries', 'correctAnswers', 'countriesRemaining', 'currentUser', 'randomCountry', 'result'],
    components: {
        'checkbox-svg-map': CheckboxSvgMap
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
    border: solid black 1px;
    background-color: rgb(172,237,243);
    width: 100%;
    height:80vh;
}

/* section > p {
    position: absolute;
} */
.svg-map {
    stroke: #b6b6b6;
    stroke-width: 1;
    max-height: 90%;
    max-width: 100%;
    stroke-linecap: round;
    stroke-linejoin: round;
    outline: 0;
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

.tooltip {
    position: relative;
    width: fit-content;
    border: solid 1px;
    padding: 5px 20px;
    text-align: center;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.5);
    margin: 10px;
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
