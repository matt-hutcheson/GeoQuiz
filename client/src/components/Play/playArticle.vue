<template>
	<article>
		<choose-user v-if="!currentUser" :currentUser="currentUser" :allUsers="allUsers" :countries='countries'></choose-user>
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

</style>
