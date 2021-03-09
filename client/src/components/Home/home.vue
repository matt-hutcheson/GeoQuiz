<template>
  <main id='main-container'>
    <div id="home-container">
      <geo-header :loggedIn="loggedIn" :currentUser="currentUser"></geo-header>
      <learn-play-buttons></learn-play-buttons>
      <div id="world-map"></div>
    </div>
    <!-- <div id="user-instructions-container">
      <div id="current-user">
        <p v-if="currentUser && currentMode==='play'">Player: {{ currentUser.username }}</p>
        <button id="change-user-button" v-if="currentUser && currentMode==='play'" v-on:click.prevent="changeUser()">Change player</button>
      </div>
      <div id="instructions-button-container">
        <button class="button-instructions" v-if="currentMode==='play' && currentUser" v-on:click='handleClick("instructions")'>Instructions</button>
      </div>
    </div>
    <instructions v-if="currentMode==='instructions'" :currentMode="currentMode"></instructions>
    <play-article v-if="currentMode==='play'" :currentMode="currentMode" :allUsers="allUsers" :countries="countries" :currentUser="currentUser" :randomCountry="randomCountry" :countriesRemaining="countriesRemaining" :countriesCorrect="countriesCorrect" :countryListSelected="countryListSelected" :result="result"></play-article>
    <learn-article v-if="currentMode==='learn'" :countries="countries"></learn-article> -->
  </main>
</template>

<script>
import geoHeader from '../Header/header';
import learnPlayButtons from "./learnPlayButtons.vue";

export default {
  name: 'home',
  components: {
    'geo-header': geoHeader,
    'learn-play-buttons': learnPlayButtons
  },

  props: ['currentUser', 'loggedIn'],

  methods: {

  }
}
</script>

<style scoped>

#main-container {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 95vh;
  /* overflow-y: auto; */
}

#home-container {
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 95vh;
}

#world-map{
    width: 100%;
    vertical-align: middle;
    flex-grow: 1;
    background-image: url('../world_map.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
}

</style>
