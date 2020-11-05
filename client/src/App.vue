<template>
  <main id='main-container'>
      <h1>GeoQuiz</h1>  
    <geo-nav :currentMode= currentMode></geo-nav>
    <article>
      <div id="user-instructions-container"> 
        <div id="current-user">
          <p v-if="currentUser && currentMode==='play'">Player: {{ currentUser.username }}</p>
          <button id="change-user-button" v-if="currentUser && currentMode==='play'" v-on:click.prevent="changeUser()">Change player</button>
        </div>
        <instructions v-if="currentMode==='intructions'"></instructions>
      </div> 
        <play-article v-if="currentMode==='play'" :allUsers="allUsers" :countries="countries"></play-article>
        <learn-article v-if="currentMode==='learn'" :countries="countries"></learn-article>
    </article>
  </main>
</template>

<script>
import geoNav from './components/geoNav';
import learnArticle from './components/Learn/learnArticle';
import playArticle from './components/Play/playArticle';
import { eventBus } from './main';
import UserService from '../../client/src/services/UserService';
import User from './assets/user';
import Intructions from "./components/Play/instructions"

export default {
  name: 'App',
    data(){
        return{
          currentMode: null,
          countries: [],
          allUsers: [],
          currentUser: null
        }
    },

    mounted(){
        fetch('https://restcountries.eu/rest/v2/all') //API
          .then(res => res.json())
          .then((countries) => (this.countries = countries));

        this.fetchUsers();

        eventBus.$on('mode-changed', (change) => {
          this.currentMode = change;
          this.currentUser = null
        }),

        eventBus.$on('add-user', (user) => {
          UserService.addUser(user)
          .then(userWithId => this.allUsers.push(userWithId))
          this.currentUser = user;
        });

        eventBus.$on('country-correct', (currentUser) => {
          this.fetchUsers();
        });

        eventBus.$on('user-selected', (selectedUser) => {
          this.currentUser = selectedUser
        })
    },

    methods: {
      fetchUsers() {
        UserService.getUsers()
        .then((users) => this.allUsers = users)
      },

      changeUser() {
        eventBus.$emit('request-user-change', this.currentUser)
        this.currentUser = null
      }
    },

    components: {
      'geo-nav': geoNav,
      'play-article': playArticle,
      'learn-article': learnArticle,
      'instructions': Intructions
    }
  }
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fredericka+the+Great&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Grandstander:ital,wght@0,400;1,300&display=swap');

* {
  font-family: Tahoma, Verdana;
  font-size: 20px;
  margin: 0;
}


h1 {
    font-family: 'Fredericka the Great', cursive;
    font-size: 60px;
    text-align: center;
    padding: 10px;
}

/* #user-instructions-container {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
} */

#current-user {
  display: flex;
  flex-flow: row;
  margin: 20px 25px 0 80px;
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
</style>
