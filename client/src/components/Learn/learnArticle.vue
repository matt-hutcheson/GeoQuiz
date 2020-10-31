<template>
<article>
    <h1>You are currently in Learn mode</h1>
    <learn-map> </learn-map>
</article>
</template>

<script>
import learnMap from './learnMap';

export default {
    name: 'learnArticle',
    props: ['currentMode', 'countries'],
    components: {
        'learn-map': learnMap
        }
}
</script>

<style>

</style>
