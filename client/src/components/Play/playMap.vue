<template>
    <section>
        <p>This is the play Map</p>
        <checkbox-svg-map @click="getCountryDetails()" v-model="mapSelectedCountry" :map="World"/>
    </section>
</template>

<script>
import { CheckboxSvgMap } from "vue-svg-map";
import World from "@svg-maps/world"

export default {
    name: 'play-map',
    props: ['countries'],
    components: {
        'checkbox-svg-map': CheckboxSvgMap
    },
    data() {
        return {
            World,
            mapSelectedCountry: [],
            apiSelectedCountry: null,
            // selectedCountries: []
        }
    },
    methods: {
      getCountryDetails() {
        for (const country of this.countries) {
          if (country.alpha2Code.toLowerCase() === this.mapSelectedCountry) {
            console.log(country.alpha2Code.toLowerCase())
            console.log(this.mapSelectedCountry)
            this.apiSelectedCountry = country
          }
        }
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
.svg-map >>> .svg-map__location:focus, .svg-map >>> .svg-map__location:hover{
  fill: #f4bc44;
  outline: 0;
}

[aria-checked="true"] {
  fill: #5FC43B;
  outline: 0
}
</style>
