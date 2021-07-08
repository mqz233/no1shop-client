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
    <!-- 动态生成floor 同时给Floor组件传递参数 -->
    <Floor v-for="item in floorList" :key="item.id" :floor="item" />
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
import { mapState } from "vuex";
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
  mounted() {
    this.$store.dispatch("getFloorList");
  },
  computed: {
    ...mapState({ floorList: (state) => state.home.floorList }),
  },
};
</script>

<style>
</style>