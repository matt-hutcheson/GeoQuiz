<template>
    <section>
        <p>This is the learn Map</p>
        <radio-svg-map @click='getCountryDetails()' v-model='mapSelectedCountry'
            :map='World'/>
        <div class='country_name'>{{ this.apiSelectedCountry }}</div>    
    </section>
</template>

<script>
import { RadioSvgMap } from "vue-svg-map";
import World from "@svg-maps/world"

export default {
    name:'learn-map',
    props: ['countries'],
    components: {
        'radio-svg-map': RadioSvgMap
    },
    data() {
        return {
            World,
            // pointedLocation: null,
            // selectedLocation: null,
            tooltipStyle: null, 
            mapSelectedCountry: null,
            apiSelectedCountry: null
        }
    },
    methods: {
        // getPointLocation(event) {
        //     this.pointedLocation = getLocationName(event.target)
        // },
        // unpointLocation(event) {
        //     this.pointedLocation = null
        //     this.tooltipStyle = { display: 'none' }
    
        // },
        // moveOnLocation(event) {
		// 	this.tooltipStyle = {
		// 		display: 'block',
		// 		top: `${event.clientY + 10}px`,
		// 		left: `${event.clientX - 100}px`,
		// 	}
        // },
        getCountryDetails() {
            for (const country of this.countries) {
                if(country.alpha2Code.toLowerCase() === this.mapSelectedCountry) {
                    console.log( country.alpha2Code)
                    this.apiSelectedCountry = country
                }
            }
        }
    },    

} 

// @mouseover='pointLocation'
// @mouseout='unpointLocation'
// @mousemove='moveOnLocation'

</script>

<style scoped>


.svg-map {
   stroke: #b6b6b6;
  stroke-width: 1;
}


.svg-map__location {
  fill: #FFBDED;
}
.svg-map__location > :focus, :hover {
            fill: #5FC43B;
}

* {
    box-sizing: border-box;
    cursor: pointer;
}

#tooltip {
    position: fixed;
				width: 200px;
				padding: 10px;
				border: 1px solid darkgray;
				background-color: white;
}
</style>

