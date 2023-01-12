// api统一管理
import requests from './request'
import mockRequests from './mockAjax'

// /product/getBaseCategoryList

export const  reqCategoryList =()=>{
    // 发请求
    return requests({
        url: '/product/getBaseCategoryList',
        method: 'get'
    });
}


export const  reqGetBannerList =()=>{
    // 发请求
    return mockRequests({
        url: '/banner',
        method: 'get'
    });
}

export const reqFloorList =()=>{
    return mockRequests({
        url:"/floor",
        method: 'get'
    })
}

// 获取搜索模块数据
export const reqGetSearchInfo =(params)=>{
    return requests({
        url: '/list',
        method: 'post',
        data: params,
    })
}

// 根据商品id获取详情
export const reqGoodsInfo=(skuId)=>{
    return requests({
        url:`/item/${skuId}`,
        method:'get',
    })
}
// 将产品添加到购物车中

export const reqAddOrUpdateShopCart = (skuId, skuNum) => {
    return requests({
        url:`/cart/addToCart/${skuId}/${skuNum}`,
        method:'post',
    })
}

// 获取购物车数据
 export const reqCartList = ()=> {
    return requests({
        url: '/cart/cartList',
        method: 'get',
    })
}

// 删除购物车商品
export const reqDeleteCartById = (skuId)=> {
    return requests({
        url: `/cart/deleteCart/${skuId}`,
        method: 'delete',
    })
}
// 修改购物车商品状态
export const reqUpdateCheckedById = (skuId, isChecked)=> {
    return requests({
        url: `/cart/checkCart/${skuId}/${isChecked}`,
        method: 'get',
    })
}

// 获取验证码
export const reqGetCode = (phone)=>{
    return requests({
        url:`/user/passport/sendCode/${phone}`,
        method: 'get',
    })
}

// 注册
export const reqUserRegister = (data) => {
    return requests({
        url:"/user/passport/register",
        data: data,
        method: 'post',
    })
}

// 登录
export const reqUserLogin = (data) =>{
    return requests({
        url:"/user/passport/login",
        method:"post",
        data:data,
    })
}

// 获取用户的信息
export const reqUserInfo = ()=>requests({url:`/user/passport/auth/getUserInfo`,method:'get'});

// 退出登录
export const reqLogout = () => requests({url:"/user/passport/logout", method:'get'})

// 获取用户地址信息
export const reqAddressInfo = () => requests({url:"/user/userAddress/auth/findUserAddressList", method:"get"});

// 获取订单信息
export const reqOrderInfo = () => requests({url:"/order/auth/trade", method:"get"});

// 提交订单
export const reqSubmitOrder = (tradeNo,data) => requests(
    {
        url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
        method:"post",
        data: data,
    }
);

// 获取订单支付信息
export const reqPayInfo = (orderId) => requests({
    url:`/payment/weixin/createNative/${orderId}`,
    method:"get",
})

// 获取支付订单状态
export const reqPayStatus = (orderId) => requests({
    url:`/payment/weixin/queryPayStatus/${orderId}`,
    method:'get'
})

// 获取我的订单列表
export const reqOrderList = (page, limit) => requests({
    url:`/order/auth/${page}/${limit}`,
    method:'get'
})