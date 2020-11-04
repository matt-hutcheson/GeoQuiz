<template>
    <article>
        <p>Correct countries:</p>
        <ul>
            <li id="countries" v-for="(country, index) in countriesCorrect" :key="index">
            <p><b>{{country.name}}</b></p>
            <div>
                <p>Capital: {{country.capital}}</p>
                <p>Population: {{country.population}}</p>
            </div>
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
article > p {
    margin-left: 10%;
}

ul {
    list-style-type: none;
    display: flex;
}

li  {
    border: solid 2px;
    padding: 10px;
    width: 17vw;
    border-radius: 5px;
    margin: 10px 20px;
}
</style>