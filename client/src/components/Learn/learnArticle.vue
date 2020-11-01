<template>
<article>
    <h1>You are currently in Learn mode</h1>
    <p>Hover over a country to display some information</p>


    <!-- On hover over country - selected info is displayed (name: map, other info: API) -->
    <!-- Info passed down from API  -->
    <!-- Link countries in map with API data (mapping name for name) -->
    <!-- Compare country and API data -->
    <!-- Look up svg map github/docs to see how to do hover info -->
    <!-- Instructional content -->
    <learn-map :countries="countries"></learn-map>
</article>
</template>

<script>
import learnMap from './learnMap';

export default {
    name: 'learnArticle',
    props: ['currentMode', 'countries'],
    components: {
        'learn-map': learnMap
        },                                                 
    }           
</script>

<style>

</style>
