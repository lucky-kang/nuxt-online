<template>
  <div>
    <el-dialog
      class="newUserDialog"
      width="30%"
      :visible.sync="showBox1&&couponArr.length!=0"
      :before-close="closeBox1"
    >
      <div class="wrapper">
        <div class="newCoatCont">
          <p class="couponTil">{{$t('newuserMasking.couponsBelow')}}</p>
          <div class="couponListCoat">
            <div class="couponList" v-for="(item,index) in couponArr" :key="'newuserMaska'+index">
              <img src="~/static/images/img/newBoxCoupon2.png" alt="">
              <div class="couponCont">
                <div class="couponLeft">
                  <p class="couponText1">
                    {{item.title_item}}
                    <span>{{$store.getters.getCurrencySymbol}}{{item.coupon.with_amount}}</span>
                  </p>
                  <p class="couponText2">{{item.use_for}}</p>
                  <p class="couponText3">{{item.valid_str}}</p>
                </div>
                <div class="couponRight">
                  <p>
                    -{{$store.getters.getCurrencySymbol}}
                    <span>{{item.coupon.used_amount}}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <!-- <button style="cursor: pointer;" @click="keep1">{{$t('newuserMasking.Collectall')}}</button> -->
          <el-button :loading="collectLoading" @click="keep1">{{$t('newuserMasking.Collectall')}}</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      class="newUserDialog"
      width="30%"
      :visible.sync="showBox2&&couponArr.length!=0"
      :before-close="closeBox2"
    >
      <div class="wrapper">
        <div class="newCoatCont">
          <p class="couponTil">{{$t('newuserMasking.personCenter')}}</p>
          <div class="couponListCoat">
            <div class="couponList" v-for="(item,index) in couponArr" :key="'newuserMaska'+index">
              <img src="~/static/images/img/newBoxCoupon1.png" alt="">
              <div class="couponCont">
                <div class="couponLeft">
                  <p class="couponText1">
                    {{item.title_item}}
                    <span>{{$store.getters.getCurrencySymbol}}{{item.coupon.with_amount}}</span>
                  </p>
                  <p class="couponText2">{{item.use_for}}</p>
                  <p class="couponText3">{{item.valid_str}}</p>
                </div>
              </div>
              <div class="couponRight">
                <p>
                  -{{$store.getters.getCurrencySymbol}}
                  <span>{{item.coupon.used_amount}}</span>
                </p>
              </div>
            </div>
          </div>
          <button style="cursor: pointer;" @click="keep2">{{$t('newuserMasking.OK')}}</button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import jsCookie from "@/utils/js-cookie";
import { Loading } from "element-ui";
export default {
  name: "newuserMasking",
  props: {
    // newUserDialogVisible: {
    //   type: Boolean
    // }
  },
  data() {
    return {
      showBox1: false,
      showBox2: false,
      showBoxLogin: false,
      couponArr: [],
      collectLoading: false
    };
  },
  mounted() {
    if (
      !localStorage.getItem("newUserBox") &&
      localStorage.getItem("newUserBox") != "null" &&
      !this.$store.getters.getLoginToken
    ) {
      this.preloadingImg1();
      this.getCoupon();
    }
    if (localStorage.getItem("newUserReg") == "yes") {
      this.showBox2 = true;
      this.getCoupon();
      localStorage.setItem("newUserReg", "no");
    }
  },
  methods: {
    //预加载新人领券未领券图片信息
    preloadingImg1() {
      window.onload = () => {
        var img1 = new Image();
        img1.src = "~/static/images/img/newBoxCoupon2.png";
        //图片预加载完成再显示弹框
        img1.onload = () => {
          this.showBox1 = true;
        };
        img1.onerror = () => {
          console.log("预加载失败");
        };
      };
    },
    //预加载新人领券已领券图片信息
    // preloadingImg2() {
    //   console.log('preloadingImg2')
    //   window.onload = () => {
    //     var img2 = new Image();
    //     img2.src = "~/static/images/img/newBoxCoupon1.png";
    //     //图片预加载完成再显示弹框
    //     img2.onload = () => {
    //       console.log('preloadingImg2+++++++')
    //       this.showBox2 = true;
    //       localStorage.setItem("newUserReg", "no");
    //     };
    //     img2.onerror = () => {
    //       console.log("预加载失败");
    //     };
    //   };
    // },
    getCoupon() {
      let that = this;
      this.$apis
        .newUserCoupon({}, this.$store.getters.getApiHeader)
        .then(res => {
          if (res.status == 1) {
            that.couponArr = res.data.item.coupon_data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    keep1() {
      // localStorage.setItem("newUserBox", "1");
      this.collectLoading = true;
      setTimeout(() => {
        this.collectLoading = false;
        this.showBox1 = false;
        this.couponArr = [];
        this.$router.push({ path: "/login" });
      }, 500);
    },
    keep2() {
      // localStorage.setItem("newUserBox", "1");
      this.showBox2 = false;
    },
    closeBox2() {
      this.showBox2 = false;
    },
    closeBox1() {
      this.buryingPoint.registerPopupShut("0");
      localStorage.setItem("newUserBox", "1");
      this.showBox1 = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.newUserDialog /deep/ .el-dialog {
  // width: 740px !important;
  // height: 890px;
  width: 5.92rem !important;
  height: 7.12rem;
  background: rgba(0, 0, 0, 0.5);
  box-shadow: none;
  /deep/ .el-dialog__close {
    position: absolute;
    width: 0.66rem;
    height: 0.66rem;
    color: #fff;
    border-radius: 50%;
    line-height: 0.6rem;
    text-align: center;
    border: 0.05rem solid;
    font-size: 0.5rem;
    font-weight: bold;
  }
  background: url(/images/img/newBoxBj.png) center no-repeat;
  background-size: contain;
  .new-to-foroo-h {
    color: black;
    font-size: 0.32rem;
    font-weight: bold;
    position: absolute;
    top: 13%;
    left: 50%;
  }
  .off-h {
    color: red;
    font-weight: bold;
    position: absolute;
    top: 28%;
    left: 60%;
    font-size: 0.35rem;
  }
  .only-h {
    color: black;
    position: absolute;
    top: 38%;
    left: 48%;
  }
}
/deep/ .el-dialog__header {
  left: 42%;
  position: absolute;
  bottom: -0.08rem;
}
/deep/ .el-dialog__body {
  padding: 0;
}
.wrapper {
  width: 100%;
  border-radius: 10px;
  font-size: 0.14rem;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
  padding-bottom: 0.3rem 0.3rem 0.37rem;
  height: 100%;
  .newCoatCont {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
  }
  button {
    // height: 90px;
    // width: 268px;
    margin-top: -0.12rem;
    height: 0.72rem;
    width: 2.14.4rem;
    background-color: $fontColor1;
    color: #fff;
    // font-size: 40px;
    font-size: 0.32rem;
    border-radius: 0.04rem;
    vertical-align: top;
    padding: 0 0.34rem;
    border: none;
    /deep/ span {
      color: #fff;
    }
    /deep/ .el-icon-loading {
      color: #fff;
    }
  }
  .couponTil {
    font-family: Ubuntu;
    font-style: normal;
    font-weight: normal;
    // font-size: 30px;
    // font-size: 24px;
    font-size: 0.212rem;
    line-height: 0.34rem;
    text-align: center;
    color: $fontColorBlue;
    // margin: 64px 0;
    margin: 0.47rem 0;
  }
  .couponTil2 {
    padding: 0 0.3rem;
  }
  .couponListCoat {
    .couponList {
      margin: auto;
      margin-bottom: 0.24rem;
      position: relative;
      // width: 542px;
      width: 4.196rem;
      img {
        width: 100%;
      }
      .couponCont {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        padding: 0.7rem 0.3rem 0 0.1rem;
        display: flex;
        justify-content: space-between;
        font-size: 0.1rem;
        p,
        span {
          color: #fff;
          text-align: left;
        }
      }
      .couponRight {
        top: 0.49rem;
        right: 0.1rem;
        position: absolute;
        width: 1.104rem;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        p {
          // font-size: 22px;
          font-size: 0.176rem;
          font-family: Ubuntu;
        }
        span {
          // font-size: 32px;
          font-size: 0.256rem;
          font-family: Ubuntu;
        }
      }
      .couponText1 {
        // margin-bottom: 60px;
        margin-top: -0.58rem;
        margin-bottom: 0.33rem;
        span {
          // font-size: 30px;
          font-size: 0.24rem;
        }
      }
      .couponText1,
      .couponText2,
      .couponText3 {
        font-family: Ubuntu;
        font-style: normal;
        font-weight: normal;
        font-size: 0.176rem;
      }
    }
  }
}
</style>
