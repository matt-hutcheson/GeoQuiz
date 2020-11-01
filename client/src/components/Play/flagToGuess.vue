<template>
  <section>
    <div v-if="randomCountry" class="flag-image" :style=" { backgroundImage: 'url(' + randomCountry.flag + ')'}"></div>
  </section>
</template>

<script>
export default {
  name: "flag-to-guess",
  props: ["countries"],
  data () {
    return {
      currentFlag: null,
      randomCountry: null,
      countriesRemaining: [],
      contriesCorrect: []
    }
  },
  mounted() {
    this.countriesRemaining = this.countries
    this.randomiseList(this.countriesRemaining)
  },
  methods: {
    randomiseList (array) {
      this.randomCountry = array[Math.floor(Math.random() * array.length)]
    }
  }
}
</script>

<style scoped>

.flag-image {
  width: 100px;
  height: 100px;
  background-size: cover;
}

</style>
