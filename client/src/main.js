import Vue from 'vue'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTimesCircle, faCheckCircle)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
export const eventBus = new Vue()

new Vue({
  render: h => h(App),
}).$mount('#app')


