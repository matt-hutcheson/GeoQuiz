<template>
<section id='centered'>
   <p>Have you played before?</p>
        <button id="played-before-button" v-on:click="changeNewUserFormIsHidden(true)">Yes</button>
        <button id="new-user-button" v-on:click="changeNewUserFormIsHidden(false)">No</button>
        <user-select v-if="newUserFormIsHidden === true" :currentUser="currentUser" :allUsers="allUsers"></user-select>
        <user-form v-if="newUserFormIsHidden === false" :currentUser="currentUser" :countries='countries'></user-form>
    <div>
        <p v-if="currentUser" id="display-user">Current user: {{ currentUser.username }}</p>
    </div>
</section>
</template>

<script>
import userForm from './userForm';
import userSelect from './userSelect';

export default {
    name: 'choose-user',
    props: ['currentUser', 'allUsers', 'countries'],
    components: {
        'user-form': userForm,
        'user-select': userSelect
    },
    data() {
        return {
            newUserFormIsHidden: null
        }
    },
    methods: {
        changeNewUserFormIsHidden (result) {
            this.newUserFormIsHidden = result
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
}

#centered {
    text-align: center;
}

button {
    width: 10em;
    margin: 20px 25px 0 40px;
    border-radius: 5px;
    text-align: center;
    outline: none;
    padding: 8px 10px;
    font-family: Tahoma, Verdana;
    font-size: 1em;

}

#played-before-button {

    background-color: yellow;
    border: solid 2px;
}

#played-before-button:hover, #new-user-button:hover {
    background-color: rgb(242,188,236);
}

#new-user-button {

    background-color:  #34e734;
    border: solid 2px;
}

</style>
