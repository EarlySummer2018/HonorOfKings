import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'

import './style.css'
// 引入数据请求模块
import http from './http'

Vue.mixin({
  computed: {
    uploadUrl() {
      return this.$http.defaults.baseURL+'/upload'
    }
  },
  methods: {
    getAuthHeaders() {
      return {
        Authorization: `Bearer ${localStorage.token||''}`
      }
    }
  }
})

Vue.config.productionTip = false

// 把数据请求绑定到 Vue 原型上
Vue.prototype.$http = http
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')