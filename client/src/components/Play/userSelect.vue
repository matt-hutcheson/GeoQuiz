<template>
  <section>
      <select name="username" id="username" v-model="selectedUser" v-on:change="handleSelect">
          <option value="" disabled selected>--Select User--</option>
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

* {
    font-family: Tahoma, Verdana;
    font-size: 20px;
}


select {
  padding: 0 1em 0 0;
  margin: 40px;
  width: 15em;
  text-align: center;
}

</style>
