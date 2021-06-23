exports.ids = [14];
exports.modules = {

/***/ 148:
/***/ (function(module, exports) {

// Exports
module.exports = {};


/***/ }),

/***/ 246:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_login_vue_vue_type_style_index_0_id_e1202c4a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(148);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_login_vue_vue_type_style_index_0_id_e1202c4a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_login_vue_vue_type_style_index_0_id_e1202c4a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_login_vue_vue_type_style_index_0_id_e1202c4a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_1_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_login_vue_vue_type_style_index_0_id_e1202c4a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 340:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/login.vue?vue&type=template&id=e1202c4a&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_vm._ssrNode("<div class=\"f-container\" data-v-e1202c4a>","</div>",[_c('el-row',{attrs:{"gutter":0}},[_c('el-col',{staticStyle:{"display":"flex","justify-content":"space-around"},attrs:{"lg":12,"sm":24,"xs":24}},[_c('div',{staticClass:"listCoat"},[_c('p',{staticClass:"til"},[_vm._v(_vm._s(_vm.$t("login.SIGNIN")))]),_vm._v(" "),_c('el-form',{ref:"validateLoginForm",staticClass:"login-form-1",attrs:{"model":_vm.validateLoginForm,"rules":_vm.rules,"label-width":"200px"}},[_c('el-form-item',{class:_vm.emailInputRed ? 'el-form-item-email emailInputRed' : 'el-form-item-email',attrs:{"label":"Email Address:","prop":"email"}},[_c('el-input',{model:{value:(_vm.validateLoginForm.email),callback:function ($$v) {_vm.$set(_vm.validateLoginForm, "email", $$v)},expression:"validateLoginForm.email"}})],1),_vm._v(" "),_c('el-form-item',{class:_vm.passwordInputRed ? 'el-form-item-pass passwordInputRed' : 'el-form-item-pass',attrs:{"label":"Password:","prop":"pass"}},[_c('el-input',{attrs:{"type":"password"},model:{value:(_vm.validateLoginForm.pass),callback:function ($$v) {_vm.$set(_vm.validateLoginForm, "pass", $$v)},expression:"validateLoginForm.pass"}})],1),_vm._v(" "),_c('div',{staticClass:"forgot-pass-box"},[_c('a',{attrs:{"id":"forgot-pass-1","href":"/forgotPassword"}},[_vm._v(_vm._s(_vm.$t("login.ForgotPassword")))])]),_vm._v(" "),_c('el-form-item',{staticClass:"el-form-item-signIn"},[_c('el-button',{attrs:{"type":"primary","loading":_vm.signInLoading},on:{"click":function($event){return _vm.signIn('validateLoginForm')}}},[_vm._v(_vm._s(_vm.$t("login.SIGNIN")))])],1),_vm._v(" "),_c('p',{staticClass:"orJoinWith"},[_vm._v(_vm._s(_vm.$t("login.JOINWITH")))]),_vm._v(" "),_c('el-form-item',{staticClass:"el-form-item-facebook"},[_c('img',{staticClass:"googleBtn",attrs:{"id":"googleBtn","src":__webpack_require__(16),"alt":""}}),_vm._v(" "),_c('img',{staticClass:"facebookBtn",attrs:{"src":__webpack_require__(17),"alt":""},on:{"click":_vm.facebookLogin}})])],1)],1)]),_vm._v(" "),_c('el-col',{staticStyle:{"border-left":"1px solid #ececec","display":"flex","justify-content":"space-around"},attrs:{"lg":12,"sm":24,"xs":24}},[_c('div',{staticClass:"listCoat"},[_c('p',{staticClass:"til"},[_vm._v(_vm._s(_vm.$t("login.REGISTER")))]),_vm._v(" "),_c('el-form',{ref:"validateRegisterForm",staticClass:"login-form-1",attrs:{"model":_vm.validateRegisterForm,"rules":_vm.rules_,"label-width":"200px"}},[_c('el-form-item',{class:_vm.emailInputRed_ ? 'el-form-item-email emailInputRed' : 'el-form-item-email',attrs:{"label":"Email Address:","prop":"email"}},[_c('el-input',{model:{value:(_vm.validateRegisterForm.email),callback:function ($$v) {_vm.$set(_vm.validateRegisterForm, "email", $$v)},expression:"validateRegisterForm.email"}})],1),_vm._v(" "),_c('el-form-item',{class:_vm.passwordInputRed_ ? 'el-form-item-pass passwordInputRed' : 'el-form-item-pass',attrs:{"label":"Password:","prop":"pass"}},[_c('el-input',{attrs:{"type":"password"},model:{value:(_vm.validateRegisterForm.pass),callback:function ($$v) {_vm.$set(_vm.validateRegisterForm, "pass", $$v)},expression:"validateRegisterForm.pass"}})],1),_vm._v(" "),_c('div',{staticStyle:{"width":"410px","margin":"24px auto 0"},attrs:{"id":"robot"}}),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.grecaptchaRed),expression:"grecaptchaRed"}],staticStyle:{"color":"#f56c6c","font-size":"12px","width":"410px","text-align":"center"}},[_vm._v("Please perform human-machine authentication.")]),_vm._v(" "),_c('el-form-item',{staticClass:"el-form-item-privacy-policy",attrs:{"label":"","prop":"type"}},[_c('el-checkbox-group',{model:{value:(_vm.validateRegisterForm.type),callback:function ($$v) {_vm.$set(_vm.validateRegisterForm, "type", $$v)},expression:"validateRegisterForm.type"}},[_c('el-checkbox',{attrs:{"name":"type"}},[_c('div',{staticClass:"el-checkbox-label"},[_vm._v(_vm._s(_vm.$t("login.AGREE"))+"\n                    "),_c('nuxt-link',{attrs:{"to":"/footPage/Term"}},[_vm._v(" "+_vm._s(_vm.$t("login.TermsOfUse"))+" ")]),_vm._v(_vm._s(_vm.$t("login.And"))+"\n                    "),_c('nuxt-link',{attrs:{"to":"/footPage/Privacy"}},[_vm._v(" "+_vm._s(_vm.$t("login.PrivacyPolicy")))])],1)])],1)],1),_vm._v(" "),_c('el-form-item',{staticClass:"el-form-item-signIn"},[_c('el-button',{attrs:{"type":"primary","loading":_vm.registerLoading},on:{"click":function($event){return _vm.register('validateRegisterForm')}}},[_vm._v(_vm._s(_vm.$t("login.REGISTER")))])],1),_vm._v(" "),_c('p',{staticClass:"orJoinWith"},[_vm._v(_vm._s(_vm.$t("login.JOINWITH")))]),_vm._v(" "),_c('el-form-item',{staticClass:"el-form-item-facebook"},[_c('img',{staticClass:"googleBtn",attrs:{"id":"googleBtn_","src":__webpack_require__(16),"alt":""}}),_vm._v(" "),_c('img',{staticClass:"facebookBtn",attrs:{"src":__webpack_require__(17),"alt":""},on:{"click":_vm.facebookLogin}})])],1)],1)])],1)],1),_vm._ssrNode(" "),_c('f-footer')],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./pages/login.vue?vue&type=template&id=e1202c4a&scoped=true&

// EXTERNAL MODULE: ./node_modules/element-ui/lib/loading.js
var loading = __webpack_require__(2);
var loading_default = /*#__PURE__*/__webpack_require__.n(loading);

// EXTERNAL MODULE: ./utils/js-cookie.js
var js_cookie = __webpack_require__(1);

// EXTERNAL MODULE: ./components/footer/f-footer.vue + 4 modules
var f_footer = __webpack_require__(84);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/login.vue?vue&type=script&lang=js&


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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


/* harmony default export */ var loginvue_type_script_lang_js_ = ({
  name: "login",
  components: {
    fFooter: f_footer["default"]
  },

  data() {
    var reg = /([\w\-]+\@[\w\-]+\.[\w\-]+)/;

    var validateEmail = (rule, value, callback) => {
      if (value === "") {
        this.emailInputRed = true;
        callback(new Error("Email cannot be empty."));
      } else if (!reg.test(value)) {
        this.emailInputRed = true;
        callback(new Error("Please enter a valid email address."));
      } else {
        this.emailInputRed = false;
        callback();
      }
    };

    var validatePass = (rule, value, callback) => {
      if (value === "") {
        this.passwordInputRed = true;
        callback(new Error("Password cannot be empty."));
      } else {
        this.passwordInputRed = false;
        callback();
      }
    };

    var validateEmail_ = (rule, value, callback) => {
      if (value === "") {
        this.emailInputRed_ = true;
        callback(new Error("Email cannot be empty."));
      } else if (!reg.test(value)) {
        this.emailInputRed_ = true;
        callback(new Error("Please enter a valid email address."));
      } else {
        this.emailInputRed_ = false;
        callback();
      }
    };

    var validatePass_ = (rule, value, callback) => {
      if (value === "") {
        this.passwordInputRed_ = true;
        callback(new Error("Password cannot be empty."));
      } else {
        this.passwordInputRed_ = false;
        callback();
      }
    };

    return {
      logEmail: "",
      logPass: "",
      regUsername: "",
      regEmail: "",
      regPass: "",
      rememberState: false,
      validateLoginForm: {
        pass: "",
        email: ""
      },
      validateRegisterForm: {
        pass: "",
        email: "",
        type: []
      },
      rules: {
        email: [{
          validator: validateEmail,
          trigger: "change"
        }],
        pass: [{
          validator: validatePass,
          trigger: "change"
        }]
      },
      rules_: {
        email: [{
          validator: validateEmail_,
          trigger: "change"
        }],
        pass: [{
          validator: validatePass_,
          trigger: "change"
        }],
        type: [{
          type: "array",
          required: true,
          message: "This field is required.",
          trigger: "change"
        }]
      },
      grecaptchaToken: "",
      emailInputRed: false,
      passwordInputRed: false,
      emailInputRed_: false,
      passwordInputRed_: false,
      signInLoading: false,
      registerLoading: false,
      grecaptchaShow: false,
      verificationExpired: true,
      verificationFailed: true,
      verifiedSuccessfully: false,
      grecaptchaRed: false,
      widgetId: "",
      reCaptcha_version: 3,
      sitekeyV2: "6Lcylv8ZAAAAAJCnO0x_hnMAAco6IHhanFLduYB4",
      sitekeyV3: "6Lfi7TYaAAAAAKSWSplI93ysqCxbp4uiD4pdsqKh"
    };
  },

  mounted() {
    if (this.$route.query.regEmail) {
      this.validateRegisterForm.email = this.$route.query.regEmail;
    }

    this.buryingPoint.pageView();
    let script = document.createElement("script");
    let script_ = document.createElement("script");
    script.src = "https://apis.google.com/js/api:client.js";
    script_.src = `https://www.recaptcha.net/recaptcha/api.js?render=${this.sitekeyV3}`;

    script.onload = () => {
      this.initGoogleApi();
    };

    document.body.appendChild(script);
    document.body.appendChild(script_);
    let that = this;

    script_.onload = () => {
      window.grecaptcha.ready(function () {
        window.grecaptcha.execute(that.sitekeyV3, {
          action: "register"
        }).then(function (token) {
          console.log(token, "token++++", window.location.host);
          that.grecaptchaToken = token;
          that.initBack(); // let obj = {
          //   action: 'register',
          //   host_name: window.location.hostname,
          //   reCaptcha_version: 3,
          //   gRecaptchaResponse: token
          // }
          // that.$apis
          // .manMachineVerification(obj, that.$store.getters.getApiHeader)
          // .then(res => {
          //   if (res.status == 1) {
          //     //得分高走v3无感知人机校验
          //     if(res.data.item){
          //       that.initBack();
          //     }else{
          //     //得分低可能为机器人走v2图片人机校验
          //       let script = document.createElement("script");
          //       script.src = `https://www.google.com/recaptcha/api.js`;
          //       document.body.appendChild(script);
          //     }
          //   } else {
          //     that.common.msgBox(that, res.msg, 3);
          //   }
          // })
          // .catch(err => {
          //   console.log(err);
          // });
        });
      });
    };

    let userinfo = localStorage.getItem("forooUserInfo");

    if (userinfo != null && userinfo != "null") {
      this.rememberState = true;
      let objs = JSON.parse(userinfo);
      this.logEmail = objs.email;
      this.logPass = objs.pass;
    }
  },

  head() {
    return {
      title: "",
      meta: [{
        hid: "description",
        name: "description",
        content: ""
      }],
      script: [{
        src: "//connect.facebook.net/zh_CN/sdk.js#xfbml=1&version=v2.9",
        async: true
      }, {
        src: `https://www.recaptcha.net/recaptcha/api.js?render=${this.sitekeyV3}`
      }]
    };
  },

  methods: {
    // goBack(k, v) {
    //   this.$bus.$emit(k, v);
    //   this.$router.go(-1);
    // },
    initBack() {
      this.grecaptchaShow = true;
      this.verificationExpired = true;
      this.verificationFailed = true;
      this.verifiedSuccessfully = true;
    },

    initBackReserve() {
      this.grecaptchaShow = false;
      this.verificationExpired = false;
      this.verificationFailed = false;
      this.verifiedSuccessfully = false;
    },

    grecaptchaInit() {
      let that = this; // 初始化人机验证

      this.widgetId = window.grecaptcha.render(`robot`, {
        sitekey: that.sitekeyV2,
        //V2版本客户端公钥
        theme: "light",
        //主题颜色，有light与dark两个值可选
        size: "normal",
        //尺寸规则，有normal与compact两个值可选
        callback: that.callback,
        //验证成功回调
        "expired-callback": that.expiredCallback,
        //验证过期回调
        "error-callback": that.errorCallback //验证错误回调

      });
      this.grecaptchaShow = true;
    },

    //验证成功
    callback(args) {
      this.grecaptchaToken = args;
      this.grecaptchaRed = false;
      this.verifiedSuccessfully = true;
      this.verificationExpired = true;
      this.verificationFailed = true;
    },

    //验证过期
    expiredCallback(args) {
      this.grecaptchaRed = false;
      this.verificationExpired = false;
    },

    //验证失败
    errorCallback(args) {
      this.grecaptchaRed = false;
      this.verificationFailed = false;
    },

    initGoogleApi() {
      let thif = this;
      gapi.load("auth2", function () {
        window.auth2 = gapi.auth2.init({
          client_id: "11465366231-kkledu2lf0l7974uuivh5lihhfeoclas.apps.googleusercontent.com",
          //第二步申请的客户端id
          cookiepolicy: "single_host_origin",
          scope: "profile" //可以请求除了默认的'profile' and 'email'之外的数据

        }); //Google第三方登录初始化绑定dom事件

        let element = document.getElementById("googleBtn");
        let element_ = document.getElementById("googleBtn_");
        thif.attachSignin(element);
        thif.attachSignin(element_);
        setTimeout(() => {
          (function () {
            window.FB.init({
              appId: "161441579100387",
              cookie: true,
              xfbml: 1,
              version: "v2.9"
            });
          })();
        }, 1000);
      });
    },

    attachSignin(element) {
      let that = this;
      setTimeout(() => {
        window.auth2.attachClickHandler(element, {}, function (googleUser) {
          var profile = window.auth2.currentUser.get().getBasicProfile();

          loading_default.a.service({
            lock: true,
            text: "google Logging in",
            background: "rgba(0, 0, 0, 0.7)"
          });

          if (profile.getEmail() != null) {
            that.otherLogin({
              social_type: "google",
              identifier: profile.getId(),
              email: profile.getEmail(),
              name: profile.getName(),
              image_url: profile.getImageUrl()
            }, "google");
          } else {
            that.otherLogin({
              social_type: "google",
              identifier: profile.getId(),
              name: profile.getName(),
              image_url: profile.getImageUrl()
            }, "google");
          }
        }, function (error) {
          console.log(JSON.stringify(error, undefined, 2));
        });
      }, 1000);
    },

    facebookLogin() {
      let thif = this;

      if (FB) {
        loading_default.a.service({
          lock: true,
          text: "Facebook Logging in",
          background: "rgba(0, 0, 0, 0.7)"
        });
      }

      FB.login(function (response) {
        if (response.status == "connected") {
          let accessToken = response.authResponse.accessToken; //取得 accessToken

          let userID = response.userID;
          FB.api("/me?email", function (res) {
            if (res.email != null) {
              thif.otherLogin({
                social_type: "fb",
                user_id: userID,
                email: res.email,
                id_token: accessToken
              }, "facebook");
            } else {
              thif.otherLogin({
                social_type: "fb",
                user_id: userID,
                id_token: accessToken
              }, "facebook");
            }
          });
        } else {
          loading_default.a.service().close();

          thif.common.msgBox(thif, "Login failed", 3);
        }
      }, {
        scope: "email"
      }); //需要获取的信息scope
    },

    //获取购物车信息
    getCartInfo() {
      this.$apis.getCart({}, this.$store.getters.getApiHeader).then(res => {
        this.loading = false; // console.log(res)

        if (res.status == 1) {
          let cartId = '';
          let skuIdList = [];
          let cartIdList = [];
          let count = res.data.items_count;
          let cartInfo = res.data.items;
          let {
            skuIds,
            subtotal,
            from,
            goHome
          } = this.$route.query;
          this.$store.dispatch("actCartNum", Number(count));

          for (let i = 0; i < cartInfo.length; i++) {
            console.log(cartInfo, 'cartInfo', skuIds); //商详加购完进入的登录

            if (from == 'product-id') {
              if (cartInfo[i].sku_id == skuIds) {
                cartId = cartInfo[i].cart_id;
                skuIdList = [skuIds];
                console.log('商详结算');
              }
            } else if (from == 'cart') {
              //购物车页进入的登录
              skuIdList = skuIds.split(',');

              for (let j = 0; j < skuIdList.length; j++) {
                if (skuIdList[j] == cartInfo[i].sku_id) {
                  cartIdList.push(cartInfo[i].cart_id);
                }
              }

              console.log(cartIdList, 'cartIdList购物车结算');
              cartId = cartIdList.join();
            }
          }

          console.log(cartId, 'cartId+++++', skuIdList); //游客模式下加购，把加购信息存起来供登录成功直接结账

          if (skuIdList.length && cartId) {
            let obj = {
              cart_id: cartId,
              subtotal,
              skuIds: skuIdList
            };
            console.log(obj, 'obj++++++'); //商详加购完进入的登录
            // if(from == 'product-id'){
            //   this.goNextStep(cartId,subtotal,skuIds);
            // }else{
            //   //购物车页进入的登录
            //   this.goNextStep(cartId,subtotal,skuIds);
            // }

            this.goNextStep(cartId, subtotal, skuIds);
          } else {
            if (goHome) {
              this.$router.push({
                path: "/"
              });
              return;
            }

            this.$router.history.go(-1);
          }
        } else {
          this.common.msgBox(this, res.msg, 3);
        }
      }).catch(err => {
        console.log(err);
      });
    },

    goNextStep(cart_id, subtotal, skuIds) {
      this.checkoutStepOne(cart_id, subtotal, skuIds);
    },

    checkoutStepOne(str, subtotal, items) {
      let buryObj = {
        value: Number(subtotal),
        currency: String(this.$store.getters.getApiHeader.currency),
        items
      };
      this.buryingPoint.CheckoutCart(buryObj);
      this.$apis.checkoutStepOne({
        step: "1",
        cart_ids: str
      }, this.$store.getters.getApiHeader).then(res => {
        if (res.status == 1) {
          this.checkoutNowLoading = false; // thif.delShop(str);//checkoutStepOne之后将购买添加到购物车的商品从购物车删除

          this.$router.push({
            path: "/checkoutDetail"
          });
        } else if (res.status == 5000) {
          this.common.msgBox(this, "Please login", 2);
          this.$router.push({
            path: "/login"
          });
        }
      }).catch(err => {
        console.log(err);
      });
    },

    getUserInfo(id) {
      let thif = this;
      this.$apis.getUsetInfo({
        user_id: id
      }, this.$store.getters.getApiHeader).then(res => {
        if (res.status == 1) {
          thif.$store.dispatch("actUserInfo", res.data.item);
          thif.$store.dispatch("newUserDialogVisible", false);

          if (res.data.item.email) {
            thif.$store.dispatch("actEmail", res.data.item.email);
            js_cookie["a" /* default */].set("email", res.data.item.email, {
              expires: 7,
              path: "/"
            });
          }
        } else {
          thif.common.msgBox(thif, res.msg, 3);
        }
      }).catch(err => {
        console.log(err);
      });
    },

    otherLogin(objs, loginMethods) {
      let thif = this;
      this.$apis.otherLogin(objs, this.$store.getters.getApiHeader).then(res => {
        loading_default.a.service().close();

        if (res.status == 1) {
          thif.buryingPoint.login(loginMethods, res.data.item.user_id);
          thif.$store.dispatch("loginDialogVisible", false);
          thif.getUserInfo(res.data.item.user_id);
          thif.getCartInfo();

          if (thif.rememberState) {
            let objs = {
              email,
              pass: pass
            };
            let info = JSON.stringify(objs);

            if (info != null && info != "null") {
              localStorage.setItem("forooUserInfo", info);
            }
          } else {
            localStorage.setItem("forooUserInfo", null);
          } // token加入全局状态管理存localStorage


          thif.$store.dispatch("actLoginToken", res.data.item.token);
          thif.$store.dispatch("actUserId", res.data.item.user_id);
          js_cookie["a" /* default */].set("loginToken", res.data.item.token, {
            expires: 7,
            path: "/"
          });
          js_cookie["a" /* default */].set("userId", res.data.item.user_id, {
            expires: 7,
            path: "/"
          });
          let routeArr = JSON.parse(sessionStorage.getItem("recordRoute")); // let { name } = this.$route.query;
          // if (name) {
          //   this.$router.history.go(-1);
          // } else {
          //   thif.$router.push({ path: "/" });
          // }
        } else {
          this.common.msgBox(this, res.msg, 3);
        }
      }).catch(err => {
        loading_default.a.service().close();

        console.log(err);
      });
    },

    signIn(formName) {
      let thif = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.signInLoading = true;
          var {
            pass,
            email
          } = this.validateLoginForm;
          this.$apis.login({
            email,
            password: pass
          }, {}).then(res => {
            this.signInLoading = false;

            if (res.status == 1) {
              thif.buryingPoint.login("login", res.data.item.user_id);
              thif.$store.dispatch("loginDialogVisible", false);
              thif.getUserInfo(res.data.item.user_id);
              thif.getCartInfo();

              if (thif.rememberState) {
                let objs = {
                  email,
                  pass: pass
                };
                let info = JSON.stringify(objs);

                if (info != null && info != "null") {
                  localStorage.setItem("forooUserInfo", info);
                }
              } else {
                localStorage.setItem("forooUserInfo", null);
              } // token加入全局状态管理存localStorage


              thif.$store.dispatch("actLoginToken", res.data.item.token);
              thif.$store.dispatch("actUserInfo", res.data.item);
              thif.$store.dispatch("actUserId", res.data.item.user_id);
              js_cookie["a" /* default */].set("loginToken", res.data.item.token, {
                expires: 7,
                path: "/"
              });
              js_cookie["a" /* default */].set("userId", res.data.item.user_id, {
                expires: 7,
                path: "/"
              }); // if (name) {
              //   this.$router.history.go(-1);
              // } else {
              //   thif.$router.push({ path: "/" });
              // }
            } else {
              // Loading.service().close();
              thif.common.msgBox(thif, res.msg, 3);
            }
          }).catch(err => {
            this.signInLoading = true; // Loading.service().close();

            console.log(err);
          });
        } else {
          return false;
        }
      });
    },

    register(formName) {
      let thif = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (!this.grecaptchaShow) {
            thif.grecaptchaInit();
            return;
          }

          if (!this.verificationFailed) {
            return;
          }

          if (!this.verificationExpired) {
            return;
          }

          if (!this.verifiedSuccessfully) {
            this.grecaptchaRed = true;
            return;
          }

          this.registerLoading = true;
          var {
            pass,
            email
          } = this.validateRegisterForm;
          let obj = {
            email,
            password: pass,
            action: "register",
            reCaptcha_version: this.reCaptcha_version,
            gRecaptchaResponse: this.grecaptchaToken,
            host_name: window.location.hostname
          };
          this.$apis.register(obj, {}).then(res => {
            this.registerLoading = false;

            if (res.status == 1) {
              thif.getUserInfo(res.data.item.user_id); // thif.getCartInfo();

              thif.buryingPoint.registerPopup(res.data.item.user_id);
              thif.$store.dispatch("loginDialogVisible", false);
              thif.$store.dispatch("newUserDialogVisible", false); // Loading.service().close();

              if (localStorage.getItem("newUserBox") == 1) {} else {
                localStorage.setItem("newUserReg", "yes");
              }

              thif.$store.dispatch("actLoginToken", res.data.item.token);
              thif.$store.dispatch("actUserInfo", res.data.item);
              js_cookie["a" /* default */].set("loginToken", res.data.item.token, {
                expires: 7,
                path: "/"
              });
              thif.$store.dispatch("actUserId", res.data.item.user_id);
              js_cookie["a" /* default */].set("userId", res.data.item.user_id, {
                expires: 7,
                path: "/"
              });
              thif.$router.push({
                path: "/registeredSuccess"
              });
              setTimeout(function () {
                thif.buryingPoint.CompleteRegistration(res.data.item.user_id);
              }, 0);
            } else if (res.status == 12098) {
              thif.initBackReserve();
              thif.reCaptcha_version = 2;
              let script = document.createElement("script");
              script.src = `https://www.recaptcha.net/recaptcha/api.js`;
              document.body.appendChild(script);
              thif.register("validateRegisterForm");
            } else if (res.status == 12095) {
              thif.common.msgBox(thif, res.msg, 3);
            } else {
              thif.common.msgBox(thif, res.msg, 3);
              grecaptcha.reset(this.widgetId);
            }
          }).catch(err => {
            this.registerLoading = false; // Loading.service().close();

            console.log(err);
          });
        } else {
          return false;
        }
      });
    }

  }
});
// CONCATENATED MODULE: ./pages/login.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_loginvue_type_script_lang_js_ = (loginvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(3);

// CONCATENATED MODULE: ./pages/login.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(246)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  pages_loginvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "e1202c4a",
  "31a1b995"
  
)

/* harmony default export */ var login = __webpack_exports__["default"] = (component.exports);

/* nuxt-component-imports */
installComponents(component, {FFooter: __webpack_require__(84).default})


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
//# sourceMappingURL=login.js.map