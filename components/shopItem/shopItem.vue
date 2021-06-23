<template>
  <div class="itemCoat" @click="toDetail(shopObj.id)">
    <div class="imgCoat">
      <img v-lazy="shopObj.image">
      <div class="shopTil" v-if="shopObj.discount">
        <img src="~/static/images/icon/tag_discount.png">
        <p>{{shopObj.discount}}</p>
      </div>
    </div>
    <div class="shopName">{{shopObj.goods_name}}</div>
    <div class="shopPrice">
      <p
        class="price1"
      >{{shopObj.moneyFu!='₫'?shopObj.moneyFu:''}}{{shopObj.shop_price|shop_price}}{{shopObj.moneyFu=='₫'?shopObj.moneyFu:''}}</p>
      <div v-if="shopObj.shop_price!=shopObj.reference_price">
        <span
          class="price2"
        >{{shopObj.moneyFu!='₫'?shopObj.moneyFu:''}}{{shopObj.reference_price|shop_price}}{{shopObj.moneyFu=='₫'?shopObj.moneyFu:''}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "shopItem",
  props: {
    shopObj: {
      type: Object
    }
  },
  data() {
    return {
      shop_price: this.common.addDouhao(this.shopObj.shop_price)
    };
  },
  created() {
    this.shopObj.moneyFu = this.$store.getters.getCurrencySymbol;
  },
  mounted() {
    console.log(this.shopObj.moneyFu);
    let boxWidth = document.querySelector(".shopPrice").clientWidth;
    let item1Width = document.querySelector(".price1").clientWidth;
    let item2Width = document.querySelector(".price2").clientWidth;
    if (boxWidth < item1Width + item2Width + 20) {
      let baifenbi = boxWidth / (item1Width + item2Width + 40);
      document.querySelector(".price1").style.fontSize =
        0.17 * baifenbi + "rem";
      document.querySelector(".price2").style.fontSize =
        0.12 * baifenbi + "rem";
    }
  },
  methods: {
    toDetail(id) {
      // this.common.buryingPoint({
      //   action: "event_tracking",
      //   event_name:'Event_Leftover_item_click',
      //   properties: {
      //     Product_ID:id
      //   }
      // })
      this.$router.push({
        path: "/product/" + id
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.coat {
  padding: 58px 146px;
}
.orangeBtn {
  display: flex;
  flex-direction: row;
}
.itemCoat {
  width: 100%;
  display: flex;
  cursor: pointer;
  background-color: #fff;
  flex-direction: column;
  overflow: hidden;
  .imgCoat {
    width: 3.4rem;
    height: 3.4rem;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .shopTil {
    width: 65px;
    height: 27px;
    position: absolute;
    left: 10px;
    top: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    color: #fff;
    padding: 0 4px;
    font-size: 12px;
    background-color: $fontColorBlue;
    p {
      font-size: 14px;
      color: #fff;
      margin: 0 8px;
    }
    img {
      height: 15px;
    }
  }
  .shopTil2 {
    background-color: #f94141;
  }
  .shopName {
    width: 3.4rem;
    padding: .02rem .04rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: Ubuntu;
    font-weight: 300;
    font-size: 14px;
    line-height: .26rem;
    color: $fontColor1;
  }
  .shopPrice {
    display: flex;
    color: rgba(16, 16, 16, 1);
    line-height: 17px;
    margin-top: 6px;
    .price1 {
      font-family: Ubuntu;
      font-size: 24px;
      line-height: 28px;
      color: #282828;
    }
    .price2 {
      margin-left: 10px;
      vertical-align: top;
      font-family: Ubuntu;
      font-weight: 300;
      font-size: 20px;
      line-height: 28px;
      text-decoration-line: line-through;
      color: #999999;
    }
  }
}
</style>
