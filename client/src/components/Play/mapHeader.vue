<template>
  <div id="map-header">
    <div id="change-flag-button">
      <button v-if="randomCountry" v-on:click.prevent="getRandomCountry(countriesRemaining)">Change Flag</button>
    </div>
    <flag-to-guess v-if="randomCountry" :randomCountry="randomCountry"></flag-to-guess>
    <section id="flag-results">
      <p v-if="result==='correct'" class="result-correct"><font-awesome-icon :icon="['fas', 'check-circle']"/></p>
      <p v-if="result==='incorrect'" class="result-wrong"><font-awesome-icon :icon="['fas', 'times-circle']"/></p>
    </section>
    <div id="counters">
      <div id="counters-container">
        <div id="counter-correct">
          <p class="text-correct-answers">Correct answers: </p>
          <p class="num-correct-answers">{{correctAnswers.length}}</p>
        </div>
        <div id="counter-remaining">
          <p class="text-remaining">Countries Remaining: </p>
          <p class="num-remaining">{{countriesRemaining.length}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import flagToGuess from './flagToGuess';
import {eventBus} from '../../main';

export default {
  name: "map-header",
  props: ["randomCountry", "countriesRemaining", "correctAnswers", "result"],
  data () {
    return {

    }
  },
  methods: {
    getRandomCountry (countriesRemaining) {
      eventBus.$emit('change-flag-pressed', countriesRemaining)
    },
  },

  components: {
    'flag-to-guess': flagToGuess
  }
}
</script>

<style scoped>

/* section {
  width: 90vw;
} */

#map-header {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-items: center;
  align-items: center;
  width: 100%;
  border: solid black 1px;
  height: 20vh;
}

#flag-results {
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  font-size: xx-large;
  padding: 5px;
  height: 1em;
}

.result-wrong {
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: red;
}

.result-correct {
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: green;
}

#counter-remaining, #counter-correct {
    display: flex;
    flex-flow: row;
    height: 4em;
    white-space: nowrap;
    /* margin: -10px; */
}

.num-correct-answers{
    padding: 8px 10px;
    border: solid #47b647 1px;
    border-radius: 0 5px 5px 0;
    text-align: center;
}

.num-remaining {
    padding: 8px 10px;
    border: solid #5c64cf 1px;
    border-radius: 0 5px 5px 0;
    text-align: center;
}

.text-correct-answers {
    background-color: #47b647;
    color: black;
    border-radius: 5px 0 0 5px;
    text-align: center;
    padding: 8px 10px;
}

.text-remaining {
    background-color: #5c64cf;
    color: black;
    border-radius: 5px 0 0 5px;
    text-align: center;
    padding: 8px 10px;
}

#change-flag-button > button {
    font-size: 15px;
    width: 10em;
    border-radius: 5px;
    text-align: center;
    outline: none;
    padding: 8px 10px;
    background-color: #ffd30d;
    border: #ebb810 solid 2px;
}

#change-flag-button > button:hover {
    background-color: #ffc811;
    border: #ffdb12 solid 2px;
}

</style>
