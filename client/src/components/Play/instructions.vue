<template>
    <article id="instructions">
        <p><b>How to play:</b></p>
        <p>You’ll see a flag in the top left of your screen.</p>
            <ul>
                <li>Click a country on the map to make your guess</li>
                <li>Correct answers will turn green!</li>
                <li>Click 'next flag' to continue playing</li>
            </ul>
        <p>Keep going until you paint the whole globe green!</p>        
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