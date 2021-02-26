<template>
  <main id='main-container'>
    <div id="nav-container">
      <h1 v-on:click="returnHomepageClick">GeoQuiz</h1>
      <div id='img-and-btn-container'>
        <div id='btn-container'>
          <router-link to="/learn">
            <button>Learn About the Countries of the World!</button>
          </router-link>
          <router-link to="/play">
            <button>Test Your Knowledge!</button>
          </router-link>
        </div>
        <img id="world-map" src='@/components/world_map.png' alt='world_map'>
      </div>
      <swap-mode ></swap-mode>
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

#nav-container {
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
}

#img-and-btn-container {
  display: flex;
  flex-flow: column;
  justify-content: center;
}

#btn-container {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
}

* {
  font-family: Tahoma, Verdana;
  font-size: 18px;
  margin: 0;
}

button {
  font-size: 20px;
  padding: 10px;
  margin: 10px;
  margin-bottom: 30px;
  border-radius: 5px;
  width: 30vh;
}

button:hover {
  background-color: black;
  color: white;
}

#world-map{
  margin-top: 1em;
  height: 65vh;
  width: auto;
}

</style>
