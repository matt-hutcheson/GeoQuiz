<template>
    <section id='left-side'>
        <radio-svg-map @clickgaa='getCountryDetails()' v-model='mapSelectedCountry'
            :map='World'/>  
    </section>
</template>

<script>
import { RadioSvgMap } from "vue-svg-map";
import World from "@svg-maps/world";
import { eventBus } from '@/main.js'

export default {
    name: 'learn-map',
    props: ['countries'],
    components: {
        'radio-svg-map': RadioSvgMap,
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
                if(country.alpha2Code.toLowerCase() === this.mapSelectedCountry) {
                    this.apiSelectedCountry = country
                    eventBus.$emit('learn-country-selected', this.apiSelectedCountry)
                }
            }
        }
    }, 
}


</script>

<style>


#left-side {
    width: 80%;
    padding: 10px;
    border: solid black 1px;
    margin-right: 5px;
    background-color: rgb(172,237,243);
}  

.svg-map {
    stroke: #b6b6b6;
    stroke-width: 1;
}

.svg-map__location {
  fill: #FFBDED;
  outline: 0;
}
.svg-map__location > :focus, :hover {
    fill: yellow;
}
</style>

