import store from '@/store';
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes';

Vue.use(VueRouter)


// 保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
// 重写push方法
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(this, location, () => { }, () => { })
  }
}
// 重写replace方法
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(this, location, () => { }, () => { })
  }
}


let router = new VueRouter({
  routes: routes,
  // 滚动行为
  scrollBehavior(to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    return { y: 0 };
  }
})

// 全局路由守卫
router.beforeEach(async (to, from, next) => {
  let token = localStorage.getItem("TOKEN");
  if (token) {
    if (to.path == '/login') {
      // 登录了 不能去登录页面
      console.log("1");
      next("/")
    } else {
      try {
        // 已经登录了 获取用户信息再跳转
        await store.dispatch("getUserInfo");
        next();
        console.log("2");
      } catch (error) {
        console.log("3");
        // token失效了 清除本地的token
        store.dispatch("userlogout");
        next({ path: '/login' })
      }
    }
  }
  else if (to.path == '/login') {
    console.log("4");
    next(); // 放行
  } else {
    // 未登录情况
    // 原来想去的地方
    let path = to.path;
    if (path.indexOf('/trade')!=-1 || path.indexOf('/pay')!=-1 || path.indexOf('/center')!=-1) {
      // 原来想去的地方 保存到url上
      next('/login?redirect='+path);
    }else{
      next();
    }

  }














  // if (token) {
  //   if (to.path == '/login') {
  //     // 登录了 不能去登录页面
  //     next("/")
  //   } else {
  //     try {
  //       // 已经登录了 获取用户信息再跳转
  //       await store.dispatch("getUserInfo");
  //       next();
  //     } catch (error) {
  //       // token失效了 清除本地的token
  //       store.dispatch("userlogout");
  //       next({ path: '/login' })
  //     }
  //   }
  // }
  // else if (to.path == '/login') {
  //   console.log(to.path);
  //   next(); // 放行
  // } else {
  //   // 没登录 导航到登录页面
  //   // next({ path: '/login' })
  //   // 先放行
  //   if (to.path == '/trade') {
  //     next();
  //   }
  // }



  // 没登录可以访问 首页、search、detail、login
  // 登录了  可以addCartSuccess、shopCart、trade、paysuccess、center  不可以 去login

  // if(token){ // 已登录

  //   await store.dispatch("getUserInfo");

  //   if(to.path == '/login'){ // 不可以 去login
  //     console.log(to.path);
  //     next("/")
  //   }else{ // 出了login都可以
  //     console.log(to.path);
  //     next();
  //   }
  // }else{ // 没登录
  //   if(to.path != '/login'){
  //     console.log(to.path);
  //     next();
  //   }else if(to.path != '/search' || to.path != '/detail'){
  //     // 如果不是这些页面
  //     console.log(to.path);
  //     ({ path: '/login' }) // 去登录
  //   }else{
  //     console.log(to.path);
  //     next();
  //   }
  // }





  // if(token || to.path == '/login'){  //如果登录了 或者 想要去登录页面
  //   next(); // 放行
  // } else{ // 认证失败想去其他页面
  //   next({ path: '/login'})
  // }

})


export default router;