<template>
  <div class="coat">
    <div class="coatCont">
      <div class="item">
        <p class="quan quan1" :class="index==0||index>0?'activeQuan':''">
          1
          <span :class="index>0?'heng':''"></span>
          </p>

        <p class="itemText" :class="index==0||index>0?'activeQuan2':''">{{$t("cart.SHOPPINGCART")}}</p>
      </div>
      <div class="item">
        <p class="quan quan2" :class="index>0?'activeQuan':''">
          2<span :class="index>1?'heng':''"></span>
        </p>
        <p class="itemText" :class="index>0?'activeQuan2':''">{{$t("cart.CHECKOUTDETAILS")}}</p>
      </div>
      <div class="item" >
        <p class="quan" :class="index>1?'activeQuan':''">3
        </p>
        <p class="itemText" :class="index>1?'activeQuan2':''">{{$t("cart.ORDERCOMPLETE")}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name:'checkoutHeader',
    props:{
      index:{
        type:Number,
        default:1
      }

    },
    created() {
      console.log(this.index)
    }
  }
</script>

<style lang="scss" scoped>
  .coat {
    width: 100%;
    background-color: #fff;
    font-size: 16px;
    .coatCont {
      width: 620px;
      display: flex;
      justify-content: space-between;
      margin: auto;
      text-align: center;
      align-items: center;
      position: relative;
      margin-bottom: 20px;
      margin-top: 20px;
      padding:22px 0;
      .quan {
        margin: auto;
        height: 30px;
        width: 30px;
        line-height: 30px;
        border-radius: 50%;
        background-color: #fff;
        border: 1px solid #9B9B9B;
        margin-bottom: 13px;
        color: #9B9B9B;
        background-color: #fff;
        position: relative;
      }
      .activeQuan {
        background-color: $bjColor;
        border: 0;
        color: #fff;
      }
      .activeQuan2 {
        color: $bjColor;
      }
      .quan1 span,.quan2 span {
        content: '';
        position: absolute;
        height: 1px;
        background-color: #9B9B9B;
        top: 15px;
        left: 29px;
        width: 220px;
        z-index: 0;
      }
      .activeQuan .heng {
        background-color: $bjColor;
      }
    }
  }
</style>
