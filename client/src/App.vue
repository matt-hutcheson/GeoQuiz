<template>
  <main id='main-container'>
    <h1>GeoQuiz</h1>
    <p v-if="currentUser && currentMode==='play'">User: {{ currentUser.username }}</p>
    <button v-if="currentUser && currentMode==='play'" v-on:click.prevent="changeUser()">Change User</button>
    <geo-nav :currentMode= currentMode></geo-nav>
    <article>
        <instructions v-if="currentMode==='intructions'"></instructions>
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

#main-container {

}


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
    padding: 15px;
}


</style>
