<template>
  <div>
    <!-- 全局注册的组件 直接使用 -->
    <TypeNav />
    <br />
    <br />
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <Floor />
    <Brand />
  </div>
</template>

<script>
import ListContainer from "./ListContainer";
import Recommend from "./Recommend";
import Rank from "./Rank";
import Brand from "./Brand";
import Floor from "./Floor";
import Like from "./Like";
export default {
  name: "Home",
  components: {
    ListContainer,
    Recommend,
    Rank,
    Brand,
    Floor,
    Like,
  },
};
</script>

<style>
</style>