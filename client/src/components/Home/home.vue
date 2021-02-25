<template>
  <main id='main-container'>
    <div id="nav-container" class="modeActive">
      <h1 v-on:click="returnHomepageClick">GeoQuiz</h1>
      <geo-nav v-if="!currentMode"></geo-nav>
      <swap-mode v-if="currentMode" :currentMode="currentMode"></swap-mode>
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
import geoNav from '../geoNav';
import swapMode from '../swapMode';

export default {
  components: {
    'geo-nav': geoNav,
    'swap-mode': swapMode
  },

  props: ['currentMode', "countries"],

  methods: {
    returnHomepageClick() {
      this.currentMode = null
    },
  }
}
</script>

<style scoped>
  #main-container {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  /* overflow: auto; */
}

h1 {
    font-family: 'Fredericka the Great', cursive;
    font-size: 60px;
    padding: 10px;
}

h1:hover {
  cursor: pointer;
}

.modeActive {
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
}
</style>
