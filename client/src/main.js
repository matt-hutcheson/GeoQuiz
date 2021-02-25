import Vue from 'vue';
import App from './App.vue';
import Learn from './components/Learn/learnArticle.vue';
import Home from './components/Home/home.vue'
import Play from './components/Play/playArticle.vue';
// import Instructions from './components/Instructions';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlay, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faTimesCircle, faCheckCircle);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;
export const eventBus = new Vue();

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      props: true
    },
    {
      path: '/learn',
      name: 'Learn',
      component: Learn,
      props: true
    },
    {
      path: '/play',
      name: 'Play',
      component: Play,
      props: true
    }
  ]
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


