<template>
  <div
    class="coat"
  >
    <a onclick="return false;" @click="toShopDetail((shopObj.seo_url || shopObj.goods_id), shopObj.goods_name)" class="imgCoat grid-product__link" :href="'/product/' + (shopObj.seo_url || shopObj.goods_id)">
      <img
          v-lazy="shopObj.image"
          class="shopImg"
        >
      <div :style="'background-image: url('+ shopObj.image_hover + ')'" class="grid-product__secondary-image small--hide lazyloaded"></div>
      <img v-if="$route.name == 'user-wishList'" @click="addToWishList(shopObj.goods_id)" :src="is_favorite != 0 ? heratImg[0] : heratImg[1]" class="heart" alt="">
      <div
        class="huiCoat"
        v-if="shopObj.discount"
      >
        <span>SAVE {{ shopObj.discount }}</span>
      </div>
    </a>
    <p class="shopTitle">{{shopObj.goods_name}}</p>
    <div class="commentRating" v-if="Number(shopObj.comment_rating)">
      <el-rate
        :value="Number(shopObj.comment_rating)"
        disabled
        allow-half
        text-color="#FF6263"
        :colors="starColor"
        disabled-void-color="#d8d9dc"
        score-template="{ value }"
      ></el-rate>
      <div
        class="rate"
      >({{shopObj.comment_rating}})</div>
    </div>
    <div class="priceCoat">
      <p class="nowPrice">
        {{$store.getters.getCurrencySymbol}}{{shopObj.shop_price}}
      </p>
      <p
        class="yuanPrice"
        v-if="shopObj.shop_price != shopObj.reference_price"
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
    },
    index: {
      type: Number
    }
  },
  data() {
    return {
      starColor: ["#FFD282",'#FFD282','#FFD282'],
      is_favorite: 1, //是否收藏 0代表未收藏 1代表已收藏
      heratImg: [
        require("../../static/images/icon/red_heart.png"),
        require("../../static/images/icon/close_heart.png")
      ],
    }
  },
  watch: {
    shopObj: {
      handler(value) {
        this.is_favorite = 1;
      },
      deep: true
    }
  },
  methods: {
    toShopDetail(id, name) {
      this.buryingPoint.productClick(id, name);
      this.$router.push({
        path: "/product/" + id
      });
    },
    //添加至心愿单
    addToWishList(goods_id){
      if(!this.$store.getters.getLoginToken){
        this.$router.push({
          path: "/login"
        });
        return;
      }
      let obj = {
        goods_id
      }
      this.$apis
        .favorite(obj)
        .then(res => {
          if (res.status == 1) {
            if(res.data.item){
              this.is_favorite = 1;
            }else{
              this.is_favorite = 0;
            }
          } else {
            this.common.msgBox(this, res.msg, 3);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
  }
};
</script>

<style lang="scss" scoped>
.coat:hover {
  .grid-product__secondary-image{
    opacity: 1!important;
  }
}
.coat {
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  .grid-product__link{
    display: block;
    text-decoration: none;
  }
  .imgCoat {
    width: 276px;
    height: 276px;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    .grid-product__secondary-image{
      position: absolute;
      top: -1px;
      left: -1px;
      right: -1px;
      bottom: -1px;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: 50%;
      opacity: 0;
    }
    .lazyloaded{
      transition: opacity 0.4s ease;
    }
    a {
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
    .heart{
      position: absolute;
      top: 0;
      left: 0;
      width: 22px;
      height: 20px;
      margin: 14px 14px 14px;
    }
    .huiCoat {
      background: #3B65B3;
      position: absolute;
      top: 0;
      right: 0;
      display: flex;
      align-items: center;
      height: 26px;
      width: 90px;
      justify-content: center;
      span {
        color: #fff;
        font-size: 12px;
      }
    }
  }
  .shopTitle {
    width: 276px;
    font-size: 18px;
    padding: 2px 0 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 300;
    line-height: 26px;
    margin-top: 10px;
    // display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  .commentRating{
    display: flex;
    margin: 12px 0;
    justify-content: space-between;
    align-items: center;
    width: 276px;
    /deep/ .el-rate{
      display: flex;
    }
    /deep/ .el-rate__icon{
      margin-right: 0;
    }
    .rate{
      font-size: 18px;
      margin-right: 92px;
    }
  }
  .priceCoat {
    display: flex;
    align-items: flex-end;
    flex-direction: row;
    color: #111;
    .nowPrice {
      font-size: 14px;
      color: #3B65B3;
    }
    .yuanPrice {
      padding-left: 8px;
      opacity: 0.6;
      font-size: 14px;
      position: relative;
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
}
</style>
