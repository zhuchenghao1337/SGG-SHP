// 使用vuex
import Vue from "vue";
import Vuex from 'vuex';

// 使用
Vue.use(Vuex);

// 引入小仓库
import home from '@/store/home'
import search from '@/store/search'
import detail from '@/store/detail'
import shopcart from '@/store/shopcart'
import user from '@/store/user'
import trade from '@/store/trade'
// 对外暴露实例
export default new Vuex.Store({
    modules:{
        home,
        search,
        detail,
        shopcart,
        user,
        trade,
    }
})