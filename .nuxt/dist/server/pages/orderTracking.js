exports.ids = [15];
exports.modules = {

/***/ 111:
/***/ (function(module, exports) {

// Exports
module.exports = {};


/***/ }),

/***/ 126:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_shipment_vue_vue_type_style_index_0_id_4fd9922e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(111);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_shipment_vue_vue_type_style_index_0_id_4fd9922e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_shipment_vue_vue_type_style_index_0_id_4fd9922e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_shipment_vue_vue_type_style_index_0_id_4fd9922e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_shipment_vue_vue_type_style_index_0_id_4fd9922e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 129:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/order/shipment.vue?vue&type=template&id=4fd9922e&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"editCoat"},[_vm._ssrNode("<div class=\"editCont\" data-v-4fd9922e>","</div>",[_vm._ssrNode("<div class=\"addressHead\" data-v-4fd9922e><p data-v-4fd9922e>"+_vm._ssrEscape("\n\t\t\t\t"+_vm._s(_vm.$t("orderDetail.Trackinginformation"))+"\n\t\t\t")+"</p> <span class=\"el-icon-close\" data-v-4fd9922e></span></div> "),_vm._ssrNode("<div style=\"padding: 10px\" data-v-4fd9922e>","</div>",[_c('el-timeline',{attrs:{"reverse":_vm.reverse}},_vm._l((_vm.activities),function(activity,index){return _c('el-timeline-item',{key:index,attrs:{"timestamp":activity.timestamp}},[_vm._v("\n\t\t\t\t\t"+_vm._s(activity.content)+"\n\t\t\t\t")])}),1)],1)],2)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./components/order/shipment.vue?vue&type=template&id=4fd9922e&scoped=true&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/order/shipment.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var shipmentvue_type_script_lang_js_ = ({
  name: "shiPment",
  props: {
    editShow: {
      type: Boolean,
      value: false
    },
    dataInfo: {
      type: Object,
      default: undefined
    }
  },

  data() {
    return {
      reverse: true,
      activities: []
    };
  },

  mounted() {
    // You have not made any changes 您没有做任何改动
    let thif = this;
    this.dataInfo["details"].forEach(function (item) {
      thif.activities.push({
        content: item["message"] + " \n" + item["location"],
        timestamp: item["date"]
      });
    });
  },

  methods: {
    closeEdit() {
      this.$emit("editClose");
    }

  }
});
// CONCATENATED MODULE: ./components/order/shipment.vue?vue&type=script&lang=js&
 /* harmony default export */ var order_shipmentvue_type_script_lang_js_ = (shipmentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(3);

// CONCATENATED MODULE: ./components/order/shipment.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(126)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  order_shipmentvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "4fd9922e",
  "706ed69c"
  
)

/* harmony default export */ var shipment = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ 149:
/***/ (function(module, exports) {

// Exports
module.exports = {};


/***/ }),

/***/ 150:
/***/ (function(module, exports) {

// Exports
module.exports = {};


/***/ }),

/***/ 194:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/viewOrderDetail/viewOrderDetail.vue?vue&type=template&id=0fc9856c&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"rightCoat"},[_vm._ssrNode("<div class=\"tilCoat\" data-v-0fc9856c><p data-v-0fc9856c>"+_vm._ssrEscape(_vm._s(_vm.$t("orderDetail.ORDERDETAIL")))+"</p></div> <div class=\"listCoat\" data-v-0fc9856c><div class=\"left\" data-v-0fc9856c><div class=\"list\" data-v-0fc9856c><div class=\"tilName\" data-v-0fc9856c><p data-v-0fc9856c>"+_vm._ssrEscape(_vm._s(_vm.$t("orderDetail.OrderNumber")))+"</p></div> <div class=\"tilText tilTextOne\" data-v-0fc9856c><p data-v-0fc9856c>"+_vm._ssrEscape(_vm._s(_vm.orderData ? _vm.orderData.master_order_id : ""))+"</p> <b"+(_vm._ssrAttr("data-clipboard-text",_vm.orderData ? _vm.orderData.master_order_id : ''))+" id=\"copyOrderId\" data-v-0fc9856c>"+_vm._ssrEscape(_vm._s(_vm.$t("orderDetail.COPY")))+"</b></div></div> <div class=\"list\" data-v-0fc9856c><div class=\"tilName\" data-v-0fc9856c><p data-v-0fc9856c>"+_vm._ssrEscape(_vm._s(_vm.$t("orderDetail.OrderDate")))+"</p></div> <div class=\"tilText\" data-v-0fc9856c><p data-v-0fc9856c>"+_vm._ssrEscape("\n              "+_vm._s(_vm._f("timers")(_vm.orderData
              ? _vm.orderData.created_at
              : "",5))+"\n            ")+"</p></div></div> <div class=\"list\" data-v-0fc9856c><div class=\"tilName\" data-v-0fc9856c><p data-v-0fc9856c>"+_vm._ssrEscape(_vm._s(_vm.$t("orderDetail.PaymentStatus")))+"</p></div> <div class=\"tilText\" data-v-0fc9856c><p style=\"color:#C37071;font-weight: bold;\" data-v-0fc9856c>"+_vm._ssrEscape("\n              "+_vm._s(_vm.orderData ? _vm.orderData.status_text : "")+"\n            ")+"</p></div></div> <div class=\"list\" data-v-0fc9856c><div class=\"tilName\" data-v-0fc9856c><p data-v-0fc9856c>"+_vm._ssrEscape(_vm._s(_vm.$t("orderDetail.ShippingAddress")))+"</p></div> <div class=\"tilText\" data-v-0fc9856c><p data-v-0fc9856c>"+_vm._ssrEscape("\n              "+_vm._s(_vm.orderData ? _vm.orderData.shipping_address.shipping_first_name : "")+"\n              "+_vm._s(_vm.orderData ? _vm.orderData.shipping_address.shipping_last_name : "")+"\n            ")+"</p> <p data-v-0fc9856c>"+_vm._ssrEscape("\n              "+_vm._s(_vm.orderData ? _vm.orderData.shipping_address.shipping_address1 : "")+"\n            ")+"</p> <p data-v-0fc9856c>"+_vm._ssrEscape("\n              "+_vm._s(_vm.orderData ? _vm.orderData.shipping_address.shipping_address2 : "")+"\n            ")+"</p> <p data-v-0fc9856c>"+_vm._ssrEscape("\n              "+_vm._s(_vm.orderData ? _vm.orderData.shipping_address.shipping_state : "")+",\n              "+_vm._s(_vm.orderData ? _vm.orderData.shipping_address.shipping_state_abbr : "")+",\n              "+_vm._s(_vm.orderData ? _vm.orderData.shipping_address.shipping_postcode : "")+"\n            ")+"</p> <p data-v-0fc9856c>"+_vm._ssrEscape(_vm._s(_vm.orderData ? _vm.orderData.shipping_address.shipping_country : ""))+"</p> <p data-v-0fc9856c>"+_vm._ssrEscape(_vm._s(_vm.orderData ? _vm.orderData.shipping_address.shipping_phone : ""))+"</p></div></div></div> <div class=\"right\" data-v-0fc9856c><div class=\"summary\" data-v-0fc9856c><p class=\"sumTil\" data-v-0fc9856c>"+_vm._ssrEscape(_vm._s(_vm.$t("orderDetail.Summary")))+"</p></div> <div class=\"sumListCoat\" data-v-0fc9856c><div class=\"sumList\" data-v-0fc9856c><p data-v-0fc9856c>"+_vm._ssrEscape(_vm._s(_vm.$t("orderDetail.Subtotal")))+"</p> <p data-v-0fc9856c>"+_vm._ssrEscape("\n              "+_vm._s(_vm.orderData
              ? _vm.$store.getters.getCurrencyArr[
              _vm.orderData.order_currency
              ].Symbol
              : "")+_vm._s(_vm.orderData ? _vm.orderData.order_subtotal_price : "")+"\n            ")+"</p></div> <div class=\"sumList\" data-v-0fc9856c><p data-v-0fc9856c>"+_vm._ssrEscape(_vm._s(_vm.$t("orderDetail.Standard")))+"</p> <p data-v-0fc9856c>"+_vm._ssrEscape(_vm._s(_vm.$t("orderDetail.Free")))+"</p></div> "+((_vm.orderData ? Number(_vm.orderData.coupon_price) : false)?("<div class=\"sumList\" data-v-0fc9856c><p data-v-0fc9856c>"+_vm._ssrEscape(_vm._s(_vm.$t("orderDetail.Coupon")))+"</p> <p data-v-0fc9856c>"+_vm._ssrEscape("-"+_vm._s(_vm.orderData ? _vm.$store.getters.getCurrencyArr[_vm.orderData.order_currency].Symbol : "")+_vm._s(_vm.orderData ? _vm.orderData.coupon_price : ''))+"</p></div>"):"<!---->")+" "+((_vm.orderData ? Number(_vm.orderData.point_price) : false)?("<div class=\"sumList\" data-v-0fc9856c><p data-v-0fc9856c>"+_vm._ssrEscape(_vm._s(_vm.$t("orderDetail.Points")))+"</p> <p data-v-0fc9856c>"+_vm._ssrEscape("-"+_vm._s(_vm.orderData ? _vm.$store.getters.getCurrencyArr[_vm.orderData.order_currency].Symbol : "")+_vm._s(_vm.orderData ? _vm.orderData.point_price : ''))+"</p></div>"):"<!---->")+" "+((_vm.orderData ? Number(_vm.orderData.service_price) : false)?("<div class=\"sumList\" data-v-0fc9856c><p data-v-0fc9856c>"+_vm._ssrEscape(_vm._s(_vm.$t("orderDetail.ServiceFee")))+"</p> <p data-v-0fc9856c>"+_vm._ssrEscape(_vm._s(_vm.orderData ? _vm.$store.getters.getCurrencyArr[_vm.orderData.order_currency].Symbol : "")+_vm._s(_vm.orderData ? _vm.orderData.service_price : ''))+"</p></div>"):"<!---->")+"</div> <div class=\"totalPay\" data-v-0fc9856c><p class=\"totalPayTil\" data-v-0fc9856c>"+_vm._ssrEscape("\n            "+_vm._s(_vm.$t("orderDetail.TotaltoPay"))+"\n          ")+"</p> <p class=\"totalPayText\" data-v-0fc9856c>"+_vm._ssrEscape("\n            "+_vm._s(_vm.orderData
            ? _vm.$store.getters.getCurrencyArr[
            _vm.orderData.order_currency
            ].Symbol
            : "")+_vm._s(_vm.orderData ? _vm.orderData.order_total_price : "")+"\n          ")+"</p></div> <div class=\"btnCoat\" data-v-0fc9856c>"+((_vm.orderData ? _vm.orderData.status == 1 && _vm.orderData.allow_cancel == 1 : false)?("<button class=\"pay\" data-v-0fc9856c><p data-v-0fc9856c>"+_vm._ssrEscape(_vm._s(_vm.countDown)+" "+_vm._s(_vm.$t("orderDetail.PayNow"))+" ")+"</p></button>"):"<!---->")+" "+((_vm.orderData ? _vm.orderData.status == 1 && _vm.orderData.allow_cancel == 1 : false)?("<button class=\"clearPay\" data-v-0fc9856c>"+_vm._ssrEscape("\n            "+_vm._s(_vm.$t("orderDetail.CANCELORDER"))+"\n          ")+"</button>"):"<!---->")+"</div></div></div> "+((_vm.orderData?(_vm.orderData.user_note?true:false):false)?("<div class=\"order_note\" data-v-0fc9856c><p class=\"order_noteTil\" data-v-0fc9856c>"+_vm._ssrEscape(_vm._s(_vm.$t("orderDetail.OrderNote")))+"</p> <p data-v-0fc9856c>"+_vm._ssrEscape(_vm._s(_vm.orderData?_vm.orderData.user_note:''))+"</p></div>"):"<!---->")+" "),_vm._ssrNode("<div class=\"itemCoat\" data-v-0fc9856c>","</div>",[_vm._ssrNode("<div class=\"itemTil\" data-v-0fc9856c><p data-v-0fc9856c>"+_vm._ssrEscape(_vm._s(_vm.$t("orderDetail.Item"))+"("+_vm._s(_vm.itemList.length)+")")+"</p></div> "),_vm._ssrNode("<div class=\"itemListCoat\" data-v-0fc9856c>","</div>",_vm._l((_vm.itemList),function(item,index){return _vm._ssrNode("<div class=\"list\" data-v-0fc9856c>","</div>",[_vm._ssrNode("<div class=\"imgCoat\" data-v-0fc9856c>","</div>",[_c('img',{directives:[{name:"lazy",rawName:"v-lazy",value:(item.sku_image_url),expression:"item.sku_image_url"}],attrs:{"alt":""}},[])]),_vm._ssrNode(" <div class=\"contCoat\" data-v-0fc9856c><p class=\"orderText\" data-v-0fc9856c>"+_vm._ssrEscape("\n              "+_vm._s(item.goods_name)+"\n            ")+"</p> <div class=\"orderSel\" data-v-0fc9856c>"+(_vm._ssrList((item.attributes),function(attrItem,index){return ("<p data-v-0fc9856c>"+_vm._ssrEscape("\n                "+_vm._s(attrItem)+" \n              ")+"</p>")}))+"</div> <div class=\"orderDec\" data-v-0fc9856c><p class=\"sellPrice\" data-v-0fc9856c>"+_vm._ssrEscape("\n                "+_vm._s(_vm.orderData ? _vm.$store.getters.getCurrencyArr[_vm.orderData.order_currency].Symbol : '')+"\n                "+_vm._s(item.order_total_price)+"\n              ")+"</p> <span data-v-0fc9856c>"+_vm._ssrEscape("x "+_vm._s(item.sku_quantity))+"</span></div></div> "+((item.msg)?("<div class=\"dateCoat\" data-v-0fc9856c>"+_vm._ssrEscape("\n            "+_vm._s(item.msg.date_title + '：' + item.msg.date_note)+"\n          ")+"</div>"):"<!---->")+" <div class=\"statusTextCoat\" data-v-0fc9856c><p data-v-0fc9856c>"+_vm._ssrEscape(_vm._s(item.status_text))+"</p> "+((item.status == 4 || item.status == 5)?("<div class=\"trackingInfo\" data-v-0fc9856c>"+_vm._ssrEscape("\n              "+_vm._s(_vm.$t("orderDetail.TrackingInfo"))+"\n            ")+"</div>"):"<!---->")+"</div> "),(_vm.orderData.status == 2)?_vm._ssrNode("<div class=\"orderOperation\" data-v-0fc9856c>","</div>",[(item.item_receive == 1)?_c('el-button',{staticClass:"haveReceivedCoat",attrs:{"loading":_vm.receiptOrderLoading},on:{"click":function($event){return _vm.haveReceived(item.order_id)}}},[_vm._v(" "+_vm._s(_vm.$t("orderDetail.HaveReceived")))]):_vm._e(),_vm._ssrNode(" "+((item.item_cancel == 1)?("<div class=\"cancelOrderCoat\" data-v-0fc9856c><p data-v-0fc9856c>"+_vm._ssrEscape(_vm._s(_vm.$t("orderDetail.CancelOrder")))+"</p></div>"):"<!---->")+" "+((item.item_refund == 1)?("<div class=\"requestRefundCoat\" data-v-0fc9856c><p data-v-0fc9856c>"+_vm._ssrEscape(_vm._s(_vm.$t("orderDetail.RequestRefund")))+"</p></div>"):"<!---->"))],2):_vm._e()],2)}),0)],2),_vm._ssrNode(" <div class=\"cancelMasking\""+(_vm._ssrStyle(null,null, { display: (_vm.cancelMaskingShow) ? '' : 'none' }))+" data-v-0fc9856c><div class=\"maskCont\" data-v-0fc9856c><span class=\"el-icon-close\" data-v-0fc9856c></span> <p class=\"maskTil\" data-v-0fc9856c>"+_vm._ssrEscape("\n          "+_vm._s(_vm.$t("orderDetail.reason"))+"\n        ")+"</p> "+(_vm._ssrList((_vm.reasonsList),function(item,index){return ("<div class=\"cancelList\" data-v-0fc9856c><p data-v-0fc9856c>"+_vm._ssrEscape(_vm._s(item.title))+"</p> <span"+(_vm._ssrClass(null,index == _vm.cancelActive ? 'el-icon-success' : 'quan'))+" data-v-0fc9856c></span></div>")}))+" <div class=\"writeCoat\""+(_vm._ssrStyle(null,null, { display: (_vm.cancelActive == _vm.reasonsList.length - 1) ? '' : 'none' }))+" data-v-0fc9856c><textarea name id cols=\"30\" rows=\"10\" placeholder=\"Please write your reason for cancellation\" data-v-0fc9856c>"+_vm._ssrEscape(_vm._s(_vm.reasonsText))+"</textarea></div> <div class=\"btnCoat\" data-v-0fc9856c><button"+(_vm._ssrClass(null,_vm.cancelActive != 'no' ? 'btnActive' : ''))+" data-v-0fc9856c>"+_vm._ssrEscape("\n            "+_vm._s(_vm.$t("orderDetail.SUBMIT"))+"\n          ")+"</button></div></div></div> "),(_vm.showshipmentState)?_c('shi-pment',{attrs:{"dataInfo":_vm.showshipmentdata},on:{"editClose":function($event){_vm.showshipmentState = false}}}):_vm._e()],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./components/viewOrderDetail/viewOrderDetail.vue?vue&type=template&id=0fc9856c&scoped=true&

// EXTERNAL MODULE: ./components/order/shipment.vue + 4 modules
var shipment = __webpack_require__(129);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/viewOrderDetail/viewOrderDetail.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// import { MH_API } from "@/api/api";
// import orderItem from "./orderItem";

/* harmony default export */ var viewOrderDetailvue_type_script_lang_js_ = ({
  name: "viewOrderDetail",
  components: {
    ShiPment: shipment["a" /* default */]
  },
  props: {
    orderData: {
      type: Object
    }
  },

  head() {
    return {
      script: [{
        src: "https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js"
      }]
    };
  },

  data() {
    return {
      showshipmentState: false,
      itemList: [],
      orderData: null,
      keepInterval: 0,
      countDown: "",
      timeObj: null,
      countDownShow: false,
      reasonsList: [],
      cancelActive: "no",
      reasonsText: "",
      cancelMaskingShow: false,
      ifStatus: "",
      //记录订单状态
      payBtnShow: false,
      //支付组按钮显示状态
      payText: "",
      //支付组按钮显示文本
      payBtnType: 1,
      //支付按钮点击执行的方法
      cancelBtnShow: false,
      //取消按钮显示状态
      cancelText: "",
      //取消订单按钮显示文本
      cancelBtnType: 1,
      //取消按钮点击执行方法,
      showshipmentdata: {},
      receiptOrderLoading: false
    };
  },

  mounted() {
    this.getOrderDetail();
  },

  methods: {
    getOrderDetail() {
      // let orderData = this.orderData;
      // this.orderData = orderData;
      let line_items = this.orderData.line_items;
      this.itemList = line_items;
      let {
        status,
        status_text
      } = this.orderData;
      this.cancelOrderReasons();
    },

    copy() {
      let thif = this;
      let clipboard = new ClipboardJS("#copyOrderId");
      clipboard.on("success", function (e) {
        e.clearSelection(); //选中需要复制的内容

        clipboard.destroy();
        thif.$message(thif.$t("shopDetail.CopySuccessfully"));
      });
      clipboard.on("error", function (e) {
        clipboard.destroy();
        thif.$message(thif.$t("shopDetail.CopyError"));
      });
    },

    toCheckoutTwo() {
      this.$router.push({
        path: "/checkoutTwo",
        query: {
          orderId: this.$route.query.orderId
        }
      });
    },

    showshipment(item, id) {
      console.log(item, "oooo", id);
      let shipmentinfo = null;

      if (item.item_shipment.length != null) {
        shipmentinfo = {
          details: [{
            message: "In the packaging",
            date: "",
            location: ""
          }]
        };
      } else {
        shipmentinfo = item.item_shipment["shipment"];
      }

      this.showshipmentdata = shipmentinfo;
      this.showshipmentState = !this.showshipmentState;
    },

    //已支付的父订单的子sku订单确认收货
    haveReceived(order_id) {
      let thif = this;
      this.$confirm("Have You Recevied Your Items?", {
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel"
      }).then(() => {
        // this.receiptOrderLoading = true;
        thif.receiptOrder(order_id);
      });
    },

    //已支付的父订单的子sku订单退款,走发邮件退款
    requestRefund(order_id) {
      let thif = this;
      let email = "support@frissonlife.com";
      let subject = `Refund Child Order (${order_id})`;
      this.$confirm(`If you have any issues with your product, please contact our email at <a href="mailto:${email}?subject=${subject}" style='color: #f55915'>support@frissonlife.com</a> to inform us of your order number.`, {
        dangerouslyUseHTMLString: true,
        confirmButtonText: "Contact",
        cancelButtonText: "Cancel"
      }).then(() => {
        thif.cancelOrderSendEmail(order_id, 1);
      });
    },

    //已支付的父订单的子sku订单取消,走发邮件取消订单
    cancelChildOrder(order_id) {
      let thif = this;
      let email = "support@frissonlife.com";
      let subject = `Cancel Child Order (${order_id})`;
      this.$confirm(`If you have any issues with your product, please contact our email at <a href="mailto:${email}?subject=${subject}" style='color: #f55915'>support@frissonlife.com</a> to inform us of your order number.`, {
        dangerouslyUseHTMLString: true,
        confirmButtonText: "Contact",
        cancelButtonText: "Cancel"
      }).then(() => {
        thif.cancelOrderSendEmail(order_id, 2); //   let sendObj = {
        //     order_id: order_id,
        //     cancel_type: "order"
        //     // reason_id: String(reasonsObj.id)
        //   };
        //   this.$apis
        //     .clearOrder(sendObj, this.$store.getters.getApiHeader)
        //     .then(res => {
        //       if (res.status == 1) {
        // 		thif.common.msgBox(thif, res.msg, 1);
        // 		thif.getOrderDetail();
        //       } else {
        // 		thif.common.msgBox(thif, res.msg, 3);
        // 		thif.getOrderDetail();
        //       }
        //     })
        //     .catch(err => {
        //       console.log(err);
        //     });
      });
    },

    // 未支付的父订单取消
    cancelClick() {
      //cancelMaskingShow = true
      if (this.cancelBtnType == 1) {
        this.cancelMaskingShow = true;
      } else {
        //退款程序
        // 单纯弹窗提示联系客服
        this.$alert("If you have any issues with your product, please contact our email at <span style='color: #f55915'>support@frissonlife.com</span> to inform us of your order number.", "WARNING", {
          confirmButtonText: "CONFIRM",
          dangerouslyUseHTMLString: true
        });
      }
    },

    //确认收货接口
    receiptOrder(order_id) {
      let obj = {
        order_id
      };
      this.$apis.receiptOrder(obj, this.$store.getters.getApiHeader).then(res => {
        //   this.receiptOrderLoading = false;
        if (res.status == 1) {
          this.getOrderDetail();
          this.common.msgBox(this, res.msg, 1);
        } else {
          this.common.msgBox(this, res.msg, 3);
        }
      }).catch(err => {
        //   this.receiptOrderLoading = false;
        console.log(err);
      });
    },

    //取消订单接口
    clearOrder() {
      let thif = this;
      let reasonsObj = this.reasonsList[this.cancelActive];
      let sendObj = null;

      if (reasonsObj.type == 1) {
        sendObj = {
          master_order_id: this.$route.query.orderId,
          cancel_type: "master_order",
          reason_id: String(reasonsObj.id)
        };
      } else if (reasonsObj.type == 2) {
        sendObj = {
          master_order_id: this.$route.query.orderId,
          cancel_type: "master_order",
          reason_id: String(reasonsObj.id),
          reason_content: this.reasonsText
        };
      }

      this.$apis.clearOrder(sendObj, this.$store.getters.getApiHeader).then(res => {
        console.log(res);

        if (res.status == 1) {
          thif.common.msgBox(thif, res.msg, 1);
          thif.cancelMaskingShow = false;
          thif.$router.go(-1);
        } else {
          thif.cancelMaskingShow = false;
          thif.common.msgBox(thif, res.msg, 3);
        }
      }).catch(err => {
        console.log(err);
      });
    },

    //取消订单原因
    cancelOrderReasons() {
      let thif = this;
      this.$apis.cancelOrderReasons({}, this.$store.getters.getApiHeader).then(res => {
        console.log(res);

        if (res.status == 1) {
          thif.reasonsList = res.data.items;
        }
      }).catch(err => {
        console.log(err);
      });
    },

    //发起邮箱
    cancelOrderSendEmail(orderId, type) {
      let email = "support@frissonlife.com";
      let subject; //type=1为退款发邮件

      if (type == 1) {
        subject = `Refund Child Order (${orderId})`;
      } //type=2为取消订单发邮件


      if (type == 2) {
        subject = `Cancel Child Order (${orderId})`;
      }

      window.location.href = `mailto:${email}?subject=${subject}`;
    }

  },

  beforeDestroy() {
    clearInterval(this.keepInterval);
  }

});
// CONCATENATED MODULE: ./components/viewOrderDetail/viewOrderDetail.vue?vue&type=script&lang=js&
 /* harmony default export */ var viewOrderDetail_viewOrderDetailvue_type_script_lang_js_ = (viewOrderDetailvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(3);

// CONCATENATED MODULE: ./components/viewOrderDetail/viewOrderDetail.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(247)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  viewOrderDetail_viewOrderDetailvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "0fc9856c",
  "5d1173fe"
  
)

/* harmony default export */ var viewOrderDetail = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 247:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_viewOrderDetail_vue_vue_type_style_index_0_id_0fc9856c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(149);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_viewOrderDetail_vue_vue_type_style_index_0_id_0fc9856c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_viewOrderDetail_vue_vue_type_style_index_0_id_0fc9856c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_viewOrderDetail_vue_vue_type_style_index_0_id_0fc9856c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_viewOrderDetail_vue_vue_type_style_index_0_id_0fc9856c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 248:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_orderTracking_vue_vue_type_style_index_0_id_7457cb45_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(150);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_orderTracking_vue_vue_type_style_index_0_id_7457cb45_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_orderTracking_vue_vue_type_style_index_0_id_7457cb45_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_orderTracking_vue_vue_type_style_index_0_id_7457cb45_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_orderTracking_vue_vue_type_style_index_0_id_7457cb45_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 341:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/orderTracking.vue?vue&type=template&id=7457cb45&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(!_vm.orderData)?_vm._ssrNode("<div class=\"forgot-password-one\" data-v-7457cb45>","</div>",[_vm._ssrNode("<p class=\"headTil\" data-v-7457cb45>View Or Manage Your Order</p> "),_vm._ssrNode("<div class=\"f-container\" data-v-7457cb45>","</div>",[_c('el-row',{attrs:{"gutter":20}},[_c('el-col',{attrs:{"lg":12,"offset":6,"sm":24,"xs":24}},[_c('div',{staticClass:"listCoat"},[_c('p',{staticClass:"til"},[_vm._v("To view the order or return, please enter\n              "),_c('br'),_vm._v(" your order number and email address")]),_vm._v(" "),_c('el-form',{ref:"viewOrderForm",staticClass:"login-form-2",attrs:{"model":_vm.viewOrderForm,"rules":_vm.rules,"status-icon":"","label-width":"200px"}},[_c('el-form-item',{staticClass:"el-form-item-email OrderNumber",attrs:{"prop":"orderNum"}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.viewOrderForm.orderNum),expression:"viewOrderForm.orderNum"}],staticClass:"OrderLabel"},[_vm._v("Order number*")]),_vm._v(" "),_c('el-input',{attrs:{"placeholder":"Order number*"},model:{value:(_vm.viewOrderForm.orderNum),callback:function ($$v) {_vm.$set(_vm.viewOrderForm, "orderNum", $$v)},expression:"viewOrderForm.orderNum"}})],1),_vm._v(" "),_c('el-form-item',{staticClass:"el-form-item-email emailAddress",attrs:{"prop":"email"}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.emailAddressShow),expression:"emailAddressShow"}],staticClass:"OrderLabel"},[_vm._v("Email address*")]),_vm._v(" "),_c('el-input',{attrs:{"placeholder":"Email address*"},model:{value:(_vm.viewOrderForm.email),callback:function ($$v) {_vm.$set(_vm.viewOrderForm, "email", $$v)},expression:"viewOrderForm.email"}})],1),_vm._v(" "),_c('el-form-item',{staticClass:"el-form-item-signIn"},[(_vm.validInformationShow)?_c('div',{staticClass:"valid"},[_vm._v("\n                  Please enter valid information\n                ")]):_vm._e(),_vm._v(" "),_c('el-button',{attrs:{"loading":_vm.confirmSubmitLoading,"type":"primary"},on:{"click":function($event){return _vm.confirmSubmit('viewOrderForm')}}},[_vm._v("SUBMIT")]),_vm._v(" "),_c('div',{staticClass:"accountTil"},[_c('span',[_vm._v("Already have an account ？")]),_vm._v(" "),_c('a',{on:{"click":function($event){return _vm.sign()}}},[_vm._v("sign in")])])],1)],1)],1)])],1)],1)],2):_vm._e(),_vm._ssrNode(" "),(_vm.orderData)?_c('view-order-detail',{attrs:{"orderData":_vm.orderData}}):_vm._e(),_vm._ssrNode(" "),_c('f-footer')],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./pages/orderTracking.vue?vue&type=template&id=7457cb45&scoped=true&

// EXTERNAL MODULE: ./components/footer/f-footer.vue + 4 modules
var f_footer = __webpack_require__(84);

// EXTERNAL MODULE: ./components/viewOrderDetail/viewOrderDetail.vue + 4 modules
var viewOrderDetail = __webpack_require__(194);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/orderTracking.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var orderTrackingvue_type_script_lang_js_ = ({
  name: "orderTracking",
  components: {
    fFooter: f_footer["default"]
  },

  data() {
    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;

    var validateOrderNum = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter valid order number"));
      } else {
        callback();
      }
    };

    var validateEmail = (rule, value, callback) => {
      if (value == "") {
        this.emailAddressShow = false;
        callback(new Error("Please enter valid e-mail address"));
      } else if (!reg.test(value)) {
        this.emailAddressShow = true;
        callback(new Error("Please enter valid e-mail address"));
      } else {
        this.emailAddressShow = true;
        callback();
      }
    };

    return {
      orderData: null,
      confirmSubmitLoading: false,
      emailAddressShow: false,
      validInformationShow: false,
      viewOrderForm: {
        orderNum: "",
        email: ""
      },
      rules: {
        orderNum: [{
          validator: validateOrderNum,
          trigger: "change"
        }],
        email: [{
          validator: validateEmail,
          trigger: "change"
        }]
      }
    };
  },

  mounted() {
    this.buryingPoint.pageView();
    let {
      order_id,
      email
    } = this.$route.query;
    this.viewOrderForm.orderNum = order_id; // if (email && order_id) {
    //   this.getOrderDetail(order_id, email);
    // }

    if (this.$store.state.loginToken && order_id) {
      this.$router.push({
        path: `/user/orderDetail?orderId=${order_id}`
      });
    }
  },

  methods: {
    sign() {
      this.$router.push({
        path: "/login"
      });
    },

    getOrderDetail(id, email) {
      this.$apis.orderDetail({
        email,
        id
      }).then(res => {
        if (res.status == 1) {
          this.orderData = res.data.item;
        } else {
          thif.common.msgBox(thif, res.msg, 3);
        }
      }).catch(err => {
        this.confirmSubmitLoading = false;
        console.log(err);
      });
    },

    confirmSubmit(formName) {
      let thif = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.validInformationShow = false;
          this.confirmSubmitLoading = true;
          var {
            email,
            orderNum
          } = this.viewOrderForm;
          this.$apis.orderDetail({
            email,
            id: orderNum
          }).then(res => {
            this.confirmSubmitLoading = false;

            if (res.status == 1) {
              this.orderData = res.data.item;
              this.$router.push({
                path: "/orderTracking",
                query: {
                  order_id: this.$route.query.order_id,
                  email
                }
              });
            } else {
              this.validInformationShow = true;
            }
          }).catch(err => {
            this.confirmSubmitLoading = false;
            console.log(err);
          });
        } else {
          return false;
        }
      });
    },

    shopNow() {
      this.$router.push({
        path: "/"
      });
    }

  }
});
// CONCATENATED MODULE: ./pages/orderTracking.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_orderTrackingvue_type_script_lang_js_ = (orderTrackingvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(3);

// CONCATENATED MODULE: ./pages/orderTracking.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(248)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  pages_orderTrackingvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "7457cb45",
  "2426d75e"
  
)

/* harmony default export */ var orderTracking = __webpack_exports__["default"] = (component.exports);

/* nuxt-component-imports */
installComponents(component, {ViewOrderDetail: __webpack_require__(194).default,FFooter: __webpack_require__(84).default})


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
//# sourceMappingURL=orderTracking.js.map