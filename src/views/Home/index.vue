<template>
  <div>
    <!-- 三级联动组件 -->
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <!-- v-for 遍历组件并传值 -->
    <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor"></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from '@/views/Home/ListContainer'
import Recommend from '@/views/Home/Recommend'
import Rank from '@/views/Home/Rank'
import Like from '@/views/Home/Like'
import Floor from '@/views/Home/Floor'
import Brand from '@/views/Home/Brand'

import {mapState} from 'vuex';

export default {
  components:{
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  computed:{
    // ...mapState(['count'])
  },
  methods:{
    // add(){
    //   this.$store.dispatch('add');
    // }
  },
  mounted(){
    this.$store.dispatch("getFloorList");

    this.$store.dispatch("getUserInfo");
  },
  computed:{
    ...mapState({
      floorList:(state)=>state.home.floorList,
    })
  },
}
</script>

<style>

</style>