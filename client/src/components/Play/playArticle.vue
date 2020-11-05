<template>
    <section>
        <div >
            <button class="button-instructions" v-if="currentUser" v-on:click='handleClick("intructions")'>Instructions</button>
        </div>
        <choose-user v-if="!currentUser" :currentUser="currentUser" :allUsers="allUsers"></choose-user>
        <!-- <select v-if="countriesRemaining" @change="checkAnswer()" name="flagCountry" id="" v-model="countryListSelected">
            <option selected disabled :value="null">--Select A Country--</option>
            <option v-for="(country, alpha3Code) in countriesRemaining" :key="alpha3Code" :value="country">{{ country.name }}</option>
        </select> -->
        <play-map v-if="currentUser" :currentUser="currentUser" :countries="countries" :correctCountry="randomCountry" :correctAnswers="countriesCorrect" :countriesRemaining="countriesRemaining" :randomCountry="randomCountry" :result="result"></play-map>
        <list-countries v-if="currentUser" :countriesCorrect="countriesCorrect" ></list-countries>
    </section>
</template>

<script>
import playMap from './playMap';
import { eventBus } from '@/main.js';
import User from '../../assets/user';
import UserService from '../../services/UserService';
import instructions from './instructions'
import listCountries from './listCountries'
import chooseUser from './chooseUser'

export default {
    name: 'playArticle',
    props: ['currentMode', 'countries', 'allUsers'],
    components: {
        'play-map': playMap,
        'instructions' : instructions,
        'list-countries': listCountries,
        'choose-user': chooseUser
    },
    data () {
        return {
        randomCountry: null,
        countriesRemaining: [],
        countriesCorrect: [],
        countryListSelected: null,
        result: null,
        currentUser: null,
        username: ""
        }
    },
    methods: {
        getRandomCountry (array) {
            this.randomCountry = array[Math.floor(Math.random() * array.length)]
            this.result = null
            },

        checkAnswer () {
            if (this.randomCountry.alpha3Code === this.countryListSelected.alpha3Code) {
                this.countriesCorrect = [...this.countriesCorrect, this.countryListSelected]
                const index = this.countriesRemaining.indexOf(this.countryListSelected)
                this.countriesRemaining.splice(index, 1)
                this.result = "correct"
                this.currentUser[this.randomCountry.alpha3Code]["flagGame"] = true
                UserService.updateUser(this.currentUser)
                .then((updatedUser) => eventBus.$emit('country-correct', updatedUser))
                // this.getRandomCountry(this.countriesRemaining)
                this.countryListSelected = null
            } else {this.result = "incorrect"}
        },

        setCorrectCountries () {
            for (const country of this.countries) {
                if (this.currentUser[country.alpha3Code]["flagGame"] === "true") {
                    const index = this.countriesRemaining.indexOf(country)
                    if (index > -1) {
                        this.countriesCorrect.push(this.countriesRemaining.splice(index, 1)[0])
                    }
                }
            }
        },
        handleClick: function(change) {
            eventBus.$emit('mode-changed', change);
        }
    },
    mounted() {
        this.countriesRemaining = this.countries.slice()
        this.getRandomCountry(this.countriesRemaining)

        eventBus.$on('map-country-selected', (alpha2Code) => {
            const selectedCountry = this.countries.find(country => country.alpha2Code.toLowerCase() === alpha2Code)
            this.countryListSelected = selectedCountry
            if (this.result != 'correct') {
                this.checkAnswer();
            }
        });

        eventBus.$on('add-user', (user) => {
            UserService.addUser(user)
            .then(userWithId => this.currentUser = userWithId)
        });

        eventBus.$on('user-selected', (user) => {
            this.currentUser = user;
            this.countriesCorrect = [];
            this.countriesRemaining = this.countries.slice()
            this.setCorrectCountries();
        });

        eventBus.$on('change-flag-pressed', (array) => {
            this.getRandomCountry(this.countriesRemaining)
        });

        eventBus.$on('request-user-change', (previousUser) => {
            this.currentUser = null
        })

    }
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
