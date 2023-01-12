// 对axios二次封装
import axios from "axios";
// 引入进度条
import nprogress from "nprogress";
// 引入进度条样式
import "nprogress/nprogress.css";

// 1.创建axios实例
const requests = axios.create({
    // 配置对象
    baseURL: "/mock", // 基础路径
    timeout: 5000, // 超时时间
});
// 请求拦截器
requests.interceptors.request.use((config) => {
    // config配置对象 config有一个属性headers
    // 进度条开始动
    nprogress.start();
    return config;
});

requests.interceptors.response.use((res) => {
    // 进度条结束
    nprogress.done();
    return res.data;
}, (error) => {
    return Promise.reject(new Error("faile"))
});


// 对外暴露
export default requests;