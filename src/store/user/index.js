import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from '@/api/index'
// 这是小仓库
const state = {
    code: '',
    token: '',
    userInfo: {},
};
const mutations = {
    GETCODE(state, code) {
        state.code = code;
    },
    USERLOGIN(state, token) {
        state.token = token;
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo;
    },
    CLEAR(state){
        state.userInfo = {};
        localStorage.removeItem("TOKEN", '');
    },
};
const actions = {
    // 获取验证码
    async getCode({ commit }, phone) {
        let res = await reqGetCode(phone);
        if (res.code = 200) {
            commit("GETCODE", res.data);
            return 'ok';
        } else {
            return Promise.reject(new Error("faile"));
        }
    },

    // 注册
    async UserRegister({ commit }, user) {
        let res = await reqUserRegister(user);
        if (res.code == 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error("faile"));
        }
    },

    // 登录
    async UserLogin({ commit }, data) {
        let res = await reqUserLogin(data);
        if (res.code == 200) {
            commit("USERLOGIN", res.data.token);
            localStorage.setItem("TOKEN", res.data.token);
            return 'ok';
        } else {
            return Promise.reject(new Error("faile"));
        }
    },

    // 获取用户信息
    async getUserInfo({ commit }) {
        let res = await reqUserInfo();
        if (res.code == 200) {
            commit("GETUSERINFO", res.data);
        }
    },

    // 退出登录
    async userlogout({commit}) {
        let res = await reqLogout();
        if (res.code == 200) {
            // 清除本地数据
            commit("CLEAR");
            return 'ok';
        }else{
            return Promise.reject(new Error("faile"));
        }
    },

};
const getters = {


};
export default {
    state,
    mutations,
    actions,
    getters
}