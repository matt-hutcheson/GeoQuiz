<template>
  <nav class="nav-container">
    <ul class="links-container">
      <router-link to="/">
        <li class="nav-link">
          Home
        </li>
      </router-link>
      <router-link to="/login">
        <li class="nav-link">
          Login
        </li>
      </router-link>
      <router-link to="/register">
        <li class="nav-link">
          Register
        </li>
      </router-link>
      <router-link to="/">
        <li class="logo">
          GeoQuiz
        </li>
      </router-link>
      <router-link to="/learn">
        <li class="nav-link">
          Learn
        </li>
      </router-link>
      <router-link to="/play">
        <li class="nav-link">
          Play
        </li>
      </router-link>
      <router-link to="/instructions">
        <li class="nav-link">
          Instructions
        </li>
      </router-link>
    </ul>
  </nav>
</template>

<script>
import { eventBus } from '../../main'

export default {
  name: 'geoNav',
  // props: ['currentUser'],

  // methods: {

  // },
  // data() {

  // }
}
</script>

<style scoped>

.nav-container {
  width: 100%;
  height: 100%;
}

.links-container {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  list-style-type: none;
  width: 100%;
  padding-inline-start: 0;
}

.nav-link {
  padding: 0.25em;
  font-family: 'Fredericka the Great', cursive;
  color: #3E4348;
}

ul > a {
  text-decoration: none;
}

.logo {
  font-family: 'Fredericka the Great', cursive;
  font-size: 60px;
  padding: 10px;
  color: #AF4034;
  }

.logo:hover {
    cursor: pointer;
  }

</style>


