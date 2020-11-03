<template>

    <div>
        <h1>You are in the user form</h1>
  <!-- list of username is not just name but object with username -->
        <form v-on:submit.prevent='handleSubmit'>
            <title>Create new user</title>
            <label for='username'>Username:</label>
            <input v-model='username' name='username' id='username' type='text' placeholder='Type your username here' required></input>
            <input type='submit' name='submit' value='Add Username'/>
        </form>  
    </div> 
</template>

<script>
import User from '../../assets/user';
import { eventBus } from '@/main'

export default {
    name: 'user-form',
    props: ['countries'],
    data () {
        return {
            currentUser: null,
            username: "",
            allUsers: null
        }
    },
    methods: {
        handleSubmit() {
            this.createUser()
            eventBus.$emit('add-user', this.currentUser);
            this.username='';
        },
        createUser() {
            const newUser = new User(this.username, this.countries)
            this.currentUser = newUser
            console.log(newUser)
            // add user to database
        }
    }
}

</script>


<style>

</style>