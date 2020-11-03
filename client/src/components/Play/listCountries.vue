<template>
    <article>
        <p>Correct countries:</p>
        <ul>
            <li v-for="(country, index) in countriesCorrect" :key="index">
            <p>{{country.name}}</p>
            <p>Capital: {{country.capital}}</p>
            <p>Population: {{country.population}}</p>
            </li>
        </ul>
    </article>
</template>

<script>
export default {
    name: 'list-countries',
    props: ['countriesCorrect']
}
</script>

<style scoped>

</style>