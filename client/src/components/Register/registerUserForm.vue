<template>
    <section>
        <form v-on:submit.prevent='handleSubmit' id="register-form">
            <title>Create new user</title>
            <label for='username'>Username: </label>
            <input v-model='userName' name='username' id='username' type='text' placeholder='Enter username' required>
            <label for="password">Password: </label>
            <input v-model='password' name='password' id='password' type='password' placeholder="Password" required>
            <input type='submit' name='submit' value='Register' id="register-button"/>
        </form>
        <p>Already have an account? <router-link to="/login">Login here</router-link></p>
    </section>
</template>

<script>
import User from '../../assets/user';
import { eventBus } from '@/main';
import UserService from '../../services/UserService';
import swal from 'sweetalert2';

export default {
    name: 'user-form',
    props: ['countries'],
    data () {
        return {
            userName: "",
            password: "",
            currentUser: null,
            status: null
        }
    },
    methods: {
        handleSubmit() {
            this.createUser()
            // eventBus.$emit('add-user', this.currentUser);
            UserService.addUser(this.currentUser)
            .then((response) => {
                if (response.status===201) {
                    // localStorage.setItem("jwt", response.data.token);
                    swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Registration successful',
                    }).then( (result) => {
                        this.clearForm();
                    } )
                } else if (response.status===409){
                    swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Registration failed. Username is already in use. Please pick another username'
                    })
                }
            })
            .catch(function (error) {
                swal.fire({
                    icon:'error',
                    title: 'Error',
                    text: 'Internal server error'
                })
            })
        },
        createUser() {
            const newUser = new User(this.userName, this.password, this.countries)
            this.currentUser = newUser
        },

        clearForm() {
            this.userName = "";
            this.password = "";
            this.$router.push("/login");
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
    display: flex;
    flex-flow: column nowrap;
    height: 60%;
}

#register-form {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
}

input {
  padding: 8px;
  margin:30px;
  border-radius: 3%;
}

#register-button {
    padding: 8px 10px;
    margin:5px px;
    border-radius: 5%;
    border: solid 2px;
    width: 8em;
}

#register-button:hover {
    background-color: black;
    color: white;
}

</style>
