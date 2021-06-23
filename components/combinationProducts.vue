<template>
  <div class="bought-together-box">
    <h4 class="boughtTitle">FREQUENTLY BOUGHT TOGETHER</h4>
    <p class="boughtTil">Save Money Buying These Products Together</p>
    <div class="selectProductShow">
      <div :class="!newProductArr.length ? '' : 'imgBoxParent'">
        <div
          class="img-box"
          v-for="item in newProductArr"
          :key="item.goods_id"
        >
          <img
            v-if="item.type == 'simple'"
            :src="item.image"
            @click="goProductDetail(item.goods_id)"
          />
          <div
            v-if="item.type == 'simple'"
            class="plus"
          >+</div>
          <img
            v-if="item.type == 'variable' && item.selectVariations"
            :src="item.selectVariations.image"
            @click="goProductDetail(item.goods_id)"
          />
          <div
            v-if="item.type == 'variable' && item.selectVariations"
            class="plus"
          >+</div>
        </div>
      </div>
      <!-- {{productArr[1].selectVariations.sku_id}} -->
      <div class="totalPriceBox">
        <div class="totalTil">
          <span class="totalPriceTil">Total Price : </span>
          <span
            v-if="newProductArr.length"
            class="totalShopPrice"
          >
            {{$store.getters.getCurrencySymbol}}
            {{promotionTotal.toFixed(2)}}
          </span>
          <span
            v-else
            class="totalShopPrice"
          >{{$store.getters.getCurrencySymbol}}0.00</span>
          <span
            v-if="newProductArr.length"
            v-show="promotionReferencePriceTotal.toFixed(2) != '0.00' && newProductArr.length"
            class="totalReferencePrice"
          >
            {{$store.getters.getCurrencySymbol}}
            {{promotionReferencePriceTotal.toFixed(2)}}
          </span>
          <span
            v-else
            class="totalReferencePrice"
          >{{$store.getters.getCurrencySymbol}}0.00</span>
        </div>
        <div
          v-if="newProductArr.length"
          @click="batchAddCart()"
          class="addToCart"
        ><i
            v-show="addCartLoading"
            class="el-icon-loading"
          ></i>ADD SELECTED TO CART</div>
      </div>
    </div>
    <div class="selectProduct">
      <el-checkbox-group v-model="checkedEquipments">
        <div class="checkboxContent">
          <div
            class="checkboxBox"
            v-for="(item, key) in productArr"
            :key="key"
          >
            <el-checkbox
              @change="checkoutProduct(item,key)"
              :label="item.goods_name"
              :key="key"
            >
              <p @click="goProductDetail(item.goods_id)" class="goods-name">{{item.goods_name}}</p>
            </el-checkbox>
            <div class="checkboxOper">
              <div class="selectBox">
                <el-select
                  v-if="item.type == 'variable'"
                  v-model="item.selectValue"
                  :class="Object.keys(item.attributes).length > 1 ? 'long' : ''"
                  :placeholder="Object.keys(item.attributes).join().replace(/,/g,'/').concat(')')"
                >
                  <el-option
                    v-for="(v,i) in item.variations"
                    :key="'v'+i"
                    :label="Object.keys(v.attributes).length == 1 ? Object.values(v.attributes).join().replace(/,/g,'(') : Object.values(v.attributes).join().replace(/,/g,'(').concat(')')"
                    :disabled="!Number(v.stock_num)"
                    :value="Object.keys(v.attributes).length == 1 ? Object.values(v.attributes).join().replace(/,/g,'(') : Object.values(v.attributes).join().replace(/,/g,'(').concat(')')"
                  >
                    <div @click="selectOption(key,v)">{{Object.keys(v.attributes).length == 1 ? Object.values(v.attributes).join().replace(/,/g,"(") : Object.values(v.attributes).join().replace(/,/g,"(").concat(')')}}</div>
                  </el-option>
                </el-select>
              </div>
              <div class="priceBox">
                <span
                  v-if="item.type == 'variable' && item.selectVariations"
                  class="salePriceRed"
                >
                  {{$store.getters.getCurrencySymbol}}{{item.selectVariations.shop_price}}
                  <span
                    style="text-decoration: line-through;"
                    v-show="item.selectVariations.shop_price != item.selectVariations.reference_price"
                  >
                    {{$store.getters.getCurrencySymbol}}{{item.selectVariations.reference_price}}
                  </span>
                </span>
                <span
                  v-if="item.type == 'simple'"
                  class="salePriceRed"
                >
                  {{$store.getters.getCurrencySymbol}}{{item.shop_price}}
                  <span
                    style="text-decoration: line-through;"
                    v-show="item.shop_price != item.reference_price"
                  >
                    {{$store.getters.getCurrencySymbol}}{{item.reference_price}}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </el-checkbox-group>
    </div>
  </div>
</template>

<script>
export default {
  name: "combinationProducts",
  props: {
    combination: {
      type: String | Object
    }
  },
  data() {
    return {
      watch: "",
      addCartLoading: false,
      totalShopPrice: 0,
      totalReferencePrice: 0,
      checkedEquipments: [], //随意修改后的checked项（即要传到后台的变更数据）
      newProductArr: [],
      productArr: []
    };
  },
  mounted() {
    this.init(this.$store.getters.getCombination);
  },
  computed: {
    promotionTotal() {
      let total = 0;
      let newArr = this.newProductArr;
      let arr = this.productArr;
      let { promotion_value } = this.$store.getters.getCombination;
      if (newArr.length == arr.length && this.watch) {
        for (let i = 0; i < arr.length; i++) {
          if (newArr[i].type == "variable") {
            let item = newArr[i].selectVariations;
            total +=
              Math.floor(Number(item.shop_price) * promotion_value * 100) / 100;
          } else {
            total +=
              Math.floor(
                Number(newArr[i].shop_price) * Number(promotion_value) * 100
              ) / 100;
          }
        }
      } else {
        for (let i = 0; i < newArr.length; i++) {
          if (newArr[i].type == "variable") {
            let item = newArr[i].selectVariations;
            total += Number(item.shop_price);
          } else {
            total += Number(newArr[i].shop_price);
          }
        }
      }
      return total;
    },
    promotionReferencePriceTotal() {
      let total = 0;
      let newArr = this.newProductArr;
      let arr = this.productArr;
      let { promotion_value } = this.$store.getters.getCombination;
      if (newArr.length == arr.length) {
        for (let i = 0; i < newArr.length; i++) {
          if (newArr[i].type == "variable") {
            let item = newArr[i].selectVariations;
            total += Number(item.reference_price);
          } else {
            total += Number(newArr[i].reference_price);
          }
        }
      }
      return total;
    }
  },
  methods: {
    goProductDetail(id){
      this.$router.push({
        path: "/product/" + id
      });
    },
    init(combination) {
      let arr = combination.items;
      //给el-checkbox-group赋默认值
      for (let i = 0; i < arr.length; i++) {
        let item = arr[i];
        this.checkedEquipments.push(item.goods_name);
      }
      this.productArr = arr;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].type == "variable") {
          //如果有默认选种sku
          if (arr[i].default_selected_sku) {
            let sku = arr[i].default_selected_sku;
            let variations = arr[i].variations;
            let obj;
            for (let key in variations) {
              obj = variations[sku];
            }
            //给selectOption赋默认值
            this.selectOption(i, obj);
          } else {
            arr[i]["selectValue"] = "";
          }
        }
        this.checkoutProduct(arr[i], i);
      }
    },
    //添加到购物车
    batchAddCart() {
      this.addCartLoading = true;
      let sku = '';
      let carts = [];
      let items = [];
      let subtotal = 0;
      let cartsArr = this.newProductArr;
      for (let i = 0; i < cartsArr.length; i++) {
        const obj = cartsArr[i];
        if (obj.type == "variable") {
          let { goods_id, sku_id, shop_price } = obj.selectVariations;
          carts.push({
            goods_id,
            sku_id,
            quantity: "1"
          });
          items.push({
            id: String(goods_id),
            name: String(obj.goods_name),
            price: Number(shop_price),
            quantity: 1
          });
          subtotal += Number(shop_price);
        } else {
          carts.push({
            goods_id: obj.goods_id,
            sku_id: obj.sku_id,
            quantity: "1"
          });
          items.push({
            id: String(obj.goods_id),
            name: String(obj.goods_name),
            price: Number(obj.shop_price),
            quantity: 1
          });
          subtotal += Number(obj.shop_price);
        }
      }
      if(cartsArr[0].type == "simple"){
        sku = cartsArr[0].sku_id;
      }else{
        sku = cartsArr[0].selectVariations.sku_id;
      }
      console.log(this.newProductArr, "batchAddCart", carts);
      this.$apis
        .batchAddCart({ carts })
        .then(res => {
          this.addCartLoading = false;
          if (res.status == 1) {
            this.buryingPoint.combinationAddToCart(
              String(cartsArr[0].goods_id),
              this.$store.getters.getApiHeader.currency,
              Number(subtotal),
              items,
              sku
            );
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
    },
    filter(item, key) {
      Array.prototype.indexOf = function(val) {
        for (var i = 0; i < this.length; i++) {
          if (this[i] == val) return i;
        }
        return -1;
      };
      Array.prototype.remove = function(val) {
        var index = this.indexOf(val);
        if (index > -1) {
          this.splice(index, 1);
        }
      };
      console.log(this.newProductArr, "this.newProductArr");
      if (!this.newProductArr.includes(item)) {
        console.log("+++//////////");
        // this.newProductArr.push(item);
        this.newProductArr.splice(key, 0, item);
      } else {
        this.newProductArr.remove(item);
      }
      // this.total(this.newProductArr);
    },
    checkoutProduct(item, key) {
      console.log(item, "vvv", key);
      this.filter(item, key);
    },
    selectOption(index, v) {
      let selectValue = "";
      if (Object.keys(v.attributes).length == 1) {
        selectValue = Object.values(v.attributes)
          .join()
          .replace(/,/g, "(");
      } else {
        selectValue = Object.values(v.attributes)
          .join()
          .replace(/,/g, "(")
          .concat(")");
      }
      this.productArr[index]["selectVariations"] = v;
      this.productArr[index]["selectValue"] = selectValue;
      this.watch = selectValue;
      // this.productArr[index] = Object.assign(this.productArr[index],this.productArr[index]);
      // this.$forceUpdate();
    }
    // total(selectProductArr) {
    //   if (selectProductArr.length) {
    //     let totalShopPrice = 0,
    //       totalReferencePrice = 0;
    //     for (let index = 0; index < selectProductArr.length; index++) {
    //       if (selectProductArr[index].selectVariations) {
    //         console.log(
    //           "有selectVariations",
    //           selectProductArr[index].selectVariations.shop_price
    //         );
    //         totalShopPrice += Number(
    //           selectProductArr[index].selectVariations.shop_price
    //         );
    //         totalReferencePrice += Number(
    //           selectProductArr[index].selectVariations.reference_price
    //         );
    //       } else {
    //         console.log(
    //           "无selectVariations",
    //           selectProductArr[index].shop_price
    //         );
    //         totalShopPrice += Number(selectProductArr[index].shop_price);
    //         totalReferencePrice += Number(
    //           selectProductArr[index].reference_price
    //         );
    //       }
    //     }
    //     this.totalShopPrice = Math.floor(totalShopPrice * 100) / 100;
    //     this.totalReferencePrice = Math.floor(totalReferencePrice * 100) / 100;
    //     console.log(this.totalShopPrice, "****totalShopPrice");
    //   }
    // }
  }
};
</script>

<style lang="scss" scoped>
.bought-together-box {
  border-bottom: 1px solid #ececec;
  margin-bottom: 30px;
  .boughtTitle {
    font-family: Ubuntu;
    font-size: 0.24rem;
    font-weight: bold;
    line-height: 0.28rem;
  }
  .boughtTil {
    color: #fff;
    width: 4.28rem;
    height: 0.35rem;
    background: $fontColorBlue;
    border-radius: 4px;
    font-family: Ubuntu;
    font-size: 0.18rem;
    line-height: 0.35rem;
    text-align: center;
    // padding: 0 0.08rem;
    margin: 0.28rem 0 0.25rem;
  }
  .selectProductShow {
    display: flex;
    align-items: center;
    .imgBoxParent {
      display: flex;
      margin-right: 30px;
      align-items: center;
      .img-box {
        display: flex;
        align-items: center;
        img {
          width: 2.86rem;
          height: 2.86rem;
          cursor: pointer;
        }
        .plus {
          color: #fff;
          width: 0.42rem;
          height: 0.42rem;
          font-size: 0.4rem;
          margin: 0 0.3rem;
          line-height: 0.36rem;
          text-align: center;
          border-radius: 50%;
          background: #dddddd;
        }
      }
      .img-box:last-child {
        .plus {
          display: none;
        }
      }
    }
    .totalPriceBox {
      align-self: baseline;
      .totalTil {
        font-size: 0.24rem;
        .totalPriceTil {
          font-family: Ubuntu;
          font-weight: bold;
        }
        .totalShopPrice {
          font-family: Ubuntu;
          font-weight: bold;
          color: $fontColorBlue;
        }
        .totalReferencePrice {
          font-family: Ubuntu;
          font-weight: bold;
          text-decoration-line: line-through;
        }
      }
      .addToCart {
        color: #fff;
        font-family: Ubuntu;
        font-size: 18px;
        line-height: 0.61rem;
        width: 3.05rem;
        height: 0.61rem;
        margin-top: 0.2rem;
        background: $fontColor1;
        text-align: center;
        cursor: pointer;
        .el-icon-loading {
          color: #fff;
          -webkit-animation: rotating 2s linear infinite;
          animation: rotating 2s linear infinite;
        }
      }
    }
  }
  .selectProduct {
    margin-top: 0.2rem;
    margin-bottom: 1.96rem;
    .checkboxContent {
      .checkboxBox:first-child {
        .el-checkbox__label {
          p {
            font-weight: bold;
          }
        }
        .checkboxOper {
          .priceBox {
            .salePriceRed {
              font-weight: bold;
              span {
                font-weight: bold;
              }
            }
          }
        }
      }
      .checkboxBox {
        display: flex;
        label {
          opacity: 0.5;
        }
        /deep/ .is-checked {
          opacity: 1;
        }
        .el-checkbox {
          display: flex;
          align-items: center;
          margin: 0.3rem 0;
          /deep/ .el-checkbox__inner:after {
            width: 0.06rem;
            height: 0.1rem;
            left: 0.06rem;
            top: 0.01rem;
          }
          /deep/ .el-checkbox__input.is-checked .el-checkbox__inner {
            background-color: $fontColorBlue;
            border-color: $fontColorBlue;
          }
          /deep/ .el-checkbox__inner {
            width: 0.22rem !important;
            height: 0.22rem !important;
          }
          .goods-name {
            width: 5.9rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          /deep/ .el-checkbox__label {
            display: flex;
            align-items: center;
            font-size: 20px;
            font-family: Ubuntu;
          }
        }
        .checkboxOper {
          display: flex;
          align-items: center;
          .selectBox {
            margin: 0 20px;
            .long {
              /deep/ .el-input__inner {
                min-width: 160px !important;
                width: 120px !important;
              }
            }
            /deep/ input {
              width: 146px;
              height: 32px;
              border-radius: 0;
              font-weight: bold;
            }
          }
          .priceBox {
            font-size: 20px;
            .salePriceRed {
              color: $fontColorBlue;
            }
          }
        }
      }
    }
  }
}
.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background-color: $fontColorBlue;
  /deep/ div {
    color: #fff !important;
  }
}
.el-select-dropdown__item.is-disabled {
  display: none;
}
/deep/ .el-select-dropdown__item {
  /deep/ div {
    font-weight: bold !important;
  }
}
</style>
