<template>
  <div class="container">
    <div class="f-container">
      <el-breadcrumb
        class="Breadcrumb"
        separator="/"
      >
        <el-breadcrumb-item class="bread-home" :to="{ path: '/' }">{{ $t("common.HOME") }}</el-breadcrumb-item>
        <el-breadcrumb-item
          v-for="(v,i) in breadcrumb"
          :key="'breadcrumb'+i"
        >
          <a @click="goParentNav(v,i)">{{v.category_name}}</a>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <h1 v-if="breadcrumb.length" class="currentcategory">{{breadcrumb[breadcrumb.length-1].category_name}}</h1>
      <h1 v-else class="currentcategory">Products</h1>
      <div
        class="listCard"
        v-loading="loadShow"
      >
        <el-row :gutter="20">
          <el-col
            :lg="6"
            :sm="8"
            :xs="12"
            class="el-col-item"
          >
            <div class="leftNav" v-if="leftnav.length && breadcrumb.length">
              <p :class="v.category_name == breadcrumb[breadcrumb.length-1].category_name ? 'selectedNav' : ''" v-for="(v,k) in leftnav" @click="goCategoryList(v)" :key="'leftNav'+k">{{v.category_name}}</p>
            </div>
          </el-col>
          <el-col
            :lg="6"
            :sm="8"
            :xs="12"
            v-for="(item, index) in shopData"
            :key="index"
            class="el-col-item"
          >
            <list-card
              class="shopItem"
              :index="index"
              :shopObj="item"
            ></list-card>
          </el-col>
        </el-row>
        <div
          class="loadingCoat"
          v-show="!shopData.length && !loadShow"
        >
          <img
            src="~/static/images/img/noSearchResults.png"
            alt=""
          >
          <div class="noSearchResults">{{ $t("shopList.noSearchResults") }}</div>
          <div class="HotSearched">{{ $t("shopList.HotSearched") }}</div>
          <ul>
            <li
              @click="popularSearch(v)"
              v-for="(v,key) in popularSearches"
              :key="key"
              :index="v"
            >{{v}}</li>
          </ul>
        </div>
        <div class="pangia" v-if="shopData.length">
          <div @click="prevPage" class="left-prev" v-if="pageData.current_page != 1"><i class="el-icon-arrow-left"></i></div>
          <ul>
            <li v-for="(k,j) in pageData.total_page" :key="'pag-data'+j" @click="goPageNum(k)" :class="k == pageData.current_page ? 'selectedli' : ''">{{k}}</li>
          </ul>
          <div @click="nextPage" class="right-next" v-if="pageData.current_page != pageData.total_page"><i class="el-icon-arrow-right"></i></div>
        </div>
        <div
          v-if="cancelShow && !loadShow"
          class="cancel"
          @click="cancel"
        >cancel</div>
      </div>
      <el-backtop :right="10">
        <img
          src="~/static/images/icon/goTop.svg"
          class="toTop"
        >
      </el-backtop>
    </div>
    <f-footer></f-footer>
  </div>
</template>
<script>
let isServer = true;
import listCard from "@/components/listCard/listCard";
import fFooter from "@/components/footer/f-footer";
import common from "~/utils/common";
let page = 1;
export default {
  name: "shopList",
  components: {
    fFooter,
    listCard
  },
  watch: {
    $route(to, from) {
      // console.log(this.$route, "params1111");
      let { category, search, navName, parentNavName, pid } = this.$route.query;
      this.pid = pid;
      this.category = category;
      this.search = search;
      this.navName = navName;
      this.parentNavName = parentNavName;
      this.pages = 1;
      this.shopData = [];
      console.log(this.pages);
      if (this.pages <= 1) {
        this.forbidPrevPageClick = true;
        this.forbidNextPageClick = false;
      }
      this.getShopData(category, search);
      this.buryingPoint.ViewCategory(navName);
    }
  },
  async asyncData({ params, store, app, error, route }) {
    let { search, category, tag } = route.query;
    if (process.server) {
      try {
        let fetchData = {};
        const shopList = await app.$apis.getShopList({
          keywords: search,
          orderby: "recommend",
          per_page: 11,
          category_id: category,
          tag_id: tag,
          page: fetchData.pages
        });
        if (shopList.status == 1) {
          fetchData.shopData = shopList.data.items;
          fetchData.leftnav = shopList.data.leftnav;
          fetchData.pageData = shopList.data.pages;
          if (shopList.data.breadcrumb.length) {
            fetchData.breadcrumb = shopList.data.breadcrumb;
          } else {
            if (route.query.search) {
              fetchData.breadcrumb = [
                {
                  category_name: route.query.search
                }
              ];
            }
          }
          if (!shopList.data.length) {
            fetchData.getHotKeywordShow = true;
          }
        }
        return fetchData;
      } catch (error) {
        console.log(error);
        return {};
      }
    } else {
      isServer = false;
    }
  },
  data() {
    return {
      loadShow: false,
      isNowState: false,
      isDataState: false,
      getHotKeywordShow: false,
      isScroll: true,
      pages: 1,
      classData: {},
      shopData: [],
      breadcrumb: [],
      pageData: null,
      leftnav: [],
      popularSearches: [], //热搜
      sortType: 1,
      priceType: "price-desc",
      priceIcon: "el-icon-d-caret",
      pid: this.$route.query.pid,
      category: this.$route.query.category,
      search: this.$route.query.search,
      navName: this.$route.query.navName,
      parentNavName: this.$route.query.parentNavName,
      forbidPrevPageClick: false,
      forbidNextPageClick: false,
      viewMoreNoShow: false,
      cancelShow: false
    };
  },
  mounted() {
    if (this.pages <= 1) {
      this.forbidPrevPageClick = true;
    }
    this.buryingPoint.pageView();
    this.buryingPoint.ViewCategory(this.$route.query.navName);
    if (!isServer) {
      this.getShopData(this.category, this.search);
    }
    if (this.getHotKeywordShow) {
      this.getHotKeyword();
    }
  },
  methods: {
    cancel() {
      // this.$router.history.go(-1);
      this.$router.push({
        path: "/"
      });
    },
    prevPage(){
      let {current_page,total_page} = this.pageData;
      if(current_page > 1){
        this.pages--;
        this.getShopData(this.category, this.search);
      }
    },
    nextPage(){
      let {current_page,total_page} = this.pageData;
      if(current_page < total_page){
        this.pages++;
        this.getShopData(this.category, this.search);
      }
    },
    goPageNum(pageNum){
      this.pages = pageNum;
      this.getShopData(this.category, this.search);
    },
    //接口返回热搜数据
    getHotKeyword() {
      this.$apis
        .getHotSearchKeywords({}, {})
        .then(res => {
          if (res.status == 1) {
            this.popularSearches = res.data.items;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //跳到分类页获取搜索的分类商品列表
    popularSearch(search) {
      this.$router.push({
        path: "/categories",
        query: {
          search,
          parentNavName: "HOME",
          navName: search
        }
      });
    },
    //leftNav
    goCategoryList(v){
      this.$router.push({
        path: "/categories",
        query: {
          category: v.category_id
        }
      });
    },
    //面包屑
    goParentNav(v, i) {
      if (i == this.breadcrumb.length - 1) {
        return;
      }
      let parentNavName =
        i - 1 >= 0
          ? this.breadcrumb[i - 1].category_name
          : this.$t("common.HOME");
      let pid = i - 1 >= 0 ? this.breadcrumb[i - 1].category_id : "";
      let navName = v.category_name;
      console.log(parentNavName, navName, v);
      this.$router.push({
        path: "/categories",
        query: {
          category: v.category_id,
          parentNavName,
          navName,
          pid
        }
      });
    },
    sortTypeClick(type) {
      this.pages = page;
      if (this.sortType == type && type == 1) {
        return;
      }
      this.sortType = type;
      if (type != 1) {
        if (this.priceType == "price-desc") {
          this.priceType = "price-asc";
          this.priceIcon = "el-icon-caret-top";
        } else {
          this.priceType = "price-desc";
          this.priceIcon = "el-icon-caret-bottom";
        }
      } else {
        this.priceType = "price-desc";
        this.priceIcon = "el-icon-d-caret";
      }
      this.shopData = [];
      this.getShopData(this.category, this.search);
    },
    getShopData(category, search) {
      let thif = this;
      this.loadShow = true;
      let orderby = "";
      if (thif.sortType == 1) {
        orderby = "recommend";
      } else {
        orderby = thif.priceType;
      }
      this.$apis
        .getShopList(
          {
            keywords: search,
            orderby,
            per_page: 11,
            category_id: category,
            tag_id: this.$route.query.tag,
            page: this.pages
          },
          {}
        )
        .then(res => {
          if (res.status == 1) {
            thif.loadShow = false;
            thif.shopData = res.data.items;
            thif.pageData = res.data.pages;
            thif.leftnav = res.data.leftnav;
            if (res.data.breadcrumb.length) {
              thif.breadcrumb = res.data.breadcrumb;
            } else {
              if (this.$route.query.search) {
                this.breadcrumb = [
                  {
                    category_name: this.$route.query.search
                  }
                ];
              }
            }
          } else {
            thif.loadShow = false;
            thif.common.msgBox(thif, res.msg, 3);
          }
          if (res.data.items.length == 0) {
            thif.loadShow = false;
            thif.viewMoreNoShow = true;
            thif.cancelShow = true;
            thif.getHotKeyword(); //无商品才请求Hot searched
          } else {
            thif.cancelShow = false;
            thif.viewMoreNoShow = false;
          }
        })
        .catch(err => {
          thif.loadShow = false;
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  .listCard {
    min-height: 500px;
    .el-col-item{
      min-height: 415px;
    }
    .leftNav{
      width: 2.76rem;
      p{
        font-size: .18rem;
        color: #172D55;
        cursor: pointer;
      }
      p:hover{
        margin-left: .1rem;
        transition: 0.5s;
      }
      p:not(:last-child){
        margin-bottom: .22rem;
      }
    }
    .selectedNav{
      font-weight: bold;
      font-size: .19rem;
    }
  }
  .currentcategory{
    // font-weight: 600;
    font-size: .6rem;
    text-align: center;
    letter-spacing: 0.1em;
    margin: 0 0 .4rem;
  }
}
.f-container {
  flex: 1 1 auto;
  /deep/ .el-breadcrumb {
    line-height: 4 !important;
    margin: -4px 0px 30px 0px;
  }
  .Breadcrumb {
    line-height: 4 !important;
    /deep/ .el-breadcrumb__item {
      font-size: .14rem;
      // /deep/ .el-breadcrumb__inner {
      //   a {
      //     color: #172d55;
      //     font-weight: normal;
      //   }
      // }
    }
    // /deep/ .el-breadcrumb__item:last-child {
    //   /deep/ .el-breadcrumb__inner {
    //     a {
    //       color: $fontColor1;
    //       font-weight: 600;
    //     }
    //   }
    // }
  }
}
.toTop {
  width: 100%;
  height: 100%;
}
.loadingCoat {
  margin-top: 12px;
  text-align: center;
  img {
    height: 180px;
  }
  .noSearchResults {
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 22px;
    color: $fontColor1;
    margin-top: 48.9px;
  }
  .HotSearched {
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 22px;
    color: $fontColor1;
    margin-top: 130px;
  }
  ul {
    width: 700px;
    display: flex;
    flex-wrap: wrap;
    margin: 50px auto 230px;
    li {
      margin: 12px 20px;
      cursor: pointer;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-style: normal;
      font-weight: 300;
      font-size: 14px;
      line-height: 32px;
      text-align: center;
      color: #666666;
      height: 32px;
      max-width: 150px;
      background: #eeeeee;
      border-radius: 16px;
      padding: 0 16px;
    }
  }
}
.pangia{
  font-size: .14rem;
  display: flex;
  margin: .9rem 0 .8rem;
  justify-content: center;
  .left-prev,.right-next{
    width: .4rem;
    height: .4rem;
    border-radius: 50%;
    background: #172D55;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    i{
      color: #fff;
      font-size: .16rem;
    }
  }
  ul{
    display: flex;
    padding: 0 .2rem;
    align-items: center;
    li{
      cursor: pointer;
    }
    li:not(:last-child){
      margin-right: .2rem;
    }
    .selectedli{
      color: #999999;
    }
  }
}
// .mypagination-categories {
//   text-align: center;
//   /deep/ .el-pager li {
//     width: 40px;
//     height: 40px;
//     line-height: 40px;
//     border-radius: 50%;
//     font-size: 24px;
//     color: #9b9b9b !important;
//     border: 1px solid #9b9b9b;
//   }
//   /deep/ .el-pager li {
//     margin-right: 10px;
//   }
//   /deep/ .el-pager li.active {
//     color: #fff !important;
//     background: $fontColorBlue !important;
//   }
// }
.viewMore,
.cancel {
  width: 177px;
  height: 35px;
  background: #c8c8c8;
  border-radius: 5px;
  text-align: center;
  line-height: 35px;
  cursor: pointer;
  margin: 60px auto;
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
}
.pagination {
  margin: 60px auto 60px;
  width: 600px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .pageNum {
    font-weight: 300;
    font-size: 16px;
    line-height: 24px;
    color: $fontColor1;
  }
  .prev-left,
  .next-right {
    width: 120px;
    height: 40px;
    background: $fontColorBlue;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
    position: relative;
    .title {
      font-size: 14px;
      line-height: 40px;
      color: #ffffff;
      text-align: center;
    }
  }
  .forbidPrev,
  .forbidNext {
    cursor: not-allowed;
    background: #ece4e4;
  }
  .prev-left {
    .previous:before {
      content: "";
      position: absolute;
      left: 7px;
      top: 14px;
      border: 6px solid transparent;
      border-right-color: #ffffff;
    }
  }
  .next-right {
    .next:after {
      content: "";
      position: absolute;
      right: 18px;
      top: 13px;
      border: 6px solid transparent;
      border-left-color: #ffffff;
    }
  }
}
.Breadcrumb {
  line-height: 4 !important;
  .bread-home{
    /deep/ span{
      color: #3B65B3!important;
      font-size: .14rem!important;
    }
  }
  // /deep/ .el-breadcrumb__item {
  //   /deep/ .el-breadcrumb__inner {
  //     a {
  //       color: #555555;
  //       font-weight: 300;
  //     }
  //   }
  //   .is-link {
  //     color: #555555;
  //     font-weight: 300;
  //   }
  // }
  // /deep/ .el-breadcrumb__item:last-child {
  //   /deep/ .el-breadcrumb__inner {
  //     color: $fontColor1;
  //     font-weight: 600;
  //   }
  // }
}
.shopItem {
  margin-bottom: 32px;
  width: 2.76rem;
}
</style>
