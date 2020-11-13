<template>
  <section>
    <button v-if="currentMode === 'play'" v-on:click='handleClick("learn")'>Swap to Learn</button>
    <button v-if="currentMode === 'learn'" v-on:click='handleClick("play")'>Swap to Play</button>
  </section>
</template>

<script>
import {eventBus} from '../main'

export default {
  props: ["currentMode"],
  methods: {
    handleClick(newMode) {
      eventBus.$emit('swap-mode', newMode)
    }
  }
}
</script>

<style scoped>

* {
  font-family: Tahoma, Verdana;
  font-size: 18px;
  margin: 0;
}

button {
  font-size: 20px;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  width: 10em;
}

button:hover {
  background-color: black;
  color: white;
}

</style>
