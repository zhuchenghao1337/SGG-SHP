import { reqCategoryList, reqGetBannerList, reqFloorList } from "@/api";

const state = {
    categoryList:[],
    bannerList:[],
    floorList:[],
};
const mutations = {
    CATEGORYLIST(state, categoryList){
        state.categoryList = categoryList
    },
    BANNERLIST(state, bannerList){
        state.bannerList = bannerList;
    },
    FLOORLIST(state, floorList){
        state.floorList = floorList;
    }
};
const actions = {
    async categoryList({commit}) {
        // 通过api发请求
        let res = await reqCategoryList();
        if(res.code==200){
            commit("CATEGORYLIST",res.data)
        }
    },
    async getBannerList({commit}){
        let res = await reqGetBannerList();
        if(res.code==200){
            commit("BANNERLIST",res.data)
        }
    },
    async getFloorList({commit}){
        let res = await reqFloorList();
        if(res.code == 200){
            commit("FLOORLIST",res.data);
        }
    },
};
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters
}