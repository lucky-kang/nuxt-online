<template>
  <div
    :class="changeWidth ? 'changeWidth' : 'recommendCoat'"
    v-if="recommendArr.length"
  >
    <h4 class="may-like">{{ $t("alsoLike.MAYALSOLIKE") }}</h4>
    <div
      v-if="recommendArr.length > 4 && progress"
      class="el-icon-arrow-left"
      @click="slidePrev"
    ></div>
    <div
      v-if="recommendArr.length > 4 && progress != 1"
      class="el-icon-arrow-right"
      @click="slideNext"
    ></div>
    <client-only v-if="swiperOption">
      <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide
          v-for="(item, index) in recommendArr"
          :key="index"
        >
          <list-card class="shopItem" :shopObj="item"></list-card>
        </swiper-slide>
      </swiper>
    </client-only>
  </div>
</template>

<script>
let vm = null;
import listCard from "@/components/listCard/listCard";
export default {
  name: "mayLike",
  props: {
    types: {
      type: Number,
      value: 1
    }
  },
  data() {
    return {
      testImg:
        "https://cdn.foroo.co.uk/wp-content/uploads/2020/03/315531200569540608.jpg",
      recommendArr: [],
      progress : 0,
      arrowRight: true,
      swiperOption: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 32,
        slideClass: "custom-slide-class",
        //设置点击箭头
        paginationClickable: true,
        navigation: {
          prevEl: ".el-icon-arrow-left",
          nextEl: ".el-icon-arrow-right"
        },
        //开启无限循环
        loop: true,
        on: {
          slideChange: () => {
            // 通过$refs获取对应的swiper对象
            let { swiper } = this.$refs.mySwiper;
            vm.progress = swiper.progress;
          }
        }
      }
    };
  },
  created() {
    vm = this;
  },
  mounted() {
    if (this.types == 3) {
      this.getCartRecommend();
    } else if (this.types == 2) {
      this.getProductRecommend();
    }
  },
  computed: {
    changeWidth() {
      return this.types == 3;
    }
  },
  methods: {
    slidePrev(){
      let { swiper } = this.$refs.mySwiper;
      swiper.slidePrev();
      this.progress = swiper.progress;
    },
    slideNext(){
      let { swiper } = this.$refs.mySwiper;
      swiper.slideNext();
      this.progress = swiper.progress;
    },
    getCartRecommend() {
      let thif = this;
      this.$apis
        .mayLikeShop({ page: 1, per_page: 12, type: 3 })
        .then(res => {
          // console.log(res);
          if (res.status == 1) {
            thif.recommendArr = res.data.items;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getProductRecommend() {
      //刷新页面取不到父组件传的id换成$route.params传参
      let { id } = this.$route.params;
      let thif = this;
      this.$apis
        .mayLikeShop({ page: 1, per_page: 16, goods_id: id, type: 2 })
        .then(res => {
          if (res.status == 1) {
            thif.recommendArr = res.data.items;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    toShopDetail(id, name) {
      this.buryingPoint.productClick(id, name);
      this.$router.push({
        path: "/product/" + id
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.changeWidth {
  cursor: pointer;
  margin: 0 0px 68px;
  position: relative;
  /deep/ .imgCoat{
    width: 176px;
    height: 176px;
  }
  /deep/ .shopTitle{
    width: 176px;
  }
  /deep/ .el-icon-arrow-left,/deep/ .el-icon-arrow-right {
    width: 40px;
    height: 40px;
    background: #172D55;
    border-radius: 50%;
    display: flex;
    font-size: 16px;
    align-items: center;
    justify-content: center;
    top: 42%!important;
    z-index: 10;
    font-weight: bold;
    color: #fff;
    @include ct;
    line-height: 120px;
  }
  .el-icon-arrow-left {
    left: -20px;
  }
  .el-icon-arrow-right {
    right: -20px;
  }
  .may-like {
    font-size: 24px;
    line-height: 28px;
    color: $fontColor1;
    margin-bottom: 26px;
  }
}
.changeWidth:hover {
  .el-icon-arrow-left,
  .el-icon-arrow-right {
    opacity: 1;
  }
}
.recommendCoat {
  cursor: pointer;
  margin: 0 0px 68px;
  position: relative;
  .el-icon-arrow-left,
  .el-icon-arrow-right {
    width: 40px;
    height: 40px;
    background: #172D55;
    border-radius: 50%;
    display: flex;
    font-size: 16px;
    align-items: center;
    justify-content: center;

    z-index: 10;
    font-weight: bold;
    color: #fff;
    @include ct;
    line-height: 120px;
  }
  .el-icon-arrow-left {
    left: -20px;
  }
  .el-icon-arrow-right {
    right: -20px;
  }
  .may-like {
    font-size: 24px;
    line-height: 28px;
    color: $fontColor1;
    margin-bottom: 26px;
  }
}
.recommendCoat:hover {
  .el-icon-arrow-left,
  .el-icon-arrow-right {
    opacity: 1;
  }
}
</style>
