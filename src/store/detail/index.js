import { reqGoodsInfo, reqAddOrUpdateShopCart } from '@/api/index'
import {getUUID} from '@/utils/uuid_token'
// 这是小仓库
const state = {
    goodInfo:{},
    uuid_token: getUUID(),
};
const mutations = {
    GETGOODINFO(state, goodInfo){
        state.goodInfo = goodInfo;
    },
};
const actions = {
    async getGoodInfo({commit}, skuId){
        let res = await reqGoodsInfo(skuId);
        if(res.code == 200){
            commit("GETGOODINFO",res.data)
        }
    },
    async addOrUpdateShopCart({commit}, {skuId, skuNum}){
        let res = await reqAddOrUpdateShopCart(skuId, skuNum);
        if(res.code == 200){
            return "ok";
        }else{
            return Promise.reject(new Error("faile"));
        }

    },
};
const getters = {
    categoryView(state){
        return state.goodInfo.categoryView || {};
    },
    skuInfo(state){
        return state.goodInfo.skuInfo || {};
    },
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList || [];
    },
};
export default {
    state,
    mutations,
    actions,
    getters
}