<template>
    <section>
        <form v-on:submit.prevent='handleSubmit'>
            <title>Create new user</title>
            <label for='username'>Username: </label>
            <input v-model='userName' name='username' id='username' type='text' placeholder='Enter username' required></input>
            <input type='submit' name='submit' value='Add'/>
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
            newUser: null,
            userName: "",
            currentUser: null,
        }
    },
    methods: {
        handleSubmit() {
            this.createUser()
            eventBus.$emit('add-user', this.currentUser);
            this.userName='';
        },
        createUser() {
            const newUser = {
                username: this.userName
            }
            this.currentUser = newUser
            // add user to database
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

section {
    font-family: Tahoma, Verdana;
    font-size: 1.1em;
}

input {
  padding: 8px;
  margin:30px 5px;
  border-radius: 3%;
}

input[type='submit'] {
    padding: 8px 10px;
    margin:5px px;
    border-radius: 5%;
    border: solid 2px;
    width: 20vh;
}

input[type='submit']:hover {
    background-color: black;
    color: white;

}

</style>
