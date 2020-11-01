<template>
<section>
    <h1>You are now in Play mode.</h1>
    <play-map :countries="countries"></play-map>
</section>
</template>

<script>
import playMap from './playMap';

export default {
    name: 'playArticle',
    props: ['currentMode', 'countries'],
    components: {
        'play-map': playMap
    }

}
</script>

<style>

</style>
