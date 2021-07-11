<template>
  <div class="pagination">
    <!-- 上一页逻辑 当前页码为1时 不能再去点击了 -->
    <!-- 点击按钮 触发自定义事件 给父组件传递页码 -->
    <button
      :disabled="currentNo === 1"
      @click="$emit('changePageNo', currentNo - 1)"
    >
      上一页
    </button>
    <!-- 当连续页码起始为1时，不能显示 -->
    <button v-if="startEnd.start !== 1" @click="$emit('changePageNo', 1)">
      1
    </button>
    <!-- ...逻辑 当连续起始页码大于2时，才会显示 -->
    <button v-if="startEnd.start > 2">···</button>

    <!-- 连续页码逻辑 -->
    <!-- vfor遍历数字-->
    <button
      :class="{ active: currentNo === item }"
      v-for="(item, index) in startEnd.end"
      :key="index"
      v-if="item >= startEnd.start"
      @click="$emit('changePageNo', item)"
    >
      {{ item }}
    </button>

    <button v-if="startEnd.end <= totalPage - 2">···</button>
    <button
      v-if="startEnd.end !== totalPage"
      @click="$emit('changePageNo', totalPage)"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="currentNo === totalPage"
      @click="$emit('changePageNo', currentNo + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ totalNo }} 条</button>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "Pagination",
  props: {
    //   总条数
    totalNo: {
      type: Number,
      default: 0,
    },
    // 连续页数（最好是奇数）
    continueNo: {
      type: Number,
      default: 5,
    },
    // 当前页数
    currentNo: {
      type: Number,
      default: 1,
    },
    // 一个页展示的数目
    pageSize: {
      type: Number,
      default: 10,
    },
  },
  computed: {
    totalPage() {
      // 这里要向上取整
      return Math.ceil(this.totalNo / this.pageSize);
    },
    startEnd() {
      const { totalPage, currentNo, continueNo } = this;
      // 计算起始和结束页码

      let start, end;
      //1.连续页码数大于总页数
      if (continueNo >= totalPage) {
        start = 1;
        end = totalPage;
      } else {
        // 2.当前页码+-连续页码一半不在正确范围内
        if (currentNo - Math.floor(continueNo / 2) <= 0) {
          start = 1;
          end = continueNo;
        } else if (currentNo + Math.floor(continueNo / 2) > totalPage) {
          end = totalPage;
          start = end - continueNo + 1;
          // 3.在正常范围内
        } else {
          start = currentNo - Math.floor(continueNo / 2);
          end = currentNo + Math.floor(continueNo / 2);
        }
      }

      return {
        start,
        end,
      };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>