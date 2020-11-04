<template>
    <section>
        <form v-on:submit.prevent='handleSubmit'>
            <title>Create new user</title>
            <label for='username'>Username: </label>
            <input v-model='username' name='username' id='username' type='text' placeholder='Enter username' required></input>
            <input type='submit' name='submit' value='Add Username'/>
        </form>
    </section>
</template>

<script>
import User from '../../assets/user';
import { eventBus } from '@/main'

export default {
    name: 'user-form',
    props: ['countries'],
    data () {
        return {
            username: "",
            currentUser: null,
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
            // add user to database
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

input {
  padding: 10px;
  margin:10px 5px;
  border-radius: 3%;
}

input[type='submit'] {
    padding: 10px;
    margin:10px 5px;
    border-radius: 3%;
    background-color: #19E657;
    border: #16cf4e solid 2px;
}


</style>
