<template>
  <section>
      <p>Select from current users</p>
      <select name="username" id="username" v-model="selectedUser" v-on:change="handleSelect">
          <option v-for="(user, index) in allUsers" :key="index" :value="user">{{ user.username }}</option>
      </select>
  </section>
</template>

<script>
import { eventBus } from '../../main.js'

export default {
    name: 'user-select',
    props: ['currentUser', 'allUsers'],
    data() {
        return {
            selectedUser: ""
        }
    },
    methods: {
        handleSelect() {
            eventBus.$emit('user-selected', this.selectedUser)
        }
    }

}
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Grandstander&display=swap');

section {
    font-family: 'Grandstander', cursive;
    font-size: 1.1em;
}

select {
  display: block;
  padding: 0 1em 0 0;
  margin: 0;
  width: 15%;
}

</style>
