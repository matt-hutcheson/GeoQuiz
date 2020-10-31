<template>
  <h1>{{countries[0].name}}</h1>
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
