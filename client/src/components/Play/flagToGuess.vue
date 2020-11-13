<template>
  <img v-if="randomCountry" :src="randomCountry.flag" :alt="randomCountry.name + 'flag'">
</template>

<script>
export default {
  name: "flag-to-guess",
  props: ["randomCountry"],
  data () {
    return {

    }
  },
}
</script>

<style scoped>

img {
  height: 20vh;
  background: no-repeat contain;
  border: solid black 2px;
}

</style>
