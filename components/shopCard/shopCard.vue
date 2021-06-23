<template>
  <div class="coat">
    <div class="imgCoat" @click="toShopDetail(shopObj.goods_id,shopObj.goods_name)">
      <!-- <img v-lazy="shopObj.image" class="shopImg"> -->
      <a onclick="return false" :href="'/product/'+ shopObj.goods_id">
        <img v-lazy="shopObj.image" class="shopImg">
      </a>
      <div class="huiCoat" v-if="shopObj.discount">
        <span>{{ shopObj.discount }}</span>
      </div>
    </div>
    <p class="shopTitle">{{shopObj.goods_name}}</p>
    <div class="priceCoat">
      <p class="nowPrice">{{$store.getters.getCurrencySymbol}}{{shopObj.shop_price}}</p>
      <p
        class="yuanPrice"
        v-if="shopObj.discount"
      >&nbsp;{{$store.getters.getCurrencySymbol}}{{ shopObj.reference_price }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "shopCard",
  props: {
    shopObj: {
      type: Object
    }
  },
  methods: {
    toShopDetail(id, name) {
      this.buryingPoint.productClick(id,name);
      this.$router.push({
        path: "/product/" + id
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.coat:hover .shopImg {
  transform: scale(1.1) !important;
}
.coat {
  width: 100%;
  display: flex;
  flex-direction: column;
  .imgCoat {
    // width: 100%;
    width: 3.4rem;
    min-width: 3.4rem;
    min-height: 3.4rem;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    a{
      width: 100%;
      height: 100%;
      display: block;
    }
    .shopImg {
      transition: transform 0.5s;
      transform: scale(1);
      width: 100%;
      height: 100%;
    }
    .huiCoat {
      background: url(/images/icon/tag_discount_bg.png) center no-repeat;
      line-height: 0;
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      height: .45rem;
      width: .45rem;
      justify-content: center;
      background-size: contain;
      span {
        color: #fff;
        font-size: 14px;
        font-weight: bold;
      }
      // .huiImg {
      //   margin-right: 5px;
      //   height: 32px;
      // }
    }
  }
  .shopTitle {
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
  .priceCoat {
    display: flex;
    align-items: flex-end;
    flex-direction: row;
    color: #111;
    .nowPrice {
      font-size: 24px;
      color: #282828;
    }
    .yuanPrice {
      padding: .02rem .04rem;
      opacity: 0.6;
      font-size: 20px;
      position: relative;
    }
    .yuanPrice::after {
      content: "";
      height: 1px;
      width: 100%;
      margin-left: .02rem;
      @include center;
      background-color: #111;
    }
  }
}
</style>
