<template>
  <div>
      <p>Select from current users</p>
      <select name="username" id="username" v-model="allUsers">
          <option v-for="(user, index) in allUsers" :key="index">{{ user.username }}</option>
      </select>


  </div>
</template>

<script>
export default {
    name: 'user-select',
    props: ['currentUser', 'allUsers']

}
</script>

<style>

</style>