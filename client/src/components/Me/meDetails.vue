<template>
  <section>
    <h3>Account Details:</h3>
    <p>Username: {{ currentUser.username }}</p>
    <button>Change Username</button>
    <button>Change Password</button>
    <button>Reset Game Results</button>
  </section>
</template>

<script>
export default {
  name: 'meDetails',
  props: ['currentUser']
}
</script>

<style scoped>

</style>
