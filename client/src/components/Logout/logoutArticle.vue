<template>
  <article id="logout-container">
    <geo-header :currentUser="currentUser" :loggedIn="loggedIn"></geo-header>
    <p>Current User: {{ currentUser.username }}</p>
    <button v-on:click.prevent="handleLogout">Logout</button>
  </article>
</template>

<script>
import geoHeader from '../Header/header';
import {eventBus} from '@/main.js';

export default {
  name: 'logoutArticle',
  props: ['currentUser', 'loggedIn'],
  components: {
    'geo-header': geoHeader
  },
  methods: {
    handleLogout () {
      eventBus.$emit('logout-requested')
    }
  }
}
</script>

<style scoped>

#logout-container {
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 95vh;
}

</style>
