<template>
  <div :class="minHeight ? 'minHeight_ttb' : 'height_ttb'">
    <el-drawer
      custom-class="cart-drawer"
      title=""
      :wrapperClosable="true"
      :modal-append-to-body="false"
      direction="ttb"
      :visible.sync="dialogVisible"
      :with-header="false"
      @open="openDialog"
      :before-close="handleClose"
    >
      <div class="operate-box">
        <div class="my-cart-title">{{$t('cart.MYCART')}}</div>
        <div
          @click="closeCartPopover()"
          class="closeCartPopover"
        >×</div>
      </div>
      <div
        v-loading="getCartLoading"
        class="cart-noHave"
      >
        <div
          class="cart-noHave-list"
          v-if="!cardsArr.length && !getCartLoading"
        >
          <img src="~/static/images/img/myCart.png">
          <div class="shopBagEmptyTitle">{{$t('cart.ShoppingBagEmpty')}}</div>
          <div class="shopBagEmptyToShopNow">
            <a
              v-if="$store.state.loginToken"
              href="/"
            >{{$t('cart.ShopNow')}}</a>
            <div v-if="!$store.state.loginToken">
              <a href="/">{{$t('cart.ShopNow')}}</a>&nbsp;{{$t('cart.ShopNowOr')}}&nbsp;
              <a href="/login">{{$t('cart.SIGNIN')}}</a>
              &nbsp;{{$t('cart.CHECKSHOPPINGBAG')}}
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="cardsArr.length && !getCartLoading"
        class="tableCoat_"
        v-loading="loading"
      >
        <!-- 未满19显示运费文案 -- 只针对英国 -->
        <!-- <div
          class="deliveryTag"
          v-if="$store.getters.getCountry == 'United Kingdom (UK)' && !!delivery_price_limit && (Number(delivery_price_limit.limit) - Number(total)) > 0"
        >
          <p class="deliveryTil">Buy
            <span>
              {{$store.getters.getCurrencySymbol}}
              {{Number(delivery_price_limit.limit) - Number(total) | numToFix}}
            </span>
            more to enjoy
            <span>FREE SHIPPING!</span>
          </p>
        </div> -->
        <div
          v-if="cardsArr.length"
          class="productBox-top-line"
        ></div>
        <div class="productBox">
          <!-- <p class="my-cart-title">{{$t('cart.MYCART')}}</p> -->
          <div
            class="cart-item-box"
            v-for="(item, index) in cardsArr"
            :key="'l' + index"
          >
            <el-row :gutter="20">
              <el-col
                :span="8"
                class="el-col-cart-left"
              >
                <img
                  v-lazy="item.image"
                  alt=""
                >
              </el-col>
              <el-col
                :span="18"
                class="el-col-cart-right"
              >
                <div class="cartRightDetail">
                  <p class="product-name">{{ item.goods_name }}</p>
                  <div
                    :class="common.isHalloweenTag(item.goods_id) ? 'attributes attributes_down' : 'attributes attributes_up'"
                    v-if="item.type == 'variable' && item.attributes != void(0) && item.attributes.length!=0"
                  >
                    <span
                      v-for="(attrItem,attrIndex) in item.attributes"
                      :key="'attr'+item.cart_id+attrIndex"
                    >{{attrItem}} <i> / </i></span>
                  </div>
                  <div class="product-price-desc">
                    <div class="sale-price">{{ $store.getters.getCurrencySymbol }}{{ item.shop_price }}</div>
                    <div
                      v-if="item.shop_price != item.reference_price"
                      class="regular-price"
                    >{{ $store.getters.getCurrencySymbol }}{{ item.reference_price }}</div>
                    <img
                      class="el-icon-delete"
                      @click="delShop(item.cart_id, index,item)"
                      src="~static/images/icon/delete.png"
                    >
                  </div>
                  <!-- 万圣节特别文案 -->
                  <div
                    class="halloweenTag"
                    v-if="common.isHalloweenTag(item.goods_id)"
                  >
                    <img
                      class="halloweenTagImg"
                      src="~static/images/icon/notice.png"
                      alt=""
                    >
                    <p class="halloweenTil">{{$t('cart.halloweenTil')}}</p>
                  </div>
                  <p class="subtotal">
                    <span>{{$t('cart.TOTAL')}}</span>
                    <b>{{ $store.getters.getCurrencySymbol }}{{item.subtotal}}</b>
                  </p>
                  <div class="NumCoat">
                    <div
                      class="numLeft b-cursor"
                      @click="controlNum(index, 2, item.cart_id, item.goods_id, item.sku_id, item.quantity)"
                    >-</div>
                    <div class="num">{{item.quantity}}</div>
                    <div
                      class="numRight b-cursor"
                      @click="controlNum(index, 1, item.cart_id, item.goods_id, item.sku_id, item.quantity)"
                    >+</div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div
          v-if="cardsArr.length"
          class="productBox-bottom-line"
        ></div>
        <el-button
          type="primary view-checkout-btn"
          @click="toCheckout"
        >{{$t('cart.VIEWBAGCHECKOUT')}}</el-button>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import common from "~/utils/common";
export default {
  name: "newCartListDrawer",
  props: {
    dialogVisible: {
      type: Boolean
    }
  },
  data() {
    return {
      loading: false,
      getCartLoading: false,
      cardsArr: [],
      total: 0, //购物车里的总价
      delivery_price_limit: "" //国家对应的运费规则
      // quantity: '',
      // subtotal: ''
    };
  },
  computed: {
    minHeight() {
      return this.cardsArr.length <= 2 && this.cardsArr.length != 0;
    }
  },
  methods: {
    openDialog() {
      this.getCart();
    },
    closeCartPopover() {
      this.$store.dispatch("cartDialogVisible", false);
    },
    handleClose() {
      this.$store.dispatch("cartDialogVisible", false);
    },
    toCheckout() {
      this.$store.dispatch("cartDialogVisible", false);
      this.$router.push({ path: "/cart" });
    },
    // linkHandle(item) {
    //   this.$store.dispatch("cartDialogVisible", false);
    //   this.$router.push("/product/" + item.product_id);
    // },
    //查询购物车数据
    getCart() {
      // this.quantity = '';
      // this.subtotal = '';
      this.getCartLoading = true;
      this.$apis
        .getCart({}, this.$store.getters.getApiHeader)
        .then(res => {
          if (res.status == 1) {
            this.getCartLoading = false;
            let cardsArr = res.data.items;
            this.cardsArr = cardsArr;
            let total = 0;
            for (let index = 0; index < cardsArr.length; index++) {
              total += Number(cardsArr[index].subtotal);
            }
            this.total = total;
            this.delivery_price_limit = res.data.delivery_price_limit;
            this.$store.dispatch("actCartShop", res.data.items);
          } else {
            this.getCartLoading = false;
            this.common.msgBox(thif, res.msg, 3);
          }
        })
        .catch(err => {
          this.getCartLoading = false;
          console.log(err);
        });
      // if (!this.$store.getters.getCartShop.length) {
      //   this.getCartLoading = true;
      //   this.$apis
      //     .getCart({}, this.$store.getters.getApiHeader)
      //     .then(res => {
      //       if (res.status == 1) {
      //         this.getCartLoading = false;
      //         this.cardsArr = res.data.carts;
      //         this.$store.dispatch("actCartShop", res.data.carts);
      //       } else {
      //         this.getCartLoading = false;
      //         this.common.msgBox(thif, res.msg, 3);
      //       }
      //     })
      //     .catch(err => {
      //       this.getCartLoading = false;
      //       console.log(err);
      //     });
      // }else{
      //   this.cardsArr = this.$store.getters.getCartShop;
      //   console.log(this.cardsArr,'this.cardsArr')
      // }
    },
    controlNum(index, type, cart_id, goods_id, sku_id, quantity) {
      console.log(quantity, "quantity");
      // let thif = this;
      let yuanNum = Number(quantity);
      if (type == 1) {
        yuanNum = yuanNum + 1;
      } else {
        if (yuanNum > 1) {
          yuanNum--;
        }
      }
      // thif.loading = true;
      this.$apis
        .changeShopNum({
          quantity: String(yuanNum),
          cart_id,
          goods_id,
          sku_id
        })
        .then(res => {
          if (res.status == 1) {
            let { quantity, subtotal } = res.data.item;
            // this.quantity = quantity;
            // this.subtotal = subtotal;
            this.cardsArr[index].quantity = quantity;
            this.cardsArr[index].subtotal = subtotal;
            this.total = subtotal;
            this.$emit("reloadHeader");
            // this.$store.dispatch("actCartNum", Number(quantity));
            // thif.loading = false;
            // thif.getCart();
          } else {
            // thif.loading = false;
            this.common.msgBox(this, res.msg, 3);
          }
        })
        .catch(err => {
          // this.loading = false;
          console.log(err);
        });
    },
    delShop(id, index, item) {
      let thif = this;
      thif.loading = true;
      let idStr = "";
      let idStrNum = 0;
      let fbMaidian = [];
      let googleMaidian = {
        id: String(item.goods_id),
        currency: this.$store.getters.getApiHeader.currency,
        value: Number(item.subtotal),
        shopName: String(item.goods_name)
      };
      for (let i = 0; i < this.cardsArr.length; i++) {
        fbMaidian.push(this.cardsArr[i].cart_id);
        if (idStrNum == 0) {
          idStr = this.cardsArr[i].cart_id;
        } else {
          idStr += "," + this.cardsArr[i].cart_id;
        }
        idStrNum++;
      }
      this.$apis
        .delCartShop({ cart_ids: id }, this.$store.getters.getApiHeader)
        .then(res => {
          if (res.status == 1) {
            thif.buryingPoint.RemoveFromCart(fbMaidian, googleMaidian);
            thif.loading = false;
            thif.$store.dispatch("actCartNum", res.data.items_count);
            thif.getCart();
          } else {
            thif.loading = false;
            thif.common.msgBox(thif, res.msg, 3);
          }
        })
        .catch(err => {
          thif.loading = false;
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.minHeight_ttb {
  /deep/ .el-drawer.ttb {
    width: 100% !important;
    min-height: 5rem !important;
    background: #fff !important;
  }
}
.height_ttb {
  /deep/ .el-drawer.ttb {
    width: 100% !important;
    min-height: 6.5rem !important;
    background: #fff !important;
  }
}
/deep/ .el-drawer {
  display: flex;
  justify-content: center;
  .operate-box {
    display: flex;
    justify-content: space-between;
    width: 62%;
    margin: 0.2rem auto;
    .my-cart-title {
      font-family: Ubuntu;
      font-style: normal;
      font-weight: normal;
      font-size: 0.24rem;
      line-height: 0.28rem;
      color: #000000;
      display: inline-block;
    }
    .closeCartPopover {
      margin-right: -0.3rem;
      cursor: pointer;
      width: 0.48rem;
      height: 0.48rem;
      font-size: 0.48rem;
      line-height: 0.44rem;
      border-radius: 50%;
      text-align: center;
      background: #f5f5f5;
    }
  }
  .cart-noHave-list {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      top: 0.8rem;
      position: absolute;
    }
    span {
      position: absolute;
      top: 56px;
      font-family: Ubuntu;
      font-style: normal;
      font-weight: normal;
      font-size: 0.24rem;
      line-height: 0.28rem;
      color: #000000;
      text-align: center;
      display: block;
      width: 100%;
    }
    .shopBagEmptyTitle {
      position: absolute;
      top: 3.5rem;
      width: 100%;
      font-family: Ubuntu;
      font-style: normal;
      font-weight: 500;
      font-size: 0.18rem;
      line-height: 0.22rem;
      text-align: center;
      color: $fontColor1;
    }
    .shopBagEmptyToShopNow {
      position: absolute;
      top: 3.82rem;
      width: 100%;
      font-family: Ubuntu;
      font-style: normal;
      font-weight: 300;
      font-size: 0.14rem;
      line-height: 0.18rem;
      text-align: center;
      color: $fontColor1;
      a {
        text-decoration: underline;
      }
    }
  }
  .cart-noHave {
    display: flex;
    justify-content: center;
    position: relative;
    .el-loading-spinner {
      top: 200px !important;
    }
  }
}
.tableCoat_ {
  top: 0.6rem;
  padding: 0 0.3rem;
  position: absolute;
  width: 100%;
  .deliveryTag {
    margin-bottom: 0.15rem;
    .deliveryTil {
      font-weight: bold;
      // width: 14.8rem;
      width: 11.73rem;
      font-size: 0.16rem;
      margin: 0px auto;
      // padding: 0 0.4rem;
      span {
        color: #e8001b;
      }
      .add {
        float: right;
        cursor: pointer;
      }
    }
  }
  .productBox {
    padding: 6px;
    display: flex;
    // width: 14.8rem;
    width: 1200px;
    // height: 3.74rem;
    margin: 0.5rem auto 0;
    flex-wrap: wrap;
    overflow-y: scroll;
    max-height: 3.74rem;
    min-height: 1.74rem;
    // align-content: space-between;
    justify-content: space-between;
  }
  /deep/ .el-row {
    margin-left: 0.4rem;
    margin-right: 0.4rem;
    margin-bottom: 0.2rem;
  }
  .el-col-cart-left {
    padding-left: 0 !important;
    padding-right: 0 !important;
    width: auto;
    img {
      width: 1.2rem;
      height: 1.2rem;
      border-radius: 8px;
    }
  }
  .el-col-cart-right {
    .cartRightDetail {
      position: relative;
      .product-name {
        cursor: pointer;
        width: 100%;
        font-family: Ubuntu;
        font-style: normal;
        font-weight: bold;
        font-size: 0.16rem;
        line-height: 0.18rem;
        color: $fontColor1;
        position: absolute;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .product-price-desc {
        .sale-price {
          position: absolute;
          left: 0px;
          top: 0.24rem;
          font-family: Ubuntu;
          font-style: normal;
          font-weight: bold;
          font-size: 0.18rem;
          line-height: 0.22rem;
          color: #172d55;
        }
        .regular-price {
          position: absolute;
          margin-left: 0.65rem;
          top: 0.28rem;
          font-family: Ubuntu;
          font-style: normal;
          font-weight: 300;
          font-size: 0.14rem;
          line-height: 0.18rem;
          text-decoration-line: line-through;
          color: #555555;
        }
        .el-icon-delete {
          position: absolute;
          top: 0.28rem;
          right: 0;
          cursor: pointer;
        }
      }
      .halloweenTag {
        display: flex;
        width: 100%;
        position: absolute;
        top: 0.5rem;
        .halloweenTagImg {
          height: 0.14rem;
        }
        .halloweenTil {
          font-size: 0.14rem;
          margin-left: 0.1rem;
          font-weight: bold;
        }
      }
      .attributes {
        display: flex;
        position: absolute;
        left: 0;
        font-family: Ubuntu;
        font-style: normal;
        font-weight: 300;
        font-size: 0.14rem;
        line-height: 0.18rem;
        color: $fontColor1;
        span:last-child i {display: none;}
      }
      .attributes_up {
        top: 0.55rem;
      }
      .attributes_down {
        top: 0.7rem;
      }
      .NumCoat {
        display: flex;
        position: absolute;
        right: 0;
        top: 0.96rem;
        font-size: 0.14rem;
        .numLeft {
          font-size: 0.4rem;
          line-height: 0.14rem;
          border-radius: 10px 0px 0px 10px;
        }
        .numRight {
          font-size: 0.25rem;
          line-height: 0.21rem;
          border-radius: 0px 10px 10px 0px;
        }
        .numLeft,
        .numRight {
          padding: 0 0.07rem;
          width: 0.34rem;
          height: 0.21rem;
          background: #d9d9d9;
          text-align: center;
        }
        .num {
          text-align: center;
          height: 0.21rem;
          width: 0.31rem;
          line-height: 0.21rem;
          margin: 0 3px;
          font-size: 0.14rem;
          color: #000000;
          background: #f2f2f2;
        }
      }
      .subtotal {
        position: absolute;
        left: 0;
        top: 0.96rem;
        span {
          color: #191919;
          font-size: 0.14rem;
          font-family: Ubuntu;
        }
        b {
          color: #172d55;
          font-weight: bold;
          font-size: 0.18rem;
          font-family: Ubuntu;
        }
      }
    }
  }
  .productBox-bottom-line {
    height: 2px;
    background: #f5f5f5;
    width: 11.73rem;
    margin: 0.33rem auto 0;
  }
  .view-checkout-btn {
    width: 2.84rem;
    height: 0.5rem;
    background: $fontColorBlack2;
    border-radius: 4px;
    border: none;
    // margin: 0 auto;
    margin: 0.28rem auto;
    display: flex;
    align-items: center;
    justify-content: center;
    /deep/ span {
      font-family: Ubuntu;
      font-style: normal;
      font-weight: normal;
      font-size: 0.14rem;
      text-align: center;
      text-transform: uppercase;
      color: #fff;
    }
  }
  .view-checkout-btn:hover{
    background: $buttonBlueHover;
  }
  .cart-item-box:hover {
    box-shadow: 0 6px 12px 0 hsla(0, 0%, 68.2%, 0.6);
  }
  .cart-item-box {
    width: 5.38rem;
    height: 1.69rem;
    margin-bottom: 0.36rem;
    padding: 0.24rem 0.28rem;
    background: #fff;
    border-radius: 13px;
  }
  // /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
  ::-webkit-scrollbar {
    width: 4px;
    height: 0;
    background-color: #f8f9fa;
  }

  // /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 1px RGBA(29, 149, 217, 0.5);
    border-radius: 10px;
    background-color: RGBA(127, 127, 127, 0.3);
  }

  // /*定义滑块 内阴影+圆角*/
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: RGBA(0, 0, 0, 0.2);
  }
}
</style>
