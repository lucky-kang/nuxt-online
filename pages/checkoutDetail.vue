<template>
  <div
    v-loading="loading"
    class="checkoutDetailCoat"
  >
    <div class="f-container">
      <div
        v-show="false"
        class="Breadcrumb"
      >
        <a
          href="#"
          class="BreadcrumbActive"
        >
          {{
          $t("cart.SHOPPINGCART")
          }}
        </a>
        <span class="el-icon-arrow-right"></span>
        <a href="#">{{ $t("cart.CHECKOUTDETAILS") }}</a>
        <span class="el-icon-arrow-right"></span>
        <a href="#">{{ $t("cart.ORDERCOMPLETE") }}</a>
      </div>
      <checkout-header :index="1"></checkout-header>
      <el-row :gutter="20">
        <el-col
          :lg="16"
          :sm="24"
          :xs="24"
        >
          <checkout-left
            ref="leftChildren"
            :shop-obj="shopObj"
            :address-default="addressDefault"
            @getDefaultAdd="addressDefaults"
          ></checkout-left>
        </el-col>
        <el-col
          :lg="8"
          :sm="24"
          :xs="24"
        >
          <checkout-right
            ref="rightChildren"
            :payment-type="paymentType"
            :isAddress="isAddress"
            :shop-show="shopShow"
            :shop-obj="shopObj"
            @buyNow="buyNow"
            @checkoutBuyNowLoad="checkoutBuyNowLoad"
            :checkoutBuyNowLoading="checkoutBuyNowLoading"
          ></checkout-right>
        </el-col>
      </el-row>
    </div>
    <div
      v-if="paypalShow"
      class="paypalBox"
    >
      <span
        class="el-icon-close"
        @click="paypalShow = false"
      ></span>
      <iframe
        :src="paypalUrl"
        frameborder="0"
      ></iframe>
    </div>
    <f-footer></f-footer>
  </div>
</template>

<script>
import fFooter from "@/components/footer/f-footer";
import checkoutHeader from "@/components/checkoutHeader/checkoutHeader";
import checkoutLeft from "@/components/checkout/checkoutLeft";
import checkoutRight from "@/components/checkout/checkoutRight";
import { Loading } from "element-ui";
export default {
  name: "CheckoutDetail",
  components: {
    fFooter,
    checkoutLeft,
    checkoutRight,
    checkoutHeader
  },
  data() {
    return {
      loading: false,
      shopObj: null,
      addressDefault: {
        id: "",
        is_default: 1,
        shipping_address: {
          shipping_address1: "",
          shipping_address2: "",
          shipping_city: "",
          shipping_country: "",
          shipping_country_abbr: "",
          shipping_first_name: "",
          shipping_last_name: "",
          shipping_phone: "",
          shipping_postcode: "",
          shipping_state: "",
          shipping_state_abbr: ""
        },
        billing_address: {
          shipping_address1: "",
          shipping_address2: "",
          shipping_city: "",
          shipping_country: "",
          shipping_country_abbr: "",
          shipping_first_name: "",
          shipping_last_name: "",
          shipping_phone: "",
          shipping_postcode: "",
          shipping_state: "",
          shipping_state_abbr: ""
        }
      },
      checkOutThreeObj: null,
      order_id: "",
      paypalShow: false,
      paypalUrl: "",
      shopShow: true,
      isAddress: false,
      payment_method: "",
      stripe: "",
      stripePaymentId: "",
      ipaylinksObj: {},
      paymentType: [], //付款方式
      orderData: null,
      payIdArr: [],
      checkoutBuyNowLoading: false
    };
  },
  mounted() {
    this.$store.dispatch("actGuestDialogVisible", false);
    this.buryingPoint.pageView();
    // eslint-disable-next-line no-undef
    // this.stripe = Stripe("pk_test_a6sZa6KHAT8MtDGVoiWWWD8r0013bSWpsa");
    Loading.service({
      lock: true,
      text: "Loading",
      background: "rgba(0, 0, 0, 0.7)"
    });
    this.source(1);
  },
  methods: {
    source(type) {
      // type   1.购物车进入   2.订单页面进入   3.paypal支付回跳进入
      if (type == 1) {
        Loading.service({
          lock: true,
          text: "Loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        this.addressDefaults();
        this.checking();
        this.shopShow = true;
      } else if (type == 2) {
        this.addressDefaults();
        this.getOrder(this.$route.query.orderId);
        this.order_id = this.$route.query.orderId;
        this.shopShow = false;
      } else if (type == 3) {
        this.order_id = this.$route.query.orderId;
        this.checkoutStepFour();
      }
    },
    // get order detail
    getOrder(orderId) {
      let thif = this;
      this.$apis
        .orderDetail(
          {
            id: orderId
          },
          this.$store.getters.getApiHeader
        )
        .then(res => {
          console.log(res);
          Loading.service().close();
          if (res.status == 1) {
            thif.orderData = res.data;
            thif.paymentType = res.data.available_payments;
            for (let i = 0; i < thif.orderData.line_items.length; i++) {
              let item_id = thif.orderData.line_items[i].goods_id;
              let item_name = thif.orderData.line_items[i].goods_name;
              this.payIdArr.push({
                id: item_id,
                name: item_name
              });
            }
          } else {
            this.common.msgBox(this, res.msg, 3);
            setTimeout(function() {
              thif.$router.go(-1);
            }, 500);
          }
        })
        .catch(err => {
          Loading.service().close();
          console.log(err);
        });
    },
    // checking
    checkoutStepOne() {
      let thif = this;
      this.$apis
        .checkoutStepOne(
          {
            step: "1",
            cart_ids: this.$route.query.cardIds
          },
          this.$store.getters.getApiHeader
        )
        .then(res => {
          // console.log(res)
          if (res.status == 1) {
            thif.checking();
          } else {
            thif.common.msgBox(thif, res.msg, 3);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    checking() {
      let thif = this;
      this.$apis
        .checking({}, this.$store.getters.getApiHeader)
        .then(res => {
          Loading.service().close();
          if (res.status == 1) {
            thif.shopObj = res.data;
          } else {
            thif.common.msgBox(thif, res.msg, 3);
          }
        })
        .catch(err => {
          Loading.service().close();
          console.log(err);
        });
    },
    checkoutStepTwo() {
      console.log(
        this.$refs.leftChildren._data.OrderEmail,
        "this.$refs.leftChildren._data.OrderEmail"
      );
      let thif = this;
      // let itemsArr = [];
      // for (let i = 0; i < this.shopObj.carts.length; i++) {
      //   if (this.shopObj.carts[i].variation_id != 0) {
      //     itemsArr.push({ id: this.shopObj.carts[i].variation_id });
      //   } else {
      //     itemsArr.push({ id: this.shopObj.carts[i].product_id });
      //   }
      // }
      // let buryObj = {
      //   Value: this.shopObj.total,
      //   Currency: this.$store.getters.getApiHeader.currency,
      //   items: itemsArr,
      //   Coupon:this.activeCoupon
      // };
      // console.log(buryObj, "buryObj");
      // this.buryingPoint.checkOut(buryObj);
      // 如果第一次支付失败已经生成订单id 则直接走第三步
      // if(thif.order_id){
      //   thif.checkoutStepThree();
      //   return;
      // }
      this.$apis
        .checkoutStepOne(
          {
            step: "2",
            address_id: this.addressId,
            user_note: this.$refs.leftChildren._data.OrderNotes,
            email: this.$refs.leftChildren._data.OrderEmail
          },
          this.$store.getters.getApiHeader
        )
        .then(res => {
          console.log(res);
          if (res.status == 1) {
            thif.order_id = res.data.item.master_order_id;
            // thif.checkoutStepThree();
            thif.$store.dispatch(
              "actCartNum",
              thif.$store.getters.getCartNum - thif.shopObj.items_count
            );
            thif.checkoutBuyNowLoading = false;
            thif.$router.push({
              path: "/checkoutTwo",
              query: {
                orderId: res.data.item.master_order_id
              }
            });
            try {
              let { line_items, order_currency } = res.data.item;
              let value = 0,
                currency = order_currency,
                num_items = 0,
                content_ids = [],
                contents = [];
              for (let i = 0; i < line_items.length; i++) {
                const data = line_items[i];
                value += Number(data.sku_quantity) * Number(data.shop_price);
                num_items += Number(data.sku_quantity);
                content_ids.push(data.goods_id);
                contents.push({
                  id: data.goods_id,
                  quantity: data.sku_quantity
                });
              }
              this.buryingPoint.initiateCheckout(
                value,
                currency,
                num_items,
                content_ids,
                contents
              );
            } catch (error) {
              console.log(error);
            }
          } else {
            thif.checkoutBuyNowLoading = false;
            thif.common.msgBox(thif, res.msg, 3);
          }
        })
        .catch(err => {
          thif.checkoutBuyNowLoading = false;
          console.log(err);
        });
    },
    // checkoutStepThree() {
    //   let thif = this;

    //   let sendObj = {};
    //   if (this.payment_method == "ipaylinks") {
    //     sendObj = this.ipaylinksObj;
    //     sendObj.step = "3";
    //     sendObj.order_id = this.order_id;
    //     sendObj.payment_method = "ipaylinks";
    //   } else {
    //     sendObj = {
    //       step: "3",
    //       payment_method: this.checkOutThreeObj.payment_method,
    //       order_id: this.order_id
    //     };
    //   }

    //   this.$apis
    //     .checkoutStepOne(sendObj, this.$store.getters.getApiHeader)
    //     .then(res => {
    //       console.log(res);
    //       if (res.status == 1) {
    //         if (sendObj.payment_method == "ipaylinks") {
    //           this.buryingPoint.purchase(
    //             this.orderData.order_currency,
    //             this.orderData.order_total_price,
    //             this.payIdArr,
    //             sendObj.payment_method
    //           );
    //           // ipaylinks支付在第三步结束
    //           thif.$router.push({
    //             path: "/orderDetail",
    //             query: {
    //               orderId: thif.order_id
    //             }
    //           });
    //           return;
    //         }

    //         if (this.checkOutThreeObj.payment_method == "paypal_express") {
    //           // thif.paypalShow = true;
    //           // thif.paypalUrl = res.data.redirect_url;
    //           window.open(res.data.redirect_url, "_blank");
    //         } else {
    //           // stripe支付
    //           console.log(res.data.payment_id);
    //           let card = thif.$refs.rightChildren._data.cardElement;
    //           thif.stripe
    //             .confirmCardPayment(res.data.payment_id, {
    //               payment_method: {
    //                 card: card
    //               }
    //             })
    //             .then(function(result) {
    //               console.log(result);
    //               if (!result.error) {
    //                 thif.stripePaymentId = result.paymentIntent.id;
    //                 thif.checkoutStepFour();
    //               } else {
    //                 thif.common.msgBox(thif, result.error.message, 3);
    //               }
    //             })
    //             .catch(err => {
    //               console.log(err);
    //             });
    //         }
    //       } else {
    //         thif.common.msgBox(thif, res.msg, 3);
    //       }
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },
    addressDefaults() {
      console.log("获取默认地址");
      let thif = this;
      this.$apis
        .addressDefault({}, this.$store.getters.getApiHeader)
        .then(res => {
          // console.log(res)
          thif.loading = false;
          if (res.status == 1) {
            thif.addressDefault =
              Object.keys(res.data.item).length != 0 ? res.data.item : {};
            thif.addressId = res.data.item.id;
            if (!Object.keys(thif.addressDefault).length) {
              console.log("res.data.----------");
              thif.isAddress = true;
            }
          } else {
            thif.common.msgBox(thif, res.msg, 3);
          }
        })
        .catch(err => {
          thif.loading = false;
          console.log(err);
        });
    },
    buyNow(e) {
      this.payment_method = e.type;
      this.checkOutThreeObj = {
        step: "3",
        payment_method: e.type,
        order_id: this.order_id
      };
      this.ipaylinksObj = e;
      this.checkoutStepTwo();
    },
    checkoutBuyNowLoad(boolen) {
      console.log(boolen, "booooooooooo");
      this.checkoutBuyNowLoading = boolen;
    },
    checkoutStepFour() {
      let thif = this;
      let sendObj = {};
      console.log(this.payment_method);
      if (this.payment_method == "paypal_express") {
        // paypal支付
        sendObj = {
          step: "4",
          payment_method: this.payment_method,
          order_id: this.order_id,
          token: this.$route.query.token,
          payer_id: this.$route.query.PayerID
        };
      } else {
        // stripe 支付
        sendObj = {
          step: "4",
          payment_method: this.payment_method,
          order_id: this.order_id,
          payment_confirm: this.stripePaymentId
        };
      }

      this.$apis
        .checkoutStepOne(sendObj, this.$store.getters.getApiHeader)
        .then(res => {
          console.log(res);
          if (res.status == 1) {
            // this.buryingPoint.purchase(
            //   this.orderData.order_currency,
            //   this.orderData.order_total_price,
            //   this.payIdArr,
            //   this.payment_method
            // );
            this.purchase_maindian(sendObj);
            // 成功跳转订单详情
            thif.$router.push({
              path: "/orderDetail",
              query: {
                orderId: thif.order_id
              }
            });
          } else {
            // 失败从新加载订单数据
            thif.source(2);
            thif.common.msgBox(thif, res.msg, 3);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  purchase_maindian(sendObj) {
    let {
      line_items,
      order_currency,
      order_total_price,
      service_price
    } = this.orderData;
    let orderItems = line_items;
    let purchaseItemArrs = [];
    let quantityTotal = 0;
    let contents = [];
    for (let index = 0; index < orderItems.length; index++) {
      let {
        goods_id,
        goods_name,
        coupon_price,
        sku_quantity,
        shop_price
      } = orderItems[index];
      quantityTotal += Number(sku_quantity);
      contents.push({
        id: goods_id,
        quantity: sku_quantity
      });
      purchaseItemArrs.push({
        id: String(goods_id),
        name: String(goods_name),
        coupon: String(coupon_price),
        affiliation: String(sendObj.payment_method),
        quantity: Number(sku_quantity),
        price: String(shop_price)
      });
    }
    this.buryingPoint.purchase(
      String(order_currency),
      Number(order_total_price),
      purchaseItemArrs,
      sendObj.payment_method,
      Number(service_price),
      String(this.common.generateUUID()), //生成交易的唯一标识符
      quantityTotal,
      contents
    );
  },
  head() {
    return {
      script: [
        {
          body: false,
          src: "https://js.stripe.com/v3/"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.checkoutDetailCoat {
  overflow: hidden;
  // background-color: $pageBjColor;
  .fHeader {
    background-color: #fff;
  }
}
.Breadcrumb {
  font-size: 24px;
  text-align: center;
  padding: 15px 0;
  margin-top: 20px;
  span,
  p {
    color: #ccc;
  }
  .BreadcrumbActive {
    color: $bjColor;
  }
}

.paypalBox {
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  span {
    font-size: 28px;
    padding: 12px;
    background-color: rgba(255, 255, 255, 0.3);
    position: absolute;
    right: 32px;
    top: 32px;
    border-radius: 50%;
    cursor: pointer;
  }

  iframe {
    width: 500px;
    height: 700px;
    @include center;
    background-color: #fff;
  }
}

.f-container {
  margin-bottom: 42px;
  min-height: 500px;
}
</style>
