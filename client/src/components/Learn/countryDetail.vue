<template>
    <section id="right-side" v-if='selectedCountry'>
                       
        <img alt='flag' :src='selectedCountry.flag'>
                
            <p id='country-name'><span>Name</span>: {{ selectedCountry.name }}</p>
            <p><span>Capital</span>: {{ selectedCountry.capital }}</p>
            <p><span>Region</span>: {{ selectedCountry.region }}</p>
            <p><span>Sub-Region</span>: {{ selectedCountry.subregion }}</p>

            <label>Currency(ies) :</label>
                <ul>
                    <li v-if='currency.name' v-for='(currency, index) of selectedCountry.currencies' :key='index'>
                    {{ currency.name }} ({{ currency.symbol }})</li>
                </ul>
            
            <label>Time-Zone(s) :</label>
                <ul>
                    <li v-for='(timezone, index) of selectedCountry.timezones' :key='index'>{{ timezone }} </li>
                </ul>
                           
            <label>Language(s):</label>
                <ul>   
                    <li v-for='(language, index) of selectedCountry.languages' :key='index'>{{ language.name }}</li>
                </ul>
                    
            <p><span>Demonym</span>: {{ selectedCountry.demonym }}</p>                  
    </section>
</template>

<script>
export default {
    name: 'country-detail',
    props: ['selectedCountry', 'timezones'],
    data() {
        return {

        }
    },
    

}
</script>

<style scoped>

*{
    font-family: Tahoma, Verdana;
}

#country-name {
    font-weight: bold;
}

img {
  width: 30vh;
  background: no-repeat contain;
  border: solid black 2px;
}

#right-side {
    width: 20%;
    padding: 20px;
    border: solid black 1px;

}

</style>