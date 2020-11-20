import Vue from 'vue'
import App from './App.vue'
import './assets/scss/style.scss'
import router from './router'
Vue.config.productionTip = false
import VueAwesomeSwiper from 'vue-awesome-swiper'
// import 'swiper/swiper-bundle.css'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)
import Card from './components/Card.vue';
Vue.component("m-card", Card);
import ListCard from './components/ListCard.vue';
Vue.component("m-list-card", ListCard);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
