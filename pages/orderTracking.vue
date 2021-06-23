<template>
  <div>
    <div
      v-if="!orderData"
      class="forgot-password-one"
    >
      <p class="headTil">View Or Manage Your Order</p>
      <div class="f-container">
        <el-row :gutter="20">
          <el-col
            :lg="12"
            :offset="6"
            :sm="24"
            :xs="24"
          >
            <div class="listCoat">
              <p class="til">To view the order or return, please enter
                <br> your order number and email address</p>
              <el-form
                :model="viewOrderForm"
                :rules="rules"
                status-icon
                ref="viewOrderForm"
                label-width="200px"
                class="login-form-2"
              >
                <el-form-item
                  class="el-form-item-email OrderNumber"
                  prop="orderNum"
                >
                  <div
                    v-show="viewOrderForm.orderNum"
                    class="OrderLabel"
                  >Order number*</div>
                  <el-input
                    placeholder="Order number*"
                    v-model="viewOrderForm.orderNum"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  class="el-form-item-email emailAddress"
                  prop="email"
                >
                  <div
                    v-show="emailAddressShow"
                    class="OrderLabel"
                  >Email address*</div>
                  <el-input
                    placeholder="Email address*"
                    v-model="viewOrderForm.email"
                  ></el-input>
                </el-form-item>
                <el-form-item class="el-form-item-signIn">
                  <div
                    v-if="validInformationShow"
                    class="valid"
                  >
                    Please enter valid information
                  </div>
                  <el-button
                    :loading="confirmSubmitLoading"
                    type="primary"
                    @click="confirmSubmit('viewOrderForm')"
                  >SUBMIT</el-button>
                  <div class="accountTil">
                    <span>Already have an account ？</span>
                    <a @click="sign()">sign in</a>
                  </div>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <view-order-detail
      v-if="orderData"
      :orderData="orderData"
    ></view-order-detail>
    <f-footer></f-footer>
  </div>
</template>

<script>
import fFooter from "@/components/footer/f-footer";
import viewOrderDetail from "@/components/viewOrderDetail/viewOrderDetail";
import { Loading } from "element-ui";
export default {
  name: "orderTracking",
  components: {
    fFooter
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
        orderNum: [{ validator: validateOrderNum, trigger: "change" }],
        email: [{ validator: validateEmail, trigger: "change" }]
      }
    };
  },
  mounted() {
    this.buryingPoint.pageView();
    let { order_id, email } = this.$route.query;
    this.viewOrderForm.orderNum = order_id;
    // if (email && order_id) {
    //   this.getOrderDetail(order_id, email);
    // }
    if(this.$store.state.loginToken && order_id){
      this.$router.push({
        path: `/user/orderDetail?orderId=${order_id}`
      });
    }
  },
  methods: {
    sign() {
      this.$router.push({ path: "/login" });
    },
    getOrderDetail(id, email) {
      this.$apis
        .orderDetail({ email, id })
        .then(res => {
          if (res.status == 1) {
            this.orderData = res.data.item;
          } else {
            thif.common.msgBox(thif, res.msg, 3);
          }
        })
        .catch(err => {
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
          var { email, orderNum } = this.viewOrderForm;
          this.$apis
            .orderDetail({ email, id: orderNum })
            .then(res => {
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
            })
            .catch(err => {
              this.confirmSubmitLoading = false;
              console.log(err);
            });
        } else {
          return false;
        }
      });
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
    .OrderLabel {
      top: -7px;
      left: 10px;
      height: 16px;
      z-index: 9;
      line-height: 16px;
      background: #fff;
      position: absolute;
      padding: 0 5px;
    }
    /deep/ .el-input {
      input::-webkit-input-placeholder {
        color: $fontColor1;
      }
      input::-moz-input-placeholder {
        color: $fontColor1;
      }
      input::-ms-input-placeholder {
        color: $fontColor1;
      }
    }
    /deep/ .el-form-item__label {
      text-align: left;
    }
  }
  .emailAddress {
    margin-top: 8px;
  }
  .el-form-item-email,
  .el-form-item-pass,
  .el-form-item-privacy-policy {
    margin-bottom: 0px !important;
    /deep/ .el-form-item__content {
      margin-top: 36px;
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
  .el-form-item-pass {
    /deep/ .el-form-item__label {
      margin-left: -27px !important;
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
      margin-top: 36px;
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
      .valid {
        font-size: 16px;
        line-height: 36px;
        text-align: center;
        color: #fff;
        width: 300px;
        height: 36px;
        margin: -8px auto 20px;
        background: #fd5656;
        border-radius: 6px;
      }
      .accountTil {
        text-align: center;
        span {
          font-weight: 600;
        }
        a {
          cursor: pointer;
          font-weight: 600;
          text-decoration: underline;
        }
      }
    }
  }
  .el-form-item-cancel {
    /deep/ .el-form-item__content {
      margin-left: 68px !important;
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
    color: #999999 !important;
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
        font-style: normal;
        font-weight: 500;
        font-size: 24px;
        line-height: 28px;
        color: $fontColor1;
        text-align: center;
        margin-top: 50px;
      }
      .success-title2 {
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
          color: #fff !important;
        }
      }
    }
  }
}
/deep/ .el-icon-loading {
  color: #fff;
}
</style>