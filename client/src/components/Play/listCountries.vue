<template>
    <article>
        <h2>Correct countries:</h2>
        <ul>
            <li id="countries" v-for="(country, index) in countriesCorrect" :key="index">
                <ul class="mini-country">
                    <li class="mini-flag"> <img :src="country.flag" :alt="country.name"></li>
                    <div class="details-country">
                        <li class="mini-name"><b>{{country.name}}</b></li>
                        <li class="mini-capital">Capital: {{country.capital}}</li>
                    </div>
                </ul>
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

article > h2 {
    margin-left: 1em;
}

img{
    height: 6vh;
    background: no-repeat contain ;
    border: solid 1px;
    margin: 0 10px 0 0;
}
ul {
    list-style-type: none;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 1em;
}

.mini-country {
    border: solid 1px;
    padding: 5px;
    margin: 5px 0 0 10px;
}
</style>