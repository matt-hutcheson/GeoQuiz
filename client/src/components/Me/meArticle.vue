<template>
  <article id="me-container">
    <geo-header :loggedIn="loggedIn" :currentUser="currentUser"></geo-header>
    <me-details :currentUser="currentUser" :score="countriesCorrect.length"></me-details>
  </article>
</template>

<script>
import geoHeader from '../Header/header';
import meDetails from './meDetails';

export default {
  name: 'meArticle',
  props: ['currentUser', 'loggedIn', 'countriesCorrect'],
  components: {
    'geo-header': geoHeader,
    'me-details': meDetails
  }
}
</script>

<style scoped>

#me-container {
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 95vh;
}

</style>
