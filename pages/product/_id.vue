<template>
  <div v-loading="loading">
    <div class="f-container">
      <el-breadcrumb
        class="Breadcrumb"
        separator="/"
      >
        <el-breadcrumb-item :to="{ path: '/' }">{{ $t("common.HOME") }}</el-breadcrumb-item>
        <el-breadcrumb-item
          v-for="(v,i) in breadcrumb"
          :key="'breadcrumb'+i"
        >
          <a @click="goParentNav(v,i)">{{v.category_name}}</a>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <div class="bannerCoat">
        <!-- 商品图片 -->
        <shop-banner
          @selectedImg="selectedImg"
          :selectedImg="shopImg"
          :imgArr="imgArr"
          :huiNum="shopData.discount"
          :shopData="shopData"
          v-if="shopImg"
        ></shop-banner>
        <!-- 商品参数 -->
        <div class="shopRight">
          <p
            class="til"
            v-html="shopData.goods_name"
          ></p>
          <!-- 显示商品评分 -->
          <div class="starShowCoat">
            <el-rate
              :value="Number(shopData.comment_rating)"
              disabled
              text-color="#FF6263"
              :colors="starColor"
              disabled-void-color="#d8d9dc"
              score-template="{ value }"
              v-if="Number(shopData.comment_rating)"
            ></el-rate>
            <!-- <div
              v-if="shopData.total_sales"
              class="total_sales"
            >{{shopData.total_sales}}&nbsp;{{ $t("shopDetail.SOLD") }}</div> -->
          </div>
          <!-- 非划线价格区间 -->
          <div
            class="PriceRange"
            v-show="!priceShow"
          >
            {{ $store.getters.getCurrencySymbol }}{{ minPrice }}
            <span v-if="maxPrice != minPrice">-</span>
            {{
            maxPrice == minPrice
            ? ""
            : $store.getters.getCurrencySymbol
            }}{{ maxPrice == minPrice ? "" : maxPrice }}
          </div>
          <!-- 划线价格区间 -->
          <div
            class="priceRangeBeforeDiscount"
            v-show="!priceShow && minPrice != minPrice_"
          >
            {{ $store.getters.getCurrencySymbol
            }}{{ minPrice_ }}
            <span v-if="maxPrice_ != minPrice_">&nbsp;-&nbsp;</span>
            {{
            maxPrice_ == minPrice_
            ? ""
            : $store.getters.getCurrencySymbol
            }}{{ maxPrice_ == minPrice_ ? "" : maxPrice_ }}
          </div>
          <!-- 价格 -->
          <div
            class="priceCoat"
            v-show="priceShow"
          >
            <p class="nowPrice">
              {{ $store.getters.getCurrencySymbol
              }}{{ shop_price }}
            </p>
            <p
              class="yuanPrice"
              v-if="reference_price != shop_price"
            >
              {{ $store.getters.getCurrencySymbol
              }}{{ reference_price }}
            </p>
          </div>
          <!-- 万圣节特别文案 -->
          <div
            class="halloweenTag"
            v-if="this.common.isHalloweenTag(shopData.goods_id)"
          >
            <img
              class="halloweenTagImg"
              src="~static/images/icon/notice.png"
              alt=""
            >
            <p class="halloweenTil">{{ $t("shopDetail.halloweenTil") }}</p>
          </div>
          <!-- 英国邮费特别文案 -->
          <!-- <div
            class="halloweenTag"
            v-if="$store.getters.getCountry == 'United Kingdom (UK)' && !!delivery_price_limit"
          >
            <img
              class="halloweenTagImg"
              src="~static/images/icon/notice.png"
              alt=""
            >
            <p class="halloweenTil">{{ $t("shopDetail.UKShippingTitle") }}</p>
          </div> -->
          <!-- 商品规格 -->
          <div class="guigeCoat">
            <div
              class="guigeList"
              v-for="(item,index) in attributes"
              :key="'detailgg'+index"
            >
              <div class="guige-box">
                <p :class="Object.keys(attributes).length == 1 ? 'guigeTilOnly' : 'guigeTil'">{{index}}</p>
                <div
                  ref="guigeBox"
                  :class="!seeMore ? 'guigeItemCoat guigeItemCoatOverHidden' : 'guigeItemCoat'"
                >
                  <span
                    v-for="(itemSon,indexSon) in item"
                    :class="itemSon.status?'shopNoStock':''"
                    :key="'detailgi'+indexSon"
                  >
                    <p
                      class="guigeItem"
                      :class="item.selectText==itemSon?'optionItemActive':''"
                      v-if="indexSon!='childrenShow'&&indexSon!='selectText'"
                      @click="cliclOption(index,itemSon,indexSon)"
                    >{{itemSon.name}}</p>
                  </span>
                </div>
              </div>
              <!-- <p class="seeMore" @click="seeMoreFn(v)">
                <img src="~static/images/icon/seeMore.png" alt="">See More
              </p>-->
            </div>
          </div>
          <p
            v-show="!seeMore && noShowSeeMore"
            class="seeMore"
            @click="seeMoreFn()"
          >
            <img
              src="~static/images/icon/seeMore.png"
              alt=""
            >
            {{ $t("shopDetail.SeeMore") }}
          </p>
          <!-- <p v-show="seeMore && noShowSeeMore" class="seeMore" @click="seeLessFn()">
            <img src="~static/images/icon/seeMore.png" alt="">See Less
          </p>-->
          <!-- 购物车数量操作 -->
          <div class="quantityCoat">
            <label class="quantity">{{ $t("shopDetail.Quantity") }}</label>
            <div class="input-box">
              <el-input-number
                v-model="shopNum"
                @change="quantityChange"
                :min="1"
              ></el-input-number>
            </div>
          </div>
          <!-- shopNoContinue -->
          <div
            class="shopNoContinue"
            v-show="!shopContinue"
          >{{$t("shopDetail.noContinue")}}</div>
          <!-- noStock -->
          <div
            class="noStock"
            v-show="!noStock"
          >{{ $t("shopDetail.noStock") }}</div>
          <!-- availableCountry -->
          <!-- <div class="shopDisable" v-show="!availableCountry">{{ $t("shopDetail.available") }}</div> -->
          <!-- 添加购物车控件 -->
          <div class="cartCoat">
            <!-- 国家可用、商品价格显示出来、有库存 三者缺一不可 -->
            <el-popover
              placement="bottom"
              popper-class="addToCart-popover"
              :title="addCartItems + ' item(s) added to cart'"
              width="400"
              trigger="manual"
              v-model="cartPopoverVisable"
            >
              <div
                @click="closePopover()"
                class="popover-close-btn"
              >×</div>
              <div class="addToCart-popover-operation">
                <el-button
                  class="view-bag"
                  @click="goCart()"
                >{{ $t("shopDetail.VIEWCART") }}</el-button>
                <el-button
                  :loading="checkoutNowLoading"
                  @click="checkoutNow()"
                  class="checkout-now"
                >{{ $t("shopDetail.CHECKOUTNOW") }}</el-button>
              </div>
              <el-button
                :loading="addToWishListLoading"
                @click="addToWishList(shopId)"
                slot="reference"
                class="addToWishList"
              >
                <img
                  v-show="!addToWishListLoading"
                  :src="is_favorite != 0 ? heratImg[0] : heratImg[1]"
                  class="heart"
                  alt=""
                >
                {{ $t("shopDetail.wishList") }}
              </el-button>
            </el-popover>
            <el-button
              :loading="addCartLoading"
              @click="addCart()"
              slot="reference"
              class="addToCart"
            >{{ $t("shopDetail.addCart") }}</el-button>
            <!-- buyNow -->
            <!-- <el-button
              :loading="buyNowLoading"
              class="buyNow"
              @click="buyNow()"
            >{{ $t("shopDetail.buyNow") }}</el-button> -->
          </div>
          <!-- Buy more,save more -->
          <table
            class="buymore"
            border="6"
            width="518px"
            cellspacing="0"
            cellpadding="0"
            v-if="buyMoreOffList.length"
          >
            <caption><img
                src="~static/images/icon/buy_more_star.png"
                alt=""
              > Buy more,save more</caption>
            <tbody>
              <tr v-for="(v,k) in buyMoreOffList" :key="'buyMoreOffItem'+k">
                <td>Buy {{v.buyQuanity}}</td>
                <td>{{$store.getters.getCurrencySymbol}}{{((shop_price ? shop_price : minPrice) * Number(v.off)).toFixed(2)}} {{$store.getters.getCurrency}} each</td>
                <td @click="buyNow(v.buyQuanity)">{{v.offSign}} off ></td>
              </tr>
            </tbody>
          </table>
          <!-- :class="refundPolicyIsDown ? 'refundPolicy refundPolicy-down' : 'refundPolicy refundPolicy-up'" -->
          <div :class="cartPopoverVisable ? 'refundPolicy refundPolicy-down' : 'refundPolicy refundPolicy-up'">
            <!-- <h4 class="refundTil">{{ $t("shopDetail.RETURN") }}</h4> -->
            <div class="refundItem">
              <img src="~static/images/icon/delivery.png">
              <span>
                <strong>{{ $t("shopDetail.Delivery") }}</strong>
                <!-- {{ $t("shopDetail.Full1") }} -->
              </span>
            </div>
            <div
              v-if="$store.getters.getCountry == 'United Kingdom (UK)'"
              class="refundItem-dec-1"
            >
              {{ $t("shopDetail.UKShipping") }}
            </div>
            <div
              v-else
              class="refundItem-dec-1"
            >{{ $t("shopDetail.FreeShipping") }}</div>
            <div class="refundItem">
              <img
                class="refunf-customer-img"
                src="~static/images/icon/refund.png"
              >
              <span>
                <strong>{{ $t("shopDetail.WorryFreeShopping") }}</strong>
              </span>
            </div>
            <div class="refundItem-dec-3">{{ $t("shopDetail.FullRefund") }}</div>
            <div class="refundItem-dec-4">{{ $t("shopDetail.FullPartialRefund") }}</div>
            <div class="refundItem">
              <img
                class="refunf-customer-img"
                src="~static/images/icon/customer.png"
              >
              <span>
                <strong>{{ $t("shopDetail.CustomerServices") }}</strong>
              </span>
            </div>
            <div class="refundItem-dec-5">{{ $t("shopDetail.CustomerServiceOperates") }}</div>
            <div class="refundItem-dec-6">{{ $t("shopDetail.AnswerAnyQuestions") }}</div>
          </div>
        </div>
      </div>
      <div class="cutCoat">
        <div class="cutItem">
          <p
            :class="cutActiveName == item ? 'cutItemActive' : ''"
            v-for="(item, index) in cutArr"
            :key="'bb' + index"
            @click="cut(item, index)"
            v-if="index!=2 || (index==2&&shopData.comment_count!=0)"
          >{{ item }}</p>
        </div>
        <div class="cutView">
          <div
            class="Description"
            v-if="cutActiveName == 'DESCRIPTION'"
            v-html="shopData.goods_desc"
          ></div>
          <div
            class="SHIPPING"
            v-show="cutActiveName == 'SHIPPING & RETURNS'"
          >
            <h4>{{$t("shopDetail.Returns")}}</h4>
            <p>
              <b style="color: rgb(216,57,49);font-weight: bold;font-size: 14px;">
                {{$t("shopDetail.ReturnsNoUK")}}
              </b>
            </p>
            <p>
              {{$t("shopDetail.Returns2")}}
              <strong>{{$t("shopDetail.Returns3")}}&nbsp;</strong>
              {{$t("shopDetail.Returns4")}}
            </p>
            <p>{{$t("shopDetail.Returns5")}}</p>
            <p>
              {{$t("shopDetail.Returns6")}}
              <strong>{{$t("shopDetail.Returns7")}}</strong>
              . {{$t("shopDetail.Returns8")}}
            </p>
            <p>{{$t("shopDetail.Returns9")}}</p>
            <p>{{$t("shopDetail.Returns10")}}</p>
            <p>
              {{$t("shopDetail.Returns11")}}
              <a href="/footPage/Delivery">{{$t("shopDetail.Returns12")}}</a>.
            </p>
            <h4 style="margin-top: 20px;">{{$t("shopDetail.Shipping")}}</h4>
            <p>{{$t("shopDetail.Shipping1")}}</p>
            <p>
              {{$t("shopDetail.Shipping2")}}
              <a href="mailto:support@frissonlife.com">support@frissonlife.com</a>
              &nbsp;{{$t("shopDetail.Shipping3")}}
            </p>
            <p>
              {{$t("shopDetail.Returns11")}}
              <a href="/footPage/Arrange">{{$t("shopDetail.Shipping5")}}</a>
              <strong>.</strong>
            </p>
          </div>
          <div
            class="Reviews"
            v-if="shopData.comment_count!=0"
            v-show="cutActiveName == 'CUSTOMER REVIEWS'"
          >
            <div v-if="shopId">
              <reviews
                :comment_rating="Number(shopData.comment_rating) "
                :shopId="shopId"
                :shopTil="shopData.goods_name"
                :countNumber="shopData.comment_count"
              ></reviews>
            </div>
          </div>
        </div>
      </div>
      <!-- combinationProducts -->
      <!-- <combination-products
        v-if="$store.getters.getCombination"
        :combination="$store.getters.getCombination"
      ></combination-products> -->
      <combination
        :goods_id="shopId"
        v-if="$store.getters.getCombination"
        :shopCombination="$store.getters.getCombination"
      ></combination>
      <!-- YOU MAY ALSO LIKE -->
      <may-like
        :types="2"
        :shopId="shopId"
      ></may-like>
    </div>
    <!-- <newuser-masking></newuser-masking> -->
    <guest-dialog
      :type="type"
      :cartIds="cart_id"
      :sku_id="sku_id"
      :subtotal="subtotal"
      :goods_id="shopId"
      :quantity="shopNum"
      @noStockFn="noStockFn"
      :guestDialogVisible="$store.getters.getGuestDialogVisible"
    ></guest-dialog>
    <f-footer></f-footer>
  </div>
</template>

<script>
import jsCookie from "@/utils/js-cookie";
import fFooter from "@/components/footer/f-footer";
import shopBanner from "@/components/shopDetail/shopBanner";
import reviews from "@/components/shopDetail/reviews";
import mayLike from "@/components/mayLike";
import cartListDrawer from "@/components/cart/cartListDrawer";
// import newuserMasking from "@/components/newuserMasking";
import guestDialog from "@/components/guestDialog";
// import combinationProducts from "@/components/combinationProducts";
import combination from "@/components/combination";
import initData from './initData'
function getShopId(str) {
  const reg1 = /\.html/g
  if (reg1.test(str)) {
    const reg = /_(\S*)\.html/
    return str.match(reg)[1]
  }
  return str
}
let isServer = true;
export default {
  name: "product",
  head() {
    return {
      title: this.shopName,
      meta: [
        {
          property: "og:title",
          name: "description",
          content: this.shopName
        },
        {
          property: "og:image",
          content: this.imgArr.length ? this.imgArr[0].image : ""
        },
        {
          property: "og:price:amount",
          content: this.shop_price || this.minPrice
        },
        {
          property: "og:price:currency",
          content: this.countries
        },
        {
          property: "product:retailer_item_id",
          content: this.shopId
        },
        {
          property: "product:locale",
          content: "en_US"
        },
        {
          property: "product:price:amount",
          content: this.shop_price || this.minPrice
        },
        {
          property: "product:price:currency",
          content: this.countries
        },
        {
          property: "product:brand",
          content: 'Frisson'
        },
        {
          property: "product:availability",
          content: 'in stock'
        },
        {
          property: "product:condition",
          content: 'new'
        },
        // <!-- twitter分享 -->
        {
          name: "twitter:site",
          content: this.share_link
        },
        {
          name: "twitter:card",
          content: "summary_large_image"
        },
        {
          name: "twitter:description",
          content: this.shopName
        },
        {
          name: "twitter:title",
          content: this.shopName
        },
        {
          name: "twitter:image",
          content: this.imgArr.length ? this.imgArr[0].image : ""
        },
        {
          property: "twitter:url",
          content: this.share_link
        },
        // <!-- facebook分享 -->
        {
          property: "og:url",
          content: this.share_link
        },
        {
          property: "og:type",
          content: "website"
        },
        {
          property: "og:description",
          content: this.shopName
        },
        {
          property: "og:title",
          content: this.shopName
        },
        {
          property: "og:image",
          content: this.imgArr.length ? this.imgArr[0].image : ""
        }
      ]
    };
  },
  components: {
    fFooter,
    shopBanner,
    reviews,
    mayLike,
    cartListDrawer,
    // newuserMasking,
    guestDialog,
    combination
  },
  data() {
    return initData.bind(this)()
  },
  destroyed() {
    this.combination = "";
    this.$store.dispatch("actCombination", "");
  },
  created() {
    // hack方法，至于为什么服务端页面渲染后，再进行客户端渲染，服务端数据没有销毁，有待思考！！！
      if(!isServer) {
        Object.assign(this.$data, initData.bind(this)())
      }
  },
  //mounted生命周期里获取window对象
  mounted() {
    this.share_link = window.location.href;
    this.buryingPoint.pageView();
    // console.log(this.shopName, "isServer");
    //从列表点进去非server端走的client
    if (!isServer) {
      console.log("mounted not server");
      let { id } = this.$route.params;
      this.shopId = getShopId(id)
      this.firstGetData(this.shopId);
    } else {
      this.buryingPoint.viewContent(getShopId(this.$route.params.id), this.shopName);
      this.$nextTick(() => {
        if (!this.$refs.guigeBox) {
          // console.log('没有规格')
          this.noShowSeeMore = false;
        } else {
          // console.log('有规格')
          let guigeBoxHeight = this.$refs.guigeBox[0].clientHeight;
          if (guigeBoxHeight >= 202) {
            this.seeMore = false;
          } else {
            this.noShowSeeMore = false;
          }
        }
      });
    }
  },
  async asyncData({ params, store, app, error, req, res }) {
    if (process.server) {
      console.log("server");
      try {
        let fetchData = {};
        const shopDetail = await app.$apis.getShopDetail(
          { id: getShopId(params.id) },
          store.getters.getApiHeader
        );
        let shopData = shopDetail.data.item;
        let {
          goods_name,
          breadcrumb,
          images,
          goods_id,
          stock_num,
          attributes,
          variations,
          sku_id,
          reference_price,
          shop_price,
          combination,
          comment_rating,
          delivery_price_limit,
          is_favorite,
          type,
          min_shop_price,
          buy_off_list
        } = shopData;
        if (shopDetail.status == 1) {
          fetchData.shopNum = 1;
          fetchData.shopName = goods_name;
          fetchData.breadcrumb = breadcrumb;
          fetchData.buyMoreOffList = buy_off_list;
          fetchData.imgArr = images;
          fetchData.shopId = getShopId(params.id);
          fetchData.shopImg = fetchData.imgArr[0];
          fetchData.in_stock = stock_num != 0;
          fetchData.combination = combination;
          fetchData.is_favorite = is_favorite;
          store.dispatch("actCombination", combination);
          fetchData.countries = store.getters.getCurrency;
          fetchData.delivery_price_limit = delivery_price_limit;

          if (attributes) {
            fetchData.in_stock = false;
            fetchData.chooseState = false;
            // 显示价格区间
            fetchData.priceShow = false;
            fetchData.cutArr = [
              app.i18n.t("shopDetail.jsMsg.Description"),
              app.i18n.t("shopDetail.jsMsg.ShippingReturns"),
              app.i18n.t("shopDetail.jsMsg.Reviews")
            ];
            fetchData.selectKeyArr = [];
            for (let key in attributes) {
              attributes[key].selectText = app.i18n.t(
                "shopDetail.jsMsg.Choose"
              );
              attributes[key].childrenShow = false;
              fetchData.selectKeyArr.push({ keys: key, value: "" });
            }
            // 规格数组
            let canshuNum = 0; // 记录参数种类
            let attrObj = {};
            for (let attrKey in attributes) {
              canshuNum++;
              attrObj[attrKey] = {};
              for (let itemKey in attributes[attrKey]) {
                attrObj[attrKey][itemKey] = {
                  name: attributes[attrKey][itemKey],
                  status: false
                };
              }
            }
            // 只有一种参数的时候查询库存状态
            if (canshuNum == 1) {
              for (let attrKey in attrObj) {
                for (let itemKey in attrObj[attrKey]) {
                  if (itemKey != "selectText" && itemKey != "childrenShow") {
                    if (!variations[itemKey].stock_num) {
                      attrObj[attrKey][itemKey].status = true;
                    }
                  }
                }
              }
            }
            fetchData.attributes = attrObj;
          } else {
            fetchData.stockNum = stock_num;
            fetchData.sku_id = sku_id;
            fetchData.reference_price = reference_price;
            fetchData.shop_price = shop_price;
          }

          comment_rating = Number(comment_rating);
          if (variations) {
            fetchData.variations = variations;
            let salePriceIntervalArr = [];
            let regularPriceIntervalArr = [];
            for (let key in variations) {
              salePriceIntervalArr.push(variations[key].shop_price);
              regularPriceIntervalArr.push(variations[key].reference_price);
            }
            let newSalePriceIntervalArr = [...new Set(salePriceIntervalArr)];
            let newRegularPriceIntervalArr = [
              ...new Set(regularPriceIntervalArr)
            ];
            // fetchData.imgArr = [images[0], ...images];
            fetchData.imgArr = images;
            fetchData.minPrice = Math.min.apply(null, newSalePriceIntervalArr); //非划线价区间的最低价
            fetchData.maxPrice = Math.max.apply(null, newSalePriceIntervalArr); //非划线价区间的最高价
            fetchData.minPrice_ = Math.min.apply(
              null,
              newRegularPriceIntervalArr
            ); //划线价区间的最低价
            fetchData.maxPrice_ = Math.max.apply(
              null,
              newRegularPriceIntervalArr
            ); //划线价区间的最高价
          }
          if (type == "variable") {
            fetchData.wishListPrice = min_shop_price;
          } else {
            fetchData.wishListPrice = shop_price;
          }
        }
        fetchData.shopData = shopData;
        return fetchData;
      } catch (error) {
        console.log(error);
        return {};
      }
    } else {
      console.log("not server");
      isServer = false;
    }
  },
  methods: {
    // addToCartPopoverShow() {
    //   this.refundPolicyIsDown = true;
    // },
    // addToCartPopoverClose(a, b) {
    //   this.refundPolicyIsDown = false;
    // },
    goHome() {
      this.$router.push({
        path: "/"
      });
    },
    noStockFn(v) {
      // console.log(v,'vvvvvvvvvvv')
      this.noStock = v;
    },
    selectedImg(img) {
      this.shopImg = img;
    },
    //列表进入非server端走client接口
    async firstGetData(id) {
      this.loading = true;
      const shopDetail = await this.$apis.getShopDetail(
        { id },
        this.$store.getters.getApiHeader
      );
      let shopData = shopDetail.data.item;
      let {
        goods_name,
        breadcrumb,
        images,
        goods_id,
        stock_num,
        attributes,
        variations,
        sku_id,
        reference_price,
        shop_price,
        combination,
        is_favorite,
        comment_rating,
        delivery_price_limit,
        type,
        min_shop_price,
        buy_off_list
      } = shopData;
      if (shopDetail.status == 1) {
        this.loading = false;
        this.shopNum = 1;
        this.shopName = goods_name;
        this.buryingPoint.viewContent(id, goods_name);
        this.breadcrumb = breadcrumb;
        this.buyMoreOffList = buy_off_list;
        this.imgArr = images;
        this.shopImg = images[0];
        this.combination = combination;
        this.is_favorite = is_favorite;
        this.$store.dispatch("actCombination", combination);
        this.delivery_price_limit = delivery_price_limit;
        this.in_stock = stock_num != 0;
        this.countries = this.$store.getters.getCurrency;

        if (attributes) {
          this.in_stock = false;
          this.chooseState = false;
          // 显示价格区间
          this.priceShow = false;
          this.cutArr = [
            this.$i18n.t("shopDetail.jsMsg.Description"),
            this.$i18n.t("shopDetail.jsMsg.ShippingReturns"),
            this.$i18n.t("shopDetail.jsMsg.Reviews")
          ];
          this.selectKeyArr = [];
          for (let key in attributes) {
            attributes[key].selectText = this.$i18n.t(
              "shopDetail.jsMsg.Choose"
            );
            attributes[key].childrenShow = false;
            this.selectKeyArr.push({ keys: key, value: "" });
          }
          // 规格数组
          let canshuNum = 0; // 记录参数种类
          let attrObj = {};
          for (let attrKey in attributes) {
            canshuNum++;
            attrObj[attrKey] = {};
            for (let itemKey in attributes[attrKey]) {
              attrObj[attrKey][itemKey] = {
                name: attributes[attrKey][itemKey],
                status: false
              };
            }
          }
          // 只有一种参数的时候查询库存状态
          if (canshuNum == 1) {
            for (let attrKey in attrObj) {
              for (let itemKey in attrObj[attrKey]) {
                if (itemKey != "selectText" && itemKey != "childrenShow") {
                  if (!variations[itemKey].stock_num) {
                    attrObj[attrKey][itemKey].status = true;
                  }
                }
              }
            }
          }
          this.attributes = attrObj;
        } else {
          this.stockNum = stock_num;
          this.sku_id = sku_id;
          this.reference_price = reference_price;
          this.shop_price = shop_price;
        }
        comment_rating = Number(comment_rating);
        if (variations) {
          this.variations = variations;
          // this.imgArr = [images[0], ...images];
          this.imgArr = images;
          let salePriceIntervalArr = [];
          let regularPriceIntervalArr = [];
          for (let key in variations) {
            salePriceIntervalArr.push(variations[key].shop_price);
            regularPriceIntervalArr.push(variations[key].reference_price);
          }
          let newSalePriceIntervalArr = [...new Set(salePriceIntervalArr)];
          let newRegularPriceIntervalArr = [
            ...new Set(regularPriceIntervalArr)
          ];
          this.minPrice = Math.min.apply(null, newSalePriceIntervalArr); //非划线价区间的最低价
          this.maxPrice = Math.max.apply(null, newSalePriceIntervalArr); //非划线价区间的最高价
          this.minPrice_ = Math.min.apply(null, newRegularPriceIntervalArr); //划线价区间的最低价
          this.maxPrice_ = Math.max.apply(null, newRegularPriceIntervalArr); //划线价区间的最高价
          this.$nextTick(() => {
            if (!this.$refs.guigeBox) {
              console.log("没有规格");
              this.noShowSeeMore = false;
            } else {
              console.log("有规格");
              let guigeBoxHeight = this.$refs.guigeBox[0].clientHeight;
              if (guigeBoxHeight >= 202) {
                this.seeMore = false;
              } else {
                this.noShowSeeMore = false;
              }
            }
          });
        } else {
          this.variations = "";
          this.minPrice = "";
          this.maxPrice = "";
          this.minPrice_ = "";
          this.maxPrice_ = "";
          this.attributes = null;
          this.priceShow = true;
        }
        if (type == "variable") {
          this.wishListPrice = min_shop_price;
        } else {
          this.wishListPrice = shop_price;
        }
        this.shopData = shopData;
      } else {
        this.loading = false;
      }
    },
    //面包屑
    goParentNav(v, i) {
      if (i == this.shopData.breadcrumb.length - 1) {
        return;
      }
      let parentNavName =
        i - 1 >= 0
          ? this.shopData.breadcrumb[i - 1].category_name
          : this.$t("common.HOME");
      let pid = i - 1 >= 0 ? this.shopData.breadcrumb[i - 1].category_id : "";
      let navName = v.category_name;
      console.log(parentNavName, navName, v);
      this.$router.push({
        path: "/categories",
        query: {
          category: v.category_id,
          parentNavName,
          navName,
          pid
        }
      });
    },
    openRefundPolicy() {
      this.refundPolicyDialogVisible = true;
    },
    cut(item, index) {
      this.cutActive = index;
      this.cutActiveName = item;
    },
    //关闭添加购物车成功的气泡框
    closePopover() {
      this.cartPopoverVisable = false;
    },
    //购物车
    goCart() {
      this.$store.dispatch("cartDialogVisible", false);
      this.$router.push({
        path: "/cart"
      });
    },
    //checkoutNow
    checkoutNow() {
      this.type = 1;
      if (!this.$store.getters.getLoginToken) {
        this.$store.dispatch("actGuestDialogVisible", true);
        this.$store.dispatch("cartDialogVisible", false);
        jsCookie.set("guest", true, {
          expires: 7,
          path: "/"
        });
        return;
      }
      this.checkoutNowLoading = true;
      this.$store.dispatch("cartDialogVisible", false);
      this.checkoutStepOne(this.cart_id, this.subtotal, this.skuIds);
    },
    checkoutStepOne(str, subtotal, items) {
      let buryObj = {
        value: Number(subtotal),
        currency: String(this.$store.getters.getApiHeader.currency),
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
          if (res.status == 1) {
            this.checkoutNowLoading = false;
            // thif.delShop(str);//checkoutStepOne之后将购买添加到购物车的商品从购物车删除
            this.$router.push({
              path: "/checkoutDetail"
            });
          } else if (res.status == 5000) {
            this.common.msgBox(this, "Please login", 2);
            this.$router.push({ path: "/login" });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //buyNow
    buyNow(buyMoreQuantity) {
      this.type = 2;
      if (this.shopData.type == "variable" && !this.canShopContinue) {
        this.shopContinue = false;
        return;
      }
      if (!this.$store.getters.getLoginToken) {
        this.shopContinue = true;
        console.log(buyMoreQuantity,'buyMoreQuantity')
        this.shopNum = buyMoreQuantity;
        this.$store.dispatch("actGuestDialogVisible", true);
        jsCookie.set("guest", true, {
          expires: 7,
          path: "/"
        });
        return;
      }
      this.buryingPoint.BuyNow(
        this.shopId,
        "buy_now",
        this.$store.getters.getApiHeader.currency,
        this.shop_price,
        this.shopName
      );
      this.shopContinue = true;
      this.buyNowLoading = true;
      this.$apis
        .buyNow(
          {
            quantity: buyMoreQuantity,
            goods_id: getShopId(this.$route.params.id),
            sku_id: this.sku_id
          },
          this.$store.getters.getApiHeader
        )
        .then(res => {
          this.buyNowLoading = false;
          if (res.status == 1) {
            // let getNum = this.$store.getters.getCartNum;
            // thif.$store.dispatch("actCartNum", getNum + this.shopNum);
            this.$router.push({
              path: "/checkoutDetail"
            });
          } else if (res.status == 14001) {
            this.noStock = false;
          }
        })
        .catch(err => {
          this.buyNowLoading = false;
          console.log(err);
        });
    },
    //添加到购物车
    addCart() {
      let thif = this;
      if (this.shopData.type == "variable" && !this.canShopContinue) {
        console.log("++++++++");
        this.shopContinue = false;
        return;
      }
      this.shopContinue = true;
      this.addCartLoading = true;
      this.$apis
        .addCart(
          {
            quantity: this.shopNum,
            goods_id: getShopId(this.$route.params.id),
            sku_id: this.sku_id
          },
          this.$store.getters.getApiHeader
        )
        .then(res => {
          thif.addCartLoading = false;
          if (res.status == 1) {
            console.log(this.shopNum, "this.shopNum");
            let getNum = this.$store.getters.getCartNum;
            thif.$store.dispatch(
              "actCartNum",
              Number(getNum) + Number(this.shopNum)
            );
            thif.cartPopoverVisable = true;
            thif.noStock = true;
            let data = res.data.item;
            this.cart_id = data.cart_id;
            this.subtotal = data.subtotal;
            this.skuIds = [data.sku_id];
            this.addCartItems = Number(data.quantity);
            // let total = 0;
            // let ids = [];
            // for (let index = 0; index < data.length; index++) {
            //   const obj = data[index];
            //   items.push({
            //     id: String(obj.goods_id),
            //     name: String(obj.goods_name),
            //     price: Number(obj.shop_price),
            //     quantity: Number(obj.quantity),
            //   })
            //   ids.push(String(obj.goods_id));
            //   total += Number(obj.shop_price) * Number(obj.quantity);
            // }
            let items = [
              {
                id: String(data.goods_id),
                name: String(data.goods_name),
                price: Number(data.shop_price),
                quantity: Number(data.quantity)
              }
            ];
            thif.buryingPoint.addToCart(
              String(data.goods_id),
              this.$store.getters.getApiHeader.currency,
              Number(data.subtotal),
              items,
              String(data.goods_name),
              Number(data.quantity)
            );
          } else if (res.status == 16004) {
            thif.common.msgBox(thif, res.msg, 3);
          } else {
            thif.noStock = false;
          }
        })
        .catch(err => {
          thif.addCartLoading = false;
          console.log(err);
        });
    },
    //添加至心愿单
    addToWishList(goods_id) {
      if (!this.$store.getters.getLoginToken) {
        this.$router.push({
          path: "/login"
        });
        return;
      }
      this.addToWishListLoading = true;
      let obj = {
        goods_id
      };
      this.$apis
        .favorite(obj)
        .then(res => {
          this.addToWishListLoading = false;
          if (res.status == 1) {
            if (res.data.item) {
              this.is_favorite = 1;
            } else {
              this.is_favorite = 0;
            }
            this.buryingPoint.addToWishList(
              String(goods_id),
              this.$store.getters.getApiHeader.currency,
              this.wishListPrice,
              [],
              this.shopName,
              1,
              this.breadcrumb[this.breadcrumb.length - 1].category_name
            );
          } else {
            this.common.msgBox(this, res.msg, 3);
          }
        })
        .catch(err => {
          console.log(err);
          this.addToWishListLoading = false;
        });
    },
    quantityChange(value) {
      this.shopNum = value;
    },
    showSelect(key) {
      this.attributes[key].childrenShow = !this.attributes[key].childrenShow;
    },
    //seeMore
    seeMoreFn(index) {
      console.log(index, "iiiiiii");
      // this.seeMore = index;
      this.seeMore = !this.seeMore;
    },
    //seeLess
    seeLessFn() {
      this.seeMore = !this.seeMore;
      document.documentElement.scrollTop = 0;
    },
    cliclOption(key, content, keySon) {
      // console.log(key,content,'77777',this.attributes[key])
      this.itemColor = content;
      if (content.status) {
        return;
      }
      if (this.attributes[key].selectText == content) {
        console.log(this.attributes, "this.attributes----");
        this.attributes[key].childrenShow = false;
        // this.attributes[key].selectText = {
        //   name: "Choose an option",
        //   status: false
        // };
        // // 遍历规格属性查询库存
        // let noSelNum3 = 0; // 记录几种已选过规格但不是当前所选
        // let noSelObj = {}; // 保存未选规格的参数对象
        // let pinStr = ""; // 拼接字符
        // // 查询有多少种参数未选  超过一种不做遍历
        // for (let attrKey in this.attributes) {
        //   noSelNum3++;
        //   noSelObj = this.attributes[attrKey];
        //   for (let itemKey in this.attributes[attrKey]) {
        //     if (itemKey != "childrenShow" && itemKey != "selectText") {
        //       this.attributes[attrKey][itemKey].status = false;
        //       if (
        //         this.attributes[attrKey][itemKey].name ==
        //         this.attributes[attrKey].selectText.name
        //       ) {
        //         pinStr += "8-_-8;"; //占位符
        //       }
        //     }
        //   }
        // }
        // console.log(this.attributes, "this.attributes+++++", noSelObj);
        return;
      }
      this.attributes[key].childrenShow = false;
      this.attributes[key].selectText = content;
      for (let i = 0; i < this.selectKeyArr.length; i++) {
        if (this.selectKeyArr[i].keys == key) {
          this.selectKeyArr[i].value = keySon;
        }
      }
      let state = this.selectKeyArr.some((value, index) => value.value == "");
      // console.log(state,'staaaaaa',this.maxPrice == this.minPrice)
      if (!state) {
        console.log("11111111111");
        this.canShopContinue = true;
        if (this.maxPrice != this.minPrice) {
          this.priceShow = true;
        }
        this.selectAllState = true;
        let selectIdPin = "";
        for (let i = 0; i < this.selectKeyArr.length; i++) {
          if (this.selectKeyArr.length == 1) {
            selectIdPin = this.selectKeyArr[i].value;
          } else {
            if (i != this.selectKeyArr.length - 1) {
              selectIdPin = selectIdPin + this.selectKeyArr[i].value + ";";
            } else {
              selectIdPin = selectIdPin + this.selectKeyArr[i].value;
            }
          }
        }
        // console.log(selectIdPin)
        for (let key in this.variations) {
          if (key == selectIdPin) {
            // console.log(this.variations[key])
            this.selectShopData = this.variations[key];
            this.reference_price = this.variations[key].reference_price;
            this.shop_price = this.variations[key].shop_price;
            this.sku_id = this.variations[key].sku_id;
            this.in_stock = this.variations[key].stock_num != 0;
            this.shopImg = !this.variations[key].image
              ? this.shopImg
              : {
                  image: this.variations[key].image,
                  type: 0,
                  video: ""
                };
            this.stockNum = this.variations[key].stock_num;
            // console.log(this.variations[key])
          }
        }
        this.chooseState = true;
      }
      // 遍历规格属性查询库存
      let noSelNum = 0; // 记录几种规格未选
      let noSelNum2 = 0; // 记录几种已选过规格但不是当前所选
      let noSelObj = {}; // 保存未选规格的参数对象
      let pinStr = ""; // 拼接字符
      // 查询有多少种参数未选  超过一种不做遍历
      for (let attrKey in this.attributes) {
        // key
        if (
          this.attributes[attrKey].selectText.name ==
          this.$t("shopDetail.jsMsg.Choose")
        ) {
          noSelNum++;
          noSelObj = this.attributes[attrKey];
          pinStr += "8-_-8;"; //占位符
        } else if (attrKey != key) {
          noSelNum2++;
          noSelObj = this.attributes[attrKey];
          for (let itemKey in this.attributes[attrKey]) {
            if (itemKey != "childrenShow" && itemKey != "selectText") {
              // console.log(this.attributes,'----',this.attributes[attrKey],'this.attributes[attrKey]',this.attributes[attrKey][itemKey],attrKey,'attrKey',key)
              this.attributes[attrKey][itemKey].status = false;
              if (
                this.attributes[attrKey][itemKey].name ==
                this.attributes[attrKey].selectText.name
              ) {
                pinStr += "8-_-8;"; //占位符
              }
            }
          }
        } else {
          for (let itemKey in this.attributes[attrKey]) {
            if (itemKey != "childrenShow" && itemKey != "selectText") {
              if (
                this.attributes[attrKey][itemKey].name ==
                this.attributes[attrKey].selectText.name
              ) {
                pinStr += itemKey + ";";
              }
            }
          }
        }
      }
      if (
        noSelNum <= 1 &&
        noSelNum2 <= 1 &&
        !(noSelNum == 1 && noSelNum2 == 1)
      ) {
        // console.log(noSelObj)
        for (let attrKey in noSelObj) {
          if (attrKey != "childrenShow" && attrKey != "selectText") {
            let variationsKey = pinStr.replace("8-_-8;", attrKey + ";");
            variationsKey = variationsKey.slice(0, variationsKey.length - 1);
            if (!this.variations[variationsKey]) {
              for (const key in this.variations) {
                this.variations[variationsKey] = {
                  // image: "",
                  // in_stock: false,
                  // reference_price: "",
                  // shop_price: "",
                  // stock: 0,
                  // sku_id: "",

                  attributes: {},
                  goods_id: this.shopId,
                  image: "",
                  reference_price: "",
                  shop_price: "",
                  sku_id: "",
                  sku_no: null,
                  stock_num: 0
                };
              }
            }
            if (!this.variations[variationsKey].stock_num) {
              noSelObj[attrKey].status = true;
            } else {
              noSelObj[attrKey].status = false;
            }
          }
        }

        // for (const key in this.variations) {
        //   console.log(this.variations[key],'8888888')
        //   if(!this.variations[key].stock_num){
        //     // noSelObj[attrKey].status = true;
        //   }else{
        //     // noSelObj[attrKey].status = false;
        //   }
        // }
      }
    }
  },
  watchQuery: ['id']
};
</script>

<style lang="scss" scoped>
/deep/ .el-loading-mask {
  /deep/ .el-loading-spinner {
    top: 200px !important;
    margin-top: 0;
  }
}
.popover-close-btn {
  cursor: pointer;
  width: 18px;
  height: 18px;
  text-align: center;
  font-size: 20px;
  line-height: 18px;
  right: 10px;
  top: 10px;
  color: #fff;
  background: #777;
  border-radius: 50%;
  position: absolute;
}
.addToCart-popover-operation {
  padding: 13px;
  display: flex;
  justify-content: space-between;
  .view-bag,
  .checkout-now {
    width: 158px;
    height: 35px;
    border: none;
    border-radius: 0;
  }
  .view-bag {
    background: #eeeeee;
    span {
      color: #555555;
    }
  }
  .checkout-now {
    background: #172d55;
    /deep/ span {
      color: #fff;
    }
    /deep/ .el-icon-loading {
      color: #fff;
    }
  }
}
// .Breadcrumb {
//   line-height: 4 !important;
//   /deep/ .el-breadcrumb__item {
//     /deep/ .el-breadcrumb__inner {
//       a {
//         color: #555555;
//         font-weight: 300;
//       }
//     }
//     .is-link {
//       color: #555555;
//       font-weight: 300;
//     }
//   }
//   /deep/ .el-breadcrumb__item:last-child {
//     /deep/ .el-breadcrumb__inner {
//       a {
//         color: $fontColor1;
//         font-weight: 600;
//       }
//     }
//   }
// }
.bannerCoat {
  margin-top: 25px;
  padding-bottom: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.shopRight {
  padding-left: 30px;
  .til {
    font-weight: normal;
    font-size: 24px;
    line-height: 28px;
  }
  .priceCoat p {
    font-weight: 500;
    font-size: 30px;
    line-height: 34px;
    color: $fontColor1;
    float: left;
    margin-top: 15px;
  }
  .DiscountMsg {
    display: flex;
    margin-top: 12px;
    p {
      background-color: #ffeee8;
      color: #f55915;
      font-size: 15px;
      font-weight: bold;
      padding: 3px 8px;
      border-radius: 5px;
    }
  }
  .PriceRange {
    font-style: normal;
    font-weight: 500;
    font-size: 30px;
    line-height: 34px;
    color: $fontColor1;
    float: left;
    margin-top: 15px;
    margin-bottom: 20px;
  }
  .priceRangeBeforeDiscount {
    margin: 20px 5px 0;
    float: left;
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    text-decoration-line: line-through;
    color: #999999;
    margin-bottom: 40px;
  }
  .starShowCoat {
    margin: 12px 0 6px;
    overflow: hidden;
    /deep/ .el-rate {
      float: left;
      display: flex;
      line-height: 20px;
      i {
        // color: $fontColorBlue !important;
        margin-right: 0 !important;
      }
      /deep/ .el-rate__text {
        color: $fontColor1 !important;
      }
    }
    .rate_line {
      float: left;
      margin: 3px 10px;
      background: #dddddd;
      height: 16px;
      width: 1px;
    }
    .total_sales {
      margin-right: 50px;
      float: left;
      margin: 3px 0px;
      font-style: normal;
      font-weight: 300;
      font-size: 14px;
      line-height: 16px;
      color: $fontColor1;
    }
    .deliveryTag {
      .deliveryTil {
        font-size: 20px;
        font-weight: bold;
        span {
          color: #e8001b;
        }
        .add {
          margin-left: 30px;
          cursor: pointer;
        }
      }
    }
  }
  .selectCoatUp {
    margin-top: 40px;
  }
  .selectCoatDown {
    margin-top: 80px;
  }
  .selectCoat {
    font-size: 14px;
    .selectItem {
      margin-bottom: 12px;
      display: flex;
      align-items: baseline;
      span {
        margin-right: 29px;
        font-size: 20px;
        font-weight: bold;
      }
      .el-radio-group-box {
        /deep/ .el-radio-group {
          margin: 14px;
          /deep/ .el-radio-button {
            /deep/ .el-radio-button__inner {
              border-radius: 0%;
            }
          }
          .is-active {
            span {
              color: #fff;
              background: black;
            }
          }
        }
      }
      .selRight {
        width: 80%;
        height: 36px;
        position: relative;
        .selText {
          border: 1px solid #ddd;
          cursor: pointer;
          padding: 0 12px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          background-color: rgba(250, 250, 250, 0.5);
          p {
            line-height: 34px;
            color: $fontColor1;
          }
          span {
            line-height: 34px;
          }
        }
        .selText:hover {
          background-color: rgba(153, 153, 153, 0);
        }
        .optionCoat:hover p {
          color: $fontColor1;
          background-color: transparent;
        }
        .optionCoat {
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          margin-top: -1px;
          border: 1px solid #ddd;
          z-index: 100;
          background-color: #fff;
          p {
            color: $fontColor1;
            line-height: 24px;
            padding: 0 12px;
            cursor: pointer;
          }
          p:hover {
            background-color: blue;
            color: #fff;
          }
          .optionItemActive {
            background-color: blue;
            color: #fff;
          }
        }
      }
    }
    .selectItem:nth-child(2) {
      span {
        margin-right: 42px;
      }
    }
  }
  .fengeLine {
    height: 0;
    border: 1px dashed #ddd;
    margin-top: 16px;
    margin-bottom: 5px;
  }

  .priceCoat {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    margin-bottom: 40px;
    line-height: 34px;
    .nowPrice {
      margin-right: 5px;
      color: $fontColor1;
      font-weight: 600;
      font-size: 30px;
    }
    .yuanPrice {
      position: relative;
      font-weight: 300;
      color: #999;

      font-size: 20px;
      margin-left: 10px;
      line-height: 1.5;
    }
    .yuanPrice::after {
      content: "";
      height: 1px;
      width: 100%;
      margin-left: 2px;
      @include center;
      background-color: #111;
    }
  }
  .halloweenTag {
    display: flex;
    width: 100%;
    align-items: center;
    margin-bottom: 20px;
    .halloweenTagImg {
      height: 20px;
    }
    .halloweenTil {
      margin-left: 7px;
      font-size: 16px;
      color: #3b65b3;
    }
  }
  .stock {
    color: #7a9c59;
    font-size: 12px;
    font-weight: bold;
    margin-top: 4px;
    margin-bottom: 16px;
  }
  .iconText {
    margin-top: 28px;
    display: flex;
    flex-direction: row;
    align-items: center;
    p {
      font-size: 16px;
      font-weight: bold;
    }
    img {
      height: 32px;
      margin-right: 10px;
    }
  }
  /deep/ .cart-drawer {
    width: 500px;
    .cart-have {
      span {
        position: absolute;
        left: 42%;
        top: 56px;
        font-style: normal;
        font-weight: normal;
        font-size: 24px;
        line-height: 28px;
        color: #000000;
      }
      img {
        position: absolute;
        top: 35%;
        left: 30%;
      }
      .shopBagEmptyTitle {
        position: absolute;
        top: 57%;
        left: 25%;
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 22px;
        text-align: center;
        color: $fontColor1;
      }
      .shopBagEmptyToShopNow {
        position: absolute;
        top: 60%;
        left: 18%;
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
      .my-cart-title {
        position: absolute;
        left: 42%;
        top: 56px;
        font-style: normal;
        font-weight: normal;
        font-size: 24px;
        line-height: 28px;
        color: #000000;
      }
    }
  }
  .quantityCoat {
    // width: 2.97rem;
    width: 297px;
    display: flex;
    margin-top: 24px;
    align-items: center;
    justify-content: space-between;
    .input-box {
      // flex: 3;
      /deep/ .el-input-number__decrease,
      .el-input-number__increase {
        background: #eeeeee;
        border-radius: 0;
      }
      /deep/ .el-input-number {
        width: 120px;
        display: block;
        /deep/ .el-input__inner {
          border-radius: 0;
        }
      }
      // /deep/ .el-input{
      //   input{
      //     border: none;
      //   }
      // }
    }
    .quantity {
      // flex: 0.67;
      font-style: normal;
      font-weight: normal;
      font-size: 20px;
      line-height: 24px;
      color: #000000;
    }
    .numControl {
      display: flex;
      flex-direction: row;
      font-size: 20px;
      margin-right: 20px;
      .reduce,
      .add {
        width: 26px;
        text-align: center;
        border: 1px solid #ddd;
        line-height: 36px;
        background-color: #f9f9f9;
        transition: background-color 0.5s;
      }
      .reduce:hover,
      .add:hover {
        background-color: #666;
      }
      .number {
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        width: 40px;
        text-align: center;
        line-height: 38px;
        font-size: 14px;
      }
      .numBtnActive {
        background-color: #f55915;
      }
    }
  }
  .cartCoat {
    display: inline-flex;
    margin-top: 60px;
    span {
      display: inline-flex;
    }
    .addToCart {
      border-radius: 0;
      width: 335px;
      height: 48px;
      background: #172d55;
      /deep/ span {
        color: #fff;
      }
      /deep/ .el-icon-loading {
        color: #fff;
      }
    }
    .addToWishList {
      width: 163px;
      height: 48px;
      border-radius: 0;
      border: 2px solid #172d55;
      .heart {
        width: 22px;
        margin: 0 6px 0 0px;
      }
    }
    .addToCart:hover {
      background: $buttonBlueHover;
    }
    .buyNow {
      border-radius: 0;
      background: black;
      /deep/ span {
        color: #fff5f5;
      }
      /deep/ .el-icon-loading {
        color: #fff;
      }
    }
    button {
      margin-right: 20px;
      font-size: 18px;
      line-height: 45px;
      padding: 0 20px;
      letter-spacing: 1px;
      font-weight: bold;
      color: black;
      background: #fff;
      cursor: pointer;
      // width: 240px;
      height: 45px;
      border: 1px solid $fontColor1;
      box-sizing: border-box;
    }
    .btnDisable {
      opacity: 0.5;
      cursor: no-drop;
    }
  }
  .buymore {
    border: 1px solid #f0f1f3;
    border-collapse: collapse;
    margin: 42px 0 40px;
    caption {
      padding: 19px 0;
      font-weight: 600;
      font-size: 18px;
      text-transform: capitalize;
      background: #f0f1f3;
      img {
        width: 19.69px;
        margin-right: 6px;
        margin-top: -5px;
      }
    }
    tr,
    td {
      border: 1px solid #f0f1f3;
      border-collapse: collapse;
    }
    td {
      padding: 10px 0;
      font-size: 14px;
      text-align: center;
    }
    tr td:nth-child(2) {
      font-weight: 600;
    }
    tr td:nth-child(3) {
      color: #3b65b3;
      font-weight: 600;
      cursor: pointer;
    }
  }
  .shopNoContinue,
  .noStock,
  .shopDisable {
    font-size: 16px;
    color: #ff2b2b;
    margin-top: 20px;
    margin-bottom: -22px;
  }
  .refundPolicy {
    background: #f0f1f3;
    width: 516px;
    padding: 22px;
    h4 {
      font-size: 18px;
      color: #555;
      padding-bottom: 6px;
      font-weight: bold;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
    .refundItem {
      margin-top: 12px;
      display: flex;
      flex-direction: row;
      align-items: center;
      img {
        height: 18px;
        margin-right: 10px;
      }
      .refunf-customer-img {
        height: 22px;
        margin-left: -3px;
      }
      span {
        font-size: 14px;
        color: $fontColor1;
      }
    }
    .refundItem-dec-1,
    .refundItem-dec-2,
    .refundItem-dec-3,
    .refundItem-dec-4,
    .refundItem-dec-5,
    .refundItem-dec-6 {
      font-weight: normal;
      font-size: 12px;
      margin: 9px 29px;
    }
    .learn-more {
      display: block;
      cursor: pointer;
      margin: 4px 29px;
      font-size: 12px;
      text-decoration-line: underline;
      color: #555555;
    }
    /deep/ .refundPolicyDialog {
      /deep/ .el-dialog__header {
        border-bottom: 1px solid #dddddd;
        margin: 0 50px;
        /deep/ .el-dialog__title {
          font-size: 24px;
          text-align: center;
          display: block;
          line-height: 60px;
          color: $fontColor1;
          font-weight: bold;
        }
        /deep/ .el-dialog__close {
          color: black;
          font-size: 30px;
          font-weight: bold;
        }
      }
      /deep/ .el-dialog__body {
        margin: 0 28px;
      }
      .el-dialog-delivery {
        font-size: 20px;
        line-height: 24px;
        text-transform: uppercase;
        color: #000000;
        font-weight: bold;
      }
      .el-dialog-delivery-dec {
        font-size: 16px;
        line-height: 20px;
        text-transform: uppercase;
        color: #000000;
        margin: 20px 0 30px;
      }
      .el-dialog-guarantee {
        font-size: 20px;
        line-height: 24px;
        text-transform: uppercase;
        color: #000000;
        font-weight: bold;
      }
      .guarantee-item {
        margin: 10px 0px;
        display: flex;
        align-items: center;
        li:nth-child(1) {
          flex: 1;
        }
        li:nth-child(2) {
          flex: 7;
          h4 {
            font-size: 16px;
            line-height: 20px;
            color: #282828;
            border-bottom: none;
            margin: 12px 0px 4px;
          }
          .full-refund {
            margin-bottom: 3px;
          }
        }
      }
    }
  }
  .refundPolicy-down {
    margin-top: 128px;
  }
  .refundPolicy-up {
    margin-top: 28px;
  }
}

.cutCoat {
  border-top: 1px solid #ececec;
  border-bottom: 1px solid #ececec;
  // padding-bottom: 36px;
  margin-bottom: 26px;
  .cutItem {
    display: flex;
    flex-direction: row;
    margin-bottom: 16px;
    border-bottom: 1px solid #ececec;
    p {
      padding: 13px 15px 8px;
      border-bottom: 3px solid transparent;
      font-size: 15px;
      color: #42435b;
      line-height: 18px;
      margin-right: 14px;
      cursor: pointer;
    }
    .cutItemActive {
      border-bottom: 3px solid #42435b;
      font-weight: bold;
    }
  }
  .Description {
    font-size: 14px;
    margin-top: 16pxx;
    line-height: 18px;
    /deep/ table {
      width: 100%;
      table-layout: fixed;
      border-collapse: collapse;
      border-spacing: 0;
      margin: 15px 0;
      thead {
        background-color: #f3f4f4;
        th {
          font-weight: normal;
        }
        th:first-child {
          text-align: center;
        }
        th:last-child {
          text-align: left;
        }
      }
      /* tbody里的偶数行tr */
      tbody tr:nth-child(even) {
        background-color: #f3f4f4;
      }
      tbody {
        tr td:first-child {
          text-align: center;
        }
      }
      td,
      th {
        min-width: 40px;
        height: 30px;
        border-right: 1px solid #fff;
        padding: 12px 6px;
        // text-align: left;
        box-sizing: border-box;
      }
    }

    /deep/ font[size="1"] {
      font-size: x-small;
    }
    /deep/ font[size="2"] {
      font-size: small;
    }
    /deep/ font[size="3"] {
      font-size: medium;
    }
    /deep/ font[size="4"] {
      font-size: large;
    }
    /deep/ font[size="5"] {
      font-size: x-large;
    }
    /deep/ font[size="6"] {
      font-size: xx-large;
    }
    /deep/ font[size="7"] {
      font-size: xxx-large;
    }
    // /deep/ h2{
    //   font-size: 1.5em;
    // }
    // /deep/ h3{
    //   font-size: 1.17em;
    // }
    // /deep/ h5{
    //   font-size: .83em;
    // }

    /deep/ h1 {
      display: block;
      margin-left: 0;
      margin-right: 0;
      font-weight: bold;
      margin: 10px 0;
      line-height: 1.5;
      color: $fontColorBlack2;
      font-size: 16px !important;
      p,
      span,
      font {
        font-size: 0.16px !important;
      }
    }
    /deep/ ul {
      list-style: disc !important;
      padding: 0 0 0 17px !important;
      line-height: 1.6;
      li {
        list-style: disc !important;
        font-size: 16px;
        color: $fontColorBlack2;
      }
    }
    /deep/ ol {
      list-style: decimal !important;
      padding: 0 0 0 22px !important;
      line-height: 1.6;
      li {
        list-style: decimal !important;
        font-size: 16px;
        color: $fontColor1;
      }
    }
    /deep/ i,
    /deep/ cite,
    /deep/ em,
    /deep/ var,
    /deep/ address {
      font-style: italic !important;
    }
    /deep/ h1,
    /deep/ p,
    /deep/ span {
      margin: 10px 0;
      font-size: 16px;
      color: $fontColor1;
      line-height: 24px;
      font {
        font-size: 16px;
      }
    }
    /deep/ img {
      max-width: 100% !important;
      height: auto !important;
    }
    /deep/ table th,
    /deep/ table td {
      font-size: 16px;
      border-right: 2px solid #fff;
    }
  }
  .SHIPPING {
    font-family: Arimo, sans-serif, "Arial", "sans-serif";
    font-size: 16px;
    padding: 5px 0 30px;
    p {
      margin-bottom: 10px;
      strong {
        font-weight: bolder;
        span {
          color: #f00;
          font-weight: bold;
        }
      }
      a {
        color: #3370ff;
      }
    }
    h4 {
      font-size: 16px;
      font-weight: bold;
      color: #232323;
      margin-bottom: 15px;
    }
    h4:last-child {
      margin-top: 15px;
    }
  }
}
// .cutCoat .cutItem:hover {
//   p {
//     border-bottom: 3px solid transparent;
//   }
//   p:hover {
//     border-bottom: 3px solid #42435b;
//   }
// }
.AdditionalList {
  display: flex;
  align-items: center;
  line-height: 12px;
  border-bottom: 1px solid rgba(119, 119, 119, 0.3);
  padding: 16px 0;
  p {
    flex: 0 0 auto;
    color: #777;
    font-weight: bold;
    font-size: 14px;
    margin-right: 24px;
  }
  div {
    flex: 1 1 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    span:last-child i {
      display: none;
    }
  }
  span {
    color: #777;
    font-size: 14px;
  }
}
.guigeCoat {
  font-size: 12px;
  margin-left: -10px;
  .guigeList {
    flex-wrap: wrap;
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    padding: 0 12px;
    justify-content: space-between;
    .guigeTil,
    .guigeTilOnly {
      flex: 1;
      font-size: 20px;
      color: #000000;
    }
    .guigeItemCoat {
      flex: 4;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      margin-top: 8px;
      .guigeItem {
        cursor: pointer;
        padding: 12px 16px;
        border: 2px solid #f0f1f3;
        margin-right: 12px;
        margin-bottom: 12px;
      }
      .shopNoStock {
        .guigeItem {
          cursor: not-allowed;
          border: 1px solid #d6d6d6;
          color: #d6d6d6;
          background-color: #fff;
        }
      }
      .optionItemActive {
        // background-color: $fontColor1;
        // color: #fff;
        border: 2px solid #172d55;
      }
      .noSton p {
        border: 1px solid #d6d6d6;
        color: #d6d6d6;
      }
    }
    // .seeMore {
    //   cursor: pointer;
    //   margin-left: 100px;
    //   font-family: Ubuntu;
    //   font-style: normal;
    //   font-weight: 300;
    //   font-size: 18px;
    //   color: $fontColorBlue;
    //   width: 110px;
    //   display: flex;
    //   align-items: center;
    //   justify-content: space-between;
    //   img {
    //     width: 24px;
    //     height: 24px;
    //     margin-bottom: 1px;
    //   }
    // }
    .guige-box {
      width: 100%;
    }
    .guigeItemCoatOverHidden {
      height: 100px;
      overflow: hidden;
    }
  }
  .guigeListFlex {
    overflow: hidden;
    height: 206px;
    position: relative;
  }
}
.seeMore {
  cursor: pointer;
  margin-left: 100px;
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  color: $fontColorBlue;
  width: 110px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    width: 24px;
    height: 24px;
    margin-bottom: 1px;
  }
}
@media screen and (max-width: 600px) {
}
</style>
