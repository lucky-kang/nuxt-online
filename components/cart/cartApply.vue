<template>
  <div class="applyCoat">
    <div class="applyTil">
      <p class="tilLeft">{{ $t("cart.ORDERSUMMERY") }}</p>
      <p class="tilRight">
        <img src="../../static/images/checkout/safe@4x.png">
        <span>{{ $t("cart.SECURECHECKOUT") }}</span>
      </p>
    </div>
    <div class="applyList">
      <p>{{ $t("cart.Subtotal") }}</p>
      <p class="applyListRight">{{ $store.getters.getCurrencySymbol}}{{ totalPrice | numToFix }}</p>
    </div>
    <div class="applyList">
      <p>{{ $t("cart.Shipping") }}</p>
      <!-- <p
        class="Free"
        v-if="delivery_price_limit && delivery_price_limit.amount && Number(delivery_price_limit.limit) - Number(totalPrice) > 0"
      >{{ $store.getters.getCurrencySymbol}}{{delivery_price_limit.amount}}</p> -->
      <p
        class="Free"
      >{{ $t("cart.Free") }}</p>
    </div>
    <div class="settlementBtnCoat">
      <!-- :class="addressDefault ? '' : 'gray'" -->
      <el-button
        :loading="secureCheckoutLoading"
        :class="seekCarts ? '' : 'gray'"
        @click="toCheckout"
      >{{ $t("cart.SECURECHECKOUT") }}</el-button>
    </div>
    <div class="applyText">
      <img
        src="../../static/images/checkout/icon_safe.jpg"
        alt=""
      >
      <p>{{ $t("cart.PaymentSecurity") }}</p>
    </div>
    <div class="applyText">
      <img
        src="../../static/images/checkout/icon_shipping.jpg"
        alt=""
      >
      <p>{{ $t("cart.FREESHIPPINGFor") }}</p>
    </div>
    <div class="applyText">
      <img
        src="../../static/images/checkout/icon_return.jpg"
        alt=""
      >
      <p>{{ $t("cart.CustomersCanRequest") }}</p>
    </div>
  </div>
</template>

<script>
import jsCookie from "@/utils/js-cookie";
export default {
  name: "applyCoat",
  props: {
    totalPrice: {
      type: Number,
      value: 0
    },
    addressDefault: {
      type: Object,
      value: null
    },
    cardsArr: {
      type: Array,
      value: []
    },
    isAddress: {
      type: Boolean
    },
    delivery_price_limit: {
      type: Object | String,
      value: {} | ""
    }
  },
  data() {
    return {
      secureCheckoutLoading: false
    };
  },
  created() {
    console.log(this.addressDefault);
  },
  // mounted(){
  //   this.$bus.$on('gustAddCartInfo', function(data){
  //     console.log(data,'data--------')
  //     let {cart_id,subtotal,skuIds} = data;
  //     this.checkoutStepOne(cart_id,subtotal,skuIds);
  //   }.bind(this));
  // },
  computed: {
    seekCarts() {
      let cartState = false;
      if (this.cardsArr.length == 0) {
        return cartState;
      }
      for (let i = 0; i < this.cardsArr.length; i++) {
        if (this.cardsArr[i].optionState) {
          cartState = true;
        }
      }
      return cartState;
    }
  },
  methods: {
    toCheckout() {
      if (!this.seekCarts) {
        return;
      }
      if (!this.$store.getters.getLoginToken) {
        this.$store.dispatch("actGuestDialogVisible", true);
        jsCookie.set("guest", true, {
          expires: 7,
          path: "/"
        });

        let subtotal = 0;
        let cartIds = [];
        let skuIds = [];
        for (let i = 0; i < this.cardsArr.length; i++) {
          if (this.cardsArr[i].optionState) {
            cartIds.push(this.cardsArr[i].cart_id);
            skuIds.push(this.cardsArr[i].sku_id);
            subtotal += Number(this.cardsArr[i].subtotal);
          }
        }
        if (!cartIds.length) {
          return;
        }
        let cartsStr = cartIds.join();
        let skuIdsStr = skuIds.join();
        let obj = {
          skuIds: skuIdsStr,
          subtotal
        }
        this.$emit("getCartIds", cartsStr);
        this.$emit("getCartInfo", obj);
        if (!cartIds.length) {
          return;
        }
        return;
      }




      
      this.secureCheckoutLoading = true;
      let subtotal = 0;
      let cartIds = [];
      let skuIds = [];
      for (let i = 0; i < this.cardsArr.length; i++) {
        if (this.cardsArr[i].optionState) {
          cartIds.push(this.cardsArr[i].cart_id);
          skuIds.push(this.cardsArr[i].sku_id);
          subtotal += Number(this.cardsArr[i].subtotal);
        }
      }
      if (!cartIds.length) {
        return;
      }
      let cartsStr = cartIds.join();
      this.checkoutStepOne(cartsStr, subtotal, skuIds);
    },
    checkoutStepOne(str, subtotal, items) {
      let thif = this;
      let buryObj = {
        Value: subtotal,
        Currency: this.$store.getters.getApiHeader.currency,
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
          // console.log(res)
          if (res.status == 1) {
            this.secureCheckoutLoading = false;
            this.$router.push({
              path: "/checkoutDetail"
            });
          } else {
            this.secureCheckoutLoading = false;
          }
        })
        .catch(err => {
          this.secureCheckoutLoading = false;
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
table {
  width: 100%;
}
.applyCoat {
  padding: 0 .3rem;
  border-left: 1px solid #ddd;
  padding-bottom: 1.2rem;
}
.addressCoat {
  p {
    color: #666;
  }
  .address {
    margin: 12px 0 8px;
  }
}
.settlementBtnCoat {
  display: flex;
  padding: 50px 0 30px;
  button {
    width: 100%;
    color: #fff !important;
    background-color: $btnBjColor;
    font-size: 20px;
    height: 50px;
    border-radius: 0 !important;
    /deep/ .el-icon-loading {
      color: #fff;
    }
    /deep/ span {
      color: #fff;
    }
  }
  .gray {
    background-color: #dddddd;
    cursor: not-allowed;
  }
}
.applyTil {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  border-bottom: 1px solid $borderColor;
  .tilLeft {
    font-size: 20px;
    font-weight: bold;
  }
  .tilRight {
    // display: flex;
    // align-items: center;
    img {
      height: 20px;
      margin: 0 4px;
    }
    span {
      font-size: 14px;
      color: #18bc2f;
    }
  }
}
.applyList {
  font-size: 20px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid $borderColor;
  .applyListRight {
    font-weight: 550;
  }
  .Free {
    font-weight: 550;
    color: $bjColor;
  }
}
.applyText {
  display: flex;
  margin-bottom: 22px;
  font-size: 12px;
  line-height: 18px;
  img {
    height: 24px;
    margin-right: 10px;
  }
}
</style>
