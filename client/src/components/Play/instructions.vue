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
        <button id="back" v-if="currentMode!=='play'" v-on:click='handleClick("play")'>Back to the game</button>
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
    margin: auto;
    width: 30%;
    padding: 10px;
}
#back {
    display: block;
    margin: 50px auto;
    width: 10em;
    border-radius: 5px;
    text-align: center;
    outline: none;
    padding: 8px 10px;
    background-color: #ffd30d;
    border: #ebb810 solid 2px;
}

#back:hover {
    background-color: #ffc811;
    border: #ffdb12 solid 2px;
}


</style>