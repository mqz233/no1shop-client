<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <!-- 用户没有登录 -->
          <p v-if="!userInfo.name">
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">注册</router-link>
          </p>
          <!-- 用户已经登录 -->
          <p v-else>
            <span> </span>
            <a href="javascript:;">{{ userInfo.name }}</a>
            <a href="javascript:;" class="register" @click="logout">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center">我的订单</router-link>
          <!-- <a href="###">我的订单</a> -->
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link to="/home" class="logo" title="尚品汇">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyWord"
          />
          <!-- 收集输入数据 -->
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="toSearch"
          >
            <!-- 编程式路由导航 -->
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Header",
  data() {
    return {
      keyWord: "",
    };
  },
  mounted() {
    // 全局事件总线 注册事件 清除关键字
    this.$bus.$on("clearKeyword", this.clearKeyword);
  },
  methods: {
    clearKeyword() {
      this.keyWord = "";
    },
    toSearch() {
      // 编程式路由导航
      // params参数和query参数
      //params体现在路径匹配中 query不会

      // 1字符串写法
      // this.$router.push(
      //   "./search/" + this.keyWord + "?keyWord1=" + this.keyWord.toUpperCase()
      // );

      let location = {
        name: "search",
        // params为空串时 路径会出现问题，怎么解决
        // 1.在路由配置里设置params可穿可不穿(加一个?号)
        // 2.如果params参数为空时，使其值为undefined
        params: { keyWord: this.keyWord || undefined },
      };

      // 合并query参数
      if (this.$route.query) {
        location.query = this.$route.query;
      }

      // 2对象写法 命名路由
      // 判断当前处于哪个组件，如果是home用push，如果是search用replace
      if (this.$route.path === "/home") this.$router.push(location);
      else {
        this.$router.replace(location);
      }

      //解决连续搜索相同关键字时，会返回一个失败的promise进而会报错
      //1用.catch接收处理返回得失败的promise对象   // .catch((e) => {console.log(e)});
      //2根据需求重写VueRouter原型上的push方法
    },
    // 退出登录
    async logout() {
      try {
        await this.$store.dispatch("getLogout");
        alert("退出登录成功");
        // 退出后跳转到主页
        this.$router.push("/");
      } catch (error) {
        alert(error.message);
      }
    },
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
    }),
  },
};
</script>

<style scoped lang="less">
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>