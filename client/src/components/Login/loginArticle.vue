<template>
  <article id="login-container">
    <geo-header :loggedIn="loggedIn" :currentUser="currentUser"></geo-header>
    <login-user-form></login-user-form>
  </article>
</template>

<script>
import geoHeader from '../Header/header';
import loginUserForm from './loginUserForm';
import LoginUserForm from './loginUserForm.vue';

export default {
  name: 'loginArticle',
  props: ['currentUser', 'loggedIn'],
  components: {
    'geo-header': geoHeader,
    'login-user-form': loginUserForm
  }
}
</script>

<style scoped>

#login-container {
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 95vh;
}

</style>
