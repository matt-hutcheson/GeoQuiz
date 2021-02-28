<template>
    <article id="learn-container">
        <geo-header />
        <div id='container'>
            <learn-map :countries="countries"></learn-map>
            <country-detail v-if='apiSelectedCountry' :selectedCountry="apiSelectedCountry"></country-detail>
            <section id="right-side" v-if="!apiSelectedCountry">
                <p>Instruction: Click on a country to display some information</p>
            </section>
        </div>
    </article>
</template>

<script>
import learnMap from './learnMap';
import countryDetail from './countryDetail';
import geoHeader from '../Header/header.vue';
import {eventBus} from '@/main.js';

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
        'geo-header': geoHeader
    },
    mounted () {
        eventBus.$on('learn-country-selected', (selectedCountry) => {
            this.apiSelectedCountry = selectedCountry
        })
    },
}
</script>

<style scoped>



#learn-container {
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 95vh;
}

p {
    text-align: center;
    margin-top: 1em;
    font-size: 16px;
}

#container {
    display: grid;
    grid-template-columns: 8fr 2fr;
    column-gap: 5px;
    /* cursor: pointer; */
    /* overflow: auto; */
    width: 100%;
    /* max-height: 90vh; */
    flex-grow: 1;
  }

* {
  font-family: Tahoma, Verdana;
  font-size: 20px;
  margin: 0;
}


p {
    width: 100%;
}

#right-side {
    /* min-width: 20vw; */
    /* padding: 20px; */
    border: solid black 1px;
    overflow: auto;
}

</style>
