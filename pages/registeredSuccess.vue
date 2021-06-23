<template>
  <div>
    <div class="forgot-password-two">
      <div class="f-container_">
        <el-row :gutter="20">
          <el-col :lg="12" :offset="6" :sm="24" :xs="24">
            <div class="listCoat_">
              <img src="~/static/images/icon/emailSentSuccessfully.png">
              <p class="success-title1">{{$t("forgotPassword.SuccessfullyRegistered")}}</p>
              <p class="success-title2">{{$t("forgotPassword.CouponIssued")}}</p>
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
  name: "registeredSuccess",
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
.f-container {
  margin-bottom: 93px;
}
.headTil {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin: 54px 0px -32px;
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
      // padding: 0 30px;
      margin: 108px 0;
      img {
        margin: 0 auto;
        display: block;
      }
      .success-title1 {
        font-style: normal;
        font-weight: 500;
        font-size: 24px;
        line-height: 28px;
        text-align: center;
        margin-top: 50px;
      }
      .success-title2 {
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 18px;
        text-align: center;
        margin-top: 6px;
      }
      .shop-now {
        width: 300px;
        height: 50px;
        background: $btnBjColor;
        border: none;
        display: block;
        margin: 30px auto -33px;
        /deep/ span {
          color: #fff!important;
        }
      }
      .shop-now:hover{
        background: $buttonBlueHover;
      }
    }
  }
}
</style>