<template>
    <section>
        <p>Currently hovering: {{ tooltip }}</p>
        <checkbox-svg-map @click="selectCountry" @mouseenter="hoverCountry" :location-class="isCorrect" :map="world"/>
    </section>
</template>

<script>
import { CheckboxSvgMap } from "vue-svg-map";
import World from "@svg-maps/world"
import { eventBus } from "@/main.js"

export default {
    name: 'play-map',
    props: ['countries', 'correctAnswers'],
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
        this.tooltip = country.name
      }
    }
}
</script>

<style scoped>
.svg-map {
  stroke: #b6b6b6;
  stroke-width: 1;
  width: 100%;
  height: auto;
  stroke-linecap: round;
  stroke-linejoin: round;
  outline: 0;
}

.svg-map >>> .svg-map__location {
  fill: #FFBDED;
}

.svg-map >>> .svg-map__location:hover{
  opacity: 0.8;
  outline: 0;
}

.svg-map >>> [aria-checked="true"] {
  fill: palevioletred;
  outline: 0
}

.svg-map >>> .correct {
  fill: lightgreen;
  outline: 0
}
</style>
