<template>
  <div class="spec-preview">
    <img :src="defaultImg.imgUrl" />
    <div class="event" @mousemove="move"></div>
    <div class="big">
      <img :src="defaultImg.imgUrl" ref="bigImg" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  props: ["imageList"],
  data() {
    return {
      // 要展示图片的索引
      defaultIndex: 0,
    };
  },
  mounted() {
    // 全局事件总线
    this.$bus.$on("changeSelectedImage", this.changeSelectedImage);
  },
  methods: {
    changeSelectedImage(index) {
      this.defaultIndex = index;
    },
    // 鼠标动 蒙版动
    move(event) {
      // offsetX相对于元素左上角坐标
      let mouseX = event.offsetX;
      let mouseY = event.offsetY;

      // 求蒙版左上角坐标
      let mask = this.$refs.mask;
      let maskX = mouseX - mask.offsetWidth / 2;
      let maskY = mouseY - mask.offsetHeight / 2;

      // 设置蒙版边界
      if (maskX < 0) maskX = 0;
      else if (maskX > mask.offsetWidth) maskX = mask.offsetWidth;

      if (maskY < 0) maskY = 0;
      else if (maskY > mask.offsetHeight) maskY = mask.offsetHeight;
      // 设置蒙版位置
      mask.style.left = maskX + "px";
      mask.style.top = maskY + "px";

      // 大图移动蒙版反方向二倍
      this.$refs.bigImg.style.left = -2 * maskX + "px";
      this.$refs.bigImg.style.top = -2 * maskY + "px";
    },
  },
  computed: {
    defaultImg() {
      // 解决假报错，数据没有回来之前是undefined，这时候再去取值就会报错
      // 解决办法：没回来之前给一个空对象/空数组
      return this.imageList[this.defaultIndex] || {};
    },
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>