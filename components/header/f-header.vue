<template>
  <div>
    <div
      class="topbarUseofprotocolBAR"
      v-if="showpPrivacy"
    >
      {{
      $t("header.ByUsing1")
      }}
      <nuxt-link to="/footPage/Privacy">
        <span style="font-size: 14px;   text-decoration: underline;  cursor: pointer;color: white">
          {{
          $t("header.ByUsing2")
          }}
        </span>
      </nuxt-link>
      <div
        @click="closepbar()"
        class="closetopbaruserofprotocolBAR"
      >
        {{
        $t("header.ByUsingOk")
        }}
      </div>
    </div>
    <div class="top-header">
      <div class="f-coat moveHide">
        <!-- 货币与国家切换 -->
        <div class="fh-country">
          <!-- 货币切换 -->
          <el-menu
            class="currency-switching-menu"
            mode="horizontal"
            @select="menuSelCurrency"
          >
            <el-submenu index="1">
              <template slot="title">
                <img
                  v-if="$store.getters.getCurrency == 'EUR'"
                  src="~/static/images/icon/EUR.jpg"
                >
                <img
                  v-else-if="$store.getters.getCurrency == 'USD'"
                  src="~/static/images/icon/usd.jpg"
                >
                <img
                  v-else-if="$store.getters.getCurrency == 'GBP'"
                  src="~/static/images/icon/GBP.jpg"
                >
                <img
                  v-else-if="$store.getters.getCurrency == 'VND'"
                  src="~/static/images/icon/VND.jpg"
                >
                <span>{{ $store.getters.getCurrency }}</span>
              </template>
              <el-menu-item
                v-for="(v,i) in $store.getters.getCurrencyObj"
                :key="i"
                :index="JSON.stringify(v)"
              >{{ v.country }} ({{ $store.getters.getCurrencyArr[v.country].Symbol }})</el-menu-item>
            </el-submenu>
          </el-menu>
          <!-- 国家切换 -->
          <el-menu
            class="country-switching-menu"
            mode="horizontal"
            @select="menuSelCountry"
          >
            <el-submenu index="2">
              <template slot="title">
                <img
                  class="fh-position"
                  src="~/static/images/icon/positionIcon.png"
                  alt=""
                >
                <!-- <span>{{ country }}</span> -->
                <span>{{$store.getters.getCountry}}</span>
              </template>
              <el-menu-item
                v-for="(v, key) in $store.getters.getCountryArr"
                :key="key"
                :index="JSON.stringify({v,key})"
              >{{ v.country }}</el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
        <!-- 头部logo -->
        <div class="logo">
          <img
            src="~/static/images/logo1.png"
            @click="toHome"
            alt="foroo"
          >
        </div>
        <!-- 搜索、登录、购物车 -->
        <div class="hRight">
          <!-- 搜索记录框 -->
          <el-popover
            ref="popover"
            v-model="searchVisible"
            :visible-arrow="false"
            placement="bottom"
            title=""
            width="376"
            trigger="click"
            @show="showSearchPopover"
          >
            <!-- 历史搜索 -->
            <div class="history-search">
              <span>
                {{
                $t("header.HistorySearches")
                }}
              </span>
              <i
                @click="deleteHistorySearch"
                class="el-icon-delete"
              ></i>
            </div>
            <div
              v-if="!historySearches || !historySearches.length"
              class="no-history"
            >
              {{
              $t("header.NoSearches")
              }}
            </div>
            <div
              v-else
              class="yes-history"
            >
              <ul>
                <li
                  @click="historySearch(v)"
                  v-for="(v,key) in historySearches"
                  :key="key"
                  :index="v"
                >{{v}}</li>
              </ul>
            </div>
            <!-- 热门搜索 -->
            <div class="popular-search">
              <span>
                {{$t("header.PopularSearches")
                }}
              </span>
            </div>
            <div
              class="yes-popular"
              v-loading="popularSearchesLoading"
            >
              <ul>
                <li
                  @click="popularSearch(v)"
                  v-for="(v,key) in popularSearches"
                  :key="key"
                  :index="v"
                >{{v}}</li>
              </ul>
            </div>
          </el-popover>
          <div class="search">
            <div class="iptCoat">
              <input
                v-popover:popover
                @keyup.enter="onSubmit"
                v-model="categoriesSearch"
                type="text"
                placeholder="Search"
              >
              <span
                @click="searchCategories"
                class="el-icon-search"
              ></span>
            </div>
          </div>
          <el-menu
            class="iconCoat-user"
            mode="horizontal"
          >
            <el-submenu
              index="1"
              ref="user"
              id="user"
            >
              <template slot="title">
                <div
                  v-if="!this.$store.getters.getLoginToken"
                  @click="goLogin"
                  class="user-title-box"
                >
                  <img
                    slot="reference"
                    src="~/static/images/icon/account@2x.png"
                    class="b-cursor"
                    alt=""
                  >
                  <p class="user-p">{{$t("header.LOGIN")}}</p>
                </div>
                <div
                  v-else
                  class="user-title-box"
                >
                  <img
                    slot="reference"
                    src="~/static/images/icon/account@2x.png"
                    class="b-cursor"
                    alt=""
                  >
                  <p class="user-p">{{$t("header.PROFILE")}}</p>
                </div>
              </template>
              <el-menu-item
                index="1-1"
                v-if="this.$store.getters.getLoginToken"
              >
                <!-- <nuxt-link
                to="/user/address"
                >{{$store.getters.getUserInfo ? $store.getters.getUserInfo.nickname : ''}}</nuxt-link>-->
                <nuxt-link to="/user/address">{{$t("header.MyAccount")}}</nuxt-link>
              </el-menu-item>
              <el-menu-item
                index="1-2"
                @click="setLoginDialogVisible"
                v-else
              >
                <a>{{$t("header.SignOrRegister")}}</a>
              </el-menu-item>
              <el-menu-item index="1-3">
                <nuxt-link
                  v-if="this.$store.getters.getLoginToken"
                  to="/user/address"
                >
                  {{
                  $t("header.Addresses")
                  }}
                </nuxt-link>
                <nuxt-link
                  v-else
                  to="/login"
                >
                  {{
                  $t("header.Addresses")
                  }}
                </nuxt-link>
              </el-menu-item>
              <el-menu-item index="1-4">
                <nuxt-link
                  v-if="this.$store.getters.getLoginToken"
                  to="/user/order"
                >
                  {{
                  $t("header.Orders")
                  }}
                </nuxt-link>
                <nuxt-link
                  v-else
                  to="/login"
                >
                  {{
                  $t("header.Orders")
                  }}
                </nuxt-link>
              </el-menu-item>
              <el-menu-item index="1-5">
                <nuxt-link
                  v-if="this.$store.getters.getLoginToken"
                  to="/user/coupon"
                >
                  {{
                  $t("header.Coupons")
                  }}
                </nuxt-link>
                <nuxt-link
                  v-else
                  to="/login"
                >
                  {{
                  $t("header.Coupons")
                  }}
                </nuxt-link>
              </el-menu-item>
              <el-menu-item
                index="1-6"
                @click="toLogin"
                v-if="this.$store.getters.getLoginToken"
              >
                <a>{{$t("header.Signout")}}</a>
              </el-menu-item>
            </el-submenu>
          </el-menu>
          <!-- 购物车 -->
          <div
            class="iconCoat"
            @click="openCartDrawer"
          >
            <el-badge
              :value="!this.$store.getters.getCartNum ? '' : this.$store.getters.getCartNum"
              class="el-badge-item"
            >
              <img
                src="~/static/images/icon/cart@4x.png"
                class="b-cursor"
                alt=""
              >
              <p class="cart-p">{{$t("header.CART")}}</p>
            </el-badge>
          </div>
          <!-- 购物车Drawer -->
          <cart-list-drawer
            @reloadHeader="reloadHeader"
            :dialogVisible="this.$store.getters.getCartDialogVisible"
          ></cart-list-drawer>
        </div>
      </div>
    </div>
    <div v-loading="!topNavigationBarArr.length || !navArr.length">
      <!-- 竖向分类导航 -->
      <div class="DownCoat moveHide">
        <div
          class="fh-selShow"
          @mouseover="openAllCategories"
          @mouseout="closeAllCategories"
        >
          <el-menu
            class="all-categories-menu"
            mode="horizontal"
            @select="handleSelect1"
          >
            <el-submenu
              class="all-categories-submenu"
              index="3"
            >
              <template
                slot="title"
                v-if="navArr.length"
              >
                <span>
                  <img
                    v-if="!menuIsActive"
                    class="menuIsActive"
                    src="~/static/images/icon/menu-noActive.png"
                  >
                  <img
                    v-if="menuIsActive"
                    class="menuIsActive"
                    src="~/static/images/icon/menu-active.png"
                  >
                </span>
                <span>{{$t("header.ALLCATEGORIES")}}</span>
              </template>
              <component
                class="menu-item"
                v-for="(value,index) in navArr"
                :key="String(index)"
                :index="JSON.stringify({value})"
                :is="(value.children&&value.children.length>0)?'el-submenu':'el-menu-item'"
              >
                <template slot="title">
                  <div>{{value.category_name}}</div>
                  <!-- <div @click="handleOpen1(value)">{{value.name}}</div> -->
                </template>
                <el-menu-item
                  v-for="(v,i) in value.children"
                  :key="String(i)"
                  :index="JSON.stringify({'item': v, 'parentName': value.category_name})"
                >{{v.category_name}}</el-menu-item>
              </component>
            </el-submenu>
          </el-menu>
        </div>
        <!-- 横向分类导航 -->
        <!-- active-text-color="$fontColorBlue" -->
        <div class="navCoat">
          <el-menu
            class="el-menu-activeIndex2"
            :default-active="activeIndex2"
            mode="horizontal"
            @select="handleSelect2"
          >
            <component
              class="menu-item"
              v-for="(value,index) in topNavigationBarArr"
              :key="String(index)"
              :index="JSON.stringify({value})"
              :is="(value.children&&value.children.length>0)?'el-submenu':'el-menu-item'"
            >
              <template slot="title">
                <span @click="handleSelectTopNavigationBar(value)">{{value.name}}</span>
              </template>
              <template v-if="value.children&&value.children.length>0">
                <el-menu-item
                  class="menu-item"
                  v-for="(v,i) in value.children"
                  :key="String(i)"
                  :index="JSON.stringify({'item': v,'parentName': value.name})"
                >{{v.category_name}}</el-menu-item>
              </template>
            </component>
          </el-menu>
        </div>
      </div>
    </div>
    <login-register
      @reloadHeader="reloadHeader"
      :dialogVisible="this.$store.getters.getLoginDialogVisible"
    ></login-register>
  </div>
</template>

<script>
import jsCookie from "@/utils/js-cookie";
import { Loading } from "element-ui";
import cartListDrawer from "@/components/cart/cartListDrawer";
import loginRegister from "@/components/login";
export default {
  name: "f-hender",
  components: {
    cartListDrawer,
    loginRegister
  },
  props: {
    navIndex: {
      type: String
    }
  },
  data() {
    return {
      navActive: 0,
      navArr: [],
      topNavigationBarArr: [],
      navActiveName: "",
      sendData: {},
      countryArr: null, //国家集合
      currencyArr: {}, //币种数组
      currency: "", // 当前显示币种
      country: "", //当前显示国家
      asideShow: false,
      direction: "ltr",
      sideSel1: false,
      sideSel2: false,
      sideSel3: false,
      moveNavActive: "",
      showpPrivacy: "",
      activeIndex2: "",
      cartShow: false,
      cartDrawerShow: false,
      cardShop: [],
      searchVisible: false, //搜索提示框是否显示
      popularSearches: [], //热搜
      popularSearchesLoading: false,
      historySearches: [], //搜索历史记录
      categoriesSearch: "", //搜索框value
      menuIsActive: false, //all-categories的icon是否选中
      navLoading: false,
      allCategoriesShow: false,
      flag: true //防抖参数
    };
  },
  mounted() {
    this.initHome();
    console.log('home++++ test')
  },
  methods: {
    reloadHeader() {
      this.initHome();
    },
    //初始化首頁
    initHome() {
      this.getAllCategories();
      this.getLayoutInit();
      this.getCartInfo();
      this.historySearches = JSON.parse(
        localStorage.getItem("historySearches")
      );
      // showpPrivacy
      let showprivacy = localStorage.getItem("showpPrivacy");
      if (showprivacy == "1") {
        this.showpPrivacy = false;
      } else {
        this.showpPrivacy = true;
      }

      let thif = this;
      if (this.$route.params.listname) {
        this.navActiveName = this.$route.params.listname;
      }
      this.navActive = this.navIndex;
      // this.activeIndex2 = this.navIndex;
      //AllCategories缓存localStorage
      if (
        localStorage.getItem("AllCategories") &&
        !localStorage.getItem("topNavRefresh")
      ) {
        let list = JSON.parse(localStorage.getItem("AllCategories"));
        this.navArr = list;
      } else {
        // this.getAllCategories();
        // localStorage.removeItem("topNavRefresh");
      }
      //Layout缓存localStorage
      if (
        localStorage.getItem("topNavigationBar") &&
        !localStorage.getItem("topNavRefresh")
      ) {
        let list = JSON.parse(localStorage.getItem("topNavigationBar"));
        this.topNavigationBarArr = list;
      } else {
        // this.getLayoutInit();
        // localStorage.removeItem("topNavRefresh");
      }
    },
    //enter事件搜索
    onSubmit() {
      if (!this.categoriesSearch) {
        return;
      }
      // this.goToCategories(this.categoriesSearch);
      this.searchCategories();
    },
    //搜索商品类别
    searchCategories() {
      let search = this.categoriesSearch;
      if (!search) {
        return;
      }
      this.buryingPoint.search(search);
      this.goToCategories(search);
      if (localStorage.getItem("historySearches")) {
        let list = JSON.parse(localStorage.getItem("historySearches"));
        if (list.includes(search)) {
          return;
        }
        list.push(search);
        if (list.length >= 9) {
          return;
        }
        localStorage.setItem("historySearches", JSON.stringify(list));
      } else {
        let list = [];
        list.push(search);
        localStorage.setItem("historySearches", JSON.stringify(list));
      }
      this.historySearches = JSON.parse(
        localStorage.getItem("historySearches")
      );
    },
    //删除历史搜索
    deleteHistorySearch() {
      localStorage.removeItem("historySearches");
      this.historySearches = [];
    },
    //历史搜索
    historySearch(v) {
      this.searchVisible = false;
      this.categoriesSearch = v;
      this.goToCategories(v);
    },
    //热搜
    popularSearch(v) {
      this.searchVisible = false;
      this.categoriesSearch = v;
      this.goToCategories(v);
    },
    //接口返回热搜数据
    getHotKeyword() {
      this.popularSearchesLoading = true;
      this.$apis
        .getHotSearchKeywords({}, {})
        .then(res => {
          this.popularSearchesLoading = false;
          if (res.status == 1) {
            this.popularSearches = res.data.items;
          }
        })
        .catch(err => {
          this.popularSearchesLoading = false;
          console.log(err);
        });
    },
    //显示搜索popover时触发热搜接口，第一次没有热搜数据时请求接口，有的话就不请求
    showSearchPopover() {
      if (!this.popularSearches.length) {
        this.getHotKeyword();
      }
    },
    //跳到分类页获取搜索的分类商品列表
    goToCategories(search) {
      let { navName, parentNavName } = this.$route.query;
      this.$router.push({
        path: "/categories",
        query: {
          search,
          parentNavName: "Home",
          navName: search
        }
      });
    },
    // 获取所有分类导航
    getAllCategories() {
      let thif = this;
      this.$apis
        .getAllCategories()
        .then(res => {
          if (res.status == 1) {
            //将Women's Clothing类的数据存在全局store供Women's Clothing专区使用
            // if(res.data.length){
            //   thif.$store.dispatch("actWomenClothing", res.data[0]);
            // }
            let list = res.data.items;
            for (var index = 0; index < list.length; index++) {
              if (list[index].children && list[index].children.length > 0) {
                list[index].children.unshift({
                  category_id: list[index].category_id,
                  category_name: this.$t("header.ViewAll"),
                  children: [],
                  image: "",
                  level: "1",
                  pid: "0", //一级分类没有父分类pid为0
                  slug: list[index].category_name
                });
              }
            }
            thif.navArr = list;
            localStorage.setItem("AllCategories", JSON.stringify(list));
          } else {
            thif.common.msgBox(thif, res.msg, 3);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 获取顶部导航
    getLayoutInit() {
      let thif = this;
      this.navLoading = true;
      this.$apis
        .getLayout()
        .then(res => {
          if (res.status == 1) {
            thif.navLoading = false;
            thif.allCategoriesShow = true;
            let list = res.data.items;
            for (var index = 0; index < list.length; index++) {
              list[index].children.unshift({
                category_id: list[index].relation_id,
                category_name: this.$t("header.ViewAll"),
                image: "",
                level: "1",
                pid: "", //all没有pid
                slug: list[index].name
              });
            }
            thif.topNavigationBarArr = list;
            localStorage.setItem("topNavigationBar", JSON.stringify(list));
          } else {
            thif.navLoading = false;
            thif.common.msgBox(thif, res.msg, 3);
          }
        })
        .catch(error => {
          thif.navLoading = false;
          console.log(error);
        });
    },
    goLogin() {
      this.$router.push({ path: "/login" });
    },
    setLoginDialogVisible() {
      this.$store.dispatch("loginDialogVisible", true);
    },
    closepbar() {
      localStorage.setItem("showpPrivacy", "1");
      this.showpPrivacy = false;
    },
    //国家切换
    menuSelCountry(v) {
      console.log(
        "menuSelCountry++--***",
        this.$store.getters.getCurrencySymbol
      );
      let item = JSON.parse(v);
      let obj = JSON.parse(this.$store.getters.getInitDataObj);
      obj.countryName = item.v.country;
      obj.countryKey = item.key;
      this.$store.dispatch("actInitDataObj", JSON.stringify(obj));
      let d = new Date();
      d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);
      let expires = d.toUTCString();
      document.cookie =
        "initDataObj=" +
        JSON.stringify(obj) +
        "; expires=" +
        expires +
        "; Path=/";
      //如果切换了国家，给定一个标识，头部导航也跟着更新
      localStorage.setItem("topNavRefresh", true);
      location.reload();
    },
    //币种切换
    menuSelCurrency(v) {
      console.log("menuSelCurrency--");
      let item = JSON.parse(v);
      let obj = JSON.parse(this.$store.getters.getInitDataObj);
      obj.currency = item.country;
      this.$store.dispatch("actInitDataObj", JSON.stringify(obj));
      let d = new Date();
      d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);
      let expires = d.toUTCString();
      document.cookie =
        "initDataObj=" +
        JSON.stringify(obj) +
        "; expires=" +
        expires +
        "; Path=/";
      location.reload();
    },
    getCartInfo() {
      this.$apis
        .getCart({}, this.$store.getters.getApiHeader)
        .then(res => {
          this.loading = false;
          if (res.status == 1) {
            let count = 0;
            for (let i = 0; i < res.data.items.length; i++) {
              count += res.data.items[i].quantity;
            }
            this.$store.dispatch("actCartNum", Number(count));
          } else {
            this.common.msgBox(this, res.msg, 3);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //打开购物车Drawer侧边栏事件
    openCartDrawer() {
      this.$store.dispatch("cartDialogVisible", true);
    },
    toCart() {
      this.$router.push({ path: "/cart" });
    },
    toLogin() {
      if (this.$store.getters.getLoginToken) {
        Loading.service({
          lock: true,
          text: "Sign Out",
          background: "rgba(0, 0, 0, 0.7)"
        });
        this.$apis
          .logOut(
            { user_id: this.$store.getters.getUserId },
            this.$store.getters.getApiHeader
          )
          .then(async res => {
            if (res.status == 1) {
              Loading.service().close();
              jsCookie.remove("loginToken");
              jsCookie.remove("userId");
              jsCookie.remove("email");
              await this.$store.dispatch("actLoginToken", "");
              await this.$store.dispatch("actUserId", "");
              await this.$store.dispatch("actEmail", "");
              await this.$store.dispatch("actUserInfo", null);
              await this.$store.dispatch("actCartNum", 0); //退出登录购物车清零
              this.$router.push({ path: "/" });
              // this.$store.dispatch("loginDialogVisible", true);
              this.$store.dispatch("newUserDialogVisible", false);
            } else {
              Loading.service().close();
              // this.common.msgBox(this, res.msg, 3);
            }
          })
          .catch(err => {
            Loading.service().close();
            console.log(err);
          });
      } else {
        Loading.service().close();
        this.$router.push({ path: "/" });
        // this.$store.dispatch("loginDialogVisible", true);
        this.$store.dispatch("newUserDialogVisible", false);
      }
    },
    //竖向分类导航跳转
    handleSelect1(key) {
      this.activeIndex2 = ""; //清空横向导航栏选中状态
      this.searchVisible = false;
      console.log(key, "+++++++");
      let { item, parentName } = JSON.parse(key);
      let { category_id, category_name, pid, slug } = item;
      //导航下一级分类的View All
      if (category_name == "View All") {
        console.log("导航下一级分类的View All");
        this.$router.push({
          path: "/categories",
          query: {
            category: category_id,
            parentNavName: "Home",
            navName: parentName
          }
        });
      } else {
        if (JSON.parse(key).value != undefined) {
          //导航下一级分类
          this.$router.push({
            path: "/categories",
            query: {
              category: JSON.parse(key).value.category_id,
              parentNavName: "Home",
              navName: JSON.parse(key).value.category_name
            }
          });
        } else {
          //导航下一级分类的二级分类
          this.$router.push({
            path: "/categories",
            query: {
              category: category_id,
              parentNavName: parentName,
              navName: category_name,
              pid //把该分类的id传入供存在可点击的面包屑传参跳转使用
            }
          });
        }
      }
    },
    openAllCategories() {
      this.menuIsActive = true;
    },
    closeAllCategories() {
      this.menuIsActive = false;
    },
    //头部一级导航的点击
    handleSelectTopNavigationBar(val) {
      this.$router.push({
        path: "/categories",
        query: {
          category: val.relation_id,
          parentNavName: "Home",
          navName: val.name
        }
      });
      let key = JSON.stringify({
        category_id: val.relation_id,
        category_name: "View All",
        image: "",
        level: "1",
        pid: "",
        slug: val.name
      });
      this.activeIndex2 = key;
    },
    //横向分类导航跳转
    handleSelect2(key) {
      console.log(key, "key");
      this.searchVisible = false;
      let { parentName, item } = JSON.parse(key);
      let { category_id, category_name, pid, slug } = item;
      if (category_name == "View All") {
        console.log("导航下一级分类的View All");
        this.$router.push({
          path: "/categories",
          query: {
            category: category_id,
            parentNavName: "Home",
            navName: parentName
          }
        });
      } else {
        console.log(pid, "导航下一级分类的二级分类");
        this.$router.push({
          path: "/categories",
          query: {
            category: category_id,
            parentNavName: parentName,
            navName: category_name,
            pid //把该分类的id传入供存在可点击的面包屑传参跳转使用
          }
        });
      }
      this.activeIndex2 = key;
    },
    toHome() {
      this.activeIndex2 = "";
      this.$router.push({ path: "/" });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./f-header.scss";

.topbarUseofprotocolBAR {
  background: #2d2f43;
  color: #fff;
  font-size: 14px;
  padding: 10px;
  text-align: center;
}

.closetopbaruserofprotocolBAR {
  background: hsla(0, 0%, 100%, 0.3);
  border-radius: 6px;
  color: #fff;
  cursor: pointer;
  /* float: right; */
  line-height: 26.665px;
  /* line-height: 1.6666rem; */
  margin-left: 10px;
  padding: 6px 10px;
  white-space: nowrap;
  display: initial;
}
</style>
