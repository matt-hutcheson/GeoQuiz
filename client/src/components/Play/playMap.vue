<template>
    <section id="map-section">
      <p class="tooltip" >Currently hovering: {{ tooltip }}</p>
      <div v-if="result==='correct'" class="player-guess-feedback">
        <p v-if="result==='correct'">Great job!!</p>
        <button id= "next-flag" v-on:click.prevent="getRandomCountry(); scrollTop();">Next Flag</button>
        <button id= "details-answers" v-on:click="scrollBottom()">Check your answers</button>
      </div>
      <div v-if="result==='incorrect'" class="player-guess-feedback">
        <p>Incorrect... Try again.</p>
        <button id="try-again" v-on:click.prevent="tryAgain()">Try Again</button>
        <button id="get-hint" v-on:click.prevent="getHint()">Hint?</button>
      </div>
      <svg-pan-zoom
        style="width: 100%; height: 90%;"
        :zoomEnabled="true"
        :controlIconsEnabled="true"
        :fit="false"
        :center="true"
        :minZoom="1">
        <checkbox-svg-map @click="selectCountry" @mouseenter="hoverCountry" :location-class="isCorrect" :map="world"/>
      </svg-pan-zoom>
    </section>
</template>

<script>
import { CheckboxSvgMap } from "vue-svg-map";
import World from "@svg-maps/world";
import { eventBus } from "@/main.js";
import SvgPanZoom from "vue-svg-pan-zoom";

export default {
    name: 'play-map',
    props: ['countries', 'correctAnswers', 'countriesRemaining', 'currentUser', 'randomCountry', 'result'],
    components: {
        'checkbox-svg-map': CheckboxSvgMap,
        'svg-pan-zoom': SvgPanZoom
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
        let continent = "";
        if (this.correctAnswers.map(country => country.alpha2Code.toLowerCase()).includes(location.id)) {
          const country = this.correctAnswers.find(country => country.alpha2Code.toLowerCase() === location.id)
          continent = country.region.toLowerCase()
          if (continent === "americas"){
            if (country.subregion === "South America"){
              return "correct-south-america"
            }
          }
          return "correct-"+continent
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

      getRandomCountry() {
        eventBus.$emit('change-flag-pressed')
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

      tryAgain() {
        eventBus.$emit('try-again-pressed')
      },

      getHint() {
        eventBus.$emit('get-hint-pressed')
      },
    }
}
</script>

<style scoped>
#map-section {
    border: solid black 1px;
    background-color: rgb(255, 255, 255);
    /* background-color: rgb(172,237,243); */
    width: 100%;
    height:70vh;
    position: relative;
}

/* section > p {
    position: absolute;
} */
.svg-map {
    stroke: #b6b6b6;
    stroke-width: 1;
    height: 100%;
    width: 100%;
    stroke-linecap: round;
    stroke-linejoin: round;
    outline: 0;
}

.svg-map >>> .svg-map__location {
  fill: #ffffff;
  outline: 0;
}

.svg-map >>> .svg-map__location:hover{
    fill: rgb(0, 0, 0);
    outline: 0;
}

.svg-map >>> [aria-checked="true"] {
  fill: rgb(0, 0, 0);
  outline: 0
}

.svg-map >>> .correct-europe {
  fill: #a534e7;
  outline: 0
}

.svg-map >>> .correct-asia {
  fill: #34e734;
  outline: 0
}

.svg-map >>> .correct-oceania {
  fill: rgb(255, 255, 0);
  outline: 0
}

.svg-map >>> .correct-americas {
  fill: #346de7;
  outline: 0
}

.svg-map >>> .correct-africa {
  fill: #e77634;
  outline: 0
}

.svg-map >>> .correct-south-america {
  fill: #ee1f1f;
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

.player-guess-feedback {
    border: solid;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 6px 25px;
    text-align: center;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.5)
}

#next-flag, #details-answers, #try-again, #get-hint {
    margin: 10px;
    border-radius: 5px;
    text-align: center;
    outline: none;
    padding: 8px 10px;
    background-color: #ffd30d;
    border: #ebb810 solid 2px;
}

#next-flag:hover, #details-answers:hover, #try-again:hover, #get-hint:hover {
    background-color: #ffc811;
    border: #ffdb12 solid 2px;
}

</style>
