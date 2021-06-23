<template>
  <div>
    <div v-if="!emailSentSuccessfully" class="forgot-password-one">
      <p class="headTil">{{$t("forgotPassword.forgotPassword")}}</p>
      <div class="f-container">
        <el-row :gutter="20">
          <el-col :lg="12" :offset="6" :sm="24" :xs="24">
            <div class="listCoat">
              <p
                class="til"
              >{{$t("forgotPassword.EnterEmail")}}</p>
              <el-form
                label-position="top"
                :model="validateForgotPasswordForm"
                :rules="rules"
                status-icon
                ref="validateForgotPasswordForm"
                label-width="200px"
                class="login-form-2"
              >
                <el-form-item class="el-form-item-email" label="Email Address:" prop="email">
                  <el-input v-model="validateForgotPasswordForm.email"></el-input>
                </el-form-item>
                <el-form-item class="el-form-item-signIn">
                  <el-button type="primary" @click="sendEmail('validateForgotPasswordForm')">{{$t("checkout.SUBMIT")}}</el-button>
                </el-form-item>
                <el-form-item class="el-form-item-cancel">
                  <el-button @click="cancel">{{$t("forgotPassword.CANCEL")}}</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div v-else class="forgot-password-two">
      <div class="f-container_">
        <el-row :gutter="20">
          <el-col :lg="12" :offset="6" :sm="24" :xs="24">
            <div class="listCoat_">
              <img src="~/static/images/icon/emailSentSuccessfully.png">
              <p class="success-title1">{{$t("forgotPassword.emailSentSuccessfully")}}</p>
              <el-button class="shop-now" type="primary" @click="shopNow()">{{$t("forgotPassword.SHOPNOW")}}</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <f-footer></f-footer>
  </div>
</template>

<script>
import fFooter from "@/components/footer/f-footer";
import { Loading } from "element-ui";
export default {
  name: "forgotPassword",
  components: {
    fFooter
  },
  data() {
    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    var validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Email cannot be empty."));
      } else if (!reg.test(value)) {
        callback(new Error("Please enter a valid email address."));
      } else {
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
      validateForgotPasswordForm: {
        email: ""
      },
      rules: {
        email: [
          {
            validator: validateEmail,
            trigger: "change"
          }
        ]
      },
      emailSentSuccessfully: false
    };
  },
  mounted() {
    this.buryingPoint.pageView();
  },
  methods: {
    sendEmail(formName) {
      let thif = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          Loading.service({
            lock: true,
            text: "Sending Email",
            background: "rgba(0, 0, 0, 0.7)"
          });
          var { email } = this.validateForgotPasswordForm;
          this.$apis
            .lostPassword({ email })
            .then(res => {
              if (res.status == 1) {
                Loading.service().close();
                thif.emailSentSuccessfully = true;
              } else {
                Loading.service().close();
                thif.common.msgBox(thif, res.msg, 3);
              }
            })
            .catch(err => {
              Loading.service().close();
              console.log(err);
            });
        } else {
          return false;
        }
      });
    },
    cancel(){
      this.$router.go(-1);
    },
    shopNow() {
      this.$router.push({ path: "/" });
    }
  }
};
</script>

<style lang="scss" scoped>
.forgot-password-one{
  margin: 136px auto 0;
}
.login-form-2 {
  width: 300px;
  margin: 0 auto;
  .el-form-item-email {
    /deep/ .el-form-item__label {
      width: 230px!important;
      margin-top: 44px;
    }
  }
  .el-form-item-email,
  .el-form-item-pass,
  .el-form-item-privacy-policy {
    margin-bottom: 0px !important;
    /deep/ .el-form-item__content {
      margin-left: 0 !important;
      .el-input {
        // width: 88% !important;
        input {
          width: 300px;
          border: 1px solid black;
        }
        /deep/ .el-input__suffix {
          right: 0%;
        }
      }
    }
  }
  .el-form-item-privacy-policy {
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
      margin-left: 0 !important;
      margin-top: 22px;
      button {
        width: 300px;
        background: #172D55;
        border-radius: 4px;
        border: none;
        span {
          color: #fff;
        }
      }
      button:hover{
        background:#3B65B3;
      }
    }
  }
  .el-form-item-cancel {
    /deep/ .el-form-item__content {
      margin-left: 0 !important;
      button {
        width: 300px;
        margin-bottom: 12px;
        span {
          color: black;
        }
      }
    }
  }
  #forgot-pass-1 {
    text-decoration: underline;
    float: right;
    margin: 4px 100px 45px;
    color: black;
    font-size: 16px;
  }
}
.f-container {
  margin-bottom: 93px;
}
.headTil {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin: 54px 0px -114px;
}
.listCoat {
  padding: 0 30px;
  margin: 50px 0;
  .til {
    color: #555;
    font-size: 14px;
    margin-bottom: 30px;
    font-weight: bold;
    text-align: center;
  }
}
.forgot-password-two {
  .f-container_ {
    margin-bottom: 60px;
    .listCoat_ {
      padding: 0 30px;
      margin: 108px 0;
      img {
        margin: 0 auto;
        display: block;
      }
      .success-title1 {
        font-family: Ubuntu;
        font-style: normal;
        font-weight: 500;
        font-size: 24px;
        line-height: 28px;
        color: $fontColor1;
        text-align: center;
        margin-top: 50px;
      }
      .success-title2 {
        font-family: Ubuntu;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 18px;
        color: $fontColor1;
        text-align: center;
        margin-top: 6px;
      }
      .shop-now {
        width: 300px;
        height: 50px;
        background: $fontColor1;
        display: block;
        margin: 30px auto -33px;
        /deep/ span {
          color: #fff!important;
        }
      }
    }
  }
}
</style>