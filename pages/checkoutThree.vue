<template>
  <div class="checkoutThree">
    <div class="f-container">
      <checkout-header :index="2"></checkout-header>
      <div class="coat">
        <div class="coatLeft">
          <p class="til">{{$t('orderDetail.OrderDetails')}}</p>
          <div class="list listBor">
            <p class="listTil">{{$t('orderDetail.PRODUCT')}}</p>
            <p class="listTil">{{$t('order.TOTAL')}}</p>
          </div>
          <div class="listBor">
            <div class="list"
              v-for="(item, index) in orderData?orderData.line_items: []"
              :key="'three' + index">
              <div class="listLeft">
                <img :src="item.sku_image_url" alt="">
                <div class="listCenter">
                  <p class="shopName">{{item.goods_name}}</p>
                  <p class="guige" v-if="item.attributes.length!=0">
                    <span v-for="(attrItem,attrIndex) in item.attributes" :key="'attributes' + attrIndex">
                      {{attrItem}} <i>/</i>
                    </span>
                  </p>
                  <p class="quantity">x {{item.sku_quantity}}</p>
                </div>
              </div>
              <p class="listText pColor">
                {{orderData? $store.getters.getCurrencyArr[orderData.order_currency].Symbol: ""}}
                {{ item.shop_price }}
              </p>
            </div>
          </div>

          <div style="padding: 10px 0;" class="listBor">
            <div class="list">
              <p class="listText">{{$t('orderDetail.Subtotal')}}:</p>
              <p class="listText pColor">
                {{orderData? $store.getters.getCurrencyArr[orderData.order_currency].Symbol:""}}
                {{ orderData ? orderData.order_subtotal_price : "" }}
              </p>
            </div>
            <!-- 优惠券 -->
            <div class="list" v-if="orderData ? !!Number(orderData.coupon_price) : false">
              <p class="listText">{{$t('orderDetail.Coupon')}}:</p>
              <p class="listText pColor">
                - {{orderData? $store.getters.getCurrencyArr[orderData.order_currency].Symbol:""}}
                {{ orderData ? orderData.coupon_price : "" }}
              </p>
            </div>
            <!-- 积分 -->
            <div class="list" v-if="orderData ? !!Number(orderData.point_price) : false">
              <p class="listText">{{$t('orderDetail.Points')}}:</p>
              <p class="listText pColor">
                - {{orderData? $store.getters.getCurrencyArr[orderData.order_currency].Symbol:""}}
                {{ orderData ? orderData.point_price : "" }}
              </p>
            </div>
            <!-- 服务费 -->
            <div class="list" v-if="orderData ? !!Number(orderData.service_price) : false">
              <p class="listText">{{$t('orderDetail.ServiceFee')}}:</p>
              <p class="listText pColor">
                {{orderData? $store.getters.getCurrencyArr[orderData.order_currency].Symbol:""}}
                {{ orderData ? orderData.service_price : "" }}
              </p>
            </div>
            <div class="list">
              <p class="listText">{{$t('cart.Shipping')}}:</p>
              <p v-if="orderData && !!Number(orderData.delivery_price)" class="listText pColor">
                {{orderData? $store.getters.getCurrencyArr[orderData.order_currency].Symbol:""}}
                {{orderData.delivery_price}}
              </p>
              <p v-else class="listText pColor">{{$t('checkout.FREE')}}</p>
            </div>
            <div class="list">
              <p class="listText">{{$t('orderDetail.PaymentMethod')}}:</p>
              <p class="listText">
                {{orderData? orderData.payment_method? orderData.payment_method:orderData.status:""}}
              </p>
            </div>
            <div class="list">
              <p class="listText">{{$t('cart.Total')}}:</p>
              <p class="listText pColor">
                {{orderData? $store.getters.getCurrencyArr[orderData.order_currency].Symbol:""}}
                {{ orderData ? orderData.order_total_price : "" }}
              </p>
            </div>
          </div>

          <p class="addressTil">{{$t('checkout.SHIPPINGADDRESS')}}</p>
          <div class="listCoat">
            <div class="addressListCoat">
              <div class="item addressItem" v-if="orderData">
                <!-- <p class="tabTil">{{$t('checkout.SHIPPINGADDRESS')}}</p> -->
                <div class="list">
                  <p class="rights">
                    <b>
                      {{orderData? orderData.shipping_address.shipping_first_name: ""}}
                      {{orderData? orderData.shipping_address.shipping_last_name: ""}}
                    </b>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    {{orderData? orderData.shipping_address.shipping_phone: ""}}
                  </p>
                </div>
                <div class="list">
                  <p class="rights">
                    {{orderData? orderData.shipping_address.shipping_city: ""}}
                    {{orderData? orderData.shipping_address.shipping_state: ""}},
                    {{orderData? orderData.shipping_address.shipping_country: ""}}
                    {{orderData? orderData.shipping_address.shipping_postcode: ""}}
                    {{orderData? orderData.shipping_address.shipping_address1: ""}}
                    {{orderData? orderData.shipping_address.shipping_address2: ""}}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="coatRight">
          <div class="rightTil">
          {{$t('checkout.ThankYou')}} <br/> {{$t('checkout.received')}}
          </div>
          <div class="rightList">
            <p>
              {{$t('orderDetail.OrderNumber')}}:
              <span>{{ orderData ? orderData.master_order_id : "" }}</span>
            </p>
            <p>
              {{$t('orderDetail.OrderDate')}}:
              <span>{{orderData? orderData.created_at: "" | timers(3)}}</span>
            </p>
            <!-- <p>
              Email:
              <span>{{ orderData ? orderData.email : "" }}</span>
            </p> -->
            <p>
              {{$t('cart.Total')}}:
              <span class="pColor">{{orderData? $store.getters.getCurrencyArr[orderData.order_currency].Symbol: ""}}
              {{ orderData ? orderData.order_total_price : "" }}</span>
            </p>
            <p>
              {{$t('orderDetail.PaymentMethod')}}:
              <span>
                {{orderData? orderData.payment_method? orderData.payment_method: orderData.status: ""}}
              </span>
            </p>
          </div>
          <div>
            <button @click="goHome" class="goHome">
              {{$t('checkout.CONTINUESHOPPING')}}
            </button>
          </div>

        </div>
      </div>
    </div>
    <f-footer></f-footer>
  </div>
</template>

<script>
  // import { this.$apis } from "@/api/api";
  import fFooter from "@/components/footer/f-footer";
  import checkoutHeader from "@/components/checkoutHeader/checkoutHeader";
  export default {
    name: "checkoutThree",
    components: {
      fFooter,
      checkoutHeader
    },
    data() {
      return {
        orderData: null
      };
    },
    head() {
      return {
        script: [{
          body: false,
          src: "https://js.stripe.com/v3/"
        }]
      };
    },
    mounted() {
      this.buryingPoint.pageView();
      this.getOrder(this.$route.query.orderId);
    },
    methods: {
      goHome(){
        this.$router.push({path:"/"})
      },
      getOrder(orderId) {
        let thif = this;
        this.$apis
          .orderDetail({
              id: orderId
            },
            this.$store.getters.getApiHeader
          )
          .then((res) => {
            console.log(res);
            if (res.status == 1) {
              thif.orderData = res.data.item;
            } else {
              this.common.msgBox(this, res.msg, 3);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .checkoutThree {
    overflow: hidden;
    // background-color: $pageBjColor;
  }

  .fHeader {
    background-color: #fff;
  }
        .pColor {
          color: $bjColor;
        }
  .coat {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    margin-bottom: 40px;

    .coatLeft {
      width: 63%;
      background-color: #fff;
      padding: 0 20px 80px;
      .listTil {
        font-size: 20px;
        font-weight: 500;
      }
      .til {
        font-size: 24px;
        font-weight: 550;
        line-height: 68px;
        border-bottom: 1px solid #eee;
      }
      .listBor {
        border-bottom: 1px solid $borderColor;
      }
      .list {
        font-size: 16px;
        line-height: 24px;
        padding: 10px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .lang {
          max-width: 88%;
        }
        .listLeft {
          display: flex;
          align-items: center;
          .shopName {
            max-width: 500px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          img {
            height: 100px;
            border-radius: 4px;
            margin-right: 20px;
          }
        }
        .pColor {
          color: $bjColor;
        }
      }

      .addressTil {
        margin-top: 40px;
        font-size: 20px;
      }

      .addressCoat {
        font-size: 16px;
        padding: 30px;
        border: 1px solid $fontColor1;
        border-radius: 8px;
        margin-bottom: 32px;
        margin-top: 24px;
      }
    }
  }

  .addressListCoat {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    margin-top: 0px;
    margin-bottom: 10px;

    .item {
      display: flex;
      flex-direction: column;
      font-size: 14px;
      width: 100%;
      padding: 15px 0px;
      // border: 1px solid $borderColor;
      border-radius: 5px;

      .list {
        display: flex;
        padding: 20px 0;
        // border: 0;
      }

      .list:last-child {
        border: 0;
      }

      p {
        line-height: 20px;
      }

      .left {
        color: $fontColor2;
        width: 122px;
      }

      .rights {
        color: $fontColor1;
        text-align: left;
      }

      .listFoot {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        font-size: 12px;

        p {
          color: $fontColor2;
        }

        .shu {
          padding: 0 8px;
        }
      }
    }
  }

  .coatRight {
    padding: 20px;
    width: 35%;
    background-color: #fff;
    font-size: 20px;

    .rightTil {
      font-size: 24px;
      color: $bjColor;
      border-bottom: 1px solid #eee;
      padding-bottom: 16px;
    }

    .rightList {
      padding: 10px 0;

      p {
        padding-left: 16px;
        line-height: 48px;
        position: relative;

        span {
          font-weight: 550;
        }
      }

      p:after {
        position: absolute;
        content: "";
        height: 8px;
        width: 8px;
        border-radius: 50%;
        background-color: $bjColor;
        left: 0;
        top: 0;
        bottom: 0;
        margin: auto;
      }
    }
  }
  .addressItem {
    border: 1px solid $fontColor1;
    width: 100%;
    padding: 20px 30px  !important;
    margin-top: 30px;
    border-radius: 8px;
    .list {
      padding: 0 !important;
      p {
        line-height: 30px !important;
      }

      b {
        font-weight: 550;
      }
    }
    .rights {
      font-size: 16px;
    }
  }
  .goHome {
    height: 42px;
    background-color: $btnBjColor;
    width: 100%;
    font-size: 20px;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
  }
  .guige span:last-child i {display: none;}
</style>
