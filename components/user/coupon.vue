<template>
  <div class="couponCoat">
    <p class="rTil">{{$t('coupon.MyCoupon')}}</p>
    <div class="couponCutCoat" >
      <p :class="type==1?'cutItemActive':''" @click="cutNav(1)">{{$t('coupon.VaildCoupon')}}</p>
      <p :class="type==0?'cutItemActive':''"  @click="cutNav(0)">{{$t('coupon.InvaildCoupon')}}</p>
    </div>
    <div class="noData" v-show="(couponObj.active.length==0&&type==1)||(couponObj.invalid.length==0&&type==0)">
      <img src="../../static/images/user/empty_nocoupons@3x.png" alt="">
      <p>{{$t('coupon.NoCoupon')}}</p>
    </div>
    <div class="listCoat">
      <div class="couponList" v-for="(item,index) in type==1?couponObj.active:couponObj.invalid" :key="'coupon'+index">
        <img :src="type==1?bjImg[0]:bjImg[1]" alt="">
        <div class="listCont">
          <div class="listLeft">
            <p class="couponNum"><span>{{$store.getters.getCurrencySymbol}} </span>{{item.used_amount}}</p>
            <p class="couponType">[{{$t('coupon.ForAllItems')}}]</p>
          </div>
          <div class="listRight">
            <p class="couponText"> {{item.use_desc+' '+ $store.getters.getCurrencySymbol+' '+item.with_amount}}</p>
            <p class="couponTimer">{{$t('coupon.ValidUntil')}}: {{item.valid_end_time|timers(5)}} </p>
          </div>
        </div>
      </div>
    </div>



  </div>
</template>

<script>
  export default{
    name:'myCoupon',
    data(){
      return {
        loadingShow:false,
        bjImg:[],
        loadShow:false,
        isNowState:false,//判断是否正在请求数据当中
        isDataState:false,//数据是否已请求完毕
        isScroll:true,//判断是否已经触发函数
        activePageId:1,
        invalidPageId:1,
        couponObj:{
          active:[],
          invalid:[]
        },
        activeState:true,
        invalidState:true,
        type:1
      }
    },
    mounted(){
      let thif = this;
      window.addEventListener("scroll", this.scrollMethod);
      let couponImg = [
          require('../../static/images/user/normalcoupon.png'),
          require('../../static/images/user/invalidCoupon.png'),
        ];
      for(let i=0;i<couponImg.length;i++){
        (function(e){
          let couponImg1 = new Image();
          couponImg1.src = couponImg[e];
          couponImg1.onload
          thif.bjImg.push(couponImg1.src);
        })(i)
      }
      this.getCoupon(1)
    },
    destroyed(){
      window.removeEventListener("scroll", this.scrollMethod)
    },
    methods:{
      goShop(){
        this.$router.push({
          path:'/'
        })
      },
      scrollMethod(){
        let thif = this;
        // window.onscroll = function(){
          if(thif.isScroll&&!thif.isNowState&&!thif.isDataState){
            if((thif.common.getScrollTop() + thif.common.getClientHeight() >= thif.common.getScrollHeight() - 50)){
              //写后台加载数据的函数
              // console.log("距顶部"+scrollTop+"可视区高度"+windowHeight+"滚动条总高度"+scrollHeight);
              thif.isScroll = false;
              thif.getCoupon(this.type);
            }
          }
        // }
      },
      onClickLeft(){
        this.$router.go(-1)
      },
      cutNav(type){
        this.type = type;
        if(type==1&&!this.activeState || type==0&&!this.invalidState){
          this.isDataState = true;
        } else {
          this.isDataState = false;
          if(type!=1){
            this.getCoupon(type);
          }
        }
      },
      getCoupon(type){
        let thif = this;
        this.loadingShow = true;
        this.$apis.getCoupon({
            disabled:type,
            offset_id:type==1?this.activePageId:this.invalidPageId,
            per_page:10,
          },this.$store.getters.getUserId).then(res => {
          console.log(res)
          this.loadingShow = false;
          thif.isScroll = true;
          thif.isNowState = false;
          thif.loadShow = false;
          if(res.status == 1){
            if(type == 1){
              this.couponObj.active.push(...res.data.items);
              if(res.data.items.length!=0){
                this.activePageId = res.data.items[res.data.items.length-1].user_coupon_id;
              }
            } else {
              if(res.data.items.length!=0){
                this.invalidPageId = res.data.items[res.data.items.length-1].user_coupon_id;
              }

              this.couponObj.invalid.push(...res.data.items);
            }
            console.log( this.couponObj)
            console.log( this.type)
            if(res.data.items.length == 0){
              thif.isDataState = true;
              this.type == 1?(this.activeState=false):(this.invalidState=false);
            }
          } else {
            thif.isScroll = true;
            thif.isNowState = false;
            thif.loadShow = false;
            this.common.msgBox(this,res.msg,3);
          }
        }).catch(err => {
            this.loadingShow = false;
            thif.isScroll = true;
            thif.isNowState = false;
            thif.loadShow = false;
          console.log(err)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .rTil {
    font-size: 24px;
    font-weight: 500;
    margin-top: 16px;
    margin-bottom: 38px;
    font-weight: bold;
  }
  .couponCutCoat {
    display: flex;
    font-size: 20px;
    p {
      padding: 12px 24px;
      // border-bottom: 2px solid $btnBjColor;
      border-bottom: 2px solid transparent;
      cursor: pointer;
    }
    .cutItemActive {
      border-color: $btnBjColor;
      font-weight: bold;
    }
  }
  .listCoat {
    min-width: 980px;
    display: flex;
    flex-wrap: wrap;
    padding-top: 40px;
    padding-left: 24px;
    padding-bottom: 40px;
    .couponList {
      margin-right: 120px;
      position: relative;
      font-size: 0;
      margin-bottom: 30px;
      img {
        width: 320px;
        vertical-align: top;
      }
      .listCont {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        display: flex;
        font-size: 16px;
        .listLeft {
          flex-shrink:0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          line-height: 20px;
          width: 100px;
          padding-left: 6px;
          p {
            line-height: 32px;
          }
          .couponNum {
            color: #fff;
            font-size: 16px;
            font-weight: bold;
            span {
              color: #fff;
              font-size: 12px;
            }
          }
          .couponType {
            font-size: 12px;
            color: #fff;
          }
        }
        .listRight {
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-left: 16px;
          p {
            margin-bottom: 6px;
            line-height: 18px;
          }
          .couponText {
            font-size: 14px;
            font-weight: bold;
          }
          .couponTimer {
            font-size: 12px;
            color: #555;
          }
        }
      }
    }
  }
  .noData {
    margin: auto;
    text-align: center;
    font-size: 0;
    margin-top: 58px;
    img {
      height: 116px;
      margin-bottom: 36px;
    }
    p {
      font-size: 18px;
      font-weight: 550;
    }
  }
</style>
