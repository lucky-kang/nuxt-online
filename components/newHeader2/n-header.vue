<template>
  <div :class="$route.name != 'index' ? 'header-wrapper--overlay notHomeSiteHeader' : 'header-wrapper--overlay isHomeSiteHeader'">
    <transition name="el-zoom-in-top">
      <div
        v-show="showSearch"
        class="transition-box"
      >
        <div class="search-box">
          <div class="search">
            <div class="iptCoat">
              <span
                @click="searchCategories"
                class="el-icon-search"
              ></span>
              <input
                type="text"
                placeholder="Search Our Store"
                @keyup.enter="onSubmit"
                v-model="categoriesSearch"
              >
            </div>
            <div
              @click="closeSearchPopover()"
              class="closeSearchPopover"
            >×</div>
          </div>
          <div class="history-search" v-if="historySearches && historySearches.length">
            <span>
              {{
              $t("header.HistorySearches")
              }}
            </span>
          </div>
          <!-- <div
            v-if="!(!historySearches || !historySearches.length)"
            class="no-history"
          >
            {{
            $t("header.NoSearches")
            }}
          </div> -->
          <div
            v-if="historySearches && historySearches.length"
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
            {{$t("header.PopularSearches")}}
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
        </div>
      </div>
    </transition>
    <div
      v-show="showSearch"
      class="search-shadow"
      @click="closeSearchPopover()"
      :style="'height:'+height+'px'"
    ></div>
    <div :class="siteHeaderOpen ? 'layoutNav site-header--opening site-header--stuck' : 'layoutNav'">
      <div class="layoutNavMiddle">
        <!-- <div class="currency-country" id="currency-country">
          <div :class="currencyListShow ? 'currency currencySelect' : 'currency'" @click="currencySelectClick" id="currency">
            <img
              id="currencyImg"
              v-if="$store.getters.getCurrency == 'EUR'"
              src="~/static/images/icon/EUR.jpg"
            >
            <img
              id="currencyImg"
              v-else-if="$store.getters.getCurrency == 'USD'"
              src="~/static/images/icon/usd.jpg"
            >
            <img
              id="currencyImg"
              v-else-if="$store.getters.getCurrency == 'GBP'"
              src="~/static/images/icon/GBP.jpg"
            >
            <img
              id="currencyImg"
              v-else-if="$store.getters.getCurrency == 'VND'"
              src="~/static/images/icon/VND.jpg"
            >
            <p id="currencyP">{{ $store.getters.getCurrency }}</p>
            <i id="currencyI" class="el-icon-arrow-down"></i>
            <div class="currencyList">
              <div v-for="(v,i) in $store.getters.getCurrencyObj" :key="'currencyItem'+i" class="currencyItem">
                <span @click="menuSelCurrency(JSON.stringify(v))">{{ v.country }} ({{ $store.getters.getCurrencyArr[v.country].Symbol }})</span>
              </div>
            </div>
          </div>
          <div :class="countryListShow ? 'country countrySelect' : 'country'" @click="countrySelectClick" id="country">
            <img id="countryImg" src="~/static/images/icon/positionIcon.png" alt="">
            <p id="countryP">{{$store.getters.getCountry}}</p>
            <i id="countryI" class="el-icon-arrow-down"></i>
            <div class="countryList">
              <div v-for="(v, key) in $store.getters.getCountryArr" :key="'countryItem'+key" class="countryItem">
                <span @click="menuSelCountry(JSON.stringify({v,key}))">{{ v.country }}</span>
              </div>
            </div>
          </div>
        </div> -->
        <img
            v-if="$route.name != 'index' || siteHeaderOpen"
            src="~/static/images/logo1.png"
            @click="toHome"
            class="logo"
        />
        <img
            v-else
            src="~/static/images/logo2.png"
            @click="toHome"
            class="logo"
        />
        <ul>
          <li v-for="(item,index) in navArr" :key="'navG'+index" :class="!item.children.length ? 'noHoverBg' : ''">
            <p class="parentItem" @click="gocategoryList(item)">{{item.category_name}}</p>
            <i v-if="item.children.length" class="el-icon-arrow-down"></i>
            <dl v-if="item.children.length">
              <dt v-for="(v,k) in item.children" :key="'navG'+k">
                <span class="sonItem" @click="gocategoryList(v,item.category_name)">{{v.category_name}}</span>
                <i v-if="v.children.length" class="el-icon-arrow-right"></i>
                <div v-if="v.children.length" class="grandSonItem">
                  <p v-for="(t,j) in v.children" :key="'navG'+j">
                    <span @click="gocategoryList(t,v.category_name)">{{t.category_name}}</span>
                  </p>
                </div>
              </dt>
            </dl>
          </li>
          <li class="noHoverBg" v-if="!$store.state.loginToken">
            <p class="parentItem" @click="goOrderTracking()">Track Your Order</p>
          </li>
        </ul>
        <div class="dl">
          <div class="dt" @click="showSearchPopover()">
            <img v-if="$route.name != 'index' || siteHeaderOpen" src="~/static/images/icon/search2.png" alt="">
            <img v-else src="~/static/images/icon/search1.png" alt="">
          </div>
          <div class="dt account">
            <img v-if="$route.name != 'index' || siteHeaderOpen" src="~/static/images/icon/account2.png" alt="">
            <img v-else src="~/static/images/icon/account1.png" alt="">
            <aside>
              <p @click="setLoginDialogVisible" v-if="!$store.state.loginToken"><span>{{$t("header.SignOrRegister")}}</span></p>
              <p @click="goOrder"><span>{{$t("header.Orders")}}</span></p>
              <p @click="goAddress"><span>{{$t("header.Addresses")}}</span></p>
              <p @click="goCoupon"><span>{{$t("header.Coupons")}}</span></p>
              <p @click="goWishList"><span>{{$t("header.WishList")}}</span></p>
              <p @click="toLogin" v-if="$store.state.loginToken"><span>{{$t("header.Signout")}}</span></p>
            </aside>
          </div>
          <div class="dt" @click="openCartDrawer()">
            <img v-if="$route.name != 'index' || siteHeaderOpen" src="~/static/images/icon/cart2.png" alt="">
            <img v-else src="~/static/images/icon/cart1.png" alt="">
            <span :class="!($route.name != 'index' || siteHeaderOpen) ? 'white-p' : 'blue-p'">{{!$store.getters.getCartNum ? '' : $store.getters.getCartNum}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="top-header" v-if="false">
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
          >
        </div>
        <!-- 搜索、登录、购物车 -->
        <div class="hRight">
          <div class="search">
            <div class="iptCoat">
              <span class="el-icon-search"></span>
              <input
                type="text"
                placeholder="Search Our Store"
                @focus="showSearchPopover()"
              >
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
                  v-if="!$store.state.loginToken"
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
                v-if="$store.state.loginToken"
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
                  v-if="$store.state.loginToken"
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
                  v-if="$store.state.loginToken"
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
                  v-if="$store.state.loginToken"
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
                v-if="$store.state.loginToken"
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
              :value="!$store.getters.getCartNum ? '' : $store.getters.getCartNum"
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
        </div>
      </div>
    </div>
    <!-- 购物车Drawer -->
    <cart-list-drawer
      @reloadHeader="reloadHeader"
      :dialogVisible="this.$store.getters.getCartDialogVisible"
    ></cart-list-drawer>
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
      flag: true, //防抖参数
      showNavIndex: -1,
      menuItemActiveIndex: -1,
      allCategoriesActiveIndex: -1,
      close: false,
      showSearch: false,
      height: 1000,
      siteHeaderOpen: false,
      currencyListShow: false,
      countryListShow: false
    };
  },
  mounted() {
    this.initHome();
    window.addEventListener("scroll",this.handleScroll);
    window.addEventListener("click",this.documentClick);
  },
  destroyed(){
    document.removeEventListener('scroll', this.handleScroll);
    document.removeEventListener('click', this.documentClick);
  },
  watch: {
    $route(to, from) {
      this.close = true;
    },
    showSearch(val) {
      if (val) {
        document
          .querySelector("body")
          .setAttribute("style", "overflow: hidden;");
      } else {
        document.querySelector("body").setAttribute("style", "");
      }
    }
  },
  methods: {
    documentClick(e){
      e = e || window.event;
      var target = e.target || e.srcElement;
      if(target.id == 'country' || 
        target.id == 'currency' || 
        target.id == 'currency-country' || 
        target.id == 'currencyImg' || 
        target.id == 'currencyP' || 
        target.id == 'currencyI' ||
        target.id == 'countryImg' || 
        target.id == 'countryP' || 
        target.id == 'countryI'
      ) {
        return;
      }
      this.currencyListShow = false;
      this.countryListShow = false; 
    },
    handleScroll() {
      //获取滚动时的高度
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop > 200) {
        //大于100的时候header头过渡动画
        this.siteHeaderOpen = true;
      }
      if (scrollTop < 200) {
        //大于100的时候header头过渡动画
        this.siteHeaderOpen = false;
      }
    },
    currencySelectClick(){
      this.currencyListShow = !this.currencyListShow;
    },
    countrySelectClick(){
      this.countryListShow = !this.countryListShow;
    },
    gocategoryList(item,name){
      this.$router.push({
        path: "/categories",
        query: {
          category: item.category_id,
          navName: item.category_name == 'All' ? name : item.category_name
        }
      });
    },
    goOrderTracking(){
      this.$router.push({
        path: "/orderTracking"
      });
    },
    goAddress(){
      if(!this.$store.state.loginToken){
        this.$router.push({
          path: "/login"
        });
        return;
      }
      this.$router.push({
        path: "/user/address"
      });
    },
    goOrder(){
      if(!this.$store.state.loginToken){
        this.$router.push({
          path: "/login"
        });
        return;
      }
      this.$router.push({
        path: "/user/order"
      });
    },
    goCoupon(){
      if(!this.$store.state.loginToken){
        this.$router.push({
          path: "/login"
        });
        return;
      }
      this.$router.push({
        path: "/user/coupon"
      });
    },
    goWishList(){
      if(!this.$store.state.loginToken){
        this.$router.push({
          path: "/login"
        });
        return;
      }
      this.$router.push({
        path: "/user/wishList"
      });
    },
    showSearchPopover() {
      this.showSearch = true;
      if (!this.popularSearches.length) {
        this.getHotKeyword();
      }
    },
    closeSearchPopover() {
      this.showSearch = false;
    },
    mouseoverNav(i) {
      this.close = false;
      this.showNavIndex = i;
    },
    mouseoutNav() {
      this.showNavIndex = -1;
    },
    reloadHeader() {
      this.initHome();
    },
    //初始化首頁
    initHome() {
      this.getAllCategories();
      this.getLayoutInit();
      this.getCartInfo();
      this.historySearches =
        JSON.parse(localStorage.getItem("historySearches")) &&
        JSON.parse(localStorage.getItem("historySearches")).reverse();

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
        list.unshift(search);
        if (list.length >= 9) {
          return;
        }
        localStorage.setItem("historySearches", JSON.stringify(list));
      } else {
        let list = [];
        list.unshift(search);
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
    //跳到分类页获取搜索的分类商品列表
    goToCategories(search) {
      this.showSearch = false;
      let { navName, parentNavName } = this.$route.query;
      this.$router.push({
        path: "/categories",
        query: {
          search,
          parentNavName: "HOME",
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
            let list = res.data.items;
            // for (var index = 0; index < list.length; index++) {
            //   if (list[index].children && list[index].children.length > 0) {
            //     list[index].children.unshift({
            //       category_id: list[index].category_id,
            //       category_name: this.$t("header.ViewAll"),
            //       children: [],
            //       image: "",
            //       level: "1",
            //       pid: "0", //一级分类没有父分类pid为0
            //       slug: list[index].category_name
            //     });
            //   }
            // }
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
              if (list[index].type == 'category') {
                list[index].children.unshift({
                  category_id: list[index].relation_id,
                  category_name: this.$t("header.ViewAll"),
                  image: "",
                  level: "1",
                  pid: "", //all没有pid
                  slug: list[index].name
                });
              }
              // if(list[index].type == 'trending'){
              //   list.splice(index,1)
              // }
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
      d.setTime(d.getTime() + 2 * 60 * 60 * 1000);
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
      d.setTime(d.getTime() + 2 * 60 * 60 * 1000);
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
              this.common.msgBox(this, res.msg, 3);
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
            parentNavName: "HOME",
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
              parentNavName: "HOME",
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
      this.close = false;
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
          parentNavName: "HOME",
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
            parentNavName: "HOME",
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
    // 竖向导航栏一级分类跳转
    goParentClass(item, i) {
      this.allCategoriesActiveIndex = i;
      this.menuItemActiveIndex = -1;
      let { category_id, category_name, level, pid } = item;
      this.$router.push({
        path: "/categories",
        query: {
          category: category_id,
          parentNavName: "HOME",
          navName: category_name
        }
      });
    },
    // 竖向导航栏二级分类跳转
    goSonClass(parentNavName, item, i) {
      console.log(i, "iiiiiiii");
      this.allCategoriesActiveIndex = i;
      this.menuItemActiveIndex = -1;
      let { category_id, category_name, pid } = item;
      console.log(parentNavName, "dfgsjgf", item);
      this.$router.push({
        path: "/categories",
        query: {
          category: category_id,
          parentNavName: parentNavName,
          navName: category_name,
          pid //把该分类的id传入供存在可点击的面包屑传参跳转使用
        }
      });
    },
    // 横向导航栏一级分类跳转
    goFirstClassification(item, i) {
      this.menuItemActiveIndex = i;
      this.allCategoriesActiveIndex = -1;
      let { name, relation_id } = item;
      this.$router.push({
        path: "/categories",
        query: {
          category: relation_id,
          parentNavName: "HOME",
          navName: name
        }
      });
    },
    // 横向导航栏二级分类跳转
    goSecondClassification(parentNavName, item, i) {
      this.menuItemActiveIndex = i;
      this.allCategoriesActiveIndex = -1;
      let { category_name, category_id, pid } = item;
      if (pid) {
        console.log("有pid");
        this.$router.push({
          path: "/categories",
          query: {
            category: category_id,
            parentNavName: parentNavName,
            navName: category_name,
            pid //把该分类的id传入供存在可点击的面包屑传参跳转使用
          }
        });
      } else {
        console.log("无PID");
        this.$router.push({
          path: "/categories",
          query: {
            category: category_id,
            parentNavName: "HOME",
            navName: parentNavName
          }
        });
      }
    },
    toHome() {
      this.activeIndex2 = "";
      this.$router.push({ path: "/" });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./n-header.scss";
.flyTop{
  top: 0;
  width: 100%;
  display: block;
  z-index: 9999;
  position: fixed;
}
</style>
