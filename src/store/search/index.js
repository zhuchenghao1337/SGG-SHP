import { reqGetSearchInfo } from '@/api/index'
// 这是小仓库
const state = {
    searchList: {},
};
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList;
    },
};
const actions = {
    // 获取模块的数据
    async getSearchList({ commit }, params = {}) {
        let res = await reqGetSearchInfo(params);
        if (res.code == 200) {
            commit("GETSEARCHLIST", res.data)
        }
    },
};
const getters = {
    goodsList(state){
        // state是小仓库的
        // 如果没网 回出现undincd  返回[]来避免问题
        return state.searchList.goodsList || [];
    },
    trademarkList(state){
        return state.searchList.trademarkList || [];
    },
    attrsList(state){
        return state.searchList.attrsList || [];
    },
};
export default {
    state,
    mutations,
    actions,
    getters
}