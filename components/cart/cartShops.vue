<template>
  <div
    v-loading.fullscreen.lock="loading"
    class="tableCoat"
  >
    <div class="cartTil">
      <p>{{ $t("cart.SHIPPINGCART") }}</p>
      <!-- <div
        class="deliveryTag"
        v-if="$store.getters.getCountry == 'United Kingdom (UK)' && !!delivery_price_limit && (Number(delivery_price_limit.limit) - Number(totalPrice)) > 0 && Number(totalPrice)"
      >
        <p class="deliveryTil">Buy
          <span>
            {{$store.getters.getCurrencySymbol}}
            {{Number(delivery_price_limit.limit) - Number(totalPrice) | numToFix}}
          </span>
          more to enjoy
          <span>FREE SHIPPING!</span>
          <span
            class="add"
            @click="goHome()"
          >Add ></span>
        </p>
      </div> -->
      <!-- <div
        class="deliveryTag"
        v-show="!Number(totalPrice) && $store.getters.getCountry == 'United Kingdom (UK)'"
        style="color:#e8001b;font-size:18px"
      >
      Free shipping on orders of {{$store.getters.getCurrencySymbol}}{{delivery_price_limit.limit}}+
      </div> -->
    </div>
    <div class="shopItemCoat">
      <div
        v-show="cardsArr.length==0"
        class="noShop"
      >
        <img
          src="../../static/images/checkout/cart@3x.png"
          alt=""
        >
        <p>{{ $t("cart.ShoppingBagEmpty") }}</p>
      </div>
      <div
        v-for="(item, index) in cardsArr"
        v-show="cardsArr.length!=0"
        :key="'l' + index"
        class="shopItem"
      >
        <div class="shopItemLeft">
          <div
            class="selIcon"
            :class="item.optionState?'selIconActive':''"
            @click="selCartShop(item)"
          >
            <span class="el-icon-check"></span>
          </div>
          <img
            v-lazy="item.image"
            class="shopImg b-cursor"
            @click="linkHandle(item)"
          >
          <div class="shopCont">
            <p class="price">{{ $store.getters.getCurrencySymbol }}{{ item.shop_price }}</p>
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
              <p class="halloweenTil">{{ $t("shopDetail.halloweenTil") }}</p>
            </div>
            <p class="shopName">{{ item.goods_name }}</p>
            <!-- @click="getCartVariations(item)" -->
            <div
              v-if="item.type == 'variable' && item.attributes != void(0) && item.attributes.length!=0"
              class="shopGuige"
            >
              <span
                v-for="(attrItem,attrIndex) in item.attributes"
                :key="'attr'+item.cart_id+attrIndex"
              >{{ attrItem}}<i> / </i></span>
              <!-- <span class="el-icon-arrow-down"></span> -->
            </div>
            <div
              class="delCoat b-cursor"
              @click="delShop(item.cart_id, index,1,item)"
            >
              <img
                src="../../static/images/icon/icon_delete.png"
                class="delIcon"
              >
              <p>{{ $t("cart.Delete") }}</p>
            </div>
            <div
              v-if="item.type == 'variable' && item.guige"
              v-show="item.showStatus"
              class="guigeCoat"
            >
              <span
                class="el-icon-close"
                @click="closeGuige(item)"
              ></span>
              <div
                v-for="(guigeItem,guigeKey) in item.guige.attributes"
                :key="'guigeItem' + guigeKey"
                class="guigeItem"
              >
                <p>{{ guigeKey }}</p>
                <div>
                  <span
                    v-for="(btnItem,btnKey) in guigeItem"
                    :key="btnKey"
                    class="guigeBtnCoat"
                    :class="!btnItem.status?(btnItem.isActive?'btnActive':''):'gray'"
                    @click="cliclOption(guigeItem,guigeKey,btnItem,btnKey,item)"
                  >
                    <span class="guigeBtnItem">{{ btnItem.name }}</span>
                  </span>
                </div>
              </div>
              <div class="guigeBtnCoat">
                <button @click="sendChangeCart(item)">{{ $t("cart.CONFIRM") }}</button>
              </div>
            </div>
          </div>
        </div>
        <div class="controlNum">
          <div class="NumCoat">
            <div
              class="numLeft b-cursor"
              :class="item.quantity==1?'gray':''"
              @click="controlNum(index, 2, item.cart_id, item.goods_id, item.sku_id)"
            >-</div>
            <div class="num">{{ item.quantity }}</div>
            <div
              class="numRight b-cursor"
              @click="controlNum(index, 1, item.cart_id, item.goods_id, item.sku_id)"
            >+</div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="shopFoot"
      v-show="cardsArr.length!=0"
    >
      <div class="selAll">
        <div
          class="selIcon"
          :class="selAllState?'selIconActive':''"
          @click="selAll()"
        >
          <span class="el-icon-check"></span>
        </div>
        <p>{{ $t("cart.SelectAll") }}</p>
      </div>
      <div
        class="selDel b-cursor"
        @click="delShop(1,1,2)"
      >
        <img
          src="../../static/images/icon/icon_delete.png"
          alt=""
        >
        <p>{{ $t("cart.Delete") }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import common from "~/utils/common";
export default {
  name: "CartShop",
  props: {
    cardsArr: {
      type: Array,
      value: []
    },
    delivery_price_limit: {
      type: Object | String,
      value: {} | ""
    },
    totalPrice: {
      type: Number,
      value: 0
    },
  },
  data() {
    return {
      loading: false,
      selAllState: false,
      changeCartData: null,
      items: [],
      selected: false
    };
  },
  mounted() {
    console.log(this.cardsArr, "cartshoppppp", this.common);
  },
  watch:{
    cardsArr:{
      handler:function(value1,value2){
        for(let i=0;i<value1.length;i++){
          if(!value1[i].optionState){
            this.selAllState = false;
            return;
          }
        }
        this.selAllState = true;
      },
      deep:true
    }
  },
  methods: {
    goHome(){
      this.$router.push({
        path: "/",
      });
    },
    closeGuige(item) {
      this.$set(item, "showStatus", false);
      console.log(item);
    },
    sendChangeCart(item) {
      if (!item.sendData) {
        return;
      }
      this.$apis
        .changeCart(item.sendData, this.$store.getters.getApiHeader)
        .then(res => {
          console.log(res);
          if (res.status == 1) {
            this.$set(item, "showStatus", false);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    cliclOption(item, key, content, keySon, cartItem) {
      if (content.status) {
        return;
      }
      for (let i = 0; i < cartItem.selectKeyArr.length; i++) {
        if (cartItem.selectKeyArr[i].keys == key) {
          cartItem.selectKeyArr[i].value = keySon;
        }
      }
      for (let key in item) {
        item[key].isActive = false;
      }
      // content.isActive = true;
      this.$set(content, "isActive", true);
      let state = cartItem.selectKeyArr.some(
        (value, index) => value.value == ""
      );
      if (!state) {
        this.selected = true;
        let selectIdPin = "";
        for (let i = 0; i < cartItem.selectKeyArr.length; i++) {
          if (cartItem.selectKeyArr.length == 1) {
            selectIdPin = cartItem.selectKeyArr[i].value;
          } else {
            if (i != cartItem.selectKeyArr.length - 1) {
              selectIdPin = selectIdPin + cartItem.selectKeyArr[i].value + ";";
            } else {
              selectIdPin = selectIdPin + cartItem.selectKeyArr[i].value;
            }
          }
        }
        let variationsItem = {};
        for (let key in cartItem.guige.variations) {
          if (key == selectIdPin) {
            variationsItem = cartItem.guige.variations[key];
          }
        }
        cartItem.sendData = {
          cart_id: cartItem.cart_id,
          quantity: cartItem.quantity,
          product_id: cartItem.goods_id,
          variation_id: variationsItem.sku_id
        };
      }
      // 遍历规格属性查询库存
      let variations = cartItem.guige.variations;
      let attributes = cartItem.guige.attributes;
      let noSelNum = 0; // 记录几种规格已选
      let noSelNum2 = 0; // 记录共有几种规格
      let noSelObj = {}; // 保存未选规格的参数对象
      let pinStr = ""; // 拼接字符
      // 查询有多少种参数未选  超过一种不做遍历
      for (let attrKey in attributes) {
        noSelNum2++;
        if (attrKey == key) {
          noSelNum++;
          for (let attrSonKey in attributes[attrKey]) {
            if (attributes[attrKey][attrSonKey].isActive) {
              pinStr += attrSonKey + ";";
            }
          }
        } else {
          noSelNum++;
          noSelObj = attributes[attrKey];
          pinStr += "8-_-8;";
          for (let attrSonKey in attributes[attrKey]) {
            attributes[attrKey][attrSonKey].status = false;
          }
        }
      }
      if (noSelNum2 - noSelNum > 1) {
        return;
      } else {
        for (let attrKey in noSelObj) {
          let variationsKey = pinStr.replace("8-_-8;", attrKey + ";");
          variationsKey = variationsKey.slice(0, variationsKey.length - 1);
          // console.log(variationsKey)
          if (!variations[variationsKey].in_stock) {
            this.$set(noSelObj[attrKey], "status", true);
          } else {
            noSelObj[attrKey].status = false;
          }
        }
      }
    },
    getCartVariations(item) {
      this.$set(item, "showStatus", true);
      if (item.guige) {
        return;
      }
      this.$apis
        .getCartVariations(
          {
            product_id: item.goods_id
          },
          this.$store.getters.getApiHeader
        )
        .then(res => {
          console.log(res);
          if (res.status == 1) {
            item.selectKeyArr = [];
            let canshuNum = 0;
            for (let key in res.data.attributes) {
              canshuNum++;
              item.selectKeyArr.push({
                keys: key,
                value: ""
              });
              for (let sonKey in res.data.attributes[key]) {
                res.data.attributes[key][sonKey] = {
                  name: res.data.attributes[key][sonKey],
                  status: false,
                  isActive: false
                };
              }
            }
            this.$set(item, "guige", res.data);
            if (canshuNum == 1) {
              for (let key in res.data.attributes) {
                console.log(key);
                for (let keySon in res.data.attributes[key]) {
                  if (!res.data.variations[keySon].in_stock) {
                    res.data.attributes[key][keySon].status = true;
                  }
                }
              }
            }

            // item.guige = res.data;
          } else {
            this.common.msgBox(this, res.msg, 3);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    linkHandle(item) {
      this.$router.push("/product/" + item.goods_id);
    },
    controlNum(index, type, id, goods_id, sku_id) {
      let thif = this;
      let yuanNum = this.cardsArr[index].quantity;
      if (type == 1) {
        this.cardsArr[index].quantity = this.cardsArr[index].quantity + 1;
      } else {
        if (this.cardsArr[index].quantity > 1) {
          this.cardsArr[index].quantity--;
        } else {
          return;
        }
      }
      thif.loading = true;
      this.$apis
        .changeShopNum(
          {
            quantity: String(this.cardsArr[index].quantity),
            cart_id: id,
            goods_id,
            sku_id
          },
          this.$store.getters.getApiHeader
        )
        .then(res => {
          thif.loading = false;
          if (res.status == 1) {
            let num = thif.$store.state.cartNum;
            thif.cardsArr[index].subtotal =
              thif.cardsArr[index].quantity * thif.cardsArr[index].shop_price;
            thif.$store.dispatch(
              "actCartNum",
              (num = type == 1 ? num + 1 : num - 1)
            );
          } else {
            thif.cardsArr[index].quantity = yuanNum;
            thif.common.msgBox(thif, res.msg, 3);
          }
        })
        .catch(err => {
          thif.loading = false;
          console.log(err);
        });
    },
    delShop(id, index, type, item) {
      let thif = this;
      this.$confirm("Are you sure to delete these items?", {
        confirmButtonText: "REMOVE",
        cancelButtonText: "CANCEL"
      })
        .then(() => {
          if (type == 1) {
            thif.delShopCart(id, index, item);
          } else {
            thif.delShopArr();
          }
        })
        .catch(() => {
          console.log("shanchu2");
        });
    },
    selAll() {
      this.selAllState = !this.selAllState;
      for (let i = 0; i < this.cardsArr.length; i++) {
        this.cardsArr[i].optionState = this.selAllState;
      }
    },
    selCartShop(item) {
      // let v = !item.variation_id ? item.product_id : item.variation_id;
      // this.items.push(v);
      // if(this.items.includes(v)){
      //   let a = this.items.splice(this.items.findIndex(item => item === v), 1);
      //   console.log(this.items,'ppppp',a)
      // }
      item.optionState = !item.optionState;
    },
    delShopCart(id, index, item) {
      let idStr = "";
      let idStrNum = 0;
      let fbMaidian = [];
      let googleMaidian = {
        id: item.goods_id,
        currency: this.$store.getters.getApiHeader.currency,
        value: item.shop_price,
        shopName: item.name
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
      let thif = this;
      thif.loading = true;
      this.$apis
        .delCartShop(
          {
            cart_ids: id
          },
          this.$store.getters.getApiHeader
        )
        .then(res => {
          console.log(res);
          thif.loading = false;
          if (res.status == 1) {
            thif.buryingPoint.RemoveFromCart(fbMaidian, googleMaidian);
            thif.$store.dispatch("actCartNum", res.data.items_count);
            //子组件中删除购物车里商品，从新从接口获取购物车数据
            thif.$emit("reloadCart");
            // for (let i = 0; i < res.data.carts.length; i++) {
            //   if (res.data.carts[i].cart_id == id) {
            //     //thif.$emit('delCartShop',{index})
            //     thif.$store.dispatch(
            //       "actCartNum",
            //       thif.$store.getters.getCartNum - 1
            //     );
            //     res.data.carts[i].delete
            //       ? thif.cardsArr.splice(index, 1)
            //       : thif.common.msgBox(thif, thif.$t("cart.DeleteFailed"), 3);
            //   }
            // }
          } else {
            thif.common.msgBox(thif, res.msg, 3);
          }
        })
        .catch(err => {
          thif.loading = false;
          console.log(err);
        });
    },
    delShopArr() {
      let thif = this;
      if (this.checkoutNum() == 0) {
        return;
      }
      let idStr = "";
      let idStrNum = 0;
      for (let i = 0; i < this.cardsArr.length; i++) {
        if (this.cardsArr[i].optionState) {
          if (idStrNum == 0) {
            idStr = this.cardsArr[i].cart_id;
          } else {
            idStr += "," + this.cardsArr[i].cart_id;
          }
          idStrNum++;
        }
      }
      this.$apis
        .delCartShop(
          {
            cart_ids: idStr
          },
          this.$store.getters.getApiHeader
        )
        .then(res => {
          if (res.status == 1) {
            for (let i = 0; i < thif.cardsArr.length; i++) {
              if (thif.cardsArr[i].optionState) {
                thif.$store.dispatch(
                  "actCartNum",
                  this.$store.getters.getCartNum - thif.cardsArr[i].quantity
                );
                thif.cardsArr.splice(i, 1);
                i--;
                console.log(thif.cardsArr);
              }
            }
          } else {
            thif.common.msgBox(thif, res.msg, 3);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    checkoutNum() {
      let num = 0;
      for (let i = 0; i < this.cardsArr.length; i++) {
        if (this.cardsArr[i].optionState) {
          num++;
        }
      }
      return num;
    }
  }
};
</script>

<style lang="scss" scoped>
.gray {
  color: #d6d6d6;
}

.tableCoat {
  padding: 15px 40px 0;
  height: 100%;
}

// 新样式
.NumCoat {
  font-size: 12px;
  display: flex;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  .numLeft,
  .numRight {
    height: 20px;
    width: 20px;
    text-align: center;
    border: 1px solid #ddd;
    line-height: 18px;
    color: #666;
    padding: 0 7px;
    background-color: #f9f9f9;
  }

  .num {
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
    text-align: center;
    height: 20px;
    width: 20px;
    line-height: 18px;
    color: #666;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
  }
}

.cartTil {
  font-size: .3rem;
  font-weight: bold;
  line-height: 30px;
  padding: 20px 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid $borderColor;
  .deliveryTag {
    width: 5.86rem;
    height: .48rem;
    margin-left: .6rem;
    background: #FFD9C0;
    border-radius: .24rem;
    line-height: .48rem;
    text-align: center;
    .deliveryTil {
      font-size: 16px;
      font-weight: bold;
      span {
        color: #e8001b;
      }
      .add {
        float: right;
        cursor: pointer;
        margin-right: 20px;
      }
    }
  }
}

.shopItemCoat {
  border-bottom: 1px solid $borderColor;
  padding: 10px 0;
}

.shopItem {
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  position: relative;
}

.shopItemLeft {
  display: flex;
  align-items: center;
  width: 100%;
  padding-right: 80px;
}

.shopImg {
  height: 120px;
  border-radius: 12px;
  margin-right: 20px;
}

.shopCont {
  position: relative;
  width: 60%;
  .price {
    font-size: 16px;
    line-height: 20px;
    margin-bottom: 2px;
    color: $fontColor1;
    font-weight: 550;
  }
  .halloweenTag {
    display: flex;
    width: 100%;
    .halloweenTagImg {
      height: 14px;
    }
    .halloweenTil {
      font-size: 14px;
      margin-left: 10px;
      font-weight: bold;
    }
  }
  .shopName {
    color: $fontColor3;
    line-height: 20px;
    margin-bottom: 18px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .shopGuige {
    background-color: #f5f5f5;
    display: inline-block;
    padding: 0 12px;
    line-height: 24px;
    // cursor: pointer;
    span:last-child i{display: none;}
  }

  .delCoat {
    display: flex;
    align-items: center;
    margin-top: 12px;

    img {
      height: 20px;
    }

    p {
      color: $fontColor3;
    }
  }

  .guigeCoat {
    position: absolute;
    left: 0;
    bottom: 0;
    border-radius: 4px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    background-color: #fff;
    padding: 25px 20px 5px;
    max-width: 100%;
    text-align: center;

    .guigeBtnCoat {
      text-align: center;

      button {
        height: 30px;
        font-size: 14px;
        width: 260px;
        color: #fff;
        background: $fontColor1;
        border-radius: 2px;
        margin-bottom: 20px;
      }
    }

    .el-icon-close {
      cursor: pointer;
      position: absolute;
      right: 6px;
      top: 6px;
      font-size: 20px;
    }

    .guigeItem {
      font-size: 14px;
      display: flex;

      p {
        width: 40px;
        margin-right: 10px;
      }

      div {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;

        .guigeBtnCoat {
          cursor: pointer;
          line-height: 24px;
          padding: 0 8px;
          border: 1px solid #555;
          border-radius: 2px;
          margin-right: 20px;
          margin-bottom: 20px;
        }

        .btnActive {
          background-color: $btnBjColor;

          span {
            color: #fff;
          }
        }

        .gray {
          border: 1px solid #d6d6d6;

          span {
            color: #d6d6d6;
          }
        }
      }
    }
  }
}

.selIcon {
  height: 18px;
  width: 18px;
  text-align: center;
  border: 1px solid #999;
  border-radius: 50%;
  margin-right: 20px;
  font-size: 12px;
  line-height: 18px;
  cursor: pointer;
  .el-icon-check {
    color: #fff;
  }
}

.selIconActive {
  background-color: $bjColor;
  border: 0;
}

.shopFoot {
  display: flex;
  align-items: center;
  height: 50px;
  font-size: 14px;
}

.selAll,
.selDel {
  display: flex;
  margin-right: 40px;
  align-items: center;

  .selIcon {
    margin-right: 4px;
  }

  img {
    height: 20px;
  }
}

.noShop {
  text-align: center;

  img {
    height: 200px;
    margin-top: 20px;
  }

  p {
    margin-top: 20px;
    font-size: 18px;
    line-height: 22px;
    font-weight: 550;
    margin-bottom: 72px;
  }
}
</style>
