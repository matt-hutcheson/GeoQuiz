<template>
  <section id="account-details-container" v-if="currentUser">
    <h3>Account Details:</h3>
    <p id="username" v-if="!usernameEdit">Username: {{ currentUser.username }}</p>
    <form v-if="usernameEdit">
      <label for="username">Username: </label>
      <input type="text" :placeholder="username" v-model="username">
      <input class="submit-button" v-on:click.prevent="handleEditUsername" type="submit" value="Update">
    </form>
    <p id="score">Score: {{ score }} out of 248</p>
    <button id="button-username" v-on:click.prevent="handleUsername">Change Username</button>
    <button id="button-password">Change Password</button>
    <button id="button-reset" v-on:click.prevent="handleResetClicked">Reset Game Results</button>
    <button id="button-delete">Delete Account</button>
  </section>
</template>

<script>
import { eventBus} from '@/main';
import UserService from '@/services/UserService';
import User from '../../assets/user';
import swal from 'sweetalert2';

export default {
  name: 'meDetails',
  props: ['currentUser', 'score'],
  data() {
    return {
      username: "",
      password: "",
      usernameEdit: false,
      passwordEdit: false
    }
  },
  mounted() {
    if (this.currentUser){
      this.username = this.currentUser.username
    }
  },
  methods: {
    handleUsername() {
      this.usernameEdit = true;
    },
    handleEditUsername(){
        const updatedUser = {
          username: this.username,
          password: "",
          results: this.currentUser.results,
          _id: this.currentUser._id
        }
        UserService.updateUser(updatedUser, localStorage.getItem('jwt'))
        .then(res => {
          if (res.status === 200){
            this.username = res.username;
            eventBus.$emit('username-updated', this.username);
            this.usernameEdit = false;
            swal.fire({
              icon:'success',
              title:'Success',
              text: 'Username Updated Successfully'
            })
          } else if (res.status === 409){
            swal.fire({
              icon:'error',
              title: "Error",
              text: 'Username already taken'
            })
          } else {
            console.log("Update failed. Bad request")
          }
        })
        .catch( err => {
          console.log("Update failed. Server error.")
          console.log(err)
        })
    },
    handleResetClicked() {
      swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, reset my scores!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.handleReset();
          swal.fire(
            'Scores reset!',
            'Your scores have been reset.',
            'success'
          )
        }
      })
    },
    handleReset() {
      const blankResults = {}
      for (const key in this.currentUser.results) {
        blankResults[key] = {
          flagGame: "false",
          allGame: "false",
          capitalGame: "false"
        }
      }
      const updatedUser = {
        username: this.currentUser.username,
        _id: this.currentUser._id,
        results: blankResults
      }
      UserService.updateUserResults(updatedUser, localStorage.getItem("jwt"))
      .then( res => {
        if (res.status === 200){
          eventBus.$emit('user-reset', res.results)
          swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Results successfully reset'
          })
        } else {
          swal.fire({
            icon: 'error',
            title: 'error',
            text: 'Reset failed'
          })
        }
      }).catch( err => {
        swal.fire({
          icon: 'error',
          title: 'error',
          text: 'Server error'
        })
      })
    }
  }
}
</script>

<style scoped>

#account-details-container {
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
}

button, .submit-button {
    font-size: 15px;
    width: 10em;
    border-radius: 5px;
    text-align: center;
    outline: none;
    padding: 8px 10px;
    margin-top: 1em;
    background-color: #ffd30d;
    border: #ebb810 solid 2px;
}

#button-reset {
  background-color: orange;
}

#button-delete {
  background-color: red;
}

button:hover, #button-delete:hover, #button-reset:hover, .submit-button:hover {
    background-color: #0a0a09;
    color: aliceblue;
    border: #ffdb12 solid 2px;
    cursor: pointer;
}

</style>
