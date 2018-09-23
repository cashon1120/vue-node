// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import Axios from 'axios'
import Vuex from 'Vuex'
import {
  currency
} from './until/currency'
Vue.use(Vuex)
Vue.prototype.Axios = Axios
Vue.filter('currency', currency);
Vue.use(infiniteScroll)
Vue.config.productionTip = true
Vue.use(VueLazyLoad, {
  loading: '/static/loading/loading-spin.svg'
})
const store = new Vuex.Store({
  state: {
    userName: '',
    cartCount: 0
  },
  mutations: {
    updateUserName(state, userName) {
      state.userName = userName
    },
    updateCartCount(state, count) {
      state.cartCount += parseInt(count)
    },
    initCartCount(state, count) {
      state.cartCount = count
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: {
    App
  },
  template: '<App/>'
})
