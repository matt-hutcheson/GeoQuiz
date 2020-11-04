<template>
<section>
   <h2>Have you played before?</h2>
        <button id="played-before-button" v-on:click="selectIsHidden = !selectIsHidden && (newUserFormIsHidden)">Yes: I've played before!</button>
        <button id="new-user-button" v-on:click="newUserFormIsHidden = !newUserFormIsHidden && (selectIsHidden)">No: create username!</button>
        <user-select v-if="!selectIsHidden" :currentUser="currentUser" :allUsers="allUsers"></user-select>
        <user-form v-if="!newUserFormIsHidden" :countries='countries'></user-form>
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
        selectIsHidden: true,
        newUserFormIsHidden: true
        }
    }
}
</script>

<style scoped>

button {
    width: 10em;
    margin: 20px 25px 0 40px;
    border-radius: 5px;
    text-align: center;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
    outline: none;
    padding: 8px 10px;
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