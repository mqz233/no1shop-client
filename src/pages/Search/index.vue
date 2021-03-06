<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 展示搜索分类  同时也可以清除分类 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName }}<i @click="clearCategory">×</i>
            </li>
            <!-- 关键字标签 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="clearKeyword">×</i>
            </li>
            <!-- 品牌标签 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1]
              }}<i @click="clearTrademark">×</i>
            </li>
            <!-- 属性标签 -->
            <li
              class="with-x"
              v-for="(item, index) in searchParams.props"
              :key="index"
            >
              {{ item.split(":")[1] }}<i @click="clearProp(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <!-- 通过自定义事件接收trademark -->
        <SearchSelector
          @search-by-trademark="searchByTrademark"
          @search-by-prop="searchByProp"
        />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <!-- 根据搜索参数里的order决定是否展示 -->
                <!-- 图标down up的展示是根据desc asc决定  -->
                <li :class="{ active: sortType === '1' }">
                  <!-- 点击更改排序方式 -->
                  <a href="#" @click.prevent="changeSort('1')"
                    >综合<i
                      v-if="sortType === '1'"
                      class="iconfont"
                      :class="{
                        icondown: sortOrder === 'desc',
                        iconup: sortOrder === 'asc',
                      }"
                    ></i
                  ></a>
                </li>
                <li :class="{ active: sortType === '2' }">
                  <a href="#" @click.prevent="changeSort('2')"
                    >价格<i
                      v-if="sortType === '2'"
                      class="iconfont"
                      :class="{
                        icondown: sortOrder === 'desc',
                        iconup: sortOrder === 'asc',
                      }"
                    ></i
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="item in goodsList" :key="item.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 跳转到详情页 -->
                    <!-- 注意params参数不能和path参数搭配，要用name -->
                    <router-link
                      :to="{ name: 'detail', params: { goodsId: item.id } }"
                      ><img :src="item.defaultImg"
                    /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>&nbsp;{{ item.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <!-- 详情页 -->
                    <router-link
                      :to="{ name: 'detail', params: { goodsId: item.id } }"
                      >{{ item.title }}</router-link
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <!-- 需要我们传递总条数 连续页个数 当前页 和 每页大小 (总页数可以计算得到) -->
          <!-- 自定义事件 用于点击页码按钮 -->
          <Pagination
            :totalNo="searchInfo.total"
            :continueNo="5"
            :currentNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            @changePageNo="changePageNo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
import Pagination from "@/components/Pagination";
export default {
  name: "Search",

  components: {
    SearchSelector,
    Pagination,
  },
  data() {
    return {
      searchParams: {
        // 初始化搜索参数
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        props: [],
        trademark: "",
        // 默认的搜索条件
        order: "1:desc",
        pageNo: 1,
        pageSize: 15,
      },
    };
  },
  // 搜索的一个顺序：在挂载前构造好参数，
  beforeMount() {
    this.handleSearchParams();
  },
  // 挂载时使用参数进行搜索
  mounted() {
    this.getSearchInfo();
  },
  methods: {
    // 分发action，请求数据
    getSearchInfo() {
      this.$store.dispatch("getSearchInfo", this.searchParams);
    },
    // 构造参数，变更参数(beforeMount只会调用一次，后期想要再次发请求需要监视)
    handleSearchParams() {
      // 三级菜单是query参数
      let { category1Id, category2Id, category3Id, categoryName } =
        this.$route.query;
      // 搜素栏是params
      let { keyWord } = this.$route.params;

      // 修改搜索参数
      this.searchParams = {
        ...this.searchParams,
        category1Id,
        category2Id,
        category3Id,
        categoryName,
        keyword: keyWord,
      };

      // 在使用参数搜索之前 去除掉空串属性
      // 快速遍历数组 Object.keys
      Object.keys(this.searchParams).forEach((key) => {
        if (this.searchParams[key] === "") delete this.searchParams[key];
      });
    },
    // 清除搜索分类按钮
    clearCategory() {
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      this.searchParams.categoryName = undefined;
      // this.getSearchInfo();
      // 这样写有bug 路径没变
      // 解决办法：编程式路由导航push一下,这样路径改变驱动watch，
      // watch去重新发送请求获取数据
      // *同页面跳转不要用push，用replace
      this.searchParams.pageNo = 1;
      this.$router.replace({ name: "search", params: this.$route.params });
    },
    // 清除关键字按钮
    clearKeyword() {
      this.searchParams.keyword = undefined;
      // 利用全局事件总线 触发事件 通知header清除关键字
      this.$bus.$emit("clearKeyword");
      // this.getSearchInfo();
      this.searchParams.pageNo = 1;
      this.$router.replace({ name: "search", query: this.$route.query });
    },
    // 清除标签回调
    clearTrademark() {
      this.searchParams.trademark = undefined;
      this.searchParams.pageNo = 1;

      this.getSearchInfo();
    },
    // 清除属性回调
    clearProp(index) {
      this.searchParams.props.splice(index, 1);
      this.searchParams.pageNo = 1;

      this.getSearchInfo();
    },
    // 根据标签搜索（数据来自子组件）
    searchByTrademark(trademark) {
      // console.log(trademark);

      // 修改参数
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      // trademark不在请求路径里，所以直接重新请求数据就可以了
      this.searchParams.pageNo = 1;

      this.getSearchInfo();
    },
    // 根据属性搜索（数据来自子组件）
    searchByProp(id, value, name) {
      const prop = `${id}:${value}:${name}`;

      // 在根据属性搜索前，需要判断是否以及存在
      // some函数 如果数组有一个条件满足就返回true
      // every函数 数组中必须全部满足条件返回true
      if (this.searchParams.props.some((item) => item === prop)) return;

      // 给参数的props追加prop
      this.searchParams.props.push(prop);
      this.searchParams.pageNo = 1;

      // 发送请求
      this.getSearchInfo();
    },
    // 更改排序 逻辑：点击的是否是同一种排序方式：如果是的话更改升序降序 否则的话更改排序方式
    changeSort(sortType) {
      // 获取当前的排序模式和升降序
      let oSortType = this.sortType;
      let oSortOrder = this.sortOrder;

      // 更改升降序
      if (oSortType === sortType) {
        this.searchParams.order = `${sortType}:${
          oSortOrder === "desc" ? "asc" : "desc"
        }`;
      }
      // 更改排序类型 升降序默认为降序
      else {
        this.searchParams.order = `${sortType}:desc`;
      }

      // 重新发送请求
      this.getSearchInfo();
    },
    // 点击页码按钮，修改参数重发请求
    changePageNo(pageNo) {
      this.searchParams.pageNo = pageNo;
      this.getSearchInfo();
    },
  },
  computed: {
    // 从vuex中取出商品列表
    ...mapGetters(["goodsList"]),
    sortType() {
      return this.searchParams.order.split(":")[0];
    },
    sortOrder() {
      return this.searchParams.order.split(":")[1];
    },
    // 取出searchInfo 进而取出总条数和总页数
    ...mapState({ searchInfo: (state) => state.search.searchInfo }),
  },
  watch: {
    // 监视路由 一旦路径发生变化，更新搜索参数并重新请求数据
    $route() {
      this.handleSearchParams();
      this.getSearchInfo();
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>