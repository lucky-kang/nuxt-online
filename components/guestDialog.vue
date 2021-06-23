<template>
  <el-dialog
    custom-class="refundPolicyDialog"
    title="CHECKOUT"
    :visible.sync="guestDialogVisible"
    width="7.76rem"
    :before-close="handleClose"
  >
    <div class="signTil">
      To create an account to get your <span>{{$store.getters.getCurrencySymbol}}10 off</span> for your first order
      and get order updates in time! Easy shopping!
    </div>
    <div
      class="sign"
      @click="sign"
    >SIGN IN / REGISTER</div>
    <div class="guestTil">I don't need discounts! </div>
    <div
      @click="guestCheckout(type)"
      class="guestCheckout"
    ><i
        v-show="guestCheckoutLoading"
        class="el-icon-loading"
      ></i>GUEST CHECKOUT</div>
  </el-dialog>
</template>
<script>
import common from "~/utils/common";
import jsCookie from "@/utils/js-cookie";
export default {
  name: "guestDialog",
  props: {
    guestDialogVisible: {
      type: Boolean
    },
    sku_id: {
      type: String
    },
    goods_id: {
      type: String
    },
    quantity: {
      type: Number
    },
    type: {
      type: Number
    },
    cartIds: {
      type: String
    },
    subtotal: {
      type: Number
    }
  },
  data() {
    return {
      guestCheckoutLoading: false
    };
  },
  mounted() {
    console.log(this.cartIds, "cartIds", this.type);
    this.$store.dispatch("actGuestDialogVisible", false);
    jsCookie.set("guest", false, {
      expires: 7,
      path: "/"
    });
  },
  methods: {
    handleClose() {
      this.$store.dispatch("actGuestDialogVisible", false);
      jsCookie.set("guest", false, {
        expires: 7,
        path: "/"
      });
    },
    guestCheckout(type) {
      this.guestCheckoutLoading = true;
      //游客直接购买
      if (type == 2) {
        this.$apis
          .buyNow(
            {
              quantity: this.quantity,
              goods_id: this.goods_id,
              sku_id: this.sku_id
            },
            this.$store.getters.getApiHeader
          )
          .then(res => {
            this.guestCheckoutLoading = false;
            if (res.status == 1) {
              this.$store.dispatch("actGuestDialogVisible", true);
              jsCookie.set("guest", true, {
                expires: 7,
                path: "/"
              });
              this.$router.push({
                path: "/checkoutDetail"
              });
            } else if (res.status == 14001) {
              this.$emit("noStockFn", false);
              this.$store.dispatch("actGuestDialogVisible", false);
              jsCookie.set("guest", false, {
                expires: 7,
                path: "/"
              });
            }
          })
          .catch(err => {
            this.guestCheckoutLoading = false;
            this.$store.dispatch("actGuestDialogVisible", false);
            jsCookie.set("guest", false, {
              expires: 7,
              path: "/"
            });
            console.log(err);
          });
      } else {
        //游客checkout第一步
        if (this.cartIds) {
          this.checkoutStepOne(this.cartIds);
        }
      }
    },
    checkoutStepOne(str) {
      let thif = this;
      this.$apis
        .checkoutStepOne(
          {
            step: "1",
            cart_ids: str
          },
          this.$store.getters.getApiHeader
        )
        .then(res => {
          this.guestCheckoutLoading = false;
          if (res.status == 1) {
            this.$router.push({
              path: "/checkoutDetail"
            });
          }
        })
        .catch(err => {
          this.guestCheckoutLoading = false;
          console.log(err);
        });
    },
    sign() {
      console.log(this.$route)
      let {name} = this.$route;
      this.$router.push({
        path: "/login",
        query: {
          skuIds: this.sku_id,
          subtotal: this.subtotal,
          from: name
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .el-dialog__header {
  display: flex;
  justify-content: center;
  padding: 0.35rem 0.2rem 0.1rem;
  /deep/ .el-dialog__title {
    font-weight: bold;
    font-family: Ubuntu;
    font-size: 0.24rem;
    width: 94%;
    text-align: center;
    border-bottom: 1px solid #dddddd;
    padding-bottom: 0.22rem;
  }
  /deep/ .el-dialog__close {
    font-size: 0.24rem;
    color: black;
    font-weight: bold;
  }
}
/deep/ .el-dialog__body {
  padding: 30px 30px;
}
.signTil {
  font-family: Ubuntu;
  font-size: 0.24rem;
  font-style: normal;
  font-weight: 400;
  line-height: 0.3rem;
  span {
    color: red;
    font-family: Ubuntu;
    font-size: 0.24rem;
    font-style: normal;
    font-weight: 400;
    line-height: 0.3rem;
  }
}
.sign {
  color: #fff;
  background: $fontColor1;
}
.guestCheckout {
  color: $fontColor1;
  background: #fff;
  border: 2px solid $fontColor1;
  .el-icon-loading {
    margin: 0 8px;
    -webkit-animation: rotating 2s linear infinite;
    animation: rotating 2s linear infinite;
  }
}
.sign,
.guestCheckout {
  width: 4.6rem;
  height: 0.5rem;
  margin: 0.23rem auto;
  font-family: Ubuntu;
  font-size: 0.24rem;
  font-weight: 400;
  line-height: 0.3rem;
  text-align: center;
  line-height: 0.5rem;
  cursor: pointer;
}
.guestTil {
  font-family: Ubuntu;
  font-size: 0.24rem;
  line-height: 0.3rem;
}
.guestCheckout {
  width: 4.6rem;
  height: 0.5rem;
  margin: 0.23rem auto;

  font-family: Ubuntu;
  font-size: 0.24rem;
  font-weight: 400;
  line-height: 0.3rem;

  text-align: center;
  line-height: 0.5rem;
  cursor: pointer;
}
</style>