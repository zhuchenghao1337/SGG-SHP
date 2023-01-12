import { reqAddressInfo, reqOrderInfo } from '@/api/index'
// 这是小仓库
const state = {
    address: [],
    orderInfo: {},
};
const mutations = {
    USERADDRESS(state, data) {
        state.address = data;
    },
    ORDERINFO(state, data) {
        state.orderInfo = data;
    },
};
const actions = {
    // 获取地址信息
    async getUserAddress({ commit }) {
        let res = await reqAddressInfo();
        if (res.code == 200) {
            commit("USERADDRESS", res.data);
        }
    },
    // 获取商品清单信息
    async getOrderInfo({ commit }) {
        let res = await reqOrderInfo();
        if (res.code == 200) {
            commit("ORDERINFO", res.data);
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