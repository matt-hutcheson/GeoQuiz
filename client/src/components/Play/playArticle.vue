<template>
	<article id="play-container">
        <geo-header :loggedIn="loggedIn" :currentUser="currentUser"></geo-header>
        <div id="user-instructions-container">
            <div id="current-user" v-if="loggedIn">
                <p>Player: {{ currentUser.username }}</p>
                <button id="change-user-button" v-on:click.prevent="">Change player</button>
            </div>
            <div id="guest" v-if="!loggedIn">
                <p>Login to save your score</p>
            </div>
            <!-- <div id="instructions-button-container">
                <button class="button-instructions" v-if="currentUser" v-on:click='handleClick("instructions")'>Instructions</button>
            </div> -->
        </div>
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
import listCountries from './listCountries';
import mapHeader from './mapHeader';
import geoHeader from '../Header/header';

export default {
    name: 'playArticle',
    props: ['countries', 'currentUser', 'randomCountry', 'countriesRemaining', 'countriesCorrect', 'countryListSelected', 'result', 'loggedIn'],
    components: {
        'play-map': playMap,
        'list-countries': listCountries,
        'map-header': mapHeader,
        'geo-header': geoHeader
    },

    // mounted () {
    //     this.checkToken();
    // },

    // methods: {
    //     checkToken () {
    //         eventBus.$emit('check-token');
    //     }
    // },
}
</script>

<style scoped>

#play-container {
	display: flex;
	flex-flow: column nowrap;
	justify-content: flex-start;
	align-items: center;
	width: 100%;
    height: 95vh;
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
