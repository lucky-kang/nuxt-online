<template>
  <div class="coat">
    <div class="orderTil">
      {{$t('checkout.ORDERSUMMERY')}}
      <img
        src="../../static/images/checkout/safe@4x.png"
        alt=""
      >
      <span>{{$t('checkout.SECURECHECKOUT')}}</span>
    </div>
    <div class="couponCoat">
      <div class="couponTil">
        <el-tooltip
          class="item"
          effect="light"
          placement="bottom-start"
        >
          <div
            style="width: 348px;"
            slot="content"
            v-html="$t('checkout.checkoutText1')"
          ></div>
          <p>
            {{$t('checkout.PromotionCode')}}
            <img
              src="../../static/images/icon/question.png"
              alt=""
            >
          </p>
        </el-tooltip>
        <span
          class="b-cursor"
          @click="openCoupon"
        >{{$t('checkout.UseCoupon')}}</span>
      </div>
      <div class="couponCont">
        <input
          type="text"
          :placeholder="$t('checkout.placeholder1')"
          :class="couponErr?'couponErrBor':''"
          v-model="couponCode"
        >
        <!-- <span
          :loading="applyCouponCodeLoading"
          @click="applyCouponCode()"
          class="b-cursor"
        >{{$t('checkout.APPLY')}}</span>-->
        <el-button
          :loading="applyCouponCodeLoading"
          @click="applyCouponCode()"
          class="b-cursor"
        >{{$t('checkout.APPLY')}}</el-button>
      </div>
      <p class="couponErr">{{couponErr}}</p>
      <!-- <div
        class="points"
        v-if="shopObj ? Number(shopObj.point.amount) : false"
      >
        <el-tooltip
          class="item"
          effect="light"
          placement="bottom-start"
        >
          <div
            style="width: 348px;"
            slot="content"
          >{{$t('checkout.PointsText')}}</div>
          <p>
            {{$t('checkout.Points')}}
            <img
              src="../../static/images/icon/question.png"
              alt=""
            >
          </p>
        </el-tooltip>
        <div class="pointsList">
          <el-checkbox
            @change="handleCheckAllChange"
            v-model="pointsChecked"
          >{{$t('checkout.Redeem')}} {{shopObj.point.amount}} {{$t('checkout.PointsFor')}} {{$store.getters.getCurrencySymbol}}{{shopObj.point.exchange}}</el-checkbox>
        </div>
      </div> -->
    </div>
    <div
      class="shopCoat"
      v-if="shopShow"
    >
      <!-- subtotal -->
      <div class="shopPrice">
        <p class="left">{{ $t("cart.Subtotal") }}</p>
        <p class="right">
          {{$store.getters.getCurrencySymbol}}
          {{ shopObj ? shopObj.subtotal : 0 }}
        </p>
      </div>
      <!-- Shipping -->
      <div class="shopPrice">
        <p class="left">{{ $t("cart.Shipping") }}</p>
        <!-- <p class="right FreeShipping" v-if="shopObj&&shopObj.delivery_price!=0">
          {{$store.getters.getCurrencySymbol}}
          {{shopObj.delivery_price}}
        </p> -->
        <p class="right FreeShipping redColor">{{ $t("cart.FreeShipping") }}</p>
      </div>
      <!-- 服务费 -->
      <div
        class="shopPrice"
        v-if="shopObj&&shopObj.service_price!=0"
      >
        <p class="left">
          {{$t('checkout.ServiceFee')}}
          <img
            src="../../static/images/icon/question.png"
            alt=""
          >
        </p>
        <p class="right FreeShipping redColor">
          {{$store.getters.getCurrencySymbol}}
          {{shopObj.service_price?shopObj.service_price:''}}
        </p>
      </div>
      <!-- 优惠券或码 -->
      <div
        class="shopPrice"
        v-if="couponMoney!=0"
      >
        <p class="left">{{$t('checkout.Coupon')}}</p>
        <p class="right FreeShipping redColor">
          - {{$store.getters.getCurrencySymbol}}
          {{couponMoney}}
        </p>
      </div>
      <!-- 积分 -->
      <div
        class="shopPrice"
        v-if="point"
      >
        <p class="left">{{$t('checkout.Points')}}</p>
        <p class="right FreeShipping redColor">
          - {{$store.getters.getCurrencySymbol}}
          {{shopObj ? shopObj.point.exchange : 0}}
        </p>
      </div>
      <!-- total -->
      <div class="shopPrice">
        <p class="left">{{ $t("cart.Total") }}</p>
        <p class="right redColor">
          {{$store.getters.getCurrencySymbol}}
          {{ shopObj ? shopObj.total : 0 }}
        </p>
      </div>
    </div>
    <div class="btnCoat">
      <!-- <button :class="isAddress ? '' : 'gray'" @click="buyNow">{{ $t("checkout.BuyNow") }}</button> -->
      <el-button
        :loading="checkoutBuyNowLoading"
        :class="!isAddress ? '' : 'gray'"
        @click="buyNow"
      >{{ $t("checkout.BuyNow") }}</el-button>
    </div>
    <div class="applyText">
      <img
        src="../../static/images/checkout/icon_safe.jpg"
        alt=""
      >
      <p>{{$t('checkout.checkoutText2')}}</p>
    </div>
    <div class="applyText">
      <img
        src="../../static/images/checkout/icon_shipping.jpg"
        alt=""
      >
      <p>{{$t('checkout.checkoutText3')}}</p>
    </div>
    <div class="applyText">
      <img
        src="../../static/images/checkout/icon_return.jpg"
        alt=""
      >
      <p>{{$t('checkout.checkoutText4')}}</p>
    </div>
    <!-- <div class="privacyPolicy">
			<p v-html="$t('checkout.afterText')"></p>
    </div>-->
    <el-drawer
      :visible.sync="couponShow"
      direction="rtl"
    >
      <div class="drawerCoat">
        <!-- <p class="drawerTil"></p> -->
        <p class="MYCOUPON">{{$t('checkout.MYCOUPON')}}</p>
        <div
          class="noData"
          v-show="couponArr.length==0"
        >
          <img
            src="../../static/images/checkout/empty_nocoupons@3x.png"
            alt=""
          >
          <p>{{$t('checkout.NoCoupons')}}</p>
        </div>
        <div
          class="couponListCoat"
          v-show="couponArr.length!=0"
        >
          <div
            class="couponItem"
            @click="selCoupon(item)"
            v-for="(item,index) in couponArr"
            :key="'uuu'+index"
          >
            <div
              class="selCoat"
              :class="item.user_coupon_id==activeCoupon?'selActive':''"
            >
              <span class="el-icon-check"></span>
            </div>
            <div class="couponRight">
              <img
                :src="item.user_coupon_id==activeCoupon?couponImg[0]:couponImg[1]"
                alt=""
              >
              <div class="itemCoat">
                <div class="itemLeft">
                  <p>
                    <span>{{$store.getters.getCurrencySymbol}}</span>
                    {{item.used_amount}}
                  </p>
                  <span>[{{$t('checkout.ForAllItems')}}]</span>
                </div>
                <div class="itemRight">
                  <p>{{item.use_desc+ $store.getters.getCurrencySymbol+' '+item.with_amount}}</p>
                  <span>{{$t('checkout.Validuntil')}}: {{item.valid_end_time|timers(5)}}</span>
                </div>
              </div>
            </div>
          </div>
          <!-- <button>{{$t('checkout.SUBMIT')}}</button> -->
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
// import BASEDATA from "~/apiConfig";
export default {
  name: "checkoutRight",
  props: {
    shopObj: {
      type: Object,
      value: null
    },
    shopShow: {
      type: Boolean,
      value: true
    },
    checkoutBuyNowLoading: {
      type: Boolean
    },
    isAddress: {
      type: Boolean,
      value: false
    },
    paymentType: {
      type: Array,
      value: []
    }
  },
  data() {
    return {
      couponCode: "",
      couponMoney: 0,
      point: 0,
      activeCoupon: "",
      couponImg: [
        require("../../static/images/user/chossecoupon.png"),
        require("../../static/images/user/normalcoupon.png")
      ],
      couponArr: [],
      couponShow: false,
      environment: "",
      iconCoat: [
        "https://beta.foroo.co.uk/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg",
        "https://beta.foroo.co.uk/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg",
        "https://beta.foroo.co.uk/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg",
        "https://beta.foroo.co.uk/wp-content/plugins/woocommerce-gateway-stripe/assets/images/discover.svg",
        "https://beta.foroo.co.uk/wp-content/plugins/woocommerce-gateway-stripe/assets/images/jcb.svg",
        "https://beta.foroo.co.uk/wp-content/plugins/woocommerce-gateway-stripe/assets/images/diners.svg"
      ],
      payChange: 2,
      cardElement: "",
      ipaylinksCart: "",
      ipaylinksMath: "",
      ipaylinksCVC: "",
      showPaymentMethods: {
        stripe: 1,
        paypal_express: 1,
        ipaylinks: 1
      },
      couponErr: "",
      applyCouponCodeLoading: false,
      pointsChecked: false,
      orderEmail: '',
    };
  },
  watch: {
    paymentType: {
      handler(value) {
        let thif = this;
        if (value.length != 0) {
          for (let i = 0; i < value.length; i++) {
            if (this.showPaymentMethods[value[i]]) {
              this.$set(this.showPaymentMethods, value[i], 2);
            }
          }
          setTimeout(function() {
            thif.createStriprEl();
          }, 0);
        }
      },
      deep: true
    },
    shopObj: {
      handler(value) {
        console.log(value,'bvvvvvvv')
        if(value.coupon){
          let {coupon_code,amount} = value.coupon;
          this.couponCode = coupon_code;
          this.couponMoney = amount;
        }
      },
      deep: true
    }
  },
  mounted() {
    if (this.$store.getters.getEmail) {
      this.orderEmail = this.$store.getters.getEmail;
    }
    this.$bus.$on('orderEmail',data => {
      this.orderEmail = data;
    })
    // this.environment = BASEDATA.environment;
    // pk_live_HNMohDhLCsLNm4ERrMqi5Mvp001AnHRnAs  线上
    // pk_test_a6sZa6KHAT8MtDGVoiWWWD8r0013bSWpsa  测试
    // console.log(this.$parent.$parent.$parent);
  },
  methods: {
    //选择使用积分
    handleCheckAllChange(val) {
      //val=true表示应用积分;false表示移除积分
      if (val) {
        this.applyPoints();
        // newTotal = (Number(total) - Number(point.exchange)).toFixed(2);
      } else {
        this.removePoints();
        // newTotal = (Number(total) + Number(point.exchange)).toFixed(2);
      }
    },
    openCoupon() {
      this.couponShow = !this.couponShow;
      this.getCoupon(1);
    },
    selCoupon(item) {
      console.log(item);
      if (item.user_coupon_id == this.activeCoupon) {
        //取消使用优惠券
        this.removeCoupon(item.user_coupon_id);
        this.activeCoupon = "";
      } else {
        this.activeCoupon = item.user_coupon_id;
        this.applyCoupon();
      }
      this.couponShow = !this.couponShow;
    },
    //应用积分
    applyPoints() {
      this.$apis
        .applyPoints()
        .then(res => {
          if (res.status == 1) {
            this.shopObj.total = res.data.item.total;
            this.point = res.data.item.point;
          } else {
            this.common.msgBox(this, res.msg, 3);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //移除积分
    removePoints() {
      this.$apis
        .removePoints()
        .then(res => {
          if (res.status == 1) {
            this.shopObj.total = res.data.item.total;
            this.point = 0;
          } else {
            this.common.msgBox(this, res.msg, 3);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    applyCoupon(item) {
      this.$apis
        .applyCoupon(
          { user_coupon_id: this.activeCoupon },
          this.$store.getters.getApiHeader
        )
        .then(res => {
          console.log(res);
          if (res.status == 1) {
            this.shopObj.total = res.data.item.total;
            this.couponMoney = res.data.item.coupon;
          } else {
            this.activeCoupon = "";
            // this.common.msgBox(this,res.msg,3);
            this.couponErr = res.msg;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    applyCouponCode() {
      if (!this.couponCode) {
        return;
      }
      this.applyCouponCodeLoading = true;
      this.$apis
        .applyCouponCode(
          { coupon_code: this.couponCode },
          this.$store.getters.getApiHeader
        )
        .then(res => {
          console.log(res);
          if (res.status == 1) {
            this.applyCouponCodeLoading = false;
            this.shopObj.total = res.data.item.total;
            this.couponMoney = res.data.item.coupon;
            // this.couponShow = !this.couponShow;
            this.activeCoupon = "";
          } else {
            this.applyCouponCodeLoading = false;
            // this.common.msgBox(this,res.msg,3);
            this.couponErr = res.msg;
          }
        })
        .catch(err => {
          this.applyCouponCodeLoading = false;
          console.log(err);
        });
    },
    removeCoupon() {
      this.$apis
        .removeCoupon(
          { user_coupon_id: this.activeCoupon },
          this.$store.getters.getApiHeader
        )
        .then(res => {
          if (res.status == 1) {
            this.shopObj.total = res.data.item.total;
            this.couponMoney = 0;
          } else {
            this.common.msgBox(this, res.msg, 3);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getCoupon(type) {
      let thif = this;
      this.$apis
        .getCartCoupon(
          { disabled: type, offset_id: 1, per_page: 50 },
          this.$store.getters.getApiHeader
        )
        .then(res => {
          if (res.status == 1) {
            thif.couponArr = res.data.items;
          } else {
            this.common.msgBox(this, res.msg, 3);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    createStriprEl() {
      if (
        this.showPaymentMethods.stripe != 1 &&
        document.getElementById("card-element")
      ) {
        let stripe = this.$parent.$parent.$parent.stripe;
        let elements = stripe.elements();
        this.cardElement = elements.create("card");
        this.cardElement.mount("#card-element");
      }
    },
    buyNow() {
      if (this.isAddress) {
        this.common.msgBox(this, "Please add an address first.", 3);
        return;
      }
      if (!this.orderEmail) {
        this.common.msgBox(this, "Email cannot be empty.", 3);
        return;
      }
      this.$emit("checkoutBuyNowLoad", true);
      console.log(this.payChange, "+++", this.shopObj, "this.shopObj");
      let thif = this;
      let itemsArr = [];
      for (let i = 0; i < this.shopObj.items.length; i++) {
        if (this.shopObj.items[i].sku_id != 0) {
          itemsArr.push({ id: String(this.shopObj.items[i].sku_id) });
        } else {
          itemsArr.push({ id: String(this.shopObj.items[i].goods_id) });
        }
      }
      // let buryObj = {
      //   Value: this.shopObj.total,
      //   Currency: this.$store.getters.getApiHeader.currency,
      //   items: itemsArr,
      //   Coupon: this.activeCoupon
      // };
      // console.log(buryObj, "buryObj");
      // this.buryingPoint.checkOut(buryObj);
      let payment_methods = "";
      if (this.payChange == 1) {
        payment_methods = "stripe";
      } else if (this.payChange == 2) {
        payment_methods = "paypal_express";
      } else if (this.payChange == 3) {
        payment_methods = "ipaylinks";
      }
      this.$emit("buyNow", {
        type: payment_methods,
        card_no: this.ipaylinksCart,
        expiry_date: this.ipaylinksMath,
        security_code: this.ipaylinksCVC
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.MYCOUPON {
  line-height: 60px;
  margin-top: 40px;
  text-align: center;
  font-size: 24px;
}
.btnCoat {
  margin-top: 40px;
  margin-bottom: 5px;
  display: flex;
  button {
    height: 40px;
    width: 100%;
    cursor: pointer;
    line-height: 0px;
    background-color: $btnBjColor;
    font-size: 18px;
    color: #fff;
    border-radius: 4px;
    transition: box-shadow 0.2s;
    /deep/ span {
      color: #fff;
    }
    /deep/ .el-icon-loading {
      color: #fff;
    }
  }
  button:hover {
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.2);
  }
  .gray {
    background-color: #dddddd;
  }
}
.privacyPolicy {
  font-size: 13px;
  /deep/ p {
    color: #777;
    line-height: 19px;
    a {
      color: #334862;
    }
  }
}
.paypal {
  // border-bottom: 2px solid #ececec;
  font-size: 14px;
  padding: 12px 0;
  label {
    font-weight: bold;
  }
  input {
    margin-right: 6px;
  }
  img {
    max-width: 40px;
    border: 1px solid #ececec;
    margin-left: 3px;
  }
}
.debitCard {
  margin-top: 20px;
  font-size: 14px;
  border-bottom: 1px solid #ececec;
  padding-bottom: 10px;
  .iconCoat {
    img {
      width: 40px;
      padding-left: 6px;
    }
    label {
      font-weight: bold;
    }
    input {
      margin-right: 6px;
    }
  }
  .cardCoat {
    margin-top: 24px;
    .cardItem {
      p {
        color: #222;
        font-weight: bold;
        margin-top: 10px;
      }
      input {
        width: 100%;
        height: 30px;
        padding: 5px;
        margin: 5px 0;
        border: 1px solid #ddd;
      }
    }
    .saveCardNum {
      margin-top: 6px;
    }
  }
}
.coat {
  // padding: 0px 24px 120px;
  background-color: #fff;
  .shopCoat {
    display: flex;
    flex-direction: column;
    .shopPrice {
      border-bottom: 1px solid #ececec;
      @include flexRow(roe, space-between);
      font-size: 14px;
      .left {
        padding: 20px 7px 20px 0;
        font-weight: bold;
        img {
          height: 12px;
          margin-left: 4px;
        }
      }
      .right {
        padding: 20px 0 20px 7px;
        font-weight: bold;
      }
      .redColor {
        color: $bjColor;
      }
    }
    .shopPrice:last-child {
      border-bottom: 2px solid #ececec;
    }
  }
}
.ipaylinks {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  input {
    font-size: 14px;
  }
  .ipaylinksCard {
  }
  .ipaylinksRight {
    display: flex;
    flex-direction: row;
    input {
      width: 60px;
      margin-left: 10px;
    }
  }
}
.orderTil {
  font-size: 20px;
  padding: .2rem 0;
  font-weight: bold;
  display: flex;
  align-items: center;
  white-space: nowrap;
  border-bottom: 1px solid $borderColor;
  img {
    height: .2rem;
    margin-left: .08rem;
    margin-right: .04rem;
  }
  span {
    font-size: 14px;
    color: #18bc2f;
  }
}
.couponCoat {
  padding-bottom: .2rem;
  border-bottom: 1px solid $borderColor;
  .couponTil {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: .56rem;
    font-size: .22rem;
    cursor: pointer;
    span {
      color: #7485bc;
    }
    p {
      display: flex;
      align-items: center;
    }
    img {
      height: .16rem;
      margin-left: .04rem;
    }
  }
  .couponCont {
    display: flex;
    input {
      width: 75%;
      height: 42px;
      padding: 12px 10px;
      border: 1px solid $borderColor;
      border-radius: 4px 0 0 4px;
    }
    button {
      height: 43px;
      border-radius: 0 4px 4px 0;
      font-size: 18px;
      background-color: $btnBjColor;
      text-align: center;
      margin-left: -1px;
      margin-top: -1px;
      /deep/ span {
        color: #fff;
      }
      /deep/ .el-icon-loading {
        color: #fff;
      }
    }
  }
}

.points {
  display: flex;
  flex-direction: column;
  height: 56px;
  font-size: 20px;
  cursor: pointer;
  .pointsList {
    margin-top: 12px;
    display: flex;
    /deep/ .el-checkbox {
      display: flex;
    }
    /deep/ .el-checkbox__inner {
      width: 20px;
      height: 20px;
      border-radius: 50%;
    }
    /deep/ .el-checkbox__inner:after {
      left: 7px;
      top: 3px;
    }
    /deep/ .el-checkbox__label {
      font-size: 19px;
    }
    // /deep/ .el-checkbox__input .el-checkbox__inner{
    //   border: 1px solid #dcdfe6;
    // }
  }
  span {
    color: #7485bc;
  }
  p {
    display: flex;
    align-items: center;
  }
  img {
    height: 16px;
    margin-left: 4px;
  }
}

.applyText {
  display: flex;
  margin-top: 30px;
  font-size: 12px;
  line-height: 18px;
  img {
    height: 24px;
    margin-right: 10px;
  }
}
.couponListCoat {
  max-height: 660px;
  overflow-y: scroll;
  padding-bottom: 80px;
}
.couponListCoat button {
  width: 100%;
  height: 46px;
  background-color: $btnBjColor;
  color: #fff;
  font-size: 14px;
  margin-top: 60px;
}
.drawerCoat {
  padding: 0px 32px 30px;
  font-size: 12px;
  .couponItem {
    margin: auto;
    width: 380px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 14px;
    .selCoat {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 1px solid $borderColor;
      cursor: pointer;
      span {
        color: #fff;
      }
    }
    .selActive {
      background-color: $bjColor;
      border: 0;
      line-height: 20px;
      text-align: center;
    }
    .couponRight {
      position: relative;
      width: 348px;
      img {
        width: 100%;
      }
      .itemCoat {
        position: absolute;
        width: 100%;
        height: 100%;
        padding: 20px 14px;
        left: 0;
        top: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .itemLeft {
          height: 100%;
          text-align: center;
          display: flex;
          align-items: center;
          flex-direction: column;
          justify-content: space-around;
          p {
            color: #fff;
            font-size: 16px;
            span {
              font-size: 12px;
            }
          }
          span {
            font-size: 12px;
            color: #fff;
          }
        }
        .itemRight {
          width: 210px;
          height: 100%;
          flex-direction: column;
          justify-content: space-around;
          display: flex;
          p {
            font-size: 14px;
            font-weight: 500;
          }
          span {
            color: #555;
            font-size: 12px;
          }
        }
      }
    }
  }
}
/deep/ .el-drawer__header > :first-child,
/deep/ .el-drawer__title {
  font-size: 24px;
  line-height: 60px;
  text-align: center;
}
.noData {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%);
  text-align: center;
  img {
    height: 100px;
  }
  p {
    font-size: 18px;
    font-weight: 500;
    margin-top: 10px;
  }
}
.couponErr {
  color: #ff2b2b;
  font-size: 14px;
  margin-top: 10px;
}
.couponErrBor {
  border-color: #ff2b2b !important;
}
/deep/ .el-drawer__header {
  display: none;
}
/deep/ .el-drawer.rtl {
  width: 460px !important;
}
</style>
