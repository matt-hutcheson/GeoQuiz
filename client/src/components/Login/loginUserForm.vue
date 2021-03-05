<template>
    <section>
        <h3>Login:</h3>
        <form v-on:submit.prevent='handleSubmit' id="login-form">
            <label id="label-username" for='username'>Username: </label>
            <input v-model='login.username' name='username' id='username' type='text' placeholder='Enter username' required>
            <label for="password">Password: </label>
            <input v-model='login.password' name='password' id='password' type='password' placeholder="Password" required>
            <input type='submit' name='submit' value='Login' id="login-button"/>
        </form>
        <p>Don't have an account? <router-link to="/register">Register here</router-link></p>
    </section>
</template>

<script>
import { eventBus } from '@/main';
import UserService from '../../services/UserService';
import swal from 'sweetalert2';

export default {
    name: 'login-user-form',
    data () {
        return {
            login: {
                username: "",
                password: "",
            }
        }
    },
    methods: {
        handleSubmit() {
            UserService.loginUser(this.login)
            .then((response) => {
                if (response.status===202) {
                    // localStorage.setItem("jwt", response.data.token);
                    eventBus.$emit("user-loggedin", response.user)
                    console.log(response.user)
                    swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Login successful',
                    }).then( (result) => {
                        this.clearForm();
                    } )
                } else if (response.status===401){
                    swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Login failed. Please check your username and password are correct.'
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

        clearForm() {
            this.username = "";
            this.password = "";
            this.$router.push("/");
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
    margin-block-start: 2em;
    /* height: 60%; */
}

#login-form {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    border: solid 1px black;
    border-radius: 5px;
}

input {
  padding: 8px;
  margin:30px;
  border-radius: 3%;
}

#login-button {
    padding: 8px 10px;
    margin:5px px;
    border-radius: 5%;
    border: solid 2px;
    width: 8em;
}

#login-button:hover {
    background-color: black;
    color: white;
}

#label-username {
    padding-top: 1em;
}

</style>
