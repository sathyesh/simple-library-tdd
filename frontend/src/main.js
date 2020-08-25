import Vue from 'vue';
import App from './App.vue';

// CSS import
import '@/assets/scss/main.scss';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
