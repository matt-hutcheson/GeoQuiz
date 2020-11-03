<template>
    <article>
        <h1>You are currently in Learn mode</h1>
        <p>Click on a country to display some information</p>
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
    methods: {

    }  
                                                    
}           
</script>

<style>

#container {
    display: flex;
    justify-content: space-between;
    display: flex-wrap;
    cursor: pointer;
  }

</style>
