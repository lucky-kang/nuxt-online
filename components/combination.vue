<template>
  <div
    class="bundling"
    v-if="shopCombination&&bundlItems.length!=0"
  >
    <p class="bunTil">Frequently Bought Together</p>
    <p class="bunSubTil">Buy more, save more</p>
    <div class="bundBox">
      <div class="bundlListCoat">
        <div
          class="bundlList"
          v-for="(item,index) in bundlItems"
          :key="'bundlist'+index"
        >
          <img
            class="selectImg"
            @click="selClick(item,index)"
            :src="item.setStatus ? selectImg[1] : selectImg[0]"
            alt=""
          >
          <div class="bundProductRightBox">
            <div class="productImgBox">
              <a :href="'/product/' + (item.seo_url || item.goods_id)" style="display: inline-block">
                <img
                  :src="item.type!='variable'?item.image:item.variations[item.default_selected_sku].image"
                  alt=""
                  class="bundProductImg"
                >
              </a>
              <div
                class="huiCoat"
                v-if="item.discount"
              >
                <span>SAVE {{ item.discount }}</span>
              </div>
            </div>
            <div class="bundProductDesc">
              <p
                class="bundProductDescTil"
                :class="item.setStatus?'itemActiveWord':''"
              >{{item.goods_name}}</p>
              <div class="specificationBox">
                <div
                  class="bundlAttr"
                  v-for="(itemSon,key) in item.creatAttr?item.creatAttr:{}"
                  :key="'creatAttr'+key"
                >
                  <p
                    class="showAttr"
                    @click="showSel(itemSon,item.creatAttr,key,index)"
                  >{{item.ActiveAttr[key]}}</p>
                  <div
                    class="attrSelCoat"
                    v-show="itemSon.showState&&activeIndex==index"
                  >
                    <div
                      v-for="(itemSonAttr,keySon) in itemSon"
                      :key="'ycreatAttr'+keySon+key"
                      v-show="!itemSonAttr.status"
                    >
                      <p
                        v-if="keySon!='showState'"
                        :class="item.ActiveAttr[key]==itemSonAttr.name?'attrSelActive':''"
                        @click="cliclOption(item,key,itemSonAttr,keySon,itemSon)"
                      >{{itemSonAttr.name}}</p>
                    </div>

                  </div>
                  <i v-if="itemSon.showState && activeIndex == index" class="el-icon-arrow-up"></i>
                  <i v-else class="el-icon-arrow-down"></i>
                </div>
              </div>

              <div class="priceBox">
                <p class="currentPrice">{{
                  item.type!='variable'?($store.getters.getCurrencySymbol+' '+item.shop_price):
                  ($store.getters.getCurrencySymbol+' '+item.variations[item.default_selected_sku].shop_price)
                }}</p>
                <p class="originalPrice" v-if="item.type!='variable'?(item.reference_price!=item.shop_price):
                (item.variations[item.default_selected_sku].shop_price!=item.variations[item.default_selected_sku].reference_price)">
                  {{
                    item.type!='variable'?($store.getters.getCurrencySymbol+' '+item.reference_price):
                    ($store.getters.getCurrencySymbol+' '+item.variations[item.default_selected_sku].reference_price)
                  }}
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div class="bundlRightCoat">
        <p class="bundPrice">
          {{$t('cart.Total')}}:{{$store.getters.getCurrencySymbol}} {{totalPrice|keepDecimals}}
        </p>
        <p
            class="savePrice"
          >
            Save {{$store.getters.getCurrencySymbol}} {{totalPrice == totalReferencePrice ? 0.00 : (totalReferencePrice - totalPrice) | keepDecimals}}
        </p>
        <div class="bundlBtn">
          <button @click="addCart()"><i
              v-show="addCartLoading"
              class="el-icon-loading"
            ></i>ADD SELECTED TO CART</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "combination",
  props: {
    goods_id: String,
    shopCombination: {
      type: Object,
      value: null
    }
  },
  components: {},
  data() {
    return {
      bundlItems: [],
      shopPrice: "",
      referencePrice: "",
      activeIndex: "",
      addCartLoading: false,
      selectImg: [
        require("../static/images/icon/noselected.png"),
        require("../static/images/icon/selected.png")
      ]
    };
  },
  created() {
    let dataList = [];
    if (this.shopCombination) {
      dataList = JSON.parse(JSON.stringify(this.shopCombination.items));
    }
    console.log(dataList);
    for (let i = 0; i < dataList.length; i++) {
      dataList[i].setStatus = true;
      if (dataList[i].type != "variable") {
        // 单规格
      } else {
        // 多规格
        // dataList[i].default_selected_sku = '10;20';
        let defAttrArr = dataList[i].default_selected_sku.split(";"); // 默认规格数组
        let defAttrNum = 0; // 默认规格下表
        let attrObj = {}; // 构造规格对象
        let pinStr = "";
        dataList[i].ActiveAttr = {};
        for (let key in dataList[i].attributes) {
          attrObj[key] = { showState: false };
          for (let keySon in dataList[i].attributes[key]) {
            if (keySon != "showState") {
              if (keySon == defAttrArr[defAttrNum]) {
                dataList[i].ActiveAttr[key] =
                  dataList[i].attributes[key][keySon];
              }
              if (defAttrArr.length > 1) {
                if (defAttrNum == 0) {
                  pinStr = "8-_-8" + ";" + defAttrArr[1];
                } else {
                  pinStr = defAttrArr[0] + ";" + "8-_-8";
                }
                if (
                  dataList[i].variations[pinStr.replace("8-_-8", keySon)] &&
                  dataList[i].variations[pinStr.replace("8-_-8", keySon)]
                    .stock_num != 0
                ) {
                  attrObj[key][keySon] = {
                    name: dataList[i].attributes[key][keySon],
                    status: false
                  };
                } else {
                  attrObj[key][keySon] = {
                    name: dataList[i].attributes[key][keySon],
                    status: true
                  };
                }
              } else {
                attrObj[key][keySon] = {
                  name: dataList[i].attributes[key][keySon],
                  status: false
                };
              }
            }
          }
          defAttrNum++;
        }
        // 只有一种参数的时候查询库存状态
        if (defAttrNum == 1) {
          for (let attrKey in attrObj) {
            for (let itemKey in attrObj[attrKey]) {
              console.log(dataList[i].variations);
              console.log(itemKey);
              if (itemKey != "showState") {
                if (dataList[i].variations[itemKey].stock_num == 0) {
                  attrObj[attrKey][itemKey].status = true;
                }
              }
            }
          }
        }
        dataList[i].creatAttr = attrObj;
      }
    }
    this.bundlItems = dataList;
    console.log(this.bundlItems);
  },
  methods: {
    showSel(itemSon, creatAttr, itemSonKey, index) {
      for (let key in creatAttr) {
        if (itemSonKey != key) {
          creatAttr[key].showState = false;
        }
      }
      itemSon.showState = !itemSon.showState;
      this.activeIndex = index;
    },
    selClick(item, index) {
      console.log(item);
      this.$set(item, "setStatus", !item.setStatus);
    },
    addCart() {
      let cartObj = { carts: [] };
      let idStr = "";
      let objs = {
        value: this.totalPrice,
        currency: this.$store.getters.getApiHeader.currency,
        items: []
      };
      for (let i = 0; i < this.bundlItems.length; i++) {
        if (this.bundlItems[i].setStatus) {
          let thisShop =
            this.bundlItems[i].type == "variable"
              ? this.bundlItems[i].variations[
                  this.bundlItems[i].default_selected_sku
                ]
              : this.bundlItems[i];
          cartObj.carts.push({
            goods_id: this.bundlItems[i].goods_id,
            quantity: 1,
            sku_id:
              this.bundlItems[i].type == "variable"
                ? this.bundlItems[i].variations[
                    this.bundlItems[i].default_selected_sku
                  ].sku_id
                : this.bundlItems[i].sku_id
          });
          objs.items.push({
            id: thisShop.sku_id,
            name: thisShop.goods_name,
            quantity: 1,
            price: thisShop.shop_price
          });
        }
        if (i != this.bundlItems.length - 1) {
          idStr +=
            (this.bundlItems[i].type == "variable"
              ? this.bundlItems[i].variations[
                  this.bundlItems[i].default_selected_sku
                ].sku_id
              : this.bundlItems[i].sku_id) + ",";
        } else {
          idStr +=
            this.bundlItems[i].type == "variable"
              ? this.bundlItems[i].variations[
                  this.bundlItems[i].default_selected_sku
                ].sku_id
              : this.bundlItems[i].sku_id;
        }
      }
      this.addCartLoading = true;
      this.$apis
        .batchAddCart(cartObj)
        .then(res => {
          this.addCartLoading = false;
          if (res.status == 1) {
            // this.buryingPoint.combinationAddToCart(
            //   String(cartsArr[0].goods_id),
            //   this.$store.getters.getApiHeader.currency,
            //   Number(subtotal),
            //   items,
            //   sku
            // );
            this.buryingPoint.bundlePurchase(this.goods_id,objs);
            let getNum = this.$store.getters.getCartNum;
            let count = res.data.items_count;
            this.$store.dispatch("actCartNum", Number(getNum) + Number(count));
            this.$router.push({
              path: "/cart"
            });
          }
        })
        .catch(err => {
          this.addCartLoading = false;
          console.log(err);
        });
      // MH_API.addToCartBatch(cartObj,this.$store.getters.getApiHeader).then(res => {
      //   console.log(res);
      //   if(res.status==1){
      //     this.$store.dispatch("actCartNum", Number(res.data.items_count));
      //     sessionStorage.setItem('forooCartsNum',this.$store.getters.getCartNum)
      //     try{
      //       this.buryingPoint.bundlePurchase(this.goods_id,objs);
      //     }catch(e){
      //       //TODO handle the exception
      //     }
      //     this.$router.push({
      //       path:'/cart',
      //       query:{
      //         id:idStr
      //       }
      //     })
      //   } else {
      //     this.common.msgBox(this,res.msg,3);
      //   }
      // }).catch(err => {
      //   console.log(err)
      // })
    },
    cliclOption(dataItem, key, content, keySon, itemSon) {
      // console.log(key) // 参数字段名 （如color）
      // console.log(content) // 所点击的下拉选择对象
      // console.log(keySon) // 选中参数值 （如 red）
      // console.log(dataItem) // 商品对象
      if (dataItem.ActiveAttr[key] == content.name) {
        return;
      }
      let defSkuArr = dataItem.default_selected_sku.split(";");
      if (defSkuArr.length == 1) {
        dataItem.default_selected_sku = keySon;
        dataItem.ActiveAttr[key] = dataItem.attributes[key][keySon];
        itemSon.showState = false;
      } else {
        let defIndex = 0;
        let aa = 0;
        for (let fuynKey in dataItem.creatAttr) {
          if (key == fuynKey) {
            defIndex = aa;
          }
          aa++;
        }
        let pinStr = "";
        let otherStr = "";
        console.log(defIndex);
        if (defIndex == 0) {
          pinStr = keySon + ";" + "8-_-8";
          otherStr = defSkuArr[1];
        } else {
          pinStr = "8-_-8" + ";" + keySon;
          otherStr = defSkuArr[0];
        }
        for (let funKey in dataItem.creatAttr) {
          if (funKey != key) {
            for (let keySonAttr in dataItem.creatAttr[funKey]) {
              if (keySonAttr != "showState") {
                if (
                  dataItem.variations[pinStr.replace("8-_-8", keySonAttr)] &&
                  dataItem.variations[pinStr.replace("8-_-8", keySonAttr)]
                    .stock_num != 0
                ) {
                  dataItem.creatAttr[funKey][keySonAttr].status = false;
                } else {
                  dataItem.creatAttr[funKey][keySonAttr].status = true;
                }
              }
            }
          } else {
            dataItem.ActiveAttr[funKey] = content.name;
          }
        }
        dataItem.default_selected_sku = pinStr.replace("8-_-8", otherStr);
        itemSon.showState = false;
      }
    }
  },
  filters: {
    keepDecimals(value) {
      // console.log(value)
      let num = value.toString();
      let index = num.indexOf(".");
      if (index !== -1) {
        num = num.substring(0, index + 3);
      } else {
        num = num.substring(0);
      }
      return parseFloat(num).toFixed(2);
    }
  },
  computed: {
    totalPrice() {
      let numPrice = 0;
      let noCoupon = 0;
      let DiscountState = true;
      for (let i = 0; i < this.bundlItems.length; i++) {
        if (!this.bundlItems[i].setStatus) {
          DiscountState = false;
        } else {
          if (this.bundlItems[i].type == "variable") {
            let activeKey = this.bundlItems[i].default_selected_sku;
            let shopPriceYe = this.common.mul(
              Number(this.bundlItems[i].variations[activeKey].shop_price),
              Number(this.shopCombination.promotion_value)
            );
            let num = shopPriceYe.toString();
            let index = num.indexOf(".");
            if (index !== -1) {
              num = num.substring(0, index + 3);
            } else {
              num = num.substring(0);
            }
            console.log(Number(parseFloat(num).toFixed(2)));
            numPrice += Number(parseFloat(num).toFixed(2));
            noCoupon += Number(
              this.bundlItems[i].variations[activeKey].shop_price
            );
          } else {
            let shopPriceYe = this.common.mul(
              Number(this.bundlItems[i].shop_price),
              Number(this.shopCombination.promotion_value)
            );
            let num = shopPriceYe.toString();
            let index = num.indexOf(".");
            if (index !== -1) {
              num = num.substring(0, index + 3);
            } else {
              num = num.substring(0);
            }
            console.log(Number(parseFloat(num).toFixed(2)));
            numPrice += Number(parseFloat(num).toFixed(2));
            noCoupon += Number(this.bundlItems[i].shop_price);
          }
        }
      }
      if (DiscountState) {
        console.log(numPrice);
        return numPrice;
      } else {
        return noCoupon;
      }
    },
    totalReferencePrice() {
      let numPrice = 0;
      let DiscountState = true;
      for (let i = 0; i < this.bundlItems.length; i++) {
        if (!this.bundlItems[i].setStatus) {
          DiscountState = false;
        } else {
          if (this.bundlItems[i].type == "variable") {
            let activeKey = this.bundlItems[i].default_selected_sku;
            numPrice += Number(
              this.bundlItems[i].variations[activeKey].reference_price
            );
          } else {
            numPrice += Number(this.bundlItems[i].reference_price);
          }
        }
      }
      return numPrice;
    }
  }
};
</script>

<style lang="scss" scoped>
.bunTil {
  font-weight: 600;
  font-size: 28px;
  letter-spacing: 0.1em;
}
.bunSubTil {
  font-weight: 600;
  font-size: 20px;
  letter-spacing: 0.1em;
}
.imgCoat {
  padding: 0 0.12rem;
  width: 100%;
  display: flex;
  align-items: center;
  overflow-x: scroll;
  justify-content: center;
  margin-top: 0.26rem;
  div {
    display: flex;
    align-items: center;
  }
  .bundlImgCoat:last-child .jia {
    display: none;
  }
  img {
    height: 1rem;
    width: 1rem;
    border-radius: 0.06rem;
  }
  .jia {
    font-size: 0.12rem;
    font-weight: bold;
    margin: 0 0.06rem;
    color: #c8c8c8;
  }
}
.bundlCart {
  box-shadow: 0px 3px 18px 0px rgba(230, 230, 230, 0.6);
  padding: 0 0.12rem 0.13rem;
}
.bundlRightCoat{
  width: 25%;
  margin-left: 40px;
  .bundPrice {
    padding-top: 0.08rem;
    margin: 0.19rem auto;
    text-align: left;
    font-weight: 600;
    font-size: 24px;
    .bundlPri1 {
      color: bundlPri1;
      font-weight: bold;
      font-size: 0.18rem;
    }
  }
  .savePrice{
    font-weight: 600;
    font-size: 18px;
    color: #3B65B3;
  }
  .bundlBtn {
    margin: 40px 0 0;
    button {
      width: 276px;
      height: 48px;
      background-color: $fontColorBlack2;
      color: #fff;
      font-size: 18px;
      font-weight: 600;
      cursor: pointer;
      /deep/ .el-icon-loading{
        color: #fff;
        margin-right: 12px;
      }
    }
    button:hover{
      background-color: $buttonBlueHover;
    }
  }
}
.bundBox{
  display: flex;
}
.bundlListCoat {
  margin-top: 0.2rem;
  padding: 0 0.12rem;
  width: 75%;
  border-right: 1px solid #F0F1F3;
  padding: 0 81px 0px 1px;
  .bundlList:not(:last-child){
    .bundProductRightBox{
      border-bottom: 1px solid #F0F1F3;
    }
  }
  .bundlList {
    margin-bottom: 0.17rem;
    display: flex;
    align-items: center;
    .selectImg {
      cursor: pointer;
      margin: 0 30px 0 0;
    }
    .bundProductRightBox{
      display: flex;
      width: 100%;
      padding: 0 0 13px;
      .productImgBox{
        position: relative;
        width: 102px;
        height: 102px;
        margin: 0 10px 0px 0;
      }
    }
    .bundProductImg {
      width: 100%;
      height: 100%;
    }
    .huiCoat {
      background: #3B65B3;
      position: absolute;
      top: 0;
      right: 0;
      display: flex;
      align-items: center;
      width: 65px;
      height: 23px;
      justify-content: center;
      span {
        color: #fff;
        font-size: 12px;
      }
    }
    .bundProductDesc {
      height: 102px;
      position: relative;
      .bundProductDescTil {
        font-size: 14px;
      }
      .specificationBox {
        position: absolute;
        cursor: pointer;
        top: 39px;
        display: flex;
        .bundlAttr {
          background: #f0f1f3;
          border-radius: 1px;
          margin-right: 8px;
          position: relative;
          display: flex;
          align-items: center;
          padding: 4px 4px 4px 0px;
          p {
            font-size: 12px;
            padding: 4px 12px;
          }
          .showAttr {
            max-width: 206px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .attrSelCoat {
            position: absolute;
            width: auto;
            z-index: 10;
            top: 100%;
            max-height: 206px;
            overflow: scroll;
            width: 100%;
            p {
              background: #F0F1F3;
              white-space: nowrap;
              width: auto;
            }
            .attrSelActive {
              font-weight: 600;
            }
          }
        }
      }
      .priceBox {
        display: flex;
        position: absolute;
        bottom: 0;
        .currentPrice,
        .originalPrice {
          font-size: 18px;
        }
        .currentPrice {
          color: #3b65b3;
          margin-right: 12px;
          font-weight: 600;
        }
        .originalPrice {
          text-decoration-line: line-through;
        }
      }

      .bundlListUp {
        display: flex;
        // align-items: center;
        div {
          height: 0.13rem;
          border: 0.035rem solid #e5e5e5;
          width: 0.13rem;
          border-radius: 50%;
          flex-shrink: 0;
          margin-right: 0.07rem;
          margin-top: 0.03rem;
        }
        .itemActive {
          border: 0.035rem solid #fae376;
        }
        p {
          line-height: 0.2rem;
          font-size: 14px;
        }
      }
      .bundlListDown {
        display: flex;
        align-items: flex-end;

        .bundlItemPrice {
          display: flex;
          align-items: flex-end;
          p {
            font-weight: bold;
            font-size: 18px;
            color: #3b65b3;
            margin-right: 12px;
          }
          span {
            color: #cacaca;
            position: relative;
          }
          span:after {
            content: "";
            position: absolute;
            top: 50%;
            left: 0;
            width: 100%;
            height: 1px;
            background-color: #cacaca;
          }
        }
      }
    }

    .mainShop p {
      font-weight: bold;
    }
  }
}
</style>
