import Vue from 'vue'
import App from './App.vue'

// 三级联动组件 --全局组件
import TypeNav from '@/components/TypeNav'
Vue.component(TypeNav.name, TypeNav)
import Carsousel from '@/components/Carousel'
Vue.component(Carsousel.name, Carsousel)
Vue.config.productionTip = false

// 分页器 全局组件
import Pagination from '@/components/Pagination'
Vue.component(Pagination.name, Pagination);
// 引入路由
import router from '@/router/index'
// 引入仓库
import store from '@/store'
// 引入mock
import '@/mock/mockServe'
// 引入swiper样式
import 'swiper/css/swiper.css'



import { MessageBox } from 'element-ui';
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;



// 统一接收api函数
import * as API from '@/api'

// 引入图片
// import atm from '@/assets/1.gif'
const loadimage = require('@/assets/1.gif')
Vue.use(VueLazyload, {
  preLoad: 1.3,
  // 默认图片
  loading: loadimage,
  attempt: 1
})

// 引入校验插件
import "@/plugins/validate"

import VueLazyload from 'vue-lazyload'
new Vue({
  render: h => h(App),
  // 注册路由
  router,
  // 注册仓库
  store,
  // 全局事件总线$bus配置
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
}).$mount('#app')
