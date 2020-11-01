<template>
    <section>
        <p>This is the play Map</p>
        <radio-svg-map @click="getCountryDetails()" v-model="mapSelectedCountry" :map="World"/>
    </section>
</template>

<script>
import { RadioSvgMap } from "vue-svg-map";
import World from "@svg-maps/world"

export default {
    name: 'play-map',
    props: ['countries'],
    components: {
        'radio-svg-map': RadioSvgMap
    },
    data() {
        return {
            World,
            mapSelectedCountry: null,
            apiSelectedCountry: null
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
    },
    // computed: {
    //   findAPICountryDetails() {
    //     for (const country of countries) {
    //       if (country.alpha2Code.toLowerCase() === mapSelectedCountry) {
    //         console.log(country.alpha2Code.toLowerCase())
    //         console.log(mapSelectedCountry)
    //         apiSelectedCountry = country
    //       }
    //     }
    //   }
    // }
}
</script>

<style>

</style>
