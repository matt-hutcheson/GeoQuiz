<template>
    <section>
        <div >
            <button class="button-instructions" v-if="currentUser" v-on:click='handleClick("intructions")'>Instructions</button>
        </div>
        <choose-user v-if="!currentUser" :currentUser="currentUser" :allUsers="allUsers" :countries='countries'></choose-user>
        <play-map v-if="currentUser" :currentUser="currentUser" :countries="countries" :correctCountry="randomCountry" :correctAnswers="countriesCorrect" :countriesRemaining="countriesRemaining" :randomCountry="randomCountry" :result="result"></play-map>
        <list-countries v-if="currentUser" :countriesCorrect="countriesCorrect" ></list-countries>
    </section>
</template>

<script>
import playMap from './playMap';
import { eventBus } from '@/main.js';
import UserService from '../../services/UserService';
import instructions from './instructions'
import listCountries from './listCountries'
import chooseUser from './chooseUser'

export default {
    name: 'playArticle',
    props: ['currentMode', 'countries', 'allUsers', 'currentUser', 'randomCountry', 'countriesRemaining', 'countriesCorrect', 'countryListSelected', 'result'],
    components: {
        'play-map': playMap,
        'instructions' : instructions,
        'list-countries': listCountries,
        'choose-user': chooseUser
    },

    methods: {
        handleClick: function(change) {
            eventBus.$emit('mode-changed', change);
        }
    },
}
</script>

<style scoped>
.button-instructions {
    position: relative;
    left: 90%;
    margin: 5px 20px;
    /* width: 10em; */
    border-radius: 5px;
    text-align: center;
    outline: none;
    padding: 8px 10px;
    background-color: #ffd30d;
    border: #ebb810 solid 2px;
    font-size: 15px;
}

.button-instructions:hover {
    background-color: #ebb810;
    border: #ebb810 solid 2px;
}

</style>
