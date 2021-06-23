<template>
  <div v-loading="loading" class="pageCoat">
    <div class="pageContCoat">
      <checkout-header :index="0"></checkout-header>
      <div class="f-container">
        <!-- <div class="noShop" v-if="cardShop.length == 0">
          <p>{{ $t("cart.currentlyEmpty") }}</p>
          <nuxt-link to="/">
            <button>{{ $t("cart.RETURNTOSHOP") }}</button>
          </nuxt-link>
        </div>-->
        <!-- v-if="cardShop.length != 0" -->

        <div class="cartShopCoat">
          <el-row :gutter="0" class="cartCont">
            <el-col :lg="16" :sm="24" :xs="24">
              <div class="shopList">
                <cart-shops :totalPrice="totalPrice" :delivery_price_limit="delivery_price_limit" :cardsArr="cardShop" @reloadCart="reloadCart"></cart-shops>
                <!-- <nuxt-link to="/">
                  <div class="continueShoping">
                    <button>{{ $t("cart.Continue") }}</button>
                  </div>
                </nuxt-link>-->
              </div>
              <div class="mayLikeCoat">
                <may-like :types="3"></may-like>
              </div>
            </el-col>
            <el-col :lg="8" :sm="24" :xs="24">
              <cart-apply
                class="cartApplyClass"
                :cardsArr="cardShop"
                :totalPrice="totalPrice"
                :delivery_price_limit="delivery_price_limit"
                :addressDefault="addressDefault"
                @getCartIds="getCartIds"
                @getCartInfo="getCartInfo"
              ></cart-apply>
            </el-col>
          </el-row>
        </div>
        <div class="recommendCoat">
          <!--				<p class="recommendTil">{{ $t("cart.MayLike") }}</p>-->
          <el-row :gutter="20">
            <el-col :lg="6" :sm="8" :xs="12" v-for="(item, index) in recommendArr" :key="index">
              <shop-card class="shopItem" :shopObj="item"></shop-card>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <!-- <newuser-masking></newuser-masking> -->
    <f-footer></f-footer>
    <guest-dialog
      :type="1"
      :cartIds="cartIds"
      :sku_id="skuIds"
      :subtotal="subtotal"
      :guestDialogVisible="$store.getters.getGuestDialogVisible"
    ></guest-dialog>
  </div>
</template>

<script>
import fFooter from "@/components/footer/f-footer";
import shopCard from "@/components/shopCard/shopCard";
import checkoutHeader from "@/components/checkoutHeader/checkoutHeader";
import cartShops from "@/components/cart/cartShops";
import cartApply from "@/components/cart/cartApply";
import mayLike from "@/components/mayLike";
// import newuserMasking from "@/components/newuserMasking";
import guestDialog from "@/components/guestDialog";
export default {
  name: "cart",
  components: {
    fFooter,
    cartShops,
    cartApply,
    shopCard,
    checkoutHeader,
    mayLike,
    // newuserMasking,
    guestDialog
  },
  data() {
    return {
      loadShow: false,
      isNowState: false, //判断是否正在请求数据当中
      isDataState: false, //数据是否已请求完毕
      isScroll: true, //判断是否已经触发函数
      loading: false,
      cardShop: [],
      addressDefault: null,
      recommendArr: [],
      pages: 1,
      cartIds: "",
      skuIds: '',
      subtotal: 0,
      delivery_price_limit: "" //国家对应的运费规则
    };
  },
  mounted() {
    this.buryingPoint.pageView();
    this.getCartData();
  },
  methods: {
    getCartIds(cartIds){
      this.cartIds = cartIds;
    },
    getCartInfo(data){
      let { skuIds, subtotal} = data;
      this.skuIds = skuIds;
      this.subtotal = subtotal;
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
    },
    getCartData() {
      let thif = this;
      this.loading = true;
      this.$apis
        .getCart({}, this.$store.getters.getApiHeader)
        .then(res => {
          thif.loading = false;
          if (res.status == 1) {
            this.delivery_price_limit = res.data.delivery_price_limit;
            for (let i = 0; i < res.data.items.length; i++) {
              res.data.items[i].optionState = false;
            }
            thif.cardShop = res.data.items;
          } else {
            thif.common.msgBox(thif, res.msg, 3);
          }
        })
        .catch(err => {
          thif.loading = false;
          console.log(err);
        });
    },
    getRecommend() {
      let thif = this;
      thif.loadShow = true;
      thif.isNowState = true;
      this.$apis
        .mayLikeShop(
          { page: 1, per_page: 12, type: 3 },
          this.$store.getters.getApiHeader
        )
        .then(res => {
          if (res.status == 1) {
            thif.isScroll = true;
            thif.isNowState = false;
            thif.loadShow = false;
            thif.recommendArr.push(...res.data.items);
            if (res.data.items.length == 0) {
              thif.isDataState = true;
            }
            thif.pages++;
          }
        })
        .catch(error => {
          thif.isScroll = true;
          thif.isNowState = false;
          thif.loadShow = false;
          console.log(error);
        });
    },
    reloadCart() {
      this.getCartData();
    }
  },
  computed: {
    totalPrice() {
      let totalMoney = 0;
      for (let i = 0; i < this.cardShop.length; i++) {
        if (this.cardShop[i].optionState) {
          totalMoney += Number(this.cardShop[i].subtotal);
        }
      }
      return totalMoney;
    }
  }
};
</script>

<style lang="scss" scoped>
.pageCoat {
  // background-color: $pageBjColor;
  overflow: hidden;
}
.fHeaderCoat {
  background-color: #fff;
}
.pageContCoat {
  // max-width: 14.8rem;
  max-width: 1200px;
  margin: .88rem auto 0;
}
.f-container {
  width: 100% !important;
  min-width: 100%;
  margin: 0;
}
.cartCont {
  width: 100%;
}
.Breadcrumb {
  font-size: 24px;
  text-align: center;
  padding: 15px 0;
  margin-top: 20px;
  span,
  a {
    color: #ccc;
  }
  .BreadcrumbActive {
    color: #111;
  }
}
.cartShopCoat {
  // padding: 30px 15px;
  width: 100%;
  display: flex;
}
.continueShoping {
  padding: 15px 0;
  display: flex;
  margin-left: 30px;
  button {
    font-size: 14px;
    font-weight: bold;
    color: $bjColor;
    height: 35px;
    border: 2px solid $bjColor;
    padding: 0 16px;
    background-color: #fff;
  }
}
/deep/ .el-row {
  display: flex;
}
.noShop {
  text-align: center;
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  // min-height: 500px;
  p {
    color: #777;
    margin-bottom: 22px;
    font-size: 16px;
  }
  button {
    background-color: $bjColor;
    height: 40px;
    border: 0;
    padding: 0 18px;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
  }
}
.cartFooter {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}
.recommendCoat {
  padding-top: 20px;
  margin-top: 20px;
  margin-bottom: 30px;

  position: relative;
  .recommendTil {
    margin: 0px auto 20px;
    font-size: 20px;
    color: #111;
    font-weight: bold;
    border-bottom: 1px solid #ddd;
    padding-bottom: 4px;
  }

  /deep/ .el-row {
    flex-wrap: wrap;
  }
  .shopItem {
    padding-bottom: 32px;
    margin: auto;
  }
}
.shopList {
  background-color: #fff;
  margin-right: 10px;
}
.cartApplyClass {
  background-color: #fff;
}
.mayLikeCoat {
  background-color: #fff;
  margin-right: 10px;
  padding: 0 20px 24px;
}
</style>
