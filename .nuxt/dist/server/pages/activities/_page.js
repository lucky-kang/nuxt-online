exports.ids = [1];
exports.modules = {

/***/ 128:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/goTop.407b2ab.svg";

/***/ }),

/***/ 166:
/***/ (function(module, exports) {

// Exports
module.exports = {};


/***/ }),

/***/ 167:
/***/ (function(module, exports) {

// Exports
module.exports = {};


/***/ }),

/***/ 168:
/***/ (function(module, exports) {

// Exports
module.exports = {};


/***/ }),

/***/ 169:
/***/ (function(module, exports) {

// Exports
module.exports = {};


/***/ }),

/***/ 170:
/***/ (function(module, exports) {

// Exports
module.exports = {};


/***/ }),

/***/ 198:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/activeSwiper/activeSwiper.vue?vue&type=template&id=101608f0&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"coat"},[_vm._ssrNode((_vm._ssrList((_vm.images?_vm.images:[]),function(item,index){return ("<img"+(_vm._ssrAttr("src",item.image))+" alt"+(_vm._ssrAttr("width",_vm.precent))+" data-v-101608f0>")})))])}
var staticRenderFns = []


// CONCATENATED MODULE: ./components/activeSwiper/activeSwiper.vue?vue&type=template&id=101608f0&scoped=true&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/activeSwiper/activeSwiper.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var activeSwipervue_type_script_lang_js_ = ({
  name: "mySwiper",
  props: {
    images: {
      type: Array,
      value: [{
        image: __webpack_require__(18)
      }]
    },
    mdEventName: {
      type: String
    }
  },

  data() {
    return {};
  },

  created() {// console.log(images)
  },

  mounted() {// console.log(this.images)
  },

  computed: {
    precent() {
      let precent = "100%";
      let {
        length
      } = this.images;

      if (length == 2) {
        precent = "49%";
      } else if (length == 3) {
        precent = "32%";
      } else {
        precent = "100%";
      }

      return precent;
    }

  },
  methods: {
    toDetail(item) {
      if (item.type == "tag") {
        let navName = '';

        switch (item.relation_id) {
          case '3814':
            navName = "Adults' costumes";
            break;

          case '3815':
            navName = "Kids costumes";
            break;

          case '3816':
            navName = "Pets' costumes";
            break;

          case '3817':
            navName = "Decor";
            break;

          case '3818':
            navName = "Accessories";
            break;

          default:
            break;
        } // 跳商品分分类页


        this.$router.push({
          path: "/categories",
          query: {
            tag: item.relation_id,
            parentNavName: "Home",
            navName
          }
        });
      } //跳商品详情


      if (item.type == "product") {
        this.$router.push({
          path: "/product/" + item.relation_id
        });
      }
    }

  }
});
// CONCATENATED MODULE: ./components/activeSwiper/activeSwiper.vue?vue&type=script&lang=js&
 /* harmony default export */ var activeSwiper_activeSwipervue_type_script_lang_js_ = (activeSwipervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(3);

// CONCATENATED MODULE: ./components/activeSwiper/activeSwiper.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(269)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  activeSwiper_activeSwipervue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "101608f0",
  "7ef188c2"
  
)

/* harmony default export */ var activeSwiper = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 199:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/coupon/coupon.vue?vue&type=template&id=411114f2&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"couponCoat",style:(_vm.couponArr.length == 3 ? 'margin-left: -1.2rem' : '')},[_vm._ssrNode((_vm._ssrList((_vm.couponArr),function(item,index){return ("<img"+(_vm._ssrAttr("src",item.coupon_received==0?item.coupon_img:item.received_img))+" alt"+(_vm._ssrAttr("width",_vm.precent))+(_vm._ssrStyle(null,null, { display: (!_vm.receiveCouponStop) ? '' : 'none' }))+" data-v-411114f2>")}))+" "+(_vm._ssrList((_vm.couponArr),function(item,index){return ("<img"+(_vm._ssrAttr("src",item.coupon_received==0?item.coupon_img:item.received_img))+" alt"+(_vm._ssrAttr("width",_vm.precent))+(_vm._ssrStyle(null,null, { display: (_vm.receiveCouponStop) ? '' : 'none' }))+" data-v-411114f2>")})))])}
var staticRenderFns = []


// CONCATENATED MODULE: ./components/coupon/coupon.vue?vue&type=template&id=411114f2&scoped=true&

// EXTERNAL MODULE: ./utils/js-cookie.js
var js_cookie = __webpack_require__(1);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/coupon/coupon.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var couponvue_type_script_lang_js_ = ({
  name: "activeCoupon",
  props: {
    couponArr: {
      type: Array,
      value: []
    }
  },

  data() {
    return {
      receiveCouponStop: false
    };
  },

  computed: {
    precent() {
      let precent = "";
      let {
        length
      } = this.couponArr;

      if (length == 2) {
        precent = "64%";
      } else if (length == 3) {
        precent = "33%";
      } else {
        precent = "40%";
      }

      return precent;
    }

  },
  methods: {
    receiveCoupon(item) {
      if (!js_cookie["a" /* default */].get("userId")) {
        let {
          name
        } = this.$route; // this.common.msgBox(this,'please Login',3)

        this.$router.push({
          path: "/login",
          query: {
            name
          }
        }); // this.$store.dispatch("loginDialogVisible", true);

        return;
      }

      if (item.coupon_received != 0) {
        this.common.msgBox(this, this.$t('activeModule.CouponHas'), 2);
        return;
      }

      this.receiveCouponStop = true; //防止用户狂点击领取操作

      this.$apis.receiveCoupon({
        coupon_config_id: item.relation_id,
        item_id: item.item_id
      }, js_cookie["a" /* default */].get("userId")).then(res => {
        this.receiveCouponStop = false;

        if (res.status == 1) {
          this.common.msgBox(this, "Received successfully!", 1);
          item.coupon_received = 1;
        } else {
          this.common.msgBox(this, res.msg, 3);
        }
      }).catch(err => {
        this.receiveCouponStop = false;
        console.log(err);
      });
    }

  }
});
// CONCATENATED MODULE: ./components/coupon/coupon.vue?vue&type=script&lang=js&
 /* harmony default export */ var coupon_couponvue_type_script_lang_js_ = (couponvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(3);

// CONCATENATED MODULE: ./components/coupon/coupon.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(270)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  coupon_couponvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "411114f2",
  "862de97c"
  
)

/* harmony default export */ var coupon = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/coupon/couponTag.vue?vue&type=template&id=648275e5&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"couponTagCoat"},[_vm._ssrNode("<div class=\"navCoat\" data-v-648275e5>"+(_vm._ssrList((_vm.tagData?_vm.tagData:[]),function(item,index){return ("<img"+(_vm._ssrAttr("src",item.image_message))+" alt"+(_vm._ssrAttr("width",_vm.precent))+" data-v-648275e5>")}))+"</div> "),_vm._l((_vm.tagData?_vm.tagData:[]),function(item,index){return _vm._ssrNode("<div class=\"shopCoat\""+(_vm._ssrStyle(null,null, { display: (_vm.activeItem.relation_id == item.relation_id) ? '' : 'none' }))+" data-v-648275e5>","</div>",_vm._l((item.shopData),function(itemSon,indexSon){return _vm._ssrNode("<div class=\"shopItem\" data-v-648275e5>","</div>",[_c('active-shop-item',{attrs:{"shopObj":itemSon}})],1)}),0)}),_vm._ssrNode(" <p class=\"noData\""+(_vm._ssrStyle(null,null, { display: (_vm.activeItem.shopState) ? '' : 'none' }))+" data-v-648275e5>"+_vm._ssrEscape(_vm._s(_vm.$t('common.NoData')))+"</p> "),_vm._ssrNode("<div class=\"loadingCoat\" data-v-648275e5>","</div>",[_c('loading',{directives:[{name:"show",rawName:"v-show",value:(_vm.loadShow&&!_vm.activeItem.shopState),expression:"loadShow&&!activeItem.shopState"}],attrs:{"type":"spinner","color":"#1989fa"}})],1),_vm._ssrNode(" "),_c('el-backtop',{attrs:{"right":10}},[_c('img',{staticClass:"toTop",attrs:{"src":__webpack_require__(128)}})])],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./components/coupon/couponTag.vue?vue&type=template&id=648275e5&scoped=true&

// EXTERNAL MODULE: ./components/shopItem/activeShopItem.vue + 4 modules
var activeShopItem = __webpack_require__(209);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/coupon/couponTag.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var couponTagvue_type_script_lang_js_ = ({
  name: "couponTag",
  props: {
    tagData: {
      type: Array,
      value: []
    }
  },
  components: {
    activeShopItem: activeShopItem["default"]
  },

  data() {
    return {
      pages: 1,
      loadShow: false,
      activeItemId: "",
      activeItem: null,
      isNowState: false,
      //判断是否正在请求数据当中
      isDataState: false,
      //数据是否已请求完毕
      isScroll: true //判断是否已经触发函数

    };
  },

  computed: {
    precent() {
      let precent = "100%";
      let {
        length
      } = this.tagData;

      if (length == 0) {
        precent = "100%";
      } else if (length == 5) {
        precent = "22%";
      } else if (length == 6) {
        precent = "18%";
      } else if (length == 7) {
        precent = "15%";
      } else if (length == 5) {
        precent = "13%";
      }

      return precent;
    }

  },

  created() {
    window.addEventListener("scroll", this.scrollMethod);

    for (var i = 0; i < this.tagData.length; i++) {
      this.$set(this.tagData[i], "shopData", []); // this.tagData[i].shopData = [];

      this.tagData[i].shopState = false;
      this.tagData[i].shopPage = 1;

      if (i == 0) {
        this.activeItemId = this.tagData[0].relation_id;
        this.activeItem = this.tagData[0];
      }
    }

    this.getShopData(this.tagData[0]);
  },

  destroyed() {
    window.removeEventListener("scroll", this.scrollMethod);
  },

  methods: {
    scrollMethod() {
      let thif = this;

      if (thif.isScroll && !thif.isNowState && !thif.isDataState) {
        if (thif.common.getScrollTop() + thif.common.getClientHeight() >= thif.common.getScrollHeight() - 50) {
          //写后台加载数据的函数
          thif.isScroll = false;
          this.getShopData(this.activeItem);
        }
      }
    },

    cutClass(item) {
      this.pages = 1;
      this.activeItem = item;
      this.activeItemId = item.relation_id;

      if (this.activeItem.shopData.length == 0) {
        this.getShopData(this.activeItem);
      }
    },

    getShopData(item) {
      let thif = this;
      thif.loadShow = true;
      let sendObj = {
        page: this.pages,
        per_page: 16
      };
      sendObj[item.type] = item.relation_id;
      this.$apis.getShopList(sendObj, this.$store.getters.getApiHeader).then(res => {
        thif.loadShow = false;
        thif.isScroll = true;
        thif.isNowState = false;

        if (res.status == 1) {
          thif.pages++;
          item.shopData.push(...res.data.items);
        } else {
          thif.common.msgBox(thif, res.msg, 3);
        }

        if (res.data.items.length == 0) {
          item.shopState = true;
        }
      }).catch(err => {
        thif.loadShow = false;
        thif.isScroll = true;
        thif.isNowState = false;
        console.log(err);
      });
    }

  }
});
// CONCATENATED MODULE: ./components/coupon/couponTag.vue?vue&type=script&lang=js&
 /* harmony default export */ var coupon_couponTagvue_type_script_lang_js_ = (couponTagvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(3);

// CONCATENATED MODULE: ./components/coupon/couponTag.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(273)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  coupon_couponTagvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "648275e5",
  "690f9c28"
  
)

/* harmony default export */ var couponTag = __webpack_exports__["default"] = (component.exports);

/* nuxt-component-imports */
installComponents(component, {ActiveShopItem: __webpack_require__(209).default,Loading: __webpack_require__(19).default})


/***/ }),

/***/ 209:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/shopItem/activeShopItem.vue?vue&type=template&id=d5c3272e&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"itemCoat",on:{"click":function($event){return _vm.toDetail(_vm.shopObj.id)}}},[_vm._ssrNode("<div class=\"imgCoat\" data-v-d5c3272e>","</div>",[_c('img',{directives:[{name:"lazy",rawName:"v-lazy",value:(_vm.shopObj.image),expression:"shopObj.image"}]},[]),_vm._ssrNode(" "+((_vm.shopObj.discount)?("<div class=\"shopTil\" data-v-d5c3272e><img"+(_vm._ssrAttr("src",__webpack_require__(271)))+" data-v-d5c3272e> <p data-v-d5c3272e>"+_vm._ssrEscape(_vm._s(_vm.shopObj.discount))+"</p></div>"):"<!---->"))],2),_vm._ssrNode(" <div class=\"shopName\" data-v-d5c3272e>"+_vm._ssrEscape(_vm._s(_vm.shopObj.goods_name))+"</div> <div class=\"shopPrice\" data-v-d5c3272e><p class=\"price1\" data-v-d5c3272e>"+_vm._ssrEscape("\n      "+_vm._s(_vm.shopObj.moneyFu!='₫'?_vm.shopObj.moneyFu:'')+_vm._s(_vm.shopObj.shop_price)+_vm._s(_vm.shopObj.moneyFu=='₫'?_vm.shopObj.moneyFu:'')+"\n    ")+"</p> "+((_vm.shopObj.shop_price!=_vm.shopObj.reference_price)?("<div data-v-d5c3272e><span class=\"price2\" data-v-d5c3272e>"+_vm._ssrEscape(_vm._s(_vm.shopObj.moneyFu!='₫'?_vm.shopObj.moneyFu:'')+_vm._s(_vm.shopObj.reference_price)+_vm._s(_vm.shopObj.moneyFu=='₫'?_vm.shopObj.moneyFu:''))+"</span></div>"):"<!---->")+"</div>")],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./components/shopItem/activeShopItem.vue?vue&type=template&id=d5c3272e&scoped=true&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/shopItem/activeShopItem.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var activeShopItemvue_type_script_lang_js_ = ({
  name: "shopItem",
  props: {
    shopObj: {
      type: Object
    }
  },

  data() {
    return {
      shop_price: this.common.addDouhao(this.shopObj.shop_price)
    };
  },

  created() {},

  mounted() {// console.log(this.shopObj,'this.shopObj')
    // let boxWidth = document.querySelector(".shopPrice").clientWidth;
    // let item1Width = document.querySelector(".price1").clientWidth;
    // let item2Width = document.querySelector(".price2").clientWidth;
    // if (boxWidth < item1Width + item2Width + 20) {
    //   let baifenbi = boxWidth / (item1Width + item2Width + 40);
    //   document.querySelector(".price1").style.fontSize =
    //     0.17 * baifenbi + "rem";
    //   document.querySelector(".price2").style.fontSize =
    //     0.12 * baifenbi + "rem";
    // }
  },

  created() {
    this.shopObj.moneyFu = this.$store.getters.getCurrencySymbol;
  },

  methods: {
    toDetail(id) {
      this.$router.push({
        path: "/product/" + id
      });
    }

  }
});
// CONCATENATED MODULE: ./components/shopItem/activeShopItem.vue?vue&type=script&lang=js&
 /* harmony default export */ var shopItem_activeShopItemvue_type_script_lang_js_ = (activeShopItemvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(3);

// CONCATENATED MODULE: ./components/shopItem/activeShopItem.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(272)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  shopItem_activeShopItemvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "d5c3272e",
  "202ddf88"
  
)

/* harmony default export */ var activeShopItem = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 269:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_activeSwiper_vue_vue_type_style_index_0_id_101608f0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(166);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_activeSwiper_vue_vue_type_style_index_0_id_101608f0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_activeSwiper_vue_vue_type_style_index_0_id_101608f0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_activeSwiper_vue_vue_type_style_index_0_id_101608f0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_activeSwiper_vue_vue_type_style_index_0_id_101608f0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 270:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_coupon_vue_vue_type_style_index_0_id_411114f2_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(167);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_coupon_vue_vue_type_style_index_0_id_411114f2_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_coupon_vue_vue_type_style_index_0_id_411114f2_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_coupon_vue_vue_type_style_index_0_id_411114f2_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_coupon_vue_vue_type_style_index_0_id_411114f2_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 271:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/tag_discount.4b64da0.png";

/***/ }),

/***/ 272:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_activeShopItem_vue_vue_type_style_index_0_id_d5c3272e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(168);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_activeShopItem_vue_vue_type_style_index_0_id_d5c3272e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_activeShopItem_vue_vue_type_style_index_0_id_d5c3272e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_activeShopItem_vue_vue_type_style_index_0_id_d5c3272e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_activeShopItem_vue_vue_type_style_index_0_id_d5c3272e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 273:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_couponTag_vue_vue_type_style_index_0_id_648275e5_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(169);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_couponTag_vue_vue_type_style_index_0_id_648275e5_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_couponTag_vue_vue_type_style_index_0_id_648275e5_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_couponTag_vue_vue_type_style_index_0_id_648275e5_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_couponTag_vue_vue_type_style_index_0_id_648275e5_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 274:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_page_vue_vue_type_style_index_0_id_10a2790d_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(170);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_page_vue_vue_type_style_index_0_id_10a2790d_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_page_vue_vue_type_style_index_0_id_10a2790d_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_page_vue_vue_type_style_index_0_id_10a2790d_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_page_vue_vue_type_style_index_0_id_10a2790d_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 348:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/activities/_page.vue?vue&type=template&id=10a2790d&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"container"},[_c('div',{directives:[{name:"loading",rawName:"v-loading",value:(_vm.getActivitiesLoading),expression:"getActivitiesLoading"}],staticClass:"f-container"},_vm._l((_vm.activitiesList),function(item,index){return (_vm.activitiesList.length)?_vm._ssrNode("<div data-v-10a2790d>","</div>",[(item.type=='banner')?_vm._ssrNode("<div class=\"banner-list\" style=\"margin: 30px 0;\" data-v-10a2790d>","</div>",[_c('active-swiper',{staticClass:"bgColor",attrs:{"images":item.items}})],1):_vm._e(),_vm._ssrNode(" "),(item.type=='coupon')?_vm._ssrNode("<div style=\"margin: 30px 0;\" data-v-10a2790d>","</div>",[_c('coupon',{staticClass:"bgColor",attrs:{"couponArr":item.items}})],1):_vm._e(),_vm._ssrNode(" "),(item.type=='tab')?_vm._ssrNode("<div style=\"margin: 30px 0;\" data-v-10a2790d>","</div>",[_c('coupon-tag',{attrs:{"tagData":item.items}})],1):_vm._e()],2):_vm._e()}),0),_vm._ssrNode(" "),_c('f-footer')],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./pages/activities/_page.vue?vue&type=template&id=10a2790d&scoped=true&

// EXTERNAL MODULE: ./components/footer/f-footer.vue + 4 modules
var f_footer = __webpack_require__(84);

// EXTERNAL MODULE: ./components/activeSwiper/activeSwiper.vue + 4 modules
var activeSwiper = __webpack_require__(198);

// EXTERNAL MODULE: ./components/coupon/coupon.vue + 4 modules
var coupon = __webpack_require__(199);

// EXTERNAL MODULE: ./components/coupon/couponTag.vue + 4 modules
var couponTag = __webpack_require__(200);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/activities/_page.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// import { MH_API } from "@/api";




let page = 1;
/* harmony default export */ var _pagevue_type_script_lang_js_ = ({
  name: "activitys",
  components: {
    fFooter: f_footer["default"]
  },
  watch: {
    $route(to, from) {
      this.getActivities(this.$route.query.id);
    }

  },

  asyncData({
    params,
    app: {
      $apis
    }
  }) {},

  data() {
    return {
      getActivitiesLoading: false,
      activitiesList: []
    };
  },

  mounted() {
    this.getActivitiesLoading = true;
    this.getActivities(this.$route.query.id);
    this.buryingPoint.pageView();
  },

  destroyed() {},

  methods: {
    getActivities(id) {
      let thif = this;
      this.$apis.getActivities({
        activity_id: id
      }).then(res => {
        this.getActivitiesLoading = false;

        if (res.status == 1) {
          thif.activitiesList = res.data.item.list;
        } else {
          thif.common.msgBox(thif, res.msg, 3);
        }
      }).catch(error => {
        this.getActivitiesLoading = false;
        console.log(error);
      });
    }

  }
});
// CONCATENATED MODULE: ./pages/activities/_page.vue?vue&type=script&lang=js&
 /* harmony default export */ var activities_pagevue_type_script_lang_js_ = (_pagevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(3);

// CONCATENATED MODULE: ./pages/activities/_page.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(274)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  activities_pagevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "10a2790d",
  "240d7d43"
  
)

/* harmony default export */ var _page = __webpack_exports__["default"] = (component.exports);

/* nuxt-component-imports */
installComponents(component, {ActiveSwiper: __webpack_require__(198).default,Coupon: __webpack_require__(199).default,CouponTag: __webpack_require__(200).default,FFooter: __webpack_require__(84).default})


/***/ }),

/***/ 83:
/***/ (function(module, exports) {

// Exports
module.exports = {};


/***/ }),

/***/ 84:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/footer/f-footer.vue?vue&type=template&id=a3a543c4&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"swpper footer-box"},[_vm._ssrNode("<div class=\"coat\" data-v-a3a543c4>","</div>",[_vm._ssrNode("<div class=\"upCoat\" data-v-a3a543c4>","</div>",[_vm._ssrNode("<div"+(_vm._ssrClass("list fqas",_vm.moveFaqsState ? 'childShow' : ''))+" data-v-a3a543c4><p class=\"footTil\" data-v-a3a543c4>"+_vm._ssrEscape("\n\t\t\t\t\t\t"+_vm._s(_vm._f("daxie")(_vm.$t("footer.Support")))+"\n\t\t\t\t\t\t")+"<span"+(_vm._ssrClass("moveShow",_vm.moveFaqsState
									? 'el-icon-arrow-down'
									: 'el-icon-arrow-right'))+" data-v-a3a543c4></span></p> <p class=\"item\" data-v-a3a543c4>"+_vm._ssrEscape(_vm._s(_vm.$t("footer.ShippingDelivery")))+"</p> <p class=\"item\" data-v-a3a543c4>"+_vm._ssrEscape(_vm._s(_vm.$t("footer.ReturnRefund")))+"</p> <p class=\"item\" data-v-a3a543c4>"+_vm._ssrEscape(_vm._s(_vm.$t("footer.PrivacyPolicy")))+"</p> <p class=\"item\" data-v-a3a543c4>"+_vm._ssrEscape(_vm._s(_vm.$t("footer.TermsofService")))+"</p></div> "),_vm._ssrNode("<div"+(_vm._ssrClass("list about",_vm.moveAboutState ? 'childShow' : ''))+" data-v-a3a543c4>","</div>",[_vm._ssrNode("<p class=\"footTil\" data-v-a3a543c4>"+_vm._ssrEscape("\n\t\t\t\t\t\t"+_vm._s(_vm.$t("footer.ABOUTS"))+"\n\t\t\t\t\t\t")+"<span"+(_vm._ssrClass("moveShow",_vm.moveAboutState
									? 'el-icon-arrow-down'
									: 'el-icon-arrow-right'))+" data-v-a3a543c4></span></p> <p class=\"item firstItem\" data-v-a3a543c4>"+_vm._ssrEscape(_vm._s(_vm.$t("footer.FAQs")))+"</p> <p class=\"item firstItem\" data-v-a3a543c4>"+_vm._ssrEscape(_vm._s(_vm.$t("footer.OurStory")))+"</p> "),_vm._ssrNode("<p class=\"item\" data-v-a3a543c4>","</p>",[_c('nuxt-link',{attrs:{"to":"/contact"}},[_vm._v(_vm._s(_vm.$t("footer.Contact")))])],1),_vm._ssrNode(" "),_vm._ssrNode("<p class=\"item\" data-v-a3a543c4>","</p>",[_c('nuxt-link',{attrs:{"to":"/becomeAnAffiliate"}},[_vm._v(_vm._s(_vm.$t("footer.BecomeAA")))])],1)],2),_vm._ssrNode(" <div"+(_vm._ssrClass("list contact",_vm.moveContactState ? 'childShow' : ''))+" data-v-a3a543c4><p class=\"footTil\" data-v-a3a543c4>"+_vm._ssrEscape("\n\t\t\t\t\t\t"+_vm._s(_vm.$t("footer.REGISTERANDSAVE"))+"\n\t\t\t\t\t\t")+"<span"+(_vm._ssrClass("moveShow",_vm.moveContactState
									? 'el-icon-arrow-down'
									: 'el-icon-arrow-right'))+" data-v-a3a543c4></span></p> <p class=\"item firstItem\" data-v-a3a543c4>"+_vm._ssrEscape(_vm._s(_vm.$t("footer.BeTheFirst")))+"</p> <div class=\"contactIpt\" data-v-a3a543c4><img"+(_vm._ssrAttr("src",__webpack_require__(85)))+" alt data-v-a3a543c4> <input placeholder=\"Enter your email\" type=\"text\""+(_vm._ssrAttr("value",(_vm.footEmail)))+" data-v-a3a543c4></div></div> <div class=\"followCoat\" data-v-a3a543c4><div class=\"follow-us\" data-v-a3a543c4>"+_vm._ssrEscape("\n\t\t\t\t\t\t"+_vm._s(_vm.$t("footer.FOLLOWTil"))+"\n\t\t\t\t\t")+"</div> <div class=\"followIcon\" data-v-a3a543c4><a href=\"https://www.instagram.com/frissonlife_official\" target=\"_blank\" data-v-a3a543c4><img"+(_vm._ssrAttr("src",__webpack_require__(86)))+" alt data-v-a3a543c4></a> <a href=\"https://www.facebook.com/FrissonLife-101073678672063\" target=\"_blank\" data-v-a3a543c4><img"+(_vm._ssrAttr("src",__webpack_require__(87)))+" alt data-v-a3a543c4></a></div></div> <div class=\"list download\" data-v-a3a543c4><p class=\"footTil\" data-v-a3a543c4>"+_vm._ssrEscape(_vm._s(_vm.$t("footer.DOWNLOADTil")))+"</p> <div class=\"imgCoat\" data-v-a3a543c4><div class=\"imgCoat-left\" data-v-a3a543c4><a href=\"https://apps.apple.com/us/app/frisson-art-of-living/id1557186463\" target=\"_blank\" data-v-a3a543c4><img"+(_vm._ssrAttr("src",__webpack_require__(88)))+" alt class=\"appstore\" data-v-a3a543c4></a> <a href=\"https://play.google.com/store/apps/details?id=com.gv.frisson\" target=\"_blank\" data-v-a3a543c4><img"+(_vm._ssrAttr("src",__webpack_require__(89)))+" alt class=\"googleplay\" data-v-a3a543c4></a></div></div></div>")],2),_vm._ssrNode(" <div class=\"centerCoat\" data-v-a3a543c4><div class=\"list left\" data-v-a3a543c4><div class=\"iconCoat\" data-v-a3a543c4><img"+(_vm._ssrAttr("src",__webpack_require__(90)))+" alt data-v-a3a543c4> <img"+(_vm._ssrAttr("src",__webpack_require__(91)))+" alt data-v-a3a543c4> <img"+(_vm._ssrAttr("src",__webpack_require__(92)))+" alt data-v-a3a543c4> <img"+(_vm._ssrAttr("src",__webpack_require__(93)))+" alt data-v-a3a543c4> <img"+(_vm._ssrAttr("src",__webpack_require__(94)))+" alt data-v-a3a543c4></div></div> "+((false)?(undefined):"<!---->")+"</div> <div class=\"forooCopyright\" data-v-a3a543c4>"+(_vm._s(_vm.$t('footer.Copyright2')))+"</div>")],2)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./components/footer/f-footer.vue?vue&type=template&id=a3a543c4&scoped=true&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/footer/f-footer.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var f_footervue_type_script_lang_js_ = ({
  name: "f-footer",

  data() {
    return {
      moveFaqsState: false,
      moveAboutState: false,
      moveContactState: false,
      footEmail: "" //   iconArr2: [
      //     {
      //       image: "https://cdn.foroo.co.uk/wp-content/assets/icon/share_ins.svg",
      //       url: "https://www.instagram.com/foroomarket/?utm_source=Website&utm_medium=Footer&utm_campaign=Ins"
      //     },
      //     {
      //       image:"https://cdn.foroo.co.uk/wp-content/assets/icon/share_facebook.svg",
      //       url: "https://www.facebook.com/ForooMarket/?utm_source=Website&utm_medium=Footer&utm_campaign=Facebook"
      // 	},
      //     {
      //     	image:"https://cdn.foroo.co.uk/wp-content/assets/icon/share_linkedin.svg",
      //     	url:
      //     		"https://www.linkedin.com/company/31060175/admin/?utm_source=Website&utm_medium=Footer&utm_campaign=LinkedIn"
      //     },
      //     {
      //     	image:"https://cdn.foroo.co.uk/wp-content/assets/icon/share_tiktok.svg",
      //     	url:
      //     		"https://www.tiktok.com/@foroomarket?utm_source=Website&utm_medium=Footer&utm_campaign=Tiktok"
      //     }
      //   ]

    };
  },

  mounted() {
    if (!sessionStorage.getItem("recordRoute")) {
      sessionStorage.setItem("recordRoute", JSON.stringify([this.$route.name]));
    } else {
      let routeArr = JSON.parse(sessionStorage.getItem("recordRoute"));

      if (routeArr.indexOf(this.$route.name) == -1) {
        routeArr.push(this.$route.name);
        sessionStorage.setItem("recordRoute", JSON.stringify(routeArr));
      }
    }
  },

  methods: {
    toPage() {
      if (this.footEmail) {
        if (this.$store.getters.getLoginToken) {
          this.$router.push({
            path: "/user/order"
          });
        } else {
          this.$router.push({
            path: "/login",
            query: {
              regEmail: this.footEmail
            }
          });
        }
      }
    },

    toFootPage(pageName) {
      this.$router.push({
        path: "/footPage/" + pageName
      }); // window.open(news.href, "_blank");
      // this.$router.resolve({
      //   path:'/footPage/'+pageName,
      // })
    }

  }
});
// CONCATENATED MODULE: ./components/footer/f-footer.vue?vue&type=script&lang=js&
 /* harmony default export */ var footer_f_footervue_type_script_lang_js_ = (f_footervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(3);

// CONCATENATED MODULE: ./components/footer/f-footer.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(95)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  footer_f_footervue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "a3a543c4",
  "bd0fe4ae"
  
)

/* harmony default export */ var f_footer = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 85:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAANESURBVHgB7VhNbtpAFH4zhEV3bAJI3dB1CzU3gBsgNdDuAicoOUGSE0BPELqrBFV6A7iBUQh7NpUg2bCLqsaevmd7XOMYGxuDHMnfxj/z974Zz/e9MUCKFClSpEjxisHcL4rKl5rQtEssKUGSIGDBMpnOcvpj4Xy9QcAKfgwJxokO1d/z4dR+dhYaM29ispoN65AgFMpNmtjaM4ceXu3YuKteTV7zldYlJARWLDXrseQs414NBMCaCXGVBBL5j80bikUwWHuVexFYCB2XiOGmwYaFcuu2pDRycGTQmPTZMB3aFAvnmapXPc8VeMRNwnjGIIHr0XjSs2Pc4CU4EmisJy2rAn02NJEYi1t9JPi2TqiBTUKAQup0DBI0hqWEJRx7+ob/rW4LnsD9OqOGf7ADvJ1Qh4cmcao0FV3TaOZLDMR3DL6+mP5a+7XhQZ2usQNDUoX+DUwSavHDWQ1ixmmldc40GKMx5Wis5WzUDgqeEEhAYnX/s4ub+hpvc4KxcaHyuQsxAfv6yoUYUPA0Bo21a9udCRCW96MriwTubb0Xh8wafQi9bzzo4oLGCNE8HAGCQQKgQ/f7ekWh0upJjcdrfTUf9cP2EZoAYTkbDnTMSaRX5MvNmzDtpcaDEF3qQ3Co48RMIAIiESA4vQJXpF2oNNVdDM/Q+OeskddIjX+c/k/OwiIyARvCvipkPn4ya2s8A2Wj7R6ITMCt2fgd0yxu9QqqLw2Kmb4ygRi8JRIB0myugerU7Ie7YVUgESso9e37piLr58ufGqTxVGbWH9bj8pbQBEh1SLPp3q3ZD0hEegXm7WoRiZLGM+C3Xhofh7eEIkDBk+oYwevQ8dJsp1cIIhqg8ft6y84EnHk5afZyPhxsq2sEysSFERPVR7J+Gr+PtwQScOflu2r26m7Ux0P4O6O+D1mJqN7iS2BfzaZsNkz9KN7C/YK3NRsl0u9QESfc55Agb/Ek4JWXHyN4CXkOCfIWwonHu9xGXh4itY0Ta/MsUM2XzzDNZufCnNAX8FqBXJS8/FBweotXuZvARF7D5uWHhBXLhO5xchfOss1fi2jn5IiQYJA0O/fjy5+7lJMwlsifu2jt11HPDSlSpEiRIkUi8Q95ohTWZCoCzwAAAABJRU5ErkJggg=="

/***/ }),

/***/ 86:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/ins.88c06d0.png";

/***/ }),

/***/ 87:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMGSURBVHgB7ZtNbtNAFMf/b8aVKGLRFc1y2NM2vUFygsKi0F3bEwAnID0B5QSkuwoqNZwAd8fSCmVdd5fswgKhKvEMb6ymtFUSD5APZ+LfwuOPJ8t/vfH4zXtjwhBU+dnKL720C0MVkCnDQCHPECJ+1pgIjVbz49FwswGsrr98ZYyu8cUVzCcsnGqDhN8RnHo1WTrl3Qr8ICQp91vRcdw/cSO4VN5RJkm+8K6CX8TLsrsZR42OPRD9syz2A/wTa1HXvTZF2k1pbXuPm9fwF/WotPbjZ/v717RLr65tX8BP796mw137ibz27h7850EPS22hgS0sCkZXgjSgIOQOQ+gIgwbvniUakUxkZ6Bh0FNpS9gzoN2M224EHJmUkSNSodq8X5a9w/6nJIPYbvjVVNxkCVYB8gQhFkJWW80/gcK4EcgLLJas2GhyYi25ETwNsZZcCCZjDqYh1pIPDwdBHVMiD4I/T8u7lpmP0jxvPXW1tTM6JAknJEjdv2YMNnibeY/Zf5a0vnQxe7z+4i3P6GrpgckWNozZd+kgiLNM2LMVHthqGAMzF+z0/mpdwZjIT+AxGoUxMS+Cx0Yh2HcKwb4zhcCDGgTjMpEfgb4gUDjKghMHyqUcRJyx/PewxQEOGKqt85MQE4Z12CJCJcvOmy7N0aZTHcwbwa65OS8Ep7MoR3zxsHI19EKwTrrOdWwvBAuSzrn1hevSEw88OP1aLj3dGXq9dX4cIoN0UOoNF6WRbLhWiyYuWBv9LqN2lf2sWtcMmaFlFPqL0KmYPPhOIdh3CsG+Uwj2nUKw7xSCfccKjrEoECLBE40Ii4LBpSASZ1gQ7PIKcSWu6uzl/6wMzAGE2P4DITpRo0NkDuA5XKqp2TYdpdvNk0NuQngKp1TC/h8uN5+lK9l9bt0O37CapNzvH94ITru2kFV45Gnr2WXR3by9cOZO4GEvtL99qrLh/jx726655uzhmxZrub/memDWkg3r3NTt/xAGtMVpQVt7zdVC8vtwMS02hiJ+1vCh6B7FzcGLy38D0QUAMrMj934AAAAASUVORK5CYII="

/***/ }),

/***/ 88:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/appstore.c013255.png";

/***/ }),

/***/ 89:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/googleplay.eede704.png";

/***/ }),

/***/ 90:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/icon_americanexpress.866a249.png";

/***/ }),

/***/ 91:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/icon_applepay.413c3f4.png";

/***/ }),

/***/ 92:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/Mastercard.da4a5c8.png";

/***/ }),

/***/ 93:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/icon_paypal.fc6de53.png";

/***/ }),

/***/ 94:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/VISA.ae946b0.png";

/***/ }),

/***/ 95:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_f_footer_vue_vue_type_style_index_0_id_a3a543c4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(83);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_f_footer_vue_vue_type_style_index_0_id_a3a543c4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_f_footer_vue_vue_type_style_index_0_id_a3a543c4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_f_footer_vue_vue_type_style_index_0_id_a3a543c4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_f_footer_vue_vue_type_style_index_0_id_a3a543c4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ })

};;
//# sourceMappingURL=_page.js.map