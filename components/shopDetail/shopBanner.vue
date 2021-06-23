<template>
  <div>
    <div class="coat">
      <div class="imgListCoatBox">
        <div class="imgListCoat">
          <div class="itemCoatPrev" @click="itemCoatPrev">
            <img src="~/static/images/icon/arrow-top.png">
          </div>
          <div class="itemCoatNext" @click="itemCoatNext">
            <img src="~/static/images/icon/arrow-down.png">
          </div>
          <div
            ref="imgListCoat"
            v-for="(item, index) in imgArr"
            :key="index"
            class="itemCoat"
            :class="index == swiperPages ? 'activeItem' : ''"
            @click="selectImg(index,item)"
          >
            <img v-lazy="item.image">
            <img v-if="item.type == 1" class="palyVideo" src="~/static/images/icon/palyVideo.png" alt="">
          </div>
        </div>
      </div>
      <div class="swiperCoat_">
        <videoCamp v-if="selectedImg" :item="selectedImg"></videoCamp>
        <div class="off_bubble" v-if="huiNum">
          <span>SAVE {{ huiNum }}</span>
        </div>
      </div>
    </div>
    <div class="share-list">
      <a
        @click="emailShare"
        :href="'mailto:example@gmail.com?subject='+shopData.goods_name+'&body='+share_link"
      >
        <img src="~static/images/icon/icon_email.png">
      </a>
      <a>
        <img @click="facebookShare" src="~static/images/icon/icon_facebook.png">
      </a>
      <a>
        <img @click="twiterShare" src="~static/images/icon/icon_twitter.png">
      </a>
      <a>
        <img @click="whatsappShare" src="~static/images/icon/icon_whatsapp.png">
      </a>
      <a @click="instagramShare" href="//www.instagram.com/frissonlife_official/" target="_blank">
        <img src="~static/images/icon/icon_ins.png">
      </a>
      <a @click="messengerShare" href="https://m.me/" target="_blank">
        <img src="~static/images/icon/icon_messenger.png">
      </a>
      <a>
        <img
          @click="copy()"
          :data-clipboard-text="share_link"
          id="copyShareLink"
          src="~static/images/icon/icon_link.png"
        >
      </a>
    </div>
    <!-- v-if="dialogVisible":每次打开el-dialog时初始化，目的让el-carousel组件的initial-index值生效同步初始化更新el-carousel组件 -->

    <!-- destroy-on-close="true"：每次关闭el-dialog时销毁Dialog中的元素，做清空操作 -->
    <el-dialog
      width="40%"
      v-if="dialogVisible"
      @close="closeDialog"
      :destroy-on-close="true"
      :visible.sync="dialogVisible"
    >
      <button
        type="button"
        @click="prev"
        class="el-carousel__arrow el-carousel__arrow--left"
        style="position: absolute;"
      >
        <i class="el-icon-arrow-left"></i>
      </button>
      <el-carousel
        ref="carouselBanner"
        :height="bannerHeight + 'px'"
        :initial-index="swiperPages"
        indicator-position="none"
        :autoplay="false"
        arrow="never"
      >
        <el-carousel-item v-for="(item, index) in imgArr" :key="index">
          <img :src="item" ref="carouselImg">
        </el-carousel-item>
      </el-carousel>
      <button
        type="button"
        @click="next"
        class="el-carousel__arrow el-carousel__arrow--right"
        style="position: absolute;"
      >
        <i class="el-icon-arrow-right"></i>
      </button>
    </el-dialog>
  </div>
</template>

<script>
import videoCamp from "@/components/videoCamp/videoCamp";
export default {
  name: "shopBanner",
  props: {
    shopData: {
      type: Object
    },
    imgArr: {
      type: Array
    },
    huiNum: {
      type: String
    },
    selectedImg: {
      type: Object
    }
  },
  components: {
    videoCamp
  },
  head() {
    return {
      script: [
        {
          src:
            "https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js"
        },
        {
          src:
            "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"
        }
      ]
    };
  },
  data() {
    return {
      selectedImg_: "",
      currentPosition: 5, //滚动值
      swiperPages: 0,
      dialogVisible: false,
      bannerHeight: 600,
      swiperOptionThumbs: {
        loop: true,
        loopedSlides: 7, // looped slides should be the same
        direction: "vertical"
      },
      swiperOption: {
        //设置点击箭头
        paginationClickable: true,
        navigation: {
          prevEl: ".el-icon-arrow-left",
          nextEl: ".el-icon-arrow-right"
        },
        //开启无限循环
        // loop: true,
        on: {
          slideChange: () => {
            // 通过$refs获取对应的swiper对象
            let { swiper } = this.$refs.mySwiper;
            this.swiperPages = swiper.activeIndex;
          }
        }
      },
      share_link: ""
    };
  },
  mounted() {
    this.share_link = window.location.href;
    let _this = this;
  },
  methods: {
    //email分享
    emailShare() {
      this.buryingPoint.Share("email", this.shopData.id);
    },
    //facebook分享
    facebookShare() {
      this.buryingPoint.Share("facebook", this.shopData.id);
      let url = this.share_link;
      window.open(
        "http://www.facebook.com/sharer.php?u=" +
          encodeURIComponent(url) +
          "&t=" +
          encodeURIComponent(document.title),
        "_blank",
        "toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=600, height=450,top=100,left=350"
      );
    },
    //twiter分享
    twiterShare() {
      this.buryingPoint.Share("twitter", this.shopData.id);
      let url = this.share_link;
      window.open(
        "http://twitter.com/share?url=" +
          encodeURIComponent(url) +
          "&text=" +
          encodeURIComponent(document.title),
        "_blank",
        "toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=600, height=450,top=100,left=350"
      );
    },
    //whatsapp分享
    whatsappShare() {
      this.buryingPoint.Share("whatsapp", this.shopData.id);
      let url = this.share_link;
      window.open(
        "whatsapp://send?text=" +
          encodeURIComponent(document.title) +
          encodeURIComponent("\n\n" + url) +
          "&via=lopscoop"
      );
    },
    //instagram分享
    instagramShare() {
      this.buryingPoint.Share("instagram", this.shopData.id);
    },
    //messenger分享
    messengerShare() {
      this.buryingPoint.Share("messenger", this.shopData.id);
    },
    copy() {
      let thif = this;
      let clipboard = new ClipboardJS("#copyShareLink");
      clipboard.on("success", function(e) {
        e.clearSelection(); //选中需要复制的内容
        clipboard.destroy();
        thif.$message(thif.$t('shopDetail.CopySuccessfully'));
      });
      clipboard.on("error", function(e) {
        clipboard.destroy();
        thif.$message(thif.$t('shopDetail.CopyError'));
      });
    },
    previewHandle(index) {
      this.swiperPages = index;
      this.dialogVisible = true;
      this.setSize();
    },
    selectImg(index, item) {
      this.$emit("selectedImg", item);
      // if (this.swiperPages == index) return;
      // let swiper = this.$refs.mySwiper.swiper;
      // swiper.slideTo(index, 1000, false);
      this.swiperPages = index;
    },
    closeDialog() {
      this.dialogVisible = false;
    },
    prev() {
      this.$refs.carouselBanner.prev();
    },
    next() {
      this.$refs.carouselBanner.next();
    },
    itemCoatPrev() {
      let offsetHeight = $(".imgListCoat").scrollTop();
      if (!offsetHeight) {
        // console.log("此时滚动条到顶了");
        return;
      }
      this.currentPosition -= 10;
      $(".imgListCoat").animate({ scrollTop: this.currentPosition }, 100);
    },
    itemCoatNext() {
      let allBoxHeight =
        $(".itemCoat").height() * this.imgArr.length +
        this.imgArr.length * 14 +
        5;
      let overflowBoxHeight = $(".imgListCoat").height();
      let scrollBoxHeight = $(".imgListCoat").scrollTop();
      // console.log(allBoxHeight,overflowBoxHeight,scrollBoxHeight)
      if (overflowBoxHeight + scrollBoxHeight >= allBoxHeight) {
        // console.log("此时滚动条到底了");
        return;
      }
      this.currentPosition += 10;
      $(".imgListCoat").animate({ scrollTop: this.currentPosition }, 100);
    },
    setSize() {
      //this.$nextTick:在DOM加载完成后拿到dom树数据,解决this.$refs获取undefined问题
      this.$nextTick(() => {
        let bannerWidth = this.$refs.carouselImg[0].clientWidth;
        this.bannerHeight = bannerWidth;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.coat {
  height: 480px;
}
/deep/ .el-dialog__header {
  padding: 0;
  /deep/ .el-dialog__close {
    position: absolute;
    background: red;
    right: -380px;
    z-index: 999999;
    top: -50px;
    width: 44px;
    height: 44px;
    line-height: 44px;
    text-align: center;
    font-size: 30px;
    border-radius: 50%;
    color: #fff;
    background-color: #606266;
  }
}
/deep/ .el-dialog__body {
  padding: 0;
  img {
    width: 100%;
    height: 100%;
  }
  .el-carousel__arrow--left {
    left: -40%;
  }
  .el-carousel__arrow--right {
    right: -40%;
  }
  .el-carousel__arrow--left,
  .el-carousel__arrow--right {
    position: absolute;
    width: 44px;
    height: 44px;
    line-height: 44px;
    text-align: center;
    font-size: 30px;
    i {
      color: #fff;
    }
  }
}
</style>
<style lang="scss" scoped>
@import "./shopBanner";
</style>
