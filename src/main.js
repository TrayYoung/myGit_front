// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import EmpMain from '@/components/EmpMain'
import router from './router'
/*import router1 from './router'*/

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './vuex/store';
import axios from 'axios'
axios.defaults.baseURL='http://localhost:8080/'
Vue.prototype.axios = axios
/*import { Select, Option} from 'element-ui'


Vue.use(Select)
Vue.use(Option)*/

Vue.use(ElementUI);
Vue.config.productionTip = false;

/* eslint-disable no-new *//**/
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store,
});
/*new Vue({
  el: '#mainDisplay',
  router,
  components: { EmpMain },
  template: '<EmpMain/>',
  store,
});*/
