<template>
<section>
   <h2>Have you played before?</h2>
        <button id="played-before-button" v-on:click="changeNewUserFormIsHidden">Yes: I've played before!</button>
        <button id="new-user-button" v-on:click="changeNewUserFormIsHidden">No: create username!</button>
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
        changeNewUserFormIsHidden () {
            if (this.newUserFormIsHidden) {
                this.newUserFormIsHidden = false
            } else {
                this.newUserFormIsHidden = true
            }
        }
    }
}
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Grandstander&display=swap');

section {
    font-family: 'Grandstander', cursive;
}


button {
    width: 10em;
    margin: 20px 25px 0 40px;
    border-radius: 5px;
    text-align: center;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
    outline: none;
    padding: 8px 10px;
    font-family: 'Grandstander', cursive;
     font-size: 1.5em;
}

#played-before-button {

    background-color: #19E657;
    border: #16cf4e solid 2px;
}

#new-user-button {

    background-color: #E97EF1;
    border: #E463EE solid 2px;
}

</style>
