<template>
  <div>
    <Header />
    <router-view></router-view>
    <!-- <Footer v-show="$route.path !== '/login' && $route.path !== 'register'" /> -->
    <!-- 通过元配置项 决定Footer是否隐藏 -->
    <Footer v-show="!$route.meta.isHiddenFooter" />
  </div>
</template>

<script>
import Footer from "@/components/Footer";
import Header from "@/components/Header";
export default {
  name: "App",
  components: {
    Footer,
    Header,
  },
  mounted() {
    // 一挂载就获取的数据 home和search组件共用
    this.$store.dispatch("getCategoryList");
  },
};
</script>

<style>
</style>
