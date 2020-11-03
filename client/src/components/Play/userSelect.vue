<template>
  <div>
      <p>Select from current users</p>
      <select name="username" id="username" v-model="selectedUser" v-on:change="handleSelect">
          <option v-for="(user, index) in allUsers" :key="index">{{ user.username }}</option>
      </select>


  </div>
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

<style>

</style>