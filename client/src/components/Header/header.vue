<template>
  <section id="geo-header">
    <!-- <h1>GeoQuiz</h1> -->
    <geo-nav></geo-nav>
  </section>
</template>

<script>
import geoNav from '../Header/geoNav'

export default {
  name: 'geo-header',

  components: {
    'geo-nav': geoNav
  }
}
</script>

<style scoped>



  #geo-header {
    /* display: flex;
    flex-flow: row nowrap;
    justify-content: space-evenly;
    align-items: center; */
    width: 90%;
  }

</style>
