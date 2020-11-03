<template>

    <div>
        <h1>You are in the user form</h1>
  
        <form v-on:submit.prevent='handleSubmit'>
            <title>Create new user</title>
            <label for='username'>Username:</label>
            <input v-model='username' name='username' id='username' type='text' placeholder='Type your username here' required></input>
            <input type='submit' name='submit' value='Add Username'/>
        </form>  
    </div> 
</template>

<script>
export default {
    name: 'user-form',
    data () {
        return {
            username: ''
        }
    },
    methods: {
        handleSubmit() {
            
        }
    }
}

</script>


<style>

</style>