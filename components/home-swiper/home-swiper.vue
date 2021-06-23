<template>
  <div
    class="swiperCoat"
  >
    <client-only v-if="imgArr.length>1">
      <swiper :options="swiperOption">
        <swiper-slide
          v-for="item in imgArr"
          :key="item.id"
        >
          <img
            :src="item.image"
            :id="JSON.stringify(item)"
            class="bannerImg swiper-lazy"
          >
        </swiper-slide>
        <div
          class="swiper-pagination"
          slot="pagination"
        ></div>
        <div
          class="swiper-button-prev swiper-button-white"
          slot="button-prev"
        ></div>
        <div
          class="swiper-button-next swiper-button-white"
          slot="button-next"
        ></div>
      </swiper>
    </client-only>
    <div
      class="only-img-box"
      v-else
      v-for="(item, index) in imgArr"
      :key="index"
      @click="toDetail(item)"
    >
      <img :src="item.image">
    </div>
  </div>
</template>
<script>
let vm = null;
export default {
  name: "homeSwiper",
  props: {
    imgArr: {
      type: Array
    }
  },
  data() {
    return {
      swiperOption: {
        //显示分页
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        //开启无限循环
        loop: true,
        // lazy: true,
        autoplay: {
          delay: 5000
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        on: {
          click(event) {
            let item = event.target.id;
            let { relation_id, type, url } = JSON.parse(item);
            console.log(relation_id, "relation_id", type);
            if (type == "no_jump") {
              return;
            }
            if (type == "product") {
              console.log("******");
              vm.$router.push({
                path: "/product/" + relation_id
              });
              return;
            }
            if (type == "activity") {
              console.log("activity");
              vm.$router.push({
                path: "/activitys",
                query: {
                  id: relation_id
                }
              });
              return;
            }
            if (type == "invitation_page") {
              vm.$router.push({ path: "/invitation" });
              return;
            }
            if (type == "webview") {
              window.location = url;
              return;
            }
            if (type == "category") {
              vm.$router.push({
                path: "/categories",
                query: {
                  category: relation_id
                }
              });
              return;
            }
            if (type == "tag") {
              vm.$router.push({
                path: "/categories",
                query: {
                  category: relation_id
                }
              });
              return;
            }
          }
        }
      },
      bannerList: [],
      bannerLoading: false
    };
  },
  created() {
    vm = this;
  },
  mounted() {
    // this.getBanner();
  },
  methods: {
    //获取banner
    getBanner() {
      this.bannerLoading = true;
      this.$apis
        .getLayout()
        .then(res => {
          if (res.status == 1) {
            this.bannerLoading = false;
            let list = res.data.items;
            for (var index = 0; index < list.length; index++) {
              if (list[index].type == "trending") {
                if (list[0].layout[0].type == "banners") {
                  this.bannerList = list[0].layout[0].list;
                }
              }
            }
          } else {
            this.bannerLoading = false;
            this.common.msgBox(this, res.msg, 3);
          }
        })
        .catch(error => {
          this.bannerLoading = false;
          console.log(error);
        });
    },
    toDetail(obj) {
      console.log('单个',obj)
      let { relation_id, type, url } = obj;
      if (type == "no_jump") {
        return;
      }
      if (type == "product") {
        console.log("******");
        this.$router.push({
          path: "/product/" + relation_id
        });
        return;
      }
      if (type == "activity") {
        console.log("activity");
        this.$router.push({
          path: "/activitys",
          query: {
            id: relation_id
          }
        });
        return;
      }
      if (type == "invitation_page") {
        this.$router.push({ path: "/invitation" });
        return;
      }
      if (type == "webview") {
        window.location = url;
        return;
      }
      if (type == "category") {
        this.$router.push({
          path: "/categories",
          query: {
            category: relation_id
          }
        });
        return;
      }
      if (type == "tag") {
        this.$router.push({
          path: "/categories",
          query: {
            category: relation_id
          }
        });
        return;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.bannerImg {
  cursor: pointer;
  // width: 100%;
  width: 14.8rem !important;
}
.swiper-button-prev,
.swiper-container-rtl .swiper-button-next {
  background-image: url(~@/static/images/icon/lunboLeft.png);
  background-size: 36px;
}
.swiper-button-next,
.swiper-container-rtl .swiper-button-prev {
  background-image: url(~@/static/images/icon/lunboRight.png);
  background-size: 36px;
}
.swiperCoat {
  width: 14.8rem;
  height: 4.34rem;
  min-width: 14.8rem;
  min-height: 4.34rem;
  text-align: center !important;
  position: relative;
  margin: 0 auto;
  .swiper-button-next,
  .swiper-button-prev {
    width: 36px;
    height: 36px;
    color: #fff;
    opacity: 0;
    transition: opacity 0.5s, color 0.5s;
  }
  img {
    max-height: 100%;
    max-width: 100%;
  }
  .only-img-box {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.swiperCoat:hover {
  cursor: pointer;
  .swiper-button-next,
  .swiper-button-prev {
    opacity: 1;
  }
}
/deep/ .swiper-pagination-bullet {
  width: 60px;
  height: 4px;
  border-radius: 0%;
  opacity: 0.3 !important;
}
/deep/ .swiper-pagination-bullet-active {
  background-color: #fff;
  opacity: 1 !important;
}
</style>
