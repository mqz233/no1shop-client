<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="moveOutDiv" @mouseenter="isShow = true">
        <h2 class="all">全部商品分类</h2>
        <!-- 添加过渡效果 -->
        <transition name="sort">
          <div class="sort" v-show="isShow">
            <!-- 3最终办法使用事件委派 在最近的公共祖先元素上添加事件 通过冒泡来触发事件 -->
            <div class="all-sort-list2" @click="toSearch">
              <!-- 三级目录(c1 c2 c3) 分层次生成 -->
              <!-- 使用鼠标移入事件 修改currentIndex的值 实现动态绑定类  -->
              <div
                :class="{ item_on: currentIndex === index }"
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                @mouseenter="setCurrentIndex(index)"
              >
                <h3>
                  <!-- 1声明式路由导航 每一个标签都是一个组件对象 三层循环太多了会卡 -->
                  <!-- <router-link
                  :to="{
                    name: 'search',
                    query: {
                      category1Id: c1.categoryId,
                      categoryName: c1.categoryName,
                    },
                  }"
                  >{{ c1.categoryName }}</router-link
                > -->

                  <!-- 2改用编程式路由导航 也不行 同理会在内存中产生很多函数 -->
                  <!-- <a
                  href="javascript:;"
                  @click="
                    $route.push({
                      name: 'search',
                      query: {
                        category1Id: c1.categoryId,
                        categoryName: c1.categoryName,
                      },
                    })
                  "
                  >{{ c1.categoryName }}</a
                > -->

                  <!-- 使用自定义属性data-xxx 的格式自定义属性 -->
                  <a
                    href="javascript:;"
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <div class="item-list clearfix">
                  <div class="subitem">
                    <dl
                      class="fore"
                      v-for="c2 in c1.categoryChild"
                      :key="c2.categoryId"
                    >
                      <dt>
                        <!-- 使用自定义属性data-xxx 的格式自定义属性 -->
                        <a
                          href="javascript:;"
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <!-- 使用自定义属性data-xxx 的格式自定义属性 -->
                          <a
                            href="javascript:;"
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle";

export default {
  name: "TypeNav",

  // 组件挂载完成，请求数据，保存到vuex
  mounted() {
    // 三级分类列表的数据，对于搜索页和主页是完全一样的，可以放在App组件发请求，避免重复获取相同的数据
    // this.$store.dispatch("getCategoryList");
    // 挂载时判断是否是Home组件 不是的话 要隐藏三级菜单
    if (this.$route.path !== "/home") {
      this.isShow = false;
    }
  },

  // 从vuex中获取数据
  computed: {
    // 使用mapState帮助我们生成计算属性
    // 1直接使用数组格式：没有模块化时使用
    // 2对象格式：模块时使用,为了区分不同模块使用
    ...mapState({
      // 读取home模块下（state.home）的categoryList
      categoryList: (state) => state.home.categoryList,
    }),
  },

  data() {
    return {
      currentIndex: -1,
      isShow: true,
    };
  },

  methods: {
    // 节流版的更改index函数 （lodash库的throttle函数，返回值是一个节流版的函数）
    setCurrentIndex: throttle(
      //回调
      function (index) {
        this.currentIndex = index;
        // console.log(index);
      },
      // 时间间隔
      20,
      // trailing:在时间间隔之后执行
      // leading:在时间间隔之前执行
      { trailing: false }
    ),

    // 事件委派函数 event时浏览器内核传过来的
    toSearch(event) {
      // 通过自定义属性获得参数categoryName和id
      // 以此来判断是否是a标签以及是1，2，3哪级标签

      const data = event.target.dataset;
      let { categoryname, category1id, category2id, category3id } = data;
      // 条件判断，生成编程式路由参数

      if (categoryname) {
        // push的参数
        let location = { name: "search" };
        //query参数
        let query = { categoryName: categoryname };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        location.query = query;

        // 合并两种参数 在搜索的时候同时携带两种参数
        if (this.$route.params) {
          location.params = this.$route.params;
        }
        // 判断当前处于哪个组件，如果是home用push，如果是search用replace
        if (this.$route.path === "/home") this.$router.push(location);
        else {
          this.$router.replace(location);
        }
      }
    },
    // 鼠标移出div
    moveOutDiv() {
      this.currentIndex = -1;
      if (this.$route.path !== "/home") {
        this.isShow = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      &.sort-enter {
        height: 0;
        opacity: 0;
      }

      &.sort-enter-to {
        height: 461px;
        opacity: 1;
      }

      &.sort-enter-active {
        transition: all 0.5s;
      }

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &.item_on {
            background-color: skyblue;
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>