<template>
<section>
    <h1>You are now in Play mode.</h1>
    <flag-to-guess v-if="countries.length" :countries="countries"></flag-to-guess>
    <play-map :countries="countries"></play-map>
</section>
</template>

<script>
import playMap from './playMap';
import flagToGuess from './flagToGuess';

export default {
    name: 'playArticle',
    props: ['currentMode', 'countries'],
    components: {
        'play-map': playMap,
        'flag-to-guess': flagToGuess
    }

}
</script>

<style>

</style>
