<template>
	<article>
		<choose-user v-if="!currentUser" :currentUser="currentUser" :allUsers="allUsers" :countries='countries'></choose-user>
        <div id="user-instructions-container">
            <!-- <div id="current-user">
                <p v-if="currentUser && currentMode==='play'">Player: {{ currentUser.username }}</p>
                <button id="change-user-button" v-if="currentUser && currentMode==='play'" v-on:click.prevent="changeUser()">Change player</button>
            </div> -->
            <div id="instructions-button-container">
                <button class="button-instructions" v-if="currentMode==='play' && currentUser" v-on:click='handleClick("instructions")'>Instructions</button>
            </div>
        </div>
        <instructions v-if="currentMode==='instructions'" :currentMode="currentMode"></instructions>
		<div id="game-area">
			<map-header v-if="currentUser" :randomCountry="randomCountry" :countriesRemaining="countriesRemaining" :correctAnswers="countriesCorrect" :result="result"></map-header>
			<play-map v-if="currentUser" :currentUser="currentUser" :countries="countries" :correctCountry="randomCountry" :correctAnswers="countriesCorrect" :countriesRemaining="countriesRemaining" :randomCountry="randomCountry" :result="result"></play-map>
		</div>
		<list-countries v-if="currentUser" :countriesCorrect="countriesCorrect" ></list-countries>
	</article>
</template>

<script>
import playMap from './playMap';
import { eventBus } from '@/main.js';
import UserService from '../../services/UserService';
import instructions from './instructions'
import listCountries from './listCountries'
import chooseUser from './chooseUser'
import mapHeader from './mapHeader'

export default {
    name: 'playArticle',
    props: ['currentMode', 'countries', 'allUsers', 'currentUser', 'randomCountry', 'countriesRemaining', 'countriesCorrect', 'countryListSelected', 'result'],
    components: {
        'play-map': playMap,
        'instructions' : instructions,
        'list-countries': listCountries,
        'choose-user': chooseUser,
        'map-header': mapHeader
    },

    methods: {
        handleClick: function(change) {
            eventBus.$emit('mode-changed', change);
        }
    },
}
</script>

<style scoped>

article {
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: center;
	width: 90vw;
}

#game-area {
	height: 90vh;
}

#current-user {
  display: flex;
  flex-flow: row;
  align-items: center;
}

#change-user-button {
    font-size: 15px;
    width: 10em;
    border-radius: 5px;
    text-align: center;
    outline: none;
    padding: 8px 10px;
    background-color: #ffd30d;
    border: #ebb810 solid 2px;
    margin-left: 10px;
}
#change-user-button:hover {
    background-color: #ffc811;
    border: #ffdb12 solid 2px;
}

.button-instructions {
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

#user-instructions-container {
  display: flex;
  flex-flow: row;
  justify-content: flex-start;
  align-items: center;
  padding: 4px;
}

</style>
