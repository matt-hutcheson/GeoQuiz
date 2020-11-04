<template>
    <article>
        <h2>You are currently in Learn mode</h2>
        <p>Instruction: Click on a country to display some information</p>
        
        <div id='container'>
            <learn-map :countries="countries"></learn-map>
            <country-detail v-if='apiSelectedCountry' :selectedCountry="apiSelectedCountry"></country-detail>
        </div>
    </article>
</template>

<script>
import learnMap from './learnMap';
import countryDetail from './countryDetail';
import {eventBus} from '@/main.js'

export default {
    name: 'learnArticle',
    props: ['currentMode', 'countries'],
    data() {
        return {
            mapSelectedCountry: null,
            apiSelectedCountry: null
        } 
    },   
    components: {
        'learn-map': learnMap,
        'country-detail': countryDetail,
    },
    mounted () {
        eventBus.$on('learn-country-selected', (selectedCountry) => {
            this.apiSelectedCountry = selectedCountry
        })
    },                                                    
}           
</script>

<style scoped>

#container {
    display: flex;
    justify-content: space-between;
    display: flex-wrap;
    cursor: pointer;
  }

* {
  font-family: 'Grandstander', cursive;
  font-size: 20px;
  margin: 0;
}

h2 {
    margin-bottom: 20px;
}

p {
    margin-bottom: 20px;
}
</style>
