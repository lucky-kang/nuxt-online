<template>
  <el-drawer
    custom-class="cart-drawer"
    title=""
    :modal-append-to-body="false"
    :visible.sync="dialogVisible"
    :with-header="false"
    @open="openDialog"
    :before-close="handleClose"
  >
    <div class="my-cart-title">{{$t('cart.MYCART')}}</div>
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
      <div class="cart-item-box">
        <el-row
          :gutter="20"
          v-for="(item, index) in cardsArr"
          :key="'l' + index"
        >
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
            :span="16"
            class="el-col-cart-right"
          >
            <div class="cartRightDetail">
              <p class="product-name">{{ item.goods_name }}</p>
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
              <div
                :class="common.isHalloweenTag(item.goods_id) ? 'attributes attributes_down' : 'attributes attributes_up'"
                v-if="item.type == 'variable' && item.attributes != void(0) && item.attributes.length!=0"
              >
              <span
                      v-for="(attrItem,attrIndex) in item.attributes"
                      :key="'attr'+item.cart_id+attrIndex"
                    >{{attrItem}} <i> / </i></span>
              </div>
              <!-- <div
                :class="common.isHalloweenTag(item.goods_id) ? 'attributes attributes_down' : 'attributes attributes_up'"
                v-if="item.type == 'variable' && Array.from(item.attributes).length == 1"
              >
                <div>{{item.attributes[0]}}</div>
              </div> -->
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
              <p class="subtotal">
                {{$t('cart.TOTAL')}}
                <b>{{ $store.getters.getCurrencySymbol }}{{item.subtotal}}</b>
              </p>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-button
        type="primary view-checkout-btn"
        @click="toCheckout"
      >{{$t('cart.VIEWBAGCHECKOUT')}}</el-button>
    </div>
  </el-drawer>
</template>
<script>
import common from "~/utils/common";
export default {
  name: "cartListDrawer",
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
  methods: {
    openDialog() {
      this.getCart();
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
/deep/ .el-drawer {
  .my-cart-title {
    position: absolute;
    top: 56px;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 28px;
    color: #000000;
    text-align: center;
    display: block;
    width: 100%;
  }
  .cart-noHave-list {
    span {
      position: absolute;
      top: 56px;
      font-style: normal;
      font-weight: normal;
      font-size: 24px;
      line-height: 28px;
      color: #000000;
      text-align: center;
      display: block;
      width: 100%;
    }
    img {
      position: absolute;
      top: 216px;
      left: 140px;
    }
    .shopBagEmptyTitle {
      position: absolute;
      top: 430px;
      width: 100%;
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 22px;
      text-align: center;
      color: $fontColor1;
    }
    .shopBagEmptyToShopNow {
      position: absolute;
      top: 462px;
      width: 100%;
      font-style: normal;
      font-weight: 300;
      font-size: 14px;
      line-height: 18px;
      text-align: center;
      color: $fontColor1;
      a {
        text-decoration: underline;
      }
    }
  }
  .cart-noHave {
    height: 100%;
    .el-loading-spinner {
      top: 200px !important;
    }
  }
}
.tableCoat_ {
  .deliveryTag {
    margin-bottom: 15px;
    .deliveryTil {
      width: 100%;
      font-size: 16px;
      font-weight: bold;
      span {
        color: #e8001b;
      }
      .add {
        float: right;
        cursor: pointer;
      }
    }
  }
  padding: 0 30px;
  position: absolute;
  width: 100%;
  top: 112px;
  /deep/ .el-row {
    margin-left: 40px;
    margin-right: 40px;
    margin-bottom: 20px;
  }
  .el-col-cart-left {
    padding-left: 0 !important;
    padding-right: 0 !important;
    width: auto;
    img {
      width: 120px;
      height: 120px;
    }
  }
  .el-col-cart-right {
    .cartRightDetail {
      position: relative;
      .product-name {
        cursor: pointer;
        width: 100%;
        font-style: normal;
        font-weight: 300;
        font-size: 14px;
        line-height: 18px;
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
          top: 24px;
          font-style: normal;
          font-weight: bold;
          font-size: 18px;
          line-height: 22px;
          color: $fontColor1;
        }
        .regular-price {
          position: absolute;
          margin-left: 65px;
          top: 28px;
          font-style: normal;
          font-weight: 300;
          font-size: 14px;
          line-height: 18px;
          text-decoration-line: line-through;
          color: #555555;
        }
        .el-icon-delete {
          position: absolute;
          top: 28px;
          right: 0;
          cursor: pointer;
        }
      }
      .halloweenTag {
        display: flex;
        width: 100%;
        position: absolute;
        top: 50px;
        .halloweenTagImg {
          height: 14px;
        }
        .halloweenTil {
          font-size: 14px;
          margin-left: 10px;
          font-weight: bold;
        }
      }
      .attributes {
        display: flex;
        position: absolute;
        left: 0;
        font-style: normal;
        font-weight: 300;
        font-size: 14px;
        line-height: 18px;
        color: $fontColor1;
        span:last-child i {display: none;}
      }
      .attributes_up {
        top: 55px;
      }
      .attributes_down {
        top: 70px;
      }
      .NumCoat {
        display: flex;
        position: absolute;
        top: 96px;
        font-size: 14px;
        .numLeft,
        .numRight {
          height: 24px;
          border: 1px solid #ddd;
          line-height: 24px;
          color: #666;
          padding: 0 7px;
          background-color: #eeeeee;
        }
        .num {
          box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
          text-align: center;
          height: 24px;
          width: 24px;
          line-height: 24px;
          color: #666;
          border-top: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
        }
      }
      .subtotal {
        position: absolute;
        font-style: normal;
        font-weight: 300;
        font-size: 14px;
        color: $fontColor1;
        right: 0;
        top: 104px;
        b {
          font-weight: bold;
        }
      }
    }
  }
  .view-checkout-btn {
    width: 460px;
    height: 46px;
    background: $btnBjColor;
    border: none;
    margin: 72px auto 0 -6px;
    // position: absolute;
    // bottom: 20%;
    /deep/ span {
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 18px;
      text-align: center;
      text-transform: uppercase;
      color: #fff;
    }
  }
  .view-checkout-btn:hover{
    background:$buttonBlueHover;
  }
  .cart-item-box {
    overflow-y: scroll;
    max-height: 400px;
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
