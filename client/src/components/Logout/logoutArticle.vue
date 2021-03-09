<template>
  <article id="logout-container">
    <geo-header :currentUser="currentUser" :loggedIn="loggedIn"></geo-header>
    <p>Current User: {{ currentUser.username }}</p>
  </article>
</template>

<script>
import geoHeader from '../Header/header';

export default {
  name: 'logoutArticle',
  props: ['currentUser', 'loggedIn'],
  components: {
    'geo-header': geoHeader
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
