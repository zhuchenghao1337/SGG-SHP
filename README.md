# 1.项目配置

## 1.1eslint校验功能关闭

```
vue.config.js中

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false // 关闭eslint校验
})
```

## 1.2src文件夹配置别名@

```
jsconfig.json中

{
  "compilerOptions": {
    "target": "es5",
    "module": "esnext",
    "baseUrl": "./",
    "moduleResolution": "node",
    "paths": {
      "@/*": [
        "src/*" // src文件夹配置别名@
      ]
    },
    "lib": [
      "esnext",
      "dom",
      "dom.iterable",
      "scripthost"
    ]
  }
}
```

## 2.分析路由

分析哪些组件是路由组件 哪些组件是非路由组件

## 3.开发思路

1.书写静态页面 html+css

2.拆分组件

```
注意组件结构 + 组件样式 + 图片资源
```

3.获取服务器的数据动态展示

4.完成相应的动态业务处理逻辑

# 4.使用非路由组件的步骤

```
1.创建
2.引入
3.注册
4.使用
```

# 5.路由组件的使用

```

```

路由的跳转就两种形式：

声明式导航（router-link：务必要有to属性）
编程式导航 $router.push | replace
编程式导航更好用：因为可以书写自己的业务逻辑

# 6.meta路由元信息来控制组件的显示

```
    {
      path: '/home',
      component: Home,
      meta: {
        show: true
      }
    },
```

```
      <Footer v-show="$route.meta.show"></Footer>
```

# 7.路由传参

声明式导航（router-link：务必要有to属性）

```
携带动态参数
<router-link class="sui-btn btn-xlarge" :to="`/detail/${skuInfo.id}`">查看商品详情</router-link>
```

编程式导航 $router.push | replace



params参数：路径的一部分，需要占位

query参数：？k=v不需要占位

// 可以让parms参数和query参数通过props传递给路由组件

三种方式

```
            // 路由传参
            // 第一种 字符串形式
            this.$router.push("/search/" + this.keyword+"?keyword=" + this.keyword);
            // 第2种 模板字符串
            this.$router.push(`/search/${this.keyword}?keyword=${this.keyword}`)
            // 第3种 对象
            this.$router.push({
                name: "search", // 对象传参只能是name
                params: {
                    keyword: this.keyword
                },
                query: {
                    keyword: this.keyword
                }
            })
```

```
    {
      // path: '/search/:keyword',// params需要占位
      path: '/search',
      name: 'search', // 对象传参只能是name
      component: Search,
      meta: {
        show: true
      }
    },
```

注意点 parms参数可传可不传

```
    {
      // path: '/search/:keyword',
      path: '/search/:keyword?', //加问号
      name: 'search',
      component: Search,
      meta: {
        show: true
      }
    },
```

解决 parms传空值路径问题

```
                params: {
                    keyword: this.keyword||undefined
                },
```



# 8.路由传参的最终解决方案

```
    {
      path: '/search/:keyword?', // parms参数可传可不传 ?
      name: 'search', // 对象传参只能是name
      component: Search,
      meta: {
        show: true
      }
    },
```

```
            this.$router.push({
                name: "search", // 对象传参只能是name
                params: {
                    keyword: this.keyword || undefined // 解决 parms传空值路径问题
                },
                query: {
                    k: this.keyword
                }
            })
```

```
拿值
<template>
    <div>
        params:{{ $route.params.keyword }}
        <br>
        query:{{ $route.query.keyword }}
    </div>
</template>
```

# 9.重写push和replace方法

```
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Search from '@/views/Search'
import Login from '@/views/Login'
import Register from '@/views/Register'
Vue.use(VueRouter)


// 保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
// 重写push方法
VueRouter.prototype.push = function(location, resolve, reject) {
  if(resolve && reject){
    originPush.call(this, location, resolve, reject)
  }else{
    originPush.call(this,location,()=>{},()=>{})
  }
}
// 重写replace方法
VueRouter.prototype.replace = function(location, resolve, reject) {
  if(resolve && reject){
    originReplace.call(this, location, resolve, reject)
  }else{
    originReplace.call(this,location,()=>{},()=>{})
  }
}


export default new VueRouter({
  routes: [
    {
      path: '/home',
      component: Home,
      meta: {
        show: true
      }
    },
    {
      path: '/search/:keyword?', // parms参数可传可不传 ?
      name: 'search', // 对象传参只能是name
      component: Search,
      meta: {
        show: true
      }
    },
    {
      path: '/login',
      component: Login,
      meta: {
        show: false
      }
    },
    {
      path: '/register',
      component: Register,
      meta: {
        show: false
      }
    },
    // 重定向
    {
      path: '*',
      component: Home
    }
  ]
})

```

# 10.三级联动组件

全局组件 注册一次 全局使用

# 11.axious二次封装

为什么要封装二次？

请求拦截器，响应拦截器。

请求拦截器 设置请求头

响应拦截器 处理异常

```
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, // 关闭eslint校验
  devServer: {
    proxy: {
      '/api': {  // 匹配/api开头的路径
        target: 'http://gmall-h5-api.atguigu.cn',
        // pathRewrite: { '^/api': '' },
      },
    },
  },
})
```

# 12.nprogress进度条

安装

```
npm install nprogress
```

业务

发请求时出现 结束后消失

```
requests.js中

// 引入进度条
import nprogress from "nprogress";
// 引入进度条样式
import "nprogress/nprogress.css";



// 请求拦截器
requests.interceptors.request.use((config) => {
    // config配置对象 config有一个属性headers
    // 进度条开始动
    nprogress.start();
    console.log(config);
    return config;
});

requests.interceptors.response.use((res) => {
    // 进度条结束
    nprogress.done();
    return res.data;
}, (error) => {
    return Promise.reject(new Error("faile"))
});

```

# 13.vuex模块式开发

## 1.基本使用

```
// 使用vuex
import Vue from "vue";
import Vuex from 'vuex';

// 使用
Vue.use(Vuex);

const state = {
    count: 1,
};
// 更新state唯一手段
const mutations = {
    ADD(state){
        state.count++
    }
};
// 可以提交mutations 和处理异步
const actions = {
    add({commit}){
        commit("ADD")
    }

};
// 计算属性
const getters = {};

// 对外暴露实例
export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})
```

```
// 引入仓库
import store from '@/store'
new Vue({
  render: h => h(App),
  // 注册路由
  router,
  // 注册仓库
  store
}).$mount('#app')
```

```
  methods:{
    add(){
      this.$store.dispatch('add');
    }
  }
```

## 2.模块开发

小仓库

```
// 这是小仓库
const state = {
    count: 1,
};
const mutations = {
};
const actions = {

};
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters
}
```

大仓库

```
// 使用vuex
import Vue from "vue";
import Vuex from 'vuex';

// 使用
Vue.use(Vuex);

// 引入小仓库
import home from '@/store/home'
import search from '@/store/search'
// 对外暴露实例
export default new Vuex.Store({
    modules:{
        home,
        search
    }
})
```

使用

```
    mounted(){
        // 通知vuex发请求，获取数据，存储到仓库中
        this.$store.dispatch("categoryList");
    }
```

```
import { reqCategoryList } from "@/api";

const state = {
    categoryList:[]
};
const mutations = {
    CATEGORYLIST(state, categoryList){
        state.categoryList = categoryList
    }
};
const actions = {
    async categoryList({commit}) {
        // 通过api发请求
        let res = await reqCategoryList();
        if(res.code==200){
            commit("CATEGORYLIST",res.data)
        }
    }
};
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters
}
```

# 14.一级分类动态添加背景颜色

```
通过js来完成
动态加类名
:class
```

# 15.通过js来控制二三级菜单显示与隐藏

```
              <div class="item-list clearfix" :style="{display:currentIndex==index?'block':'none'}">
```

# 16.卡顿现象 ---防抖与节流

短时间大量触发时间，浏览器解析不过来。

防抖:就是回城,被打断就要重新来；快速触发，只会触发一次。
截流:就是技能CD,CD没好,你用不了技能

```
// 引入节流函数
import throttle from "lodash/throttle";

// 节流防止卡顿
changeIndex: throttle(function (index) {
  this.currentIndex = index;
}, 50),


```



# 17.路由跳转的逻辑

## 声明式跳转带上动态参数

```
<router-link :to="`/detail/${good.id}`"><img :src="good.defaultImg" /></router-link>
```

需求：

我现在在主页 我点一个链接 我需要跳转到另一个路由组件里面，并展示数据。

方法：

路由传参 再根据参数查数据并展示。



使用声明式跳转 不行 耗性能 回出现卡顿现象。



解决方案： 编程式导航加事件委派

问题：1.怎么判断是a标签触发点击时间

​			2.如何获取参数 

利用自定义属性

```
<a :data-categoryName="c1.categoryName">{{ c1.categoryName }}</a>

自定义属性:data-categoryName
```

2.如何获取参数 

利用自定义属性

```
:data-category1Id="c1.categoryId"
```

## 注意点1 自定义属性的对应

```
:data-category1Id="c1.categoryId"


怎么拿
let element = event.target;
let { categoryname, category1id, category2id, category3id } = element.dataset; // categoryname浏览器将N小写了

data-category1Id      ====>>>>  category1id   去除了驼峰命名法
```

## 注意点2   任务委派+自定义属性

```
我们使用了 任务委派 来实现跳转
就是 让定义事件在 父标签 上
父标签 会委派

需要自己去判断哪些 标签能触发
通过自定义属性来判断
```



## 整体代码

```
    // 进行路由跳转
    goSearch(event) {
      // 判断是不是 a标签触发的点击事件
      // a标签有我们自定义的属性
      // 使用event.dataset可以获取自定义属性
      let element = event.target;
      let { categoryname, category1id, category2id, category3id } = element.dataset; // categoryname浏览器将N小写了
      if (categoryname) { // 判断是不是 a标签触发的点击事件

        // 整理路由跳转的参数
        let location = {name:'search'};
        let query = {categoryName: categoryname};

        // 怎么判断是1级 2级 3级的a
        // 通过自定义属性
        if(category1id){
            query.category1Id = category1id;
        }else if(category2id){
            query.category2Id = category2id;
        }else{
            query.category3Id = category3id;
        }
        // 继续整理参数
        location.query = query;
        this.$router.push(location); // 跳转
      }
      
    },
```

```
<div class="sort">
          <div class="all-sort-list2" @click="goSearch">
            <div
              class="item"
              v-for="(c1, index) in categoryList"
              :key="c1.categoryId"
              :class="{ cur: currentIndex == index }"
            >
              <h3 @mouseenter="changeIndex(index)">
                <a
                  :data-categoryName="c1.categoryName"
                  :data-category1Id="c1.categoryId"
                  >{{ c1.categoryName }}</a
                >
              </h3>
              <div
                class="item-list clearfix"
                :style="{ display: currentIndex == index ? 'block' : 'none' }"
              >
                <div
                  class="subitem"
                  v-for="(c2, index) in c1.categoryChild"
                  :key="c2.categoryId"
                >
                  <dl class="fore">
                    <dt>
                      <a
                        :data-categoryName="c2.categoryName"
                        :data-category2Id="c2.categoryId"
                        >{{ c2.categoryName }}</a
                      >
                    </dt>
                    <dd>
                      <em
                        v-for="(c3, index) in c2.categoryChild"
                        :key="c3.categoryId"
                      >
                        <a
                          :data-categoryName="c3.categoryName"
                          :data-category3Id="c3.categoryId"
                          >{{ c3.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
```

## 总结

```
实现路由跳转

任务委派 + 自定义属性

```



# 18.mapState使用vuex的数据

```
// 使用vuex的数据
import { mapState } from "vuex";


  computed: {
    ...mapState({
      // 右侧需要一个函数，当使用这个计算属性时，右侧函数会执行一下
      // 注入一个state，就是大仓库的数据

      // categoryList:(state)=>{
      //     console.log(state);
      // }
      // 简化
      categoryList: (state) => state.home.categoryList,
    }),
  },
  
  
  
  v-for="(c1, index) in categoryList" // 直接用了
  
```

# 19.mock模拟数据

```
# 安装
npm install mockjs
```

```
使用步骤
1.创建mock文件夹
2.准备假数据
3.把mock需要的图片放到public文件夹中
4.写mockServe.js
5.main.js引入mockServe.js
```

```
import Mock from 'mockjs'

import banner from './banner.json'
import floor from './floor.json'

Mock.mock("/mock/banner", {code:200,data:banner});
Mock.mock("/mock/floor", {code:200,data:floor});
```

```
main.js中
import '@/mock/mockServe'
```

```
然后正常使用
```

# 20.轮播图swiper

安装

```
npm install swiper@5
```

```
1.引包和样式（css/js)
2.添加页面结构 html
3.new Swiper实例
```

1.引包和样式

```
引包
import Swiper from "swiper";
样式
import 'swiper/css/swiper.css'
```

2.页面结构

```
        <!--banner轮播-->
        <div class="swiper-container" id="mySwiper">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="(carousel, index) in bannerList"
              :key="carousel.id"
            >
              <!-- <img src="./images/banner1.jpg" /> -->
              <img :src="carousel.imgUrl" />
            </div>
          </div>
          <!-- 如果需要分页器 -->
          <div class="swiper-pagination"></div>

          <!-- 如果需要导航按钮 -->
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>
```

3.new Swiper实例

这里遇到的问题是
v-for 没遍历完导致 new Siper没套上 失效

一样要等数据加载完成后 才能new Siper

解决方案：

watch + nextTick

```
vue.nextTick()
当数据更新了，在dom中渲染后，自动执行该函数，
```

```
  watch: {
    // 监听bannerList的数据变化
    bannerList: {
      handler(newValue, oldValue) {
        
        
        
        ///    当数据更新了，在dom中渲染后，自动执行该函数，
        this.$nextTick(() => {
          var mySwiper = new Swiper(
            document.querySelector(".swiper-container"),
            {
              direction: "horizontal", // 垂直切换选项
              loop: true, // 循环模式选项

              // 如果需要分页器
              pagination: {
                el: ".swiper-pagination",
              },

              // 如果需要前进后退按钮
              navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              },

              // 如果需要滚动条
              scrollbar: {
                el: ".swiper-scrollbar",
              },
            }
          );
        });
      },
    },
  },
```

# 21.vue.nextTick()

```
当数据更新了，在dom中渲染后，自动执行该函数

经常 很多插件需要dom全部渲染完了 才能正常使用。
使用nextTick()和watch可以解决
```

# 22.常用步骤

1.写api

```
import mockRequests from './mockAjax'

export const reqFloorList =()=>{
    return mockRequests({
        url:"/floor",
        method: 'get'
    })
}


export const reqGoodsInfo=(skuId)=>{
    return requests({
        url:`/item/${skuId}`,
        method:'get',
    })
}



```

2.提交action

```
  mounted(){
    this.$store.dispatch("getFloorList");
  }
```

3.写action

```
import { reqFloorList } from "@/api";

const actions = {
    async getFloorList({commit}){
        let res = await reqFloorList();
        if(res.code == 200){
            commit("FLOORLIST",res.data);
        }
    },
};
```

4.写mutations和state

```
const state = {
    floorList:[],
};

const mutations = {
    FLOORLIST(state, floorList){
        state.floorList = floorList;
    }
};
```

5.使用数据

```
import {mapState} from 'vuex';


  computed:{
    ...mapState({
      floorList:(state)=>state.home.floorList,
    })
  },
```



# 23.v-for遍历自定义组件

与组件通信一起使用

```
    <!-- v-for 遍历组件并传值 -->
    :list="floor  传值
    
    <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor"></Floor>
```

# 24.父与子组件通信

```
父传
<!-- v-for 遍历组件并传值 -->
    <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor"></Floor>
```

```
子收
<script>
export default {
  props:['list'],
};
</script>
```

![](https://raw.githubusercontent.com/zhuchenghao1337/github-images/main/2022/20230107164726.png)

# 25.相同结构的组件封装为共用组件

```
开发时 一个组件在很多地方都使用 弄为全局组件
注册一次 全局使用
比如：轮播图 分页器等等。
```



```
<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(carousel, index) in list"
        :key="carousel.id"
      >
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "Carsousel",
  props: ["list"],
  watch: {
    list: {
      immediate: true, // 立即监听
      handler() {
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.cur, {
            direction: "horizontal", // 垂直切换选项
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },

            // 如果需要滚动条
            scrollbar: {
              el: ".swiper-scrollbar",
            },
          });
        });
      },
    },
  },
};
</script>

<style>
</style>
```

```
注册全局组件
import Carsousel from '@/components/Carousel'
Vue.component(Carsousel.name, Carsousel)
```

```
使用并传值
             <Carsousel :list="list.carouselList"></Carsousel>

```

# 26.开发步骤

```
1.写静态页面 + 静态组件拆分出来
2.发请求 api
3.vuex 三连
4.组件获取仓库数据 动态展示
```

# 27.mapGetters拿数据

```
const getters = {
    goodsList(state){
        // state是小仓库的
        // 如果没网 回出现undincd  返回[]来避免问题
        return state.searchList.goodsList || [];
    },
    trademarkList(state){
        return state.searchList.trademarkList || [];
    },
};
```

```
  import { mapGetters } from 'vuex'
  
      computed:{
      ...mapGetters(['goodsList'])
    },  
```

# 28.全局事件总线

main.js注册

```
new Vue({
  render: h => h(App),
  // 注册路由
  router,
  // 注册仓库
  store,
  // 全局事件总线$bus配置
  beforeCreate(){
    Vue.prototype.$bus = this;
  },
}).$mount('#app')
```

调用

```
      this.$bus.$emit("clear");
```

触发

```
  mounted(){
    this.$bus.$on("clear",()=>{
      this.keyword = "";
    })
  },
```

# 29.子与父通信

```
自定义事件
```

```
父组件中
给子组件绑定一个事件

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo"/>
      
      
   methods: {
    // 自定义事件回调
    trademarkInfo(trademark){
      console.log(trademark);
    },
  },       
```

```
子组件中
          <li v-for="(trademark,index) in trademarkList" :key="trademark.tmId" @click="tradeMatkHandler(trademark)">{{ trademark.tmName }}</li>


  methods:{
    tradeMatkHandler(trademark){
    
      // 触发回调
      this.$emit("trademarkInfo", trademark);
    },
  },

```

# 30.封装数据

```
需要 "2:苹果"

// 整理参数
this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;

需要 格式 ['a:b:c','b:b:b']

let props = `${attr.attrId}:${attrValue}:${attr.attrName}`
this.searchParams.props.push(props);

```

# 31.数组操作

去重

```

if (this.searchParams.props.indexOf(props) == -1){
        this.searchParams.props.push(props);
      }
```

删除

```
    removeAttr(index){
      this.searchParams.props.splice(index, 1);
      this.getData();
    },
```

遍历

```
    // 是否全选
    isAllChecked(){
      return this.cartInfoList.every(item => item.isChecked == 1);
    },
    
    totalPrice(){
      let sum = 0;
      this.cartInfoList.forEach(item =>{
        sum += item.skuNum * item.skuPrice;
      })
      return sum;
    },
    
```



# 32.分页器原理

```

```

# 33.路由滚动行为

```
export default new VueRouter({
  routes: routes,
  // 滚动行为
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    return {y:0};
}
})
```

# 34.动态类名

```
:class="{active:spuSaleAttrValue.isChecked==1}"
```

```
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(slide, index) in skuImageList"
        :key="slide.id"
      >
        <img :src="slide.imgUrl" :class="{active:currentIndex==index}"  @click="changeCurrentIndex(index)"/>
      </div>
    </div>
```

```
  data(){
    return{
      currentIndex:0,
    }
  },
  
  
    methods:{
    changeCurrentIndex(index){
      this.currentIndex = index;
    },
  },

```



# 35.排它 -- 遍历

```
    // 产品属性切换高亮
    changeActive(spuSaleAttrValue,arr){
        arr.forEach(item=>{
            item.isChecked = '0';
        })
        spuSaleAttrValue.isChecked = '1';
    },
```

# 36.放大镜

```
<template>
  <div class="spec-preview">
    <img :src="imgObj.imgUrl" />
    <div class="event" @mousemove="handler"></div>
    <div class="big">
      <img :src="imgObj.imgUrl" ref="big" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  data(){
    return{
      currentIndex:0,
    }
  },
  methods:{
    handler(event){
      let big = this.$refs.big;
      let mask = this.$refs.mask;
      let left = event.offsetX - mask.offsetWidth/2;
      let top = event.offsetY - mask.offsetHeight/2;
      // 修改
      if(left<=0){
        left = 0;
      }
      if(left>=mask.offsetWidth){
        left = mask.offsetWidth;
      }
      if(top<=0){
        top = 0;
      }
      if(top>=mask.offsetHeight){
        top = mask.offsetHeight;
      }
      mask.style.left = left + 'px';
      mask.style.top = top + 'px';

      big.style.left = - 2 * left + 'px';
      big.style.top = - 2 * top + 'px';

    },
  },
  props: ["skuImageList"],
  computed: {
    imgObj() {
      return this.skuImageList[this.currentIndex] || {};
    },
  },
  mounted() {
    this.$bus.$on("getIndex", (index) => {
      this.currentIndex = index;
    });
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>
```



# 37.ref

```
<div class="mask" ref="mask"></div>

let mask = this.$refs.mask;
```

# 38.浏览器存储

本地存储

会话存储

```
json 先转化为字符串
sessionStorage.setItem("SKUINFO", JSON.stringify(this.skuInfo));

用的时候
JSON.parse(sessionStorage.getItem("SKUINFO"));

```

# 39.一个回调被多个元素使用

![](https://raw.githubusercontent.com/zhuchenghao1337/github-images/main/2022/20230109234150.png)

传一个参数 作为标记

# 40.回调传参 拿参方式

```
@change="updateChecked(cart, $event)"

$event 可以拿到很多数据

```

# 41.前端的事务

```
    deleteAllCheckedCart({dispatch, getters}){
        let PromiseAll = [];
        getters.cartList.cartInfoList.forEach(item =>{
            if (item.isChecked == 1){
                let promise = dispatch("deleteCartListBySkuId", item.skuId);
                PromiseAll.push(promise);
            }
        })
        return Promise.all(PromiseAll);
    },
```

```
    // 删除所有选中的商品
    async deleteAllCheckedCart(){
      console.log(this.cartInfoList);
      // 这里只能 一个一个删 会用到前端 事务
      try {
        await this.$store.dispatch("deleteAllCheckedCart");
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
```



# 42.路由守卫

## 1.被阻止后去之前要去的地方--全局守卫

```
登录成功的回调

// 判断 是否去首页还是其他要求的地方
        let toPath = this.$route.query.redirect || '/home'
        this.$router.push(toPath);
```

```
全局守卫
// 未登录情况
    // 原来想去的地方
    let path = to.path;
    if (path.indexOf('/trade')!=-1 || path.indexOf('/pay')!=-1 || path.indexOf('/center')!=-1) {
      // 原来想去的地方 保存到url上
      next('/login?redirect='+path);
    }else{
      next();
    }
```

## 2.必须从指定页面来--路由独享守卫

```
// 想要去交易页面 你必须从购物车进去    
    {
        path: '/trade',
        component: Trade,
        name: 'trade',
        meta: {
            isShow: false
        },
        beforeEnter: (to, from, next) => {
            // 想要进这个页面 你必须从购物车进去
            if(from.path == '/shopCart'){
                next();
            }else{
                next(false);
            }
        }
    },
```

## 3.组件内守卫

# 43.v-if v-else妙用

# 44.导航守卫









# 45.api全局注册

# 46.生成二维码

```
npm i qrcode
```

```
    async open() {
      // 生成二维码
      let url = await QRCode.toDataURL(this.payInfo.codeUrl);
      this.$alert(`<img src=${url} />`, "请你微信支付", {
        dangerouslyUseHTMLString: true,
        center: true,
        showCancelButton: true,
        cancelButtonText: "支付遇到问题",
        confirmButtonText: "已支付成功",
        showClose: false,
      });
    },
```

# 47.定时器

```
      timer: null,
      
      
 
      // 一直向服务器 问
      // 定时器 如果没有定时器 就开启一个 一定要移除定时器
      if(!this.timer){
        this.timer = setInterval(async ()=>{
          let res = await this.$API.reqPayStatus(this.orderId)
          console.log(res);
          if(res.code == 200){
            // 支付成功
            // 1.清除定时器
            clearInterval(this.timer);
            this.timer = null;
            // 2.保存数据
            this.code = res.code;
            // 3.隐藏弹出框
            this.$msgbox.close();
            // 4.跳转路由
            this.$router.push('/paysuccess');
          }
        }, 1000)
      }
```

# 48.二级路由

```
    {
        path: '/center',
        component: Center,
        name: 'center',
        meta: {
            isShow: false
        },
        children:[
            {
                path: 'myorder',
                component: myOrder,
            },
            {
                path: 'grouporder',
                component: groupOrder,
            },
            // 重定向
            {
                path:'/center',
                redirect:'/center/myorder'
            }
        ]
    },
```

```
        <router-view></router-view>
```

```
重定向 比较重要
```

# 49.图片懒加载

```
vue-lazyload
1. 其他版本可能会失效
npm i vue-lazyload@1.3.3
2.
import VueLazyload from 'vue-lazyload'
// 引入图片
import atm from '@/assets/1.gif'
Vue.use(VueLazyload, {
  // 默认图片
  loading: atm,
})
3. 使用v-lazy指令
<img v-lazy="good.defaultImg" />
```

# 50.validate表单验证

```
vee-validate
1.
npm install vee-validate@2.0.0-rc.25
2.
```



# 51.路由懒加载

```
const UserDetails = () => import('./views/UserDetails.vue')
```

# 52.不加密打包

```
vue.config.js

productionSourceMap:false, // 打包不加密
```

