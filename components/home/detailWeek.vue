<template>
  <div class="dealsWeekCoat" v-loading="loading">
    <div v-if="DealsWeekData.length > 4" class="el-icon-arrow-left"></div>
    <div v-if="DealsWeekData.length > 4" class="el-icon-arrow-right"></div>
    <client-only v-if="swiperOption">
      <swiper :options="swiperOption" class="shopItem">
        <swiper-slide v-for="(item, index) in DealsWeekData" :key="index">
          <div>
            <a onclick="return false" :href="'/product/'+ item.goods_id" class="img-a">
              <img v-lazy="item.image" class="shopImg" @click="toShopDetail(item.goods_id,item.goods_name)">
            </a>
            <p class="shopTitle">{{item.goods_name}}</p>  
            <div class="priceCoat">
              <p class="nowPrice">
                {{ $store.getters.getCurrencySymbol }}{{item.shop_price}}
              </p>
              <p
                class="yuanPrice"
                v-if="item.discount"
              >&nbsp;{{$store.getters.getCurrencySymbol}}{{ item.reference_price }}</p>
            </div>
            <div class="huiCoat" v-if="item.discount">
              <!-- <img src="~/static/images/icon/tag_discount.png" class="huiImg"> -->
              <span>{{ item.discount }}</span>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </client-only>
  </div>
</template>

<script>
export default {
  name: "detailWeek",
  props: {
    DealsWeekData: {
      type: Array
    }
  },
  data() {
    return {
      dealsWeekArr: [],
      swiperOption: "",
      loading: false
    };
  },
  mounted() {
    this.swiperOption = {
      slidesPerView: 4,
      slidesPerGroup: 4,
      spaceBetween: 54,
      slideClass: "custom-slide-class",
      //设置点击箭头
      paginationClickable: true,
      navigation: {
        prevEl: ".el-icon-arrow-left",
        nextEl: ".el-icon-arrow-right"
      },
      //开启无限循环
      loop: true
    };
  },
  methods: {
    toShopDetail(id,name) {
      this.buryingPoint.productClick(id,name);
      this.$router.push({
        path: "/product/" + id
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.dealsWeekCoat {
  margin-bottom: 60px;
  position: relative;
  .el-icon-arrow-left,
  .el-icon-arrow-right {
    z-index: 10;
    font-size: 40px;
    font-weight: bold;
    // color: #777777;
    color: #fff;
    opacity: 0;
    position: absolute;
    top: 25%;
    height: 120px;
    width: 40px;
    line-height: 120px;
    background: hsla(0,0%,73%,0.3);
    transition: opacity 0.5s, color 0.5s, background-color 0.5s;
  }
  .el-icon-arrow-left {
    left: -20px;
  }
  .el-icon-arrow-right {
    right: -20px;
  }
  .detailWeek {
    margin: 40px auto 60px;
    display: block;
  }
  .shopItem {
    position: relative;
    .img-a{
      width: 3.4rem;
      height: 3.4rem;
      display: block;
    }
    .shopImg {
      width: 100%;
      height: 100%;
    }
    .shopTitle {
      width: 100%;
      // width: 312.5px;
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
      padding: 0 4px;
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
        margin-left: 2px;
        @include center;
        background-color: #111;
      }
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
}
.dealsWeekCoat:hover {
  cursor: pointer;
  .el-icon-arrow-left,
  .el-icon-arrow-right {
    opacity: 1;
  }
}
</style>
