<template>
  <main class='main-container' >
    <h1>Geo Quiz!</h1>
    <geo-nav :currentMode= currentMode></geo-nav>
    <article>
        <play-article v-if="currentMode==='play'" :countries="countries"></play-article>
        <learn-article v-if="currentMode==='learn'" :countries="countries"></learn-article>
    </article>
  </main>
</template>

<script>
import geoNav from './components/geoNav';
import learnArticle from './components/Learn/learnArticle';
import playArticle from './components/Play/playArticle';
import { eventBus } from './main';


export default {
  name: 'App',
    data(){
        return{
          currentMode: null,
          countries: []
        }
    },

    mounted(){
        fetch('https://restcountries.eu/rest/v2/all') //API
            .then(res => res.json())
            .then((countries) => (this.countries = countries))

        eventBus.$on('mode-changed', (change) => {
          this.currentMode = change;
        })
    },
    components: {
      'geo-nav': geoNav,
      'play-article': playArticle,
      'learn-article': learnArticle
    }
  }
</script>

<style>

</style>
