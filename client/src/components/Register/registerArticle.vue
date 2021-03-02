<template>
  <article id="register-container">
    <geo-header></geo-header>
    <register-user-form :countries="countries"></register-user-form>
  </article>
</template>

<script>
import geoHeader from '../Header/header.vue';
import registerUserForm from './registerUserForm.vue';

export default {
  name: 'registerArticle',
  props: ['countries'],
  components: {
    'geo-header': geoHeader,
    'register-user-form': registerUserForm
  }

}
</script>

<style scoped>

#register-container {
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 95vh;
}

</style>
