<template>
    <div class="shopCoat moduleOne">
      <p class="til2">{{$t('home.MOSTPOPULAR')}}</p>
      <p class="til">{{shopList.breadcrumb[0].category_name}}</p>
      <div class="el-icon-arrow-left"
            v-if="shopList.items.length > 4 && progress"
            @click="slidePrev"
          ></div>
          <div
            class="el-icon-arrow-right"
            v-if="shopList.items.length > 4 && progress != 1"
            @click="slideNext"
          ></div>
      <client-only v-if="swiperOption">
        <swiper :options="swiperOption" ref="mySwiper">
          <swiper-slide v-for="(item,index) in shopList.items" :key="'moduleOne'+index">
            <div class="listCoat" >
              <shop-card :index="index"
                class="listItem"
                :shopObj="item"
              ></shop-card>
            </div>
          </swiper-slide>
        </swiper>
      </client-only>
      <div class="btnCoat">
        <button @click="toShopList">
          {{$t('header.ViewAll')}}
          <img src="../../static/images/icon/rightJian.png" alt="">
        </button>
      </div>
    </div>
</template>

<script>
  import shopCard from "@/components/listCard/listCard";
  let vm = null;
  export default {
    name:'moduleOne',
    components:{
      shopCard
    },
    props:{
      shopList:{
        type:Object
      }
    },
    watch:{
      swiperOption:{
        deep:true
      }
    },
    data(){
      return {
        progress: 0,
        swiperOption: {
          slidesPerView: 4,
          slidesPerGroup: 4,
          spaceBetween: 0,
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
        },
      }
    },
    created(){
      vm = this;
    },
    methods:{
      slidePrev(){
        let { swiper } = this.$refs.mySwiper;
        swiper.slidePrev();
        console.log(22222)
        this.progress = swiper.progress;
      },
      toShopList(){
        this.$router.push({
          path:"/categories",
          query:{
            category:720000,
            navName: 'Decor'
          }
        })
      },
      slideNext(){
        let { swiper } = this.$refs.mySwiper;
        swiper.slideNext();
        console.log(33333333)
        this.progress = swiper.progress;
      },
    }
  }
</script>

<style lang="scss" scoped>
.moduleOne{
  margin: 0 -11px;
}
  .listCoat {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    .listItem {
      width: 276px;
    }
  }
  .el-icon-arrow-left,
  .el-icon-arrow-right {
    width: 40px;
    height: 40px;
    background-color: $btnBjColor;
    border-radius: 50%;
    display: flex;
    font-size: 16px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10;
    font-weight: bold;
    color: #fff;
    @include ct;
    line-height: 120px;
  }
  .el-icon-arrow-left {
    left: 0px;
    top: 237px;
  }
  .el-icon-arrow-right {
    top: 237px;
    right: -9px;
  }
  .til2 {
    text-align: center;
    font-size: 16px;
    margin-top: 90px;
    margin-bottom: 8px;
  }
  .til {
    text-align: center;
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 40px;
  }
  .btnCoat {
    font-size: 0;
    margin-top: 40px;
    text-align: center;
    button {
      cursor: pointer;
      font-size: 16px;
      background-color: $btnBjColor;
      color: #fff;
      height: 48px;
      width: 200px;
      display: flex;
      margin: auto;
      align-items: center;
      justify-content: center;
      img {
        height: 6px;
        margin-left: 8px;
        width: 14px;
      }
    }
    button:hover {
      background-color: $buttonBlueHover;
    }
  }
</style>
