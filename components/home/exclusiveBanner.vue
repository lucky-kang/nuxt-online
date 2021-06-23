<template>
	<div class="exclusiveBannerCoat">
		<!-- <client-only>
			<swiper :options="swiperOption">
				<swiper-slide v-for="(item, index) in imgArr" :key="index">
          <img src="~/static/images/img/banner_exclusive.png">
				</swiper-slide>
			</swiper>
		</client-only> -->
    <img src="~/static/images/img/banner_exclusive.png">
	</div>
</template>

<script>
export default {
  name: "exclusiveBanner",
  props: {
    
  },
  data() {
    return {
      swiperOption: {
        //设置点击箭头
        paginationClickable: true,
        navigation: {
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next"
        },
        //开启无限循环
        loop: true
      },
      imgArr: []
    };
  },
  created() {},
  mounted() {},
  methods: {
	toDetail(obj){
        if(obj.id){
          this.$router.push({
            path:'/product/'+obj.id,
          })
        }
        if(obj.active){
          this.$router.push({
            path:'/activityTemplate/_page',
            query:{
              id: obj.active
            }
          })
        }
        if(obj.invite){
          this.$router.push({path:'/invitation'})
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
.bannerImg {
  cursor: pointer;
}
.exclusiveBannerCoat {
  width: 100%;
  height: 300px;
  position: relative;
  // padding: 30px 0 0;
  .swiper-button-next,
  .swiper-button-prev {
    width: 36px;
    height: 36px;
    color: #fff;
    margin-top: 0;
    opacity: 0.7;
    // border-radius: 50%;
  }
  // .swiper-button-next:hover, .swiper-button-prev:hover {
  //   background-color: $bjColor;
  // }
  img {
    max-height: 100%;
    max-width: 100%;
  }
}
/deep/ .swiper-pagination-bullet {
  width: 60px;
  height: 4px;
  // background-color: transparent;
  // border: 3px solid #fff;
  border-radius: 0%;
  opacity: 0.4 !important;
}
/deep/ .swiper-pagination-bullet-active {
  background-color: #fff;
  border-color: #fff;
  opacity: 1 !important;
}
</style>
