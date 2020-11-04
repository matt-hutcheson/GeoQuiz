<template>
    <article id="instructions">
        <p><b>How to play:</b></p>
        <p> You’ll see a flag in the top left of your screen. <br>
            All you need to do next is click on the part of the map where that country is.<br>
            If you’re right the country will go green on the map and then you can click “next flag” and continue playing. <br>
            Keep going until you paint the whole globe green!! </p>
        <button v-if="currentMode!=='play'" v-on:click='handleClick("play")'>Back to the game</button>
    </article>
</template>

<script>
import { eventBus } from '@/main'

export default {
    name: 'instructions',
    props: ['currentMode'],

    methods: {
        handleClick: function(change) {
            eventBus.$emit('mode-changed', change);
        }
    }
}
</script>

<style scoped>
#instructions {
    border: solid;
    padding: 10px 20px;
    margin: 30px;
    
}

</style>