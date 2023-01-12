import Home from '@/views/Home'
import Search from '@/views/Search'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Detail from '@/views/Detail'
import AddCartSuccess from '@/views/AddCartSuccess'
import ShopCart from '@/views/ShopCart'
import Trade from '@/views/Trade'
import Pay from '@/views/Pay'
import PaySuccess from '@/views/PaySuccess'
import Center from '@/views/Center'
// 二级路由组件
import myOrder from '@/views/Center/myOrder'
import groupOrder from '@/views/Center/groupOrder'
export default [
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
    {
        path: '/detail/:id',
        component: Detail,
        meta: {
            isShow: false
        }
    },
    {
        path: '/addCartSuccess',
        component: AddCartSuccess,
        name: 'addCartSuccess',
        meta: {
            isShow: false
        }
    },
    {
        path: '/shopCart',
        component: ShopCart,
        name: 'shopCart',
        meta: {
            isShow: false
        }
    },
    {
        path: '/trade',
        component: Trade,
        name: 'trade',
        meta: {
            isShow: false
        },
        beforeEnter: (to, from, next) => {
            console.log(from.path);
            // 想要进这个页面 你必须从购物车进去
            if(from.path == '/shopcart'){
                next();
            }else{
                next(false);
            }
        }
    },
    {
        path: '/pay',
        component: Pay,
        name: 'pay',
        meta: {
            isShow: false
        },
        beforeEnter: (to, from, next) => {
            // 想要进这个页面 你必须从购物车进去
            if(from.path == '/trade'){
                next();
            }else{
                next(false);
            }
        }
    },
    {
        path: '/paysuccess',
        component: PaySuccess,
        name: 'paysuccess',
        meta: {
            isShow: false
        },
        beforeEnter: (to, from, next) => {
            console.log(from.path);
            // 想要进这个页面 你必须从购物车进去
            if(from.path == '/pay'){
                next();
            }else{
                next(false);
            }
        }
    },
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

    // 二级路由

    
    // 重定向
    {
        path: '*',
        component: Home
    },

]