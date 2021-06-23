<template>
  <div
    class="checkoutTwoCoat"
    v-loading="maskingShow"
  >
    <div class="f-container">
      <checkout-header :index="1"></checkout-header>
      <div class="coats">
        <div class="coatLeft">
          <p class="til">{{$t('orderDetail.PaymentMethod')}}(s)</p>
          <div class="iconCoat" v-if="showPaymentMethods.stripe != 1
            || showPaymentMethods.ipaylinks != 1
            || showPaymentMethods.airwallex != 1">
            <!-- <input type="radio" name="payment_methods" v-model="payChange" :value="1"> -->
            <div
              class="paySel"
              :class="(payment_methods =='stripe'|| payment_methods == 'ipaylinks' || payment_methods == 'airwallex') ? 'paySelActive': ''"
              @click="cutPayment(1)"
            >
              <div></div>
            </div>
            <label>
              <!-- <span>{{ $t("checkout.CreditCard") }}</span> -->
              <img
                v-for="(item, index) in iconCoat"
                :key="'b' + index"
                :src="item"
                v-if="!((index==1||index==3||index==4||index==5)&&showPaymentMethods.airwallex!=1)"
                alt=""
              >
            </label>
          </div>
          <!-- 信用卡支付，目前支持stripe、ipaylinks、airwallex支付 -->
          <div
            v-show="(payment_methods =='stripe'|| payment_methods == 'ipaylinks' || payment_methods == 'airwallex') ? true: false"
            class="cardpayCoat"
          >
            <!-- stripe card -->
            <div
              v-if="showPaymentMethods.stripe != 1"
              id="payment-form"
            >
              <div class="form-row">
                <div id="card-element"></div>
                <div
                  id="card-errors"
                  role="alert"
                ></div>
              </div>
            </div>
            <!-- ipaylinks card -->
            <div
              v-if="showPaymentMethods.ipaylinks != 1"
              class="ipayCoat"
            >
              <div>
                <input
                  v-model="ipaylinksCart"
                  type="text"
                  placeholder="Card Number"
                  class="cardNum"
                >
              </div>
              <div>
                <input
                  v-model="ipaylinksMath"
                  type="text"
                  placeholder="MM / YY"
                  class="cartMath"
                  @input="testIpaylinksMath"
                >
                <input
                  v-model="ipaylinksCVC"
                  type="text"
                  placeholder="CVV"
                  class="cardCvv"
                >
              </div>
            </div>
            <!-- airwallex card -->
            <div
              v-show="showPaymentMethods.airwallex != 1"
              class="airwallexCoat"
            >
              <p id="loading"></p>
              <!-- card-element -->
              <div id="card"></div>
              <p
                id="error"
                style="color: red;display: none;margin-top: 6px;"
              ></p>
            </div>
          </div>
          <!-- paypal支付 -->
          <div
            class="iconCoat"
            v-if="showPaymentMethods.paypal_express != 1"
          >
            <div
              class="paySel"
              :class="payment_methods == 'paypal_express'? 'paySelActive': ''"
              @click="cutPayment(2)"
            >
              <div></div>
            </div>
            <img
              src="~/static/images/img/paypal.jpg"
              alt=""
              class="paypal"
            >
          </div>
        </div>
        <div class="coatRight">
          <div class="summeryTil">
            <p>{{$t('cart.ORDERSUMMERY')}}</p>
            <div>
              <img
                src="~/static/images/icon/safe.png"
                alt=""
              >
              <span>{{$t('cart.SECURECHECKOUT')}}</span>
            </div>
          </div>
          <div class="priceList">
            <p class="listLeft">{{$t('orderDetail.Subtotal')}}</p>
            <p class="listRight">
              {{orderData? $store.getters.getCurrencyArr[orderData.order_currency].Symbol: ""}}
              {{ orderData ? orderData.order_subtotal_price : "" }}
            </p>
          </div>
          <div class="priceList">
            <p class="listLeft">{{$t('cart.Shipping')}}</p>
            <p
              v-if="orderData && !!Number(orderData.delivery_price)"
              class="listRight priceColor"
            >
              {{orderData? $store.getters.getCurrencyArr[orderData.order_currency].Symbol: ""}}
              {{orderData.delivery_price}}
            </p>
            <p
              v-else
              class="listRight priceColor"
            >{{$t('cart.FreeShipping')}}</p>
          </div>
          <!-- 服务费 -->
          <div
            class="priceList"
            v-if="orderData ? !!Number(orderData.service_price) : false"
          >
            <p class="listLeft">{{$t('orderDetail.ServiceFee')}}</p>
            <p class="listRight priceColor">
              {{orderData? $store.getters.getCurrencyArr[orderData.order_currency].Symbol: ""}}
              {{ orderData ? orderData.service_price : "" }}
            </p>
          </div>
          <!-- 优惠券 -->
          <div
            class="priceList"
            v-if="orderData ? !!Number(orderData.coupon_price) : false"
          >
            <p class="listLeft">{{$t('orderDetail.Coupon')}}</p>
            <p class="listRight priceColor">
              -{{orderData? $store.getters.getCurrencyArr[orderData.order_currency].Symbol: ""}}
              {{ orderData ? orderData.coupon_price : "" }}
            </p>
          </div>
          <!-- 积分 -->
          <div
            class="priceList"
            v-if="orderData ? !!Number(orderData.point_price) : false"
          >
            <p class="listLeft">{{$t('orderDetail.Points')}}</p>
            <p class="listRight priceColor">
              -{{orderData? $store.getters.getCurrencyArr[orderData.order_currency].Symbol: ""}}
              {{ orderData ? orderData.point_price : "" }}
            </p>
          </div>
          <div class="priceList">
            <p class="listLeft">{{$t('cart.Total')}}</p>
            <p class="listRight priceColor">
              {{orderData? $store.getters.getCurrencyArr[orderData.order_currency].Symbol: ""}}
              {{ orderData ? orderData.order_total_price : "" }}
            </p>
          </div>
          <div class="payBtn">
            <el-button
              :loading="checkoutPayLoading"
              @click="checkoutPay"
            >{{$t('orderDetail.PayNow')}}</el-button>
          </div>
          <div class="iconList">
            <img
              src="~/static/images/icon/icon_safe1.png"
              alt=""
            >
            <p>
              {{$t('orderDetail.guaranted')}}
            </p>
          </div>
          <div class="iconList">
            <img
              src="~/static/images/icon/icon_shipping.jpg"
              alt=""
            >
            <p>{{$t('orderDetail.ShippingFor')}}</p>
          </div>
          <div class="iconList">
            <img
              src="~/static/images/icon/icon_return.jpg"
              alt=""
            >
            <p>
              {{$t('orderDetail.within')}}
            </p>
          </div>
        </div>
      </div>
    </div>
    <f-footer></f-footer>
  </div>
</template>

<script>
import fFooter from "@/components/footer/f-footer";
import checkoutHeader from "@/components/checkoutHeader/checkoutHeader";
import jsCookie from "@/utils/js-cookie";
import {
  createElement,
  loadAirwallex,
  getElement,
  confirmPaymentIntent
} from "airwallex-payment-elements"; //airwallex第三方支付方法

const init = () => {
  loadAirwallex({
    env: process.env.NODE_MODE == 'prod' ? 'prod' : 'prod', // Can choose other production environments, 'staging | 'demo' | 'prod'
    origin: window.location.origin,
    fonts: [
      {
        src:
          "https://checkout.airwallex.com/fonts/CircularXXWeb/CircularXXWeb-Regular.woff2",
        family: "AxLLCircular",
        weight: 400
      }
    ]
  }).then(() => {
    const card = createElement("card");
    console.log(card, "card-init");
    card.mount("card");
  });
};

const onReady = event => {
  document.getElementById("loading").style.display = "none";
  document.getElementById("card").style.border = "1px solid";
  console.log(`Element ready, ${JSON.stringify(event.detail)}`);
};

const onError = event => {
  const { error } = event.detail;
  console.error("There was an error", error);
};
export default {
  name: "Payment",
  components: {
    fFooter,
    checkoutHeader
  },
  data() {
    return {
      maskingShow: false,
      paymentType: [],
      total: 0,
      showPaymentMethods: {
        stripe: 1, //stripe方式支付
        paypal_express: 1, //paypal方式支付
        ipaylinks: 1, //ipaylinks方式支付
        airwallex: 1 //airwallex方式支付
      },
      iconCoat: [
        "https://image.foroo.co.uk/special/card/visa.png",
        "https://image.foroo.co.uk/special/card/discover.png",
        "https://image.foroo.co.uk/special/card/mastercard.png",
        "https://image.foroo.co.uk/special/card/amex.png",
        "https://image.foroo.co.uk/special/card/jcb.png",
        "https://image.foroo.co.uk/special/card/maestro.png"
      ],
      payment_methods: "",
      stripePaymentId: "",
      stripe: "",
      cardElement: "",
      ipaylinksCart: "",
      ipaylinksMath: "",
      ipaylinksCVC: "",
      orderData: null,
      checkoutPayLoading: false,
      advertiserId: "",
      intent_id: "",
      client_secret: ""
    };
  },
  mounted() {
    this.advertiserId = window.$nuxt.context.env.AD_ID;
    this.buryingPoint.pageView();
    let script = document.createElement("script");
    script.src = "https://js.stripe.com/v3/";
    script.async = !0;
    script.onload = async () => {
      let obj = JSON.parse(this.$store.getters.getInitDataObj);
      this.stripe = Stripe(obj.stripeKey);
      await this.getOrder(this.$route.query.orderId);
      this.order_id = this.$route.query.orderId;
      // payPal支付回跳
      if (this.$route.query.PayerID) {
        // console.log(this,'payPal支付回跳')
        this.maskingShow = true;
        this.payment_methods = "paypal_express";
        this.payConfirm(this.$route.query.PayerID);
      }
      this.createStriprEl();
    };
    document.head.appendChild(script);
    let script2 = document.createElement("script");
    script2.src = "https://www.dwin1.com/19038.js";
    script2.async = !0;script2.defer = 'defer';
    document.body.appendChild(script2);
  },
  beforeDestroy() {
    window.removeEventListener("onReady", onReady);
    window.removeEventListener("onError", onError);
  },
  methods: {
    testIpaylinksMath(e) {
      if (this.ipaylinksMath.length > 4) {
        this.ipaylinksMath = this.ipaylinksMath.substring(0, 4);
      }
    },
    cutPayment(index) {
      console.log(index, "index");
      let {
        airwallex,
        ipaylinks,
        paypal_express,
        stripe
      } = this.showPaymentMethods;
      if (index == 1) {
        console.log(this.showPaymentMethods, "this.showPaymentMethods");
        if (stripe == 2 && airwallex == 1 && ipaylinks == 1) {
          this.payment_methods = "stripe";
        }
        if (stripe == 1 && airwallex == 1 && ipaylinks == 2) {
          this.payment_methods = "ipaylinks";
        }
        if (stripe == 1 && airwallex == 2 && ipaylinks == 1) {
          this.payment_methods = "airwallex";
        }
      } else {
        this.payment_methods = "paypal_express";
      }
    },
    onClickLeft() {
      this.$router.go(-1);
    },
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
          if (res.status == 1) {
            let orderData = res.data.item;
            thif.orderData = orderData;
            thif.paymentType = orderData.available_payments;
            thif.total = orderData.order_total_price;
            for (let i = 0; i < thif.paymentType.length; i++) {
              if (this.showPaymentMethods[thif.paymentType[i]]) {
                this.$set(this.showPaymentMethods, thif.paymentType[i], 2);
              }
            }
            if (this.showPaymentMethods.stripe != 1) {
              setTimeout(function() {
                thif.createStriprEl();
              }, 200);
            }
            if (this.showPaymentMethods.airwallex != 1) {
              init();
              window.addEventListener("onReady", onReady);
              window.addEventListener("onError", onError);
            }
            if (this.showPaymentMethods.paypal_express != 1) {
              this.payment_methods = "paypal_express";
            } else if (this.showPaymentMethods.stripe != 1) {
              this.payment_methods = "stripe";
            } else if (this.showPaymentMethods.ipaylinks != 1) {
              this.payment_methods = "ipaylinks";
            } else if (this.showPaymentMethods.airwallex != 1) {
              this.payment_methods = "airwallex";
            }
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
        let stripe = this.stripe;
        let elements = stripe.elements();

        let style = {
          base: {
            color: "#32325d",
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "14px",
            "::placeholder": {
              color: "#aab7c4"
            }
          },
          invalid: {
            color: "#fa755a",
            iconColor: "#fa755a"
          }
        };
        this.cardElement = elements.create("card", {
          style: style
        });
        this.cardElement.mount("#card-element");
      }
    },
    checkoutPay() {
      console.log(this.orderData, "this.orderData");
      let thif = this;
      this.checkoutPayLoading = true;
      document.getElementById("error").style.display = "none";
      document.getElementById("card").style.borderColor = "black";
      let sendObj = {};
      if (this.payment_methods == "ipaylinks") {
        // ipaylinksCart: "",
        // ipaylinksMath: "",
        // ipaylinksCVC: "",
        let mathData =
          this.ipaylinksMath.substring(0, 2) +
          "/" +
          this.ipaylinksMath.substring(2, 4);
        sendObj = {
          type: this.payment_methods,
          card_no: this.ipaylinksCart,
          expiry_date: mathData,
          security_code: this.ipaylinksCVC
        };
        sendObj.master_order_id = this.order_id;
        sendObj.payment_method = "ipaylinks";
      } else {
        sendObj = {
          payment_method: this.payment_methods,
          master_order_id: this.order_id
        };
      }
      this.$apis
        .checkoutPay(sendObj, this.$store.getters.getApiHeader)
        .then(res => {
          console.log(res, "checkoutPay++++", sendObj.payment_method);
          if (res.status == 1) {
            //ipaylinks方式支付
            if (sendObj.payment_method == "ipaylinks") {
              thif.checkoutPayLoading = false;
              //购买一件或多件商品成功记一次purchase埋点事件
              let {
                line_items,
                order_currency,
                order_total_price,
                service_price,
                master_order_id,
                coupon_code
              } = thif.orderData;
              let orderItems = line_items;
              let purchaseItemArrs = [];
              let quantityTotal = 0;
              let contents = [];
              let code = coupon_code;
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
                  // value: Number(shopItem.sale_price),
                  // category: "Apparel/T-Shirts",
                  quantity: Number(sku_quantity),
                  price: String(shop_price)
                });
              }
              try {
                this.awinAdvertisingBuriedPoint(
                    order_total_price,
                    order_currency,
                    master_order_id,
                    code,
                    line_items,
                    this.advertiserId
                  );
              } catch (error) {
                console.log("awin error:" + error);
              }
              thif.buryingPoint.purchase(
                String(order_currency),
                Number(order_total_price),
                purchaseItemArrs,
                sendObj.payment_method,
                Number(service_price),
                String(thif.common.generateUUID()), //生成交易的唯一标识符
                quantityTotal,
                contents
              );
              // ipaylinks支付在第三步结束
              thif.$router.push({
                path: "/checkoutThree",
                query: {
                  orderId: thif.order_id
                }
              });
              return;
            }
            //paypal方式支付
            if (sendObj.payment_method == "paypal_express") {
              console.log(res, "paypal_express++");
              thif.checkoutPayLoading = false;
              window.location.href = res.data.item.redirect_url;
              return;
            }
            if (sendObj.payment_method == "airwallex") {
              console.log("airwallex支付");
              // airwallex支付
              if (res.data.item.client_secret && res.data.item.intent_id) {
                const card = getElement("card");
                confirmPaymentIntent({
                  element: card,
                  id: res.data.item.intent_id,
                  client_secret: res.data.item.client_secret,
                  payment_method_options: {
                    card: {
                      auto_capture: true
                    }
                  }
                })
                  .then(response => {
                    console.log(response, "airwallex pay response");
                    this.payConfirm(response.id); //intent_id
                  })
                  .catch(error => {
                    console.error(
                      `There was an error, ${JSON.stringify(error)}`
                    );
                    document.getElementById("error").style.display = "block";
                    document.getElementById("card").style.borderColor = "red";
                    document.getElementById("error").style.fontSize = "14px";
                    document.getElementById("error").innerHTML = error.message;
                    this.checkoutPayLoading = false;
                  });
              }
              return;
            }
            // stripe支付
            console.log(res, "stripe支付++");
            let card = this.cardElement;
            thif.stripe
              .confirmCardPayment(res.data.item.payment_id, {
                payment_method: {
                  card
                }
              })
              .then(result => {
                thif.checkoutPayLoading = false;
                console.log(result, "stripe返回数据");
                if (!result.error) {
                  thif.payConfirm(result.paymentIntent.id);
                } else {
                  // 向Stripe API发出请求时，错误分为三大类
                  // 内容错误 -API请求中的内容无效。
                  // 网络错误-客户端和服务器之间的间歇性通信问题。
                  // 服务器错误 -Stripe服务器上的问题。
                  let logObj = {
                    master_order_id: this.order_id,
                    action: "stripePaymentError",
                    note: result.error.message,
                    deal_user: this.$store.getters.getUserId
                  };
                  this.orderLog(logObj); //stripe支付异常记录日志
                  this.common.msgBox(this, result.error.code, 3);
                }
              })
              .catch(err => {
                thif.checkoutPayLoading = false;
                console.log(err);
              });
          } else {
            thif.checkoutPayLoading = false;
            thif.common.msgBox(thif, res.msg, 3);
          }
        })
        .catch(err => {
          thif.checkoutPayLoading = false;
          console.log(err);
        });
    },
    //支付异常记录异常日志
    orderLog(obj) {
      this.$apis.orderLog(obj).catch(err => {
        console.log(err);
      });
    },
    payConfirm(payId) {
      console.log("支付回调");
      let thif = this;
      let sendObj = {};
      console.log(this.payment_methods);
      if (this.payment_methods == "paypal_express") {
        // paypal支付
        sendObj = {
          payment_method: this.payment_methods,
          master_order_id: this.order_id,
          token: this.$route.query.token,
          payer_id: payId
        };
      } else {
        // stripe支付或airwallex支付
        sendObj = {
          payment_method: this.payment_methods,
          master_order_id: this.order_id,
          payment_confirm: payId
        };
      }

      console.log(sendObj, "sendObj");

      this.$apis
        .payConfirm(sendObj, this.headerObj)
        .then(res => {
          console.log(res, "payConfirm");
          if (res.status == 1) {
            thif.checkoutPayLoading = false;
            thif.maskingShow = false;
            //购买一件或多件商品成功记一次purchase埋点事件
            let {
              line_items,
              order_currency,
              order_total_price,
              service_price,
              master_order_id,
              coupon_code
            } = thif.orderData;
            let orderItems = line_items;
            let purchaseItemArrs = [];
            let quantityTotal = 0;
            let contents = [];
            let code = coupon_code;
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
            try {
              this.awinAdvertisingBuriedPoint(
                  order_total_price,
                  order_currency,
                  master_order_id,
                  code,
                  line_items,
                  this.advertiserId
                );
            } catch (error) {
              console.log("awin error:" + error);
            }
            thif.buryingPoint.purchase(
              String(order_currency),
              Number(order_total_price),
              purchaseItemArrs,
              sendObj.payment_method,
              Number(service_price),
              String(thif.common.generateUUID()), //生成交易的唯一标识符
              quantityTotal,
              contents
            );
            // 成功跳转订单详情
            thif.$router.push({
              path: "/checkoutThree",
              query: {
                orderId: thif.order_id
              }
            });
          } else {
            // 失败从新加载订单数据
            // thif.source(2);
            thif.maskingShow = false;
            thif.checkoutPayLoading = false;
            thif.common.msgBox(thif, res.msg, 3);
          }
        })
        .catch(err => {
          thif.maskingShow = false;
          thif.checkoutPayLoading = false;
          console.log(err);
        });
    },
    // {{ advertiserId }}  对接的时候需要改  广告商ID
    // {{ order_number }} 订单号
    // {{ product_id }} 商品ID
    // {{ title }} 商品名称
    // {{ unitPrice }} 商品单价
    // {{ quantity }} 购买数量
    // {{ sku }}  sku
    // {{ group }} 默认填写DEFAULT
    // {{ subtotal_price }} 订单小计金额
    // {{ code }}  优惠券码  列如：例如：10_OFF
    awinAdvertisingBuriedPoint(
      subtotal_price,
      currency,
      order_number,
      code,
      line_items,
      advertiserId
    ) {
      var sProtocol = location.protocol == "http:" ? "http" : "https";
      var url =
        sProtocol +
        `://www.awin1.com/sread.img?tt=ns&tv=2&merchant=${
          advertiserId
        }&amount=` +
        parseFloat(subtotal_price).toFixed(2) +
        "&ch=aw" +
        "&cr=" +
        currency;
      url +=
        "&parts=DEFAULT:" +
        parseFloat(subtotal_price).toFixed(2) +
        "&ref=" +
        order_number +
        "&testmode=0&vc=" +
        code;
      var awPixel = new Image(0, 0);
      awPixel.src = url;
      document.getElementsByTagName("body")[0].appendChild(awPixel);
      //shareasaleImg
      var shareasaleUrl = `https://www.shareasale.com/sale.cfm?tracking=${order_number}&amount=${subtotal_price}&merchantID=108483&transtype=sale`;
      var shareasaleImg = new Image(1, 1);
      shareasaleImg.src = shareasaleUrl;
      document.getElementsByTagName("body")[0].appendChild(shareasaleImg);
      // <img src="https://www.shareasale.com/sale.cfm?tracking={{Order ID}}&amount={{Order Subtotal}}&merchantID=108483&transtype=sale" width="1" height="1">

      var awProductsForm = document.createElement("form");
      awProductsForm.name = "aw_basket_form";
      awProductsForm.setAttribute("style", "display: none;");
      document.getElementsByTagName("body")[0].appendChild(awProductsForm);
      var awProductsTextArea = document.createElement("textarea");
      awProductsTextArea.id = "aw_basket";
      awProductsTextArea.wrap = "physical";
      for (var i = 0; i < line_items.length; i++) {
        awProductsTextArea.value +=
          `AW:P|${advertiserId}|` +
          order_number +
          "|" +
          line_items[i].goods_id +
          "|" +
          line_items[i].goods_name +
          "|" +
          parseFloat(line_items[i].shop_price).toFixed(2) +
          "|" +
          line_items[i].sku_quantity +
          "|" +
          line_items[i].sku_no +
          "|DEFAULT|" +
          "\r\n";
        awProductsTextArea.innerHTML +=
          `AW:P|${advertiserId}|` +
          order_number +
          "|" +
          line_items[i].goods_id +
          "|" +
          line_items[i].goods_name +
          "|" +
          parseFloat(line_items[i].shop_price).toFixed(2) +
          "|" +
          line_items[i].sku_quantity +
          "|" +
          line_items[i].sku_no +
          "|DEFAULT|" +
          "\r\n";
      }
      console.log(awProductsTextArea.value, "awProductsTextArea.value");
      document.aw_basket_form.appendChild(awProductsTextArea);

      let script_ = document.createElement('script');
      script_.type = 'text/javascript';
      script_.text = `
      //<![CDATA[
      /*** Do not change ***/
      var AWIN = {};
      AWIN.Tracking = {};
      AWIN.Tracking.Sale = {};
      /*** Set your transaction parameters ***/
      AWIN.Tracking.Sale.amount = "${parseFloat(subtotal_price).toFixed(2)}";
      AWIN.Tracking.Sale.channel = "aw";
      AWIN.Tracking.Sale.currency = "${currency}";
      AWIN.Tracking.Sale.orderRef = "${order_number}";
      AWIN.Tracking.Sale.parts = "DEFAULT:${parseFloat(subtotal_price).toFixed(2)}";
      AWIN.Tracking.Sale.test = 0;
      ${code ? 'AWIN.Tracking.Sale.voucher = "' + code + '";' : ''}
      // ]]>
    `;
    console.log(script_.text,'script_.text++')
      document.getElementsByTagName("body")[0].appendChild(script_);      
      //AWIN
      var AWIN = {};
      AWIN.Tracking = {};
      AWIN.Tracking.Sale = {};
      AWIN.Tracking.Sale.amount = parseFloat(subtotal_price).toFixed(2); //订单小计金额
      AWIN.Tracking.Sale.channel = "aw"; //固定写死
      AWIN.Tracking.Sale.currency = currency; //使用的货币的
      AWIN.Tracking.Sale.orderRef = order_number; //唯一订单ID
      AWIN.Tracking.Sale.parts = `DEFAULT:${parseFloat(subtotal_price).toFixed(2)}`; //订单金额
      code ? AWIN.Tracking.Sale.voucher = code : ''; //应使用交易中使用的优惠券代码填充。例如：10_OFF
      AWIN.Tracking.Sale.test = 0;

      var awMastertag = document.createElement("script");
      awMastertag.setAttribute("defer", "defer");
      awMastertag.src = sProtocol + `://www.dwin1.com/${advertiserId}.js`;
      awMastertag.type = "text/javascript";
      document.getElementsByTagName("body")[0].appendChild(awMastertag);
    }
  }
};
</script>

<style lang="scss" scoped>
.checkoutTwoCoat {
  overflow: hidden;
  // background-color: $pageBjColor;
  .f-container {
    // min-width: 14.8rem;
    min-width: 1200px;
  }
}
.coats {
  display: flex;
  justify-content: space-between;
  min-height: 500px;
  margin-bottom: 50px;
}

.til {
  font-size: 24px;
  margin-bottom: 20px;
}

.coatLeft {
  border: 1px solid #eee;
  width: 63%;
  padding: 30px 40px;
  background-color: #fff;
}

.iconCoat {
  font-size: 14px;
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 32px;

  img {
    width: 40px;
    padding-left: 6px;
  }

  .paypal {
    width: 100px;
  }

  .paySel {
    height: 18px;
    width: 18px;
    border-radius: 50%;
    border: 1px solid #999;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .paySelActive {
    border: 1px solid $bjColor;
    cursor: pointer;
    div {
      height: 12px;
      width: 12px;
      border-radius: 50%;
      background-color: $bjColor;
    }
  }

  span {
    position: absolute;
    bottom: -20px;
    color: $fontColor1;
    left: 30px;
  }
}

.cardpayCoat {
  margin-bottom: 30px;
  margin-top: 40px;
  padding-left: 24px;
}

.coatRight {
  border: 1px solid #eee;
  padding: 30px 20px 0;
  width: 35%;
  background-color: #fff;
}

.summeryTil {
  // display: flex;
  // align-items: center;
  display: -webkit-box;
  padding-bottom: 0.2rem;
  border-bottom: 1px solid #eee;
  p {
    font-size: 20px;
    font-weight: bold;
  }
  div {
    display: flex;
    align-items: center;
    font-size: 0.12rem;

    img {
      height: 0.2rem;
      margin-left: 0.06rem;
      margin-right: 0.05rem;
    }
    span {
      font-size: 14px;
      color: #18bc2f;
    }
  }
}

.ipayCoat {
  font-size: 16px;
  display: flex;
  justify-content: space-between;

  input {
    padding: 10px 0;
  }

  .cartMath,
  .cardCvv {
    width: 60px;
  }
}

.priceList {
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  border-bottom: 1px solid #eee;
}

.payBtn {
  display: flex;
  margin-top: 40px;
  margin-bottom: 24px;

  button {
    height: 42px;
    border-radius: 4px;
    background-color: $fontColor1;
    color: #fff;
    font-size: 20px;
    width: 100%;
    /deep/ span {
      color: #fff;
    }
    /deep/ .el-icon-loading {
      color: #fff;
    }
  }
}

.iconList {
  font-size: 12px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  img {
    height: 24px;
    margin-right: 16px;
  }
}

/* Custom styling for the input */
#card {
  border-radius: 5px;
  padding: 5px 10px;
  margin-top: 8px;
}
</style>
