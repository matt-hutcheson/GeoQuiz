<template>
  <div id="map-header">
    <div id="change-flag-button">
      <button v-if="randomCountry" v-on:click.prevent="getRandomCountry(countriesRemaining)">Change Flag</button>
    </div>
    <flag-to-guess v-if="randomCountry" :randomCountry="randomCountry"></flag-to-guess>
    <section id="hints-container">
      <div id="hints-header-container">
        <h2 id="hints-header">Hints</h2>
        <button v-on:click.prevent="getHint()" id="hint-button">Get Hint</button>
      </div>
      <p v-if="hints > 0" class="hint"> 1. Its capital is: {{ randomCountry.capital }}</p>
      <p v-if="hints > 1" class="hint"> 2. It is found in: {{ randomCountry.region }}</p>
      <p v-if="hints > 2" class="hint"> 3. The country is: {{ randomCountry.name }}</p>
      <p v-if="hints > 3" class="hint red-text">No more hints available. Use next flag button to skip.</p>
      <!-- <p v-if="result==='correct'" class="result-correct"><font-awesome-icon :icon="['fas', 'check-circle']"/></p>
      <p v-if="result==='incorrect'" class="result-wrong"><font-awesome-icon :icon="['fas', 'times-circle']"/></p> -->
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
      hints: 0
    }
  },

  mounted() {
    eventBus.$on('get-hint-pressed', () => {
      this.hints += 1
    })

    eventBus.$on('change-flag-pressed', () => {
      this.hints = 0
    })

    eventBus.$on('country-correct', () => {
      this.hints = 0
    })
  },

  methods: {
    getRandomCountry (countriesRemaining) {
      eventBus.$emit('change-flag-pressed', countriesRemaining)
    },

    getHint() {
      this.hints += 1
    }
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
  grid-template-columns: 1fr 2fr 1fr 1fr;
  justify-items: center;
  align-items: center;
  width: 100%;
  border: solid black 1px;
  height: 20vh;
}

#hints-container {
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: flex-start;
  font-size: medium;
  overflow-y: auto;
  /* padding: 5px; */
  height: 20vh;
  width: 20vw;
}

.hint {
  padding: 0 0 0 0;
  margin: 0;
}

.red-text {
  color: red;
}

#hint-button {
    margin-left: 10px;
    border-radius: 5px;
    text-align: center;
    outline: none;
    padding: 8px 10px;
    background-color: #ffd30d;
    border: #ebb810 solid 2px;
}

#hints-header-container {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}

#hints-header {
  font-size: large;
  /* padding: 0 0 1em 0; */
  margin: 0;
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

button:hover {
    background-color: #ffc811;
    border: #ffdb12 solid 2px;
    cursor: pointer;
}

</style>
