<template>
  <div>
    <div class="f-container">
      <el-row :gutter="0">
        <el-col
          :lg="12"
          :sm="24"
          :xs="24"
          style="display: flex;justify-content: space-around;"
        >
          <div class="listCoat">
            <p class="til">{{$t("login.SIGNIN")}}</p>
            <el-form
              :model="validateLoginForm"
              :rules="rules"
              ref="validateLoginForm"
              label-width="200px"
              class="login-form-1"
            >
              <el-form-item
                :class="emailInputRed ? 'el-form-item-email emailInputRed' : 'el-form-item-email'"
                label="Email Address:"
                prop="email"
              >
                <el-input v-model="validateLoginForm.email"></el-input>
              </el-form-item>
              <el-form-item
                :class="passwordInputRed ? 'el-form-item-pass passwordInputRed' : 'el-form-item-pass'"
                label="Password:"
                prop="pass"
              >
                <el-input
                  type="password"
                  v-model="validateLoginForm.pass"
                ></el-input>
              </el-form-item>
              <div class="forgot-pass-box">
                <a
                  id="forgot-pass-1"
                  href="/forgotPassword"
                >{{$t("login.ForgotPassword")}}</a>
              </div>
              <el-form-item class="el-form-item-signIn">
                <el-button
                  type="primary"
                  :loading="signInLoading"
                  @click="signIn('validateLoginForm')"
                >{{$t("login.SIGNIN")}}</el-button>
              </el-form-item>
              <p class="orJoinWith">{{$t("login.JOINWITH")}}</p>
              <el-form-item class="el-form-item-facebook">
                <img
                  id="googleBtn"
                  class="googleBtn"
                  src="~/static/images/img/GOOGLE.png"
                  alt=""
                >
                <img
                  class="facebookBtn"
                  @click="facebookLogin"
                  src="~/static/images/img/FACEBOOK.png"
                  alt=""
                >
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col
          :lg="12"
          :sm="24"
          :xs="24"
          style="border-left: 1px solid #ececec;display: flex;justify-content: space-around;"
        >
          <div class="listCoat">
            <p class="til">{{$t("login.REGISTER")}}</p>
            <el-form
              :model="validateRegisterForm"
              :rules="rules_"
              ref="validateRegisterForm"
              label-width="200px"
              class="login-form-1"
            >
              <el-form-item
                :class="emailInputRed_ ? 'el-form-item-email emailInputRed' : 'el-form-item-email'"
                label="Email Address:"
                prop="email"
              >
                <el-input v-model="validateRegisterForm.email"></el-input>
              </el-form-item>
              <el-form-item
                :class="passwordInputRed_ ? 'el-form-item-pass passwordInputRed' : 'el-form-item-pass'"
                label="Password:"
                prop="pass"
              >
                <el-input
                  type="password"
                  v-model="validateRegisterForm.pass"
                ></el-input>
              </el-form-item>
              <div
                id="robot"
                style="width: 410px;margin: 24px auto 0;"
              ></div>
              <div
                v-show="grecaptchaRed"
                style="color: #f56c6c;font-size: 12px;width: 410px;text-align: center;"
              >Please perform human-machine authentication.</div>
              <el-form-item
                class="el-form-item-privacy-policy"
                label=""
                prop="type"
              >
                <el-checkbox-group v-model="validateRegisterForm.type">
                  <el-checkbox name="type">
                    <div class="el-checkbox-label">{{$t("login.AGREE")}}
                      <nuxt-link to="/footPage/Term">&nbsp;{{$t("login.TermsOfUse")}}&nbsp;</nuxt-link>{{$t("login.And")}}
                      <nuxt-link to="/footPage/Privacy">&nbsp;{{$t("login.PrivacyPolicy")}}</nuxt-link>
                    </div>
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item class="el-form-item-signIn">
                <el-button
                  type="primary"
                  :loading="registerLoading"
                  @click="register('validateRegisterForm')"
                >{{$t("login.REGISTER")}}</el-button>
              </el-form-item>
              <p class="orJoinWith">{{$t("login.JOINWITH")}}</p>
              <el-form-item class="el-form-item-facebook">
                <img
                  id="googleBtn_"
                  class="googleBtn"
                  src="~/static/images/img/GOOGLE.png"
                  alt=""
                >
                <img
                  class="facebookBtn"
                  @click="facebookLogin"
                  src="~/static/images/img/FACEBOOK.png"
                  alt=""
                >
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </div>
    <f-footer></f-footer>
  </div>
</template>

<script>
// import { MH_API } from "@/api/api";
import jsCookie from "@/utils/js-cookie";
import fFooter from "@/components/footer/f-footer";
import { Loading } from "element-ui";
export default {
  name: "login",
  components: {
    fFooter
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
        email: [
          {
            validator: validateEmail,
            trigger: "change"
          }
        ],
        pass: [
          {
            validator: validatePass,
            trigger: "change"
          }
        ]
      },
      rules_: {
        email: [
          {
            validator: validateEmail_,
            trigger: "change"
          }
        ],
        pass: [
          {
            validator: validatePass_,
            trigger: "change"
          }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "This field is required.",
            trigger: "change"
          }
        ]
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
    script_.src = `https://www.recaptcha.net/recaptcha/api.js?render=${
      this.sitekeyV3
    }`;
    script.onload = () => {
      this.initGoogleApi();
    };
    document.body.appendChild(script);
    document.body.appendChild(script_);
    let that = this;
    script_.onload = () => {
      window.grecaptcha.ready(function() {
        window.grecaptcha
          .execute(that.sitekeyV3, { action: "register" })
          .then(function(token) {
            console.log(token, "token++++", window.location.host);
            that.grecaptchaToken = token;
            that.initBack();
            // let obj = {
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
      meta: [{ hid: "description", name: "description", content: "" }],
      script: [
        {
          src: "//connect.facebook.net/zh_CN/sdk.js#xfbml=1&version=v2.9",
          async: true
        },
        {
          src: `https://www.recaptcha.net/recaptcha/api.js?render=${
            this.sitekeyV3
          }`
        }
      ]
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
      let that = this;
      // 初始化人机验证
      this.widgetId = window.grecaptcha.render(`robot`, {
        sitekey: that.sitekeyV2, //V2版本客户端公钥
        theme: "light", //主题颜色，有light与dark两个值可选
        size: "normal", //尺寸规则，有normal与compact两个值可选
        callback: that.callback, //验证成功回调
        "expired-callback": that.expiredCallback, //验证过期回调
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
      gapi.load("auth2", function() {
        window.auth2 = gapi.auth2.init({
          client_id:
            "11465366231-kkledu2lf0l7974uuivh5lihhfeoclas.apps.googleusercontent.com", //第二步申请的客户端id
          cookiepolicy: "single_host_origin",
          scope: "profile" //可以请求除了默认的'profile' and 'email'之外的数据
        });
        //Google第三方登录初始化绑定dom事件
        let element = document.getElementById("googleBtn");
        let element_ = document.getElementById("googleBtn_");
        thif.attachSignin(element);
        thif.attachSignin(element_);
        setTimeout(() => {
          (function() {
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
        window.auth2.attachClickHandler(
          element,
          {},
          function(googleUser) {
            var profile = window.auth2.currentUser.get().getBasicProfile();
            Loading.service({
              lock: true,
              text: "google Logging in",
              background: "rgba(0, 0, 0, 0.7)"
            });
            if (profile.getEmail() != null) {
              that.otherLogin(
                {
                  social_type: "google",
                  identifier: profile.getId(),
                  email: profile.getEmail(),
                  name: profile.getName(),
                  image_url: profile.getImageUrl()
                },
                "google"
              );
            } else {
              that.otherLogin(
                {
                  social_type: "google",
                  identifier: profile.getId(),
                  name: profile.getName(),
                  image_url: profile.getImageUrl()
                },
                "google"
              );
            }
          },
          function(error) {
            console.log(JSON.stringify(error, undefined, 2));
          }
        );
      }, 1000);
    },
    facebookLogin() {
      let thif = this;
      if (FB) {
        Loading.service({
          lock: true,
          text: "Facebook Logging in",
          background: "rgba(0, 0, 0, 0.7)"
        });
      }
      FB.login(
        function(response) {
          if (response.status == "connected") {
            let accessToken = response.authResponse.accessToken; //取得 accessToken
            let userID = response.userID;
            FB.api("/me?email", function(res) {
              if (res.email != null) {
                thif.otherLogin(
                  {
                    social_type: "fb",
                    user_id: userID,
                    email: res.email,
                    id_token: accessToken
                  },
                  "facebook"
                );
              } else {
                thif.otherLogin(
                  {
                    social_type: "fb",
                    user_id: userID,
                    id_token: accessToken
                  },
                  "facebook"
                );
              }
            });
          } else {
            Loading.service().close();
            thif.common.msgBox(thif, "Login failed", 3);
          }
        },
        { scope: "email" }
      ); //需要获取的信息scope
    },
    //获取购物车信息
    getCartInfo() {
      this.$apis
        .getCart({}, this.$store.getters.getApiHeader)
        .then(res => {
          this.loading = false;
          // console.log(res)
          if (res.status == 1) {
            let cartId = '';
            let skuIdList = [];
            let cartIdList = [];
            let count = res.data.items_count;
            let cartInfo = res.data.items;
            let { skuIds, subtotal, from, goHome } = this.$route.query;
            this.$store.dispatch("actCartNum", Number(count));
              for (let i = 0; i < cartInfo.length; i++) {
                console.log(cartInfo,'cartInfo',skuIds)
                //商详加购完进入的登录
                if(from == 'product-id'){
                  if(cartInfo[i].sku_id == skuIds){
                    cartId = cartInfo[i].cart_id;
                    skuIdList = [skuIds];
                    console.log('商详结算')
                  }
                }else if(from == 'cart'){
                //购物车页进入的登录
                  skuIdList = skuIds.split(',');
                  for (let j = 0; j < skuIdList.length; j++) {
                    if(skuIdList[j] == cartInfo[i].sku_id){
                      cartIdList.push(cartInfo[i].cart_id);
                    }
                  }
                  console.log(cartIdList,'cartIdList购物车结算')
                  cartId = cartIdList.join();
                }
              }
              console.log(cartId,'cartId+++++',skuIdList)
            //游客模式下加购，把加购信息存起来供登录成功直接结账
            if (skuIdList.length && cartId) {
              let obj = {
                cart_id: cartId,
                subtotal,
                skuIds: skuIdList
              }
              console.log(obj,'obj++++++')
              //商详加购完进入的登录
              // if(from == 'product-id'){
              //   this.goNextStep(cartId,subtotal,skuIds);
              // }else{
              //   //购物车页进入的登录
              //   this.goNextStep(cartId,subtotal,skuIds);
              // }
              this.goNextStep(cartId,subtotal,skuIds);
            } else {
              if(goHome){
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
        })
        .catch(err => {
          console.log(err);
        });
    },
    goNextStep(cart_id,subtotal,skuIds){
      this.checkoutStepOne(cart_id,subtotal,skuIds);
    },
    checkoutStepOne(str, subtotal, items) {
      let buryObj = {
        value: Number(subtotal),
        currency: String(this.$store.getters.getApiHeader.currency),
        items
      };
      this.buryingPoint.CheckoutCart(buryObj);
      this.$apis
        .checkoutStepOne(
          {
            step: "1",
            cart_ids: str
          },
          this.$store.getters.getApiHeader
        )
        .then(res => {
          if (res.status == 1) {
            this.checkoutNowLoading = false;
            // thif.delShop(str);//checkoutStepOne之后将购买添加到购物车的商品从购物车删除
            this.$router.push({
              path: "/checkoutDetail"
            });
          } else if (res.status == 5000) {
            this.common.msgBox(this, "Please login", 2);
            this.$router.push({ path: "/login" });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getUserInfo(id) {
      let thif = this;
      this.$apis
        .getUsetInfo({ user_id: id }, this.$store.getters.getApiHeader)
        .then(res => {
          if (res.status == 1) {
            thif.$store.dispatch("actUserInfo", res.data.item);
            thif.$store.dispatch("newUserDialogVisible", false);
            if (res.data.item.email) {
              thif.$store.dispatch("actEmail", res.data.item.email);
              jsCookie.set("email", res.data.item.email, {
                expires: 7,
                path: "/"
              });
            }
          } else {
            thif.common.msgBox(thif, res.msg, 3);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    otherLogin(objs, loginMethods) {
      let thif = this;
      this.$apis
        .otherLogin(objs, this.$store.getters.getApiHeader)
        .then(res => {
          Loading.service().close();
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
            }
            // token加入全局状态管理存localStorage
            thif.$store.dispatch("actLoginToken", res.data.item.token);
            thif.$store.dispatch("actUserId", res.data.item.user_id);
            jsCookie.set("loginToken", res.data.item.token, {
              expires: 7,
              path: "/"
            });
            jsCookie.set("userId", res.data.item.user_id, {
              expires: 7,
              path: "/"
            });
            let routeArr = JSON.parse(sessionStorage.getItem("recordRoute"));
            // let { name } = this.$route.query;
            // if (name) {
            //   this.$router.history.go(-1);
            // } else {
            //   thif.$router.push({ path: "/" });
            // }
          } else {
            this.common.msgBox(this, res.msg, 3);
          }
        })
        .catch(err => {
          Loading.service().close();
          console.log(err);
        });
    },
    signIn(formName) {
      let thif = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.signInLoading = true;
          var { pass, email } = this.validateLoginForm;
          this.$apis
            .login({ email, password: pass }, {})
            .then(res => {
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
                }
                // token加入全局状态管理存localStorage
                thif.$store.dispatch("actLoginToken", res.data.item.token);
                thif.$store.dispatch("actUserInfo", res.data.item);
                thif.$store.dispatch("actUserId", res.data.item.user_id);
                jsCookie.set("loginToken", res.data.item.token, {
                  expires: 7,
                  path: "/"
                });
                jsCookie.set("userId", res.data.item.user_id, {
                  expires: 7,
                  path: "/"
                });
                // if (name) {
                //   this.$router.history.go(-1);
                // } else {
                //   thif.$router.push({ path: "/" });
                // }
              } else {
                // Loading.service().close();
                thif.common.msgBox(thif, res.msg, 3);
              }
            })
            .catch(err => {
              this.signInLoading = true;
              // Loading.service().close();
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
          var { pass, email } = this.validateRegisterForm;
          let obj = {
            email,
            password: pass,
            action: "register",
            reCaptcha_version: this.reCaptcha_version,
            gRecaptchaResponse: this.grecaptchaToken,
            host_name: window.location.hostname
          };
          this.$apis
            .register(obj, {})
            .then(res => {
              this.registerLoading = false;
              if (res.status == 1) {
                thif.getUserInfo(res.data.item.user_id);
                // thif.getCartInfo();
                thif.buryingPoint.registerPopup(res.data.item.user_id);
                thif.$store.dispatch("loginDialogVisible", false);
                thif.$store.dispatch("newUserDialogVisible", false);
                // Loading.service().close();
                if (localStorage.getItem("newUserBox") == 1) {
                } else {
                  localStorage.setItem("newUserReg", "yes");
                }
                thif.$store.dispatch("actLoginToken", res.data.item.token);
                thif.$store.dispatch("actUserInfo", res.data.item);
                jsCookie.set("loginToken", res.data.item.token, {
                  expires: 7,
                  path: "/"
                });
                thif.$store.dispatch("actUserId", res.data.item.user_id);
                jsCookie.set("userId", res.data.item.user_id, {
                  expires: 7,
                  path: "/"
                });
                thif.$router.push({ path: "/registeredSuccess" });
                setTimeout(function() {
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
            })
            .catch(err => {
              this.registerLoading = false;
              // Loading.service().close();
              console.log(err);
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login-form-1 {
  .el-form-item-email,
  .el-form-item-pass,
  .el-form-item-privacy-policy {
    margin-bottom: 0px !important;
    /deep/ .el-form-item__label {
      width: 173px !important;
    }
    /deep/ .el-form-item__content {
      margin-left: 68px !important;
      .el-input {
        // width: 88% !important;
        input {
          width: 410px;
          border: 1px solid black;
        }
        /deep/ .el-input__suffix {
          right: 21%;
        }
      }
    }
  }
  .is-error {
    /deep/ .el-checkbox__inner {
      border: 1px solid #ff2b2b;
    }
    .el-checkbox-label {
      color: #ff2b2b;
      a {
        color: #ff2b2b;
      }
    }
  }
  .emailInputRed {
    /deep/ .el-input__inner {
      border: 1px solid #ff2b2b !important;
    }
  }
  .passwordInputRed {
    /deep/ .el-input__inner {
      border: 1px solid #ff2b2b !important;
    }
  }
  .el-form-item-pass {
    /deep/ .el-form-item__label {
      margin-left: -27px !important;
      margin-top: 10px !important;
    }
  }
  .el-form-item-privacy-policy {
    /deep/ .el-form-item__content {
      margin-left: 68px !important;
      /deep/ .el-checkbox__label {
        margin-top: 20px;
        .el-checkbox-label {
          a {
            text-decoration: underline !important;
          }
        }
      }
      /deep/ .el-form-item__error {
        margin-top: -13px;
      }
    }
    /deep/ .el-checkbox__input.is-checked {
      .el-checkbox__inner {
        background-color: black;
        border-color: black;
      }
    }
    /deep/ .el-checkbox__input.is-checked + .el-checkbox__label {
      color: black;
    }
  }
  .el-form-item-signIn {
    /deep/ .el-form-item__content {
      margin-left: 68px !important;
      margin-top: 22px;
      button {
        width: 410px;
        background: $btnBjColor;
        border: none;
        span,
        i {
          color: #fff;
        }
      }
      button:hover {
        background: $buttonBlueHover;
      }
    }
  }
  .el-form-item-facebook {
    /deep/ .el-form-item__content {
      margin-left: 68px !important;
      display: flex;
      .googleBtn,
      .facebookBtn {
        width: 196px;
        height: 36.14px;
        cursor: pointer;
      }
      .googleBtn {
        margin-right: 20px;
      }
      button {
        width: 410px;
        background: #4267b2;
        margin-bottom: 12px;
        span {
          color: #fff;
        }
      }
    }
  }
  .forgot-pass-box {
    width: 410px;
    margin-left: 68px;
    display: flex;
    justify-content: flex-end;
    #forgot-pass-1 {
      margin-top: 35px;
      text-decoration: underline;
      float: right;
      color: black;
      font-size: 16px;
    }
  }
  .orJoinWith {
    width: 410px;
    font-size: 15px;
    color: #999999;
    text-align: center;
    margin: 22px auto 22px 70px;
  }
}
.headTil {
  background-color: #f7f7f7;
  font-size: 26px;
  font-weight: bold;
  color: #555;
  text-align: center;
  line-height: 64px;
  border-top: 1px solid #ececec;
  border-bottom: 1px solid #ececec;
  margin-top: -1px;
}
.listCoat {
  padding: 0 30px;
  margin: 50px 0;
  .til {
    color: #555;
    font-size: 20px;
    margin-bottom: 30px;
    font-weight: bold;
    text-align: center;
    width: 543px;
  }
  .faceCoat {
    cursor: pointer;
    background-color: #4267b2;
    height: 40px;
    border-radius: 4px;
    display: flex;
    padding-left: 8px;
    align-items: center;
    width: 256px;
    img {
      height: 24px;
    }
    span,
    b {
      font-size: 16px;
      color: #fff;
      line-height: 24px;
    }
    b {
      font-weight: bold;
    }
    span {
      margin-left: 12px;
    }
  }
  .fenge {
    width: 100%;
    height: 25px;
    font-size: 16px;
    font-weight: bold;
    color: #72777c;
    margin: 20px 0;
    display: flex;
    align-items: center;
    line-height: 25px;
  }
  .fenge:before,
  .fenge:after {
    content: "";
    flex-grow: 1;
    background-color: #ddd;
    height: 1px;
    margin: 0 8px;
  }
  .iptCoat {
    display: flex;
    flex-direction: column;
    .iptItem {
      display: flex;
      flex-direction: column;
      margin-bottom: 24px;
      p {
        font-size: 14px;
        color: #222;
        margin-bottom: 6px;
        font-weight: 500;
      }
      input {
        height: 38px;
        padding-left: 10px;
        border: 1px solid #ddd;
        box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
      }
    }
  }
  .remember {
    font-size: 14px;
    display: flex;
    flex-direction: row;
    align-items: center;
    span {
      color: #222;
    }
    input {
      margin-right: 8px;
    }
  }
  .btnCoat {
    display: flex;
    margin-top: 28px;
    button {
      cursor: pointer;
      padding: 0 18px;
      height: 40px;
      background-color: #f55915;
      color: #fff;
      font-size: 16px;
      position: relative;
    }
    button:after {
      content: "";
      height: 100%;
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background-color: rgba(0, 0, 0, 1);
      opacity: 0;
      transition: opacity 0.5s;
    }
    button:hover:after {
      opacity: 0.3;
    }
  }
  .lostPassCoat {
    display: flex;
  }
  .lostPass {
    cursor: pointer;
    font-size: 16px;
    color: #334862;
    margin-top: 20px;
    line-height: 18px;
  }
  .privacyPolicy {
    font-size: 13px;
    color: #777;
    line-height: 1.6;
  }
}
</style>