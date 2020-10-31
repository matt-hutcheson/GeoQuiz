<template>
  <main>
    <h1>Geo Quiz!</h1>
  </main>
</template>

<script>
export default {
    data(){
        return{
        countries: []
        }
    },

    mounted(){
        fetch('https://restcountries.eu/rest/v2/all') // API
            .then(res => res.json())
            .then((countries) => (this.countries = countries))
    }
    }
</script>

<style>

</style>
