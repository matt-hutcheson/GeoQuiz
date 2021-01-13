<template>
<nav id='img-and-btn-container'>
  <div id='btn-container'>
    <button v-on:click='handleClick("learn")'>Learn About the Countries of the World!</button>
    <button v-on:click='handleClick("play")'>Test Your Knowledge!</button>
    <div id='img-container'>
      <img id="world-map" v-if='!imageIsHidden' src='@/components/world_map.png' alt='world_map'>
    </div>
  </div>
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
      this.imageIsHidden = true;
    },
  },
  data() {
    return {
      imageIsHidden: false
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

#img-and-btn-container {
  display: flex;
  justify-content: center;
}

#btn-container {
  text-align: center;
}

</style>


