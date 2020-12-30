<template>
    <section id='left-side'>
        <p class="tooltip">Currently hovering: {{ tooltip }}</p>
        <svg-pan-zoom
        style="width: 100%; height: 80%;"
        :zoomEnabled="true"
        :controlIconsEnabled="true"
        :fit="true"
        :center="true"
        :minZoom="1">
            <radio-svg-map @mouseenter="hoverCountry" @click='getCountryDetails()' v-model='mapSelectedCountry' :map='World'/>
        </svg-pan-zoom>
    </section>
</template>

<script>
import { RadioSvgMap } from "vue-svg-map";
import World from "@svg-maps/world";
import { eventBus } from '@/main.js';
import SvgPanZoom from "vue-svg-pan-zoom";

export default {
    name: 'learn-map',
    props: ['countries'],
    components: {
        'radio-svg-map': RadioSvgMap,
        'svg-pan-zoom': SvgPanZoom
    },
    data() {
        return {
            World,
            mapSelectedCountry: null,
            apiSelectedCountry: null,
            tooltip: ""
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

* {
    font-family: Tahoma, Verdana;
}

#left-side {
    width: 80%;
    height: 100%;
    padding: 10px;
    border: solid black 1px;
    margin-right: 5px;
    background-color: rgb(172,237,243);
}

.svg-map {
    stroke: #b6b6b6;
    stroke-width: 1;
    width: 100%;
    height: 100%;
    stroke-linecap: round;
    stroke-linejoin: round;
    outline: 0;
}

.svg-map >>> .svg-map__location {
  fill: #FFBDED;
  outline: 0;
}
.svg-map >>> .svg-map__location:hover {
    fill: palevioletred;
}

.svg-map >>> .svg-map__location[aria-checked='true'] {
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
</style>

