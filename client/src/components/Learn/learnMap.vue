<template>
    <section id='left-side'>
        <p class="tooltip">Currently hovering: {{ tooltip }}</p>
        <svg-pan-zoom
        style="width: 100%; height: 80%;"
        :zoomEnabled="true"
        :controlIconsEnabled="true"
        :fit="false"
        :center="true"
        :minZoom="1">
            <radio-svg-map @mouseenter="hoverCountry" @click='getCountryDetails()' v-model='mapSelectedCountry' :location-class='getContinent' :map='World'/>
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
        },
        getContinent: function(location){
            let continent = "";
            if (this.countries.map(country => country.alpha2Code.toLowerCase()).includes(location.id)) {
                const country = this.countries.find(country => country.alpha2Code.toLowerCase() === location.id)
                continent = country.region.toLowerCase()
                if (continent === "americas"){
                    if (country.subregion === "South America"){
                    return "south-america"
                    }
                }
                return continent
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
    width: 100%;
    height: 90vh;
    /* padding: 10px; */
    border: solid black 1px;
    position: relative;
    /* margin-right: 5px; */
}

.svg-map {
    stroke: #b6b6b6;
    stroke-width: 1;
    height: 100%;
    width: 100%;
    stroke-linecap: round;
    stroke-linejoin: round;
    outline: 0;
    border-top: solid black 1px;
    border-bottom: solid black 1px;
    background-color: rgb(255, 255, 255);
    /* background-color: rgb(172,237,243); */
}

.svg-map >>> .svg-map__location {
  fill: #FFBDED;
  outline: 0;
}
.svg-map >>> .svg-map__location:hover {
    fill: rgb(0, 0, 0);
}

.svg-map >>> .svg-map__location[aria-checked='true'] {
  fill: #000000;
  outline: 0
}

.svg-map >>> .europe {
  fill: #a534e7;
  outline: 0
}

.svg-map >>> .asia {
  fill: #34e734;
  outline: 0
}

.svg-map >>> .oceania {
  fill: yellow;
  outline: 0
}

.svg-map >>> .americas {
  fill: #346de7;
  outline: 0
}

.svg-map >>> .africa {
  fill: #e77634;
  outline: 0
}

.svg-map >>> .south-america {
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

</style>

