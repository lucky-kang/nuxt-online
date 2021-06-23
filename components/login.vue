<template>
  <div>
    <el-dialog
      :modal-append-to-body="false"
      :visible.sync="dialogVisible"
      width="30%"
      @open="openDialog"
      :before-close="handleClose"
    >
      <!-- <img src="~/static/images/icon/loading.gif" alt="foroo"> -->

      <div class="logo">
        <img
          src="~/static/images/logo2.png"
        >
      </div>
      <el-tabs v-model="activeName">
        <el-tab-pane
          label="Sign In"
          name="SignIn"
        >
          <el-form
            :model="validateLoginForm"
            :rules="rules"
            ref="validateLoginForm"
            label-width="200px"
            class="login-form"
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
            <a
              id="forgot-pass"
              href="/forgotPassword"
            >{{$t("login.ForgotPassword")}}</a>
            <el-form-item class="el-form-item-signIn">
              <el-button
                type="primary"
                :loading="signInLoading"
                @click="signIn('validateLoginForm')"
              >{{$t("login.SIGNIN")}}</el-button>
            </el-form-item>
            <p class="orJoinWith">{{$t("login.JOINWITH")}}</p>
            <el-form-item class="el-form-item-facebook">
              <!-- <el-button type="primary" @click="facebookLogin">FACEBOOK</el-button> -->
              <div class="otherLoginBox">
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
              </div>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane
          label="Register"
          name="Register"
        >
          <el-form
            :model="validateRegisterForm"
            :rules="rules_"
            ref="validateRegisterForm"
            label-width="200px"
            class="login-form"
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
              style="width: 457.6px;margin: 24px auto 0;"
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
                    <a @click="goTerms">&nbsp;{{$t("login.TermsOfUse")}}&nbsp;</a>{{$t("login.And")}}
                    <a @click="goPrivacy">&nbsp;{{$t("login.PrivacyPolicy")}}</a>
                  </div>
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item class="el-form-item-register">
              <el-button
                type="primary"
                :loading="registerLoading"
                @click="register('validateRegisterForm')"
              >{{$t("login.REGISTER")}}</el-button>
            </el-form-item>
            <p class="orJoinWith">{{$t("login.JOINWITH")}}</p>
            <el-form-item class="el-form-item-facebook">
              <!-- <el-button type="primary" @click="facebookLogin">FACEBOOK</el-button> -->
              <div class="otherLoginBox">
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
              </div>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
// import { MH_API } from "@/api/api";
import jsCookie from "@/utils/js-cookie";
import { Loading } from "element-ui";
export default {
  name: "loginRegister",
  props: {
    dialogVisible: {
      type: Boolean
    }
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
      activeName: "SignIn",
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
      startApp: "",
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
      grecaptchaToken: "",
      widgetId: '',
      reCaptcha_version: 3,
      sitekeyV2: '6Lcylv8ZAAAAAJCnO0x_hnMAAco6IHhanFLduYB4',
      sitekeyV3: '6Lfi7TYaAAAAAKSWSplI93ysqCxbp4uiD4pdsqKh'
    };
  },
  mounted() {
    let userinfo = localStorage.getItem("forooUserInfo");

    if (userinfo != null && userinfo != "null") {
      this.rememberState = true;
      let objs = JSON.parse(userinfo);
      this.logEmail = objs.email;
      this.logPass = objs.pass;
    }
  },
  methods: {
    initBack(){
      this.grecaptchaShow = true;
      this.verificationExpired = true;
      this.verificationFailed = true;
      this.verifiedSuccessfully = true;
    },
    initBackReserve(){
      this.grecaptchaShow = false;
      this.verificationExpired = false;
      this.verificationFailed = false;
      this.verifiedSuccessfully = false;
    },
    initGoogleApi() {
      let thif = this;
      gapi.load("auth2", function() {
        window.auth2 = window.gapi.auth2.init({
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
    goTerms() {
      this.$router.push({
        path: "/footPage/Term"
      });
      this.handleClose();
    },
    goPrivacy() {
      this.$router.push({
        path: "/footPage/Privacy"
      });
      this.handleClose();
    },
    openDialog() {
      let script1 = document.createElement("script");
      let script2 = document.createElement("script");
      script1.src = "https://apis.google.com/js/api:client.js";
      script2.src = "//connect.facebook.net/zh_CN/sdk.js#xfbml=1&version=v2.9";
      script1.onload = () => {
        this.initGoogleApi();
      };
      document.body.appendChild(script1);
      document.body.appendChild(script2);

      let script_ = document.createElement("script");
      script_.src = `https://www.recaptcha.net/recaptcha/api.js?render=${this.sitekeyV3}`;
      document.body.appendChild(script_);

      let that = this;
      script_.onload = () => {
        console.log('script_.onload')
        window.grecaptcha.ready(function() {
          window.grecaptcha.execute(that.sitekeyV3, {action: 'register'}).then(function(token) {
            console.log(token,'token++++',window.location.host)
            that.grecaptchaToken = token;
            that.initBack();
            // that.token = token;
            // that.grecaptchaToken = token;
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
    },
    grecaptchaInit() {
      let that = this;
      // 初始化人机验证
      this.widgetId = window.grecaptcha.render("robot", {
        sitekey: that.sitekeyV2, //公钥
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
    attachSignin(element) {
      let that = this;
      window.auth2.attachClickHandler(
        element,
        {},
        function(googleUser) {
          var profile = auth2.currentUser.get().getBasicProfile();
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
              "googleLogin"
            );
          } else {
            that.otherLogin(
              {
                social_type: "google",
                identifier: profile.getId(),
                name: profile.getName(),
                image_url: profile.getImageUrl()
              },
              "googleLogin"
            );
          }
        },
        function(error) {
          console.log(JSON.stringify(error, undefined, 2));
        }
      );
    },
    handleClose() {
      this.$store.dispatch("loginDialogVisible", false);
    },
    handleOpen(){
      console.log(222222)
      this.showDialog = true;
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
                  "facebookLogin"
                );
              } else {
                thif.otherLogin(
                  {
                    social_type: "fb",
                    user_id: userID,
                    id_token: accessToken
                  },
                  "facebookLogin"
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
    //获取用户信息
    getUserInfo(id) {
      let thif = this;
      this.$apis
        .getUsetInfo({ user_id: id }, this.$store.getters.getApiHeader)
        .then(res => {
          if (res.status == 1) {
            thif.$store.dispatch("actUserInfo", res.data.item);
            if (res.data.item.email) {
              thif.$store.dispatch("actEmail", res.data.item.email);
              jsCookie.set("email", res.data.item.email, {
                expires: 7,
                path: "/"
              });
            }
            thif.$store.dispatch("newUserDialogVisible", false);
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
          if (res.status == 1) {
            thif.buryingPoint.login(loginMethods, res.data.item.user_id);
            thif.$store.dispatch("loginDialogVisible", false);
            // thif.$router.push({ path: "/" });
            Loading.service().close();
            thif.getUserInfo(res.data.item.user_id);
            thif.$emit("reloadHeader");
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
          } else {
            Loading.service().close();
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
          // Loading.service({
          //   lock: true,
          //   text: "Logging in",
          //   background: "rgba(0, 0, 0, 0.7)"
          // });
          var { pass, email } = this.validateLoginForm;
          this.$apis
            .login({ email, password: pass }, {})
            .then(res => {
              this.signInLoading = false;
              if (res.status == 1) {
                thif.buryingPoint.login("login", res.data.item.user_id);
                thif.$store.dispatch("loginDialogVisible", false);
                // Loading.service().close();
                thif.getUserInfo(res.data.item.user_id);
                thif.$emit("reloadHeader");
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
                let routeArr = JSON.parse(
                  sessionStorage.getItem("recordRoute")
                );
                // thif.$router.push({ path: "/" });
              } else {
                // Loading.service().close();
                thif.common.msgBox(thif, res.msg, 3);
              }
            })
            .catch(err => {
              // Loading.service().close();
              this.signInLoading = false;
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
            action: 'register',
            reCaptcha_version: this.reCaptcha_version,
            gRecaptchaResponse: this.grecaptchaToken,
            host_name: window.location.hostname
          }
          this.$apis
            .register(
              obj,
              {}
            )
            .then(res => {
              this.registerLoading = false;
              if (res.status == 1) {
                thif.getUserInfo(res.data.item.user_id);
                thif.buryingPoint.registerPopup(res.data.item.user_id);
                if (localStorage.getItem("newUserBox") == 1) {
                } else {
                  localStorage.setItem("newUserReg", "yes");
                }
                thif.$store.dispatch("loginDialogVisible", false);
                thif.$store.dispatch("newUserDialogVisible", false);
                thif.$store.dispatch("actLoginToken", res.data.item.token);
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
              }else if(res.status == 12098){
                thif.initBackReserve();
                thif.reCaptcha_version = 2;
                let script = document.createElement("script");
                script.src = `https://www.recaptcha.net/recaptcha/api.js`;
                document.body.appendChild(script);
                thif.register('validateRegisterForm');
              }else if(res.status == 12095){
                thif.common.msgBox(thif, res.msg, 3);
              } else {
                grecaptcha.reset(this.widgetId);
                thif.common.msgBox(thif, res.msg, 3);
              }
            })
            .catch(err => {
              // Loading.service().close();
              this.registerLoading = false;
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
/deep/ .el-dialog {
  width: 588px !important;
  // height: 545px;
}
/deep/ .el-dialog__body {
  padding: 0;
  .el-tabs__nav {
    width: 100%;
    .el-tabs__active-bar {
      background: black;
    }
    #tab-SignIn,
    #tab-Register {
      width: 50%;
      text-align: center;
      color: #555555;
    }
    .el-tabs__item .is-top .is-active {
      color: black;
    }
  }
}
.login-form {
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
        width: 88% !important;
        input {
          border: 1px solid black;
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
    margin-top: 10px;
    /deep/ .el-form-item__label {
      margin-left: -27px !important;
      margin-top: 10px !important;
    }
  }
  .el-form-item-privacy-policy {
    /deep/ .el-form-item__content {
      margin-left: 68px !important;
      .el-checkbox {
        margin: 10px 0px;
      }
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
  .el-form-item-register {
    margin-top: -10px;
  }
  .el-form-item-signIn {
    .el-button {
      margin-top: 15px;
    }
  }
  .el-form-item-signIn,
  .el-form-item-register {
    /deep/ .el-form-item__content {
      margin-left: 68px !important;
      margin-top: 22px;
      button {
        width: 454px;
        background: $btnBjColor;
        border: none;
        span,
        i {
          color: #fff;
        }
      }
      button:hover{
        background: $buttonBlueHover;
      }
    }
  }
  .el-form-item-facebook {
    .otherLoginBox {
      width: 454px;
      display: flex;
      justify-content: center;
      .facebookBtn,
      .googleBtn {
        height: 40px;
        cursor: pointer;
      }
      .facebookBtn {
        margin-left: 20px;
      }
    }
    /deep/ .el-form-item__content {
      margin-left: 68px !important;
      button {
        width: 454px;
        background: #4267b2;
        margin-bottom: 12px;
        span {
          color: #fff;
        }
      }
    }
  }
  #forgot-pass {
    text-decoration: underline;
    float: right;
    margin: 4px 60px 45px;
    color: black;
  }
  .orJoinWith {
    font-size: 15px;
    color: #999999;
    text-align: center;
    margin-bottom: 22px;
  }
}
.logo {
  margin: -30px 0 0;
  padding: 4px;
  img {
    width: 67px;
    height: 37px;
    display: block;
    margin: 9px auto;
  }
}
</style>
