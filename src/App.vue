<template>
  <div id="app">
      <Header></Header>
      <!-- 路由组件出口 -->
      <router-view></router-view>
      <!-- 控制footer显示与隐藏 -->
      <!-- <Footer v-show="$route.path=='/home'"></Footer> -->
      <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header/index.vue'
import Footer from './components/Footer/index.vue'


export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted() {
    // 获取数据，存储到仓库中
    this.$store.dispatch("categoryList");
  }
}
</script>

<style>
</style>
