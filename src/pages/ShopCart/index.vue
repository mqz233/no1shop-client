<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <!-- 购物车列表  -->
        <ul class="cart-list" v-for="cart in cartInfoList" :key="cart.id">
          <!-- 单选框 -->
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cart.isChecked === 1"
              @click="updateOnecheck(cart)"
            />
          </li>
          <!-- 图片 -->
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">
              {{ cart.skuName }}
            </div>
          </li>
          <!-- 价格 -->
          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}</span>
          </li>
          <!-- 数量 -->
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="changeCartNum(cart, -1, true)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="cart.skuNum"
              minnum="1"
              class="itxt"
              @change="changeCartNum(cart, $event.target.value * 1, false)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="changeCartNum(cart, 1, true)"
              >+</a
            >
          </li>
          <!-- 总价格 -->
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuNum * cart.skuPrice }}</span>
          </li>
          <!--  -->
          <li class="cart-list-con7">
            <a href="#none" class="sindelet">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" v-model="isAllChecked" />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ sumNum }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ sumPrice }}</i>
        </div>
        <div class="sumbtn">
          <!-- <a class="sum-btn" href="###" target="_blank">结算</a> -->
          <router-link to="trade" class="sum-btn">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ShopCart",
  mounted() {
    this.getCartList();
  },
  methods: {
    getCartList() {
      this.$store.dispatch("getCartList");
    },
    // 购物车商品数量变化逻辑：
    // 1判断输入是否合法 做相应处理
    // 2发请求通知服务器修改数据
    // 3重新获取购物车列表，更新数据
    async changeCartNum(cart, num, flag) {
      // console.log(num);
      // 原数量
      let originNum = cart.skuNum;

      // 发请求需要的是变化的量
      // flag true 传递的是变化的量
      if (flag) {
        // 判断输入是否合法 不合法时候让最终的数量为1
        if (originNum + num < 1) {
          num = 1 - originNum;
        }
      }
      // flag 为 false 传递的是最终的量
      else {
        if (num < 1) {
          num = 1 - originNum;
        } else {
          num = num - originNum;
        }
      }
      // 发送请求通知服务器修改数据 async await 判断是否成功
      try {
        // console.log(num);
        await this.$store.dispatch("addShopCart", {
          skuId: cart.skuId,
          skuNum: num,
        });
        // 重新获取购物车数据 更新页面
        this.getCartList();
      } catch (error) {
        alert(error.message);
      }
    },
    // 修改单选框状态
    async updateOnecheck(cart) {
      try {
        await this.$store.dispatch("getCartIsChecked", {
          skuId: cart.skuId,
          isChecked: cart.isChecked ? 0 : 1,
        });
        this.getCartList();
      } catch (error) {
        console.log(error.message);
      }
    },
  },
  computed: {
    // 购物车列表信息
    ...mapGetters(["cartList"]),
    // 真正的购物车信息
    cartInfoList() {
      return this.cartList.cartInfoList || [];
    },
    // 商品总数
    sumNum() {
      return this.cartInfoList.reduce((prev, cart) => {
        if (cart.isChecked) prev += cart.skuNum;
        return prev;
      }, 0);
    },
    // 商品总价格
    sumPrice() {
      return this.cartInfoList.reduce((prev, cart) => {
        if (cart.isChecked) prev += cart.skuNum * cart.skuPrice;
        return prev;
      }, 0);
    },

    // 商品是否全选（标准格式 拥有getter和setter）
    isAllChecked: {
      get() {
        return this.cartInfoList.every((cart) => cart.isChecked);
      },
      async set(val) {
        // 得到promise.all批量处理后返回的数组
        try {
          await this.$store.dispatch("updateCartIsCheckedAll", val ? 1 : 0);
          this.getCartList();
        } catch (error) {
          console.log(error.message);
        }
      },
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>