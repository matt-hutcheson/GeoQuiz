<template>
    <section>
        <p>This is the learn Map</p>
        <radio-svg-map :map="World"/>
    </section>
</template>

<script>
import { RadioSvgMap } from "vue-svg-map";
import World from "@svg-maps/world"

export default {
    name: 'learn-map',
    components: {
        'radio-svg-map': RadioSvgMap
    },
    data() {
        return {
            World
        }
    }
}
</script>

<style>

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

</style>
