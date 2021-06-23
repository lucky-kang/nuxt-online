<template>
  <div class="itemCoat" @click="toDetail(shopObj.id)">
    <div class="imgCoat">
      <img v-lazy="shopObj.image" />
     <!-- <van-image
        fit="contain"
        lazy-load
        :src="shopObj.image"
      /> -->
      <!--  v-show="shopObj.is_show_discount == 1" -->
      <div class="shopTil" v-show="shopObj.discount">
        <!-- ../../static/images/icon/tag_discount2.png -->
        <img src="../../static/images/icon/tag_discount2.png"/>
        <p>{{shopObj.discount}}</p>
      </div>
    </div>
   <!-- <div class="orangeBtn">
      <div class="shopTil shopTil2" v-if="shopObj.group_price!=0">
        <img src="../../../static/images/icon/icon_groupdeal@3x.png"/>
        <p>Group Deal</p>
      </div>
    </div> -->

    <div class="shopPrice">
      <p class="price1">
        <!-- {{string(shopObj.group_price).length+'*'}} -->
        <!-- shopObj.group_price!=0?shopObj.group_price:shopObj.sale_price|addDouhao 团购价 -->
        <span v-html="shopObj.moneyFu!='₫'?shopObj.moneyFu:''"></span>
        {{shopObj.sale_price|addDouhao}}{{shopObj.moneyFu=='₫'?shopObj.moneyFu:''}}
      </p>
      <div>
        <!-- v-show="shopObj.is_show_discount == 1" -->
        <span class="price2" v-show="shopObj.regular_price!=shopObj.sale_price">
          <span v-html="shopObj.moneyFu!='₫'?shopObj.moneyFu:''"></span>
          {{shopObj.regular_price|addDouhao}}{{shopObj.moneyFu=='₫'?shopObj.moneyFu:''}}
        </span>
      </div>

    </div>
  </div>
</template>

<script>

  export default {
    name:'shopItem',
    props:{
      shopObj:{
        type:Object
      },
      fuhao:{
        type:String,
        value:''
      }
    },
    data(){
      return {

      }
    },
    created(){
      this.shopObj.moneyFu = this.fuhao;
    },
    filters:{
      addDouhao(num){
        let arr=num.toString();
        let status = false;
        let t1,t2;
        if(arr.indexOf('.') != -1){
          status = true;
          arr=num.toString().split('.');
          t1=arr[0].toString().split('');
          t2=arr[1].toString();
        } else {
          t1=arr.toString().split('');
        }
        let result=[],counter=0;
        for(let i=t1.length-1;i>=0;i--){
            counter++;
            result.unshift(t1[i]);
            if((counter%3)==0&&i!=0)
            {
                result.unshift(',');
            }
        }
        let t3=result.join('')
        let t4=t3+'.'+t2
        return status?t4:t3;
      }
    },
    mounted(){

      console.log(this.shopObj.moneyFu)
      let boxWidth = document.querySelector('.shopPrice').clientWidth;
      let item1Width = document.querySelector('.price1').clientWidth;
      let item2Width = document.querySelector('.price2').clientWidth;
      if(boxWidth<(item1Width+item2Width+20)){
        let baifenbi = (boxWidth/(item1Width+item2Width+40))
        document.querySelector('.price1').style.fontSize = 0.17*baifenbi+'rem';
        document.querySelector('.price2').style.fontSize = 0.12*baifenbi+'rem';
      }
    },
    methods:{
      toDetail(id){
        // this.common.buryingPoint({
        //   action: "event_tracking",
        //   event_name:'Event_Leftover_item_click',
        //   properties: {
        //     Product_ID:id
        //   }
        // })
        this.$router.push({
          path:'/product/'+id,
        })

      }
    }
  }
</script>

<style lang="scss" scoped>
  .coat {

  }
  .orangeBtn {
    display: flex;
    flex-direction: row;
  }
  .itemCoat {
    width: 100%;
    display: flex;
    background-color: #fff;
    flex-direction: column;
    border-radius: 4px;
    overflow: hidden;
    font-size: 0;
    border-radius: 0.08rem;
    .imgCoat {
      // width: 100%;
      width: 280px;
      position: relative;
      img {
        max-width: 100%;
        max-height: 100%;
        border-radius: 8px;
      }
    }
    .shopTil {
      position: absolute;
      left: 0;
      top: 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      color: #fff;
      height: 0.4rem;
      padding: 0 0.08rem;
      font-size: 0.24rem;
      background-color: rgba(255,255,255,.8);
      border-radius: 8px 0px 12px;
      p {
        font-weight: 500;
        color: $bjColor;
      }
      img {
        height: 0.24rem;
        margin-right: 0.04rem;
      }
    }
    .shopTil2 {
      background-color: #F94141;
    }
    .shopPrice {
      // padding-left: 0.08rem;
      display: flex;
      flex-direction: row;
      align-items: flex-end;
      color: rgba(16, 16, 16, 1);

      line-height: 0.34rem;
      margin-top: 0.06rem;
      .price1 {
        font-size: 0.28rem;
        line-height: .36rem;
        margin-right: 0.08rem;
        font-weight: 550;
        span {
          font-weight: 550;
        }
      }
      .fontSmall1 {
        font-size: 0.3rem;
      }
      .price2::after {
        content: '';
        height: 1px;
        width: 100%;
        position: absolute;
        background-color: #555555;
        bottom: 50%;
        left: 0;
      }
      .price2 {
        vertical-align: top;
        line-height: 0.32rem;
        font-size: 0.24rem;
        color: #555555;
        position: relative;
      }
      .fontSmall2 {
        font-size: 0.20rem;
      }
    }

  }
</style>
