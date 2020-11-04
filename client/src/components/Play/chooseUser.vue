<template>
<section>
   <h2>Have you played before?</h2>
        <button id="played-before-button" v-on:click="selectIsHidden = !selectIsHidden && newUserFormIsHidden">Yes: I've played before!</button>
        <button id="new-user-button" v-on:click="newUserFormIsHidden = !newUserFormIsHidden && selectIsHidden">No: create username!</button>
        <user-select v-if="!selectIsHidden" :currentUser="currentUser" :allUsers="allUsers"></user-select>
        <user-form v-if="!newUserFormIsHidden" :countries='countries'></user-form>
</section>
</template>

<script>
import userForm from './userForm';
import userSelect from './userSelect';

export default {
    name: 'choose-user',
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

</style>