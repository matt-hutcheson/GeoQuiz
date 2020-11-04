<template>
  <nav>
    <button v-if="currentMode!=='learn'" v-on:click='handleClick("learn")'>Learn</button>
    <button v-if="currentMode!=='play'" v-on:click='handleClick("play")'>Play</button>
  </nav>
</template>

<script>
import { eventBus } from '../main'

export default {
  name: 'geoNav',
  props: ['currentMode'],

  methods: {
    handleClick: function(change) {
      eventBus.$emit('mode-changed', change);
    },
  },

}
</script>

<style>

</style>
