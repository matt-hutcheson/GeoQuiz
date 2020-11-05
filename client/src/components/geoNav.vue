<template>
<nav id='img-and-btn-container'>
  <nav id='btn-container'>
    <button v-if="currentMode!=='learn'" v-on:click='handleClick("learn")'>Learn Mode</button>
    <button v-if="currentMode!=='play'" v-on:click='handleClick("play")'>Play Mode</button>
    <nav id='img-container'>
     <img v-if='!imageIsHidden' src='@/components/pexels-suzy-hazelwood.jpg' alt='map'>
    </nav>  
  </nav>
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
  font-size: 15px;
  margin: 0;
}

button {
  font-size: 25px;
  padding: 15px;
  margin: 10px;
  margin-bottom: 30px;
  border-radius: 5px;
  width: 30vh;
  position: center;
}

button:hover {
  background-color: black;
  color: white;
}

img {
  height: 60vh;
  width: auto;
  display: block;
  
/* Photo by Suzy Hazelwood from Pexels https://www.pexels.com/photo/shallow-focus-photo-of-world-globe-1098515/ */
}

#img-and-btn-container {
  display: flex;
  justify-content: center;
}

#btn-container {
  text-align: center;
}

</style>


