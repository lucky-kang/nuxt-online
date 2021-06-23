<template>
  <div class="moduleFourCoat">
    <img src="../../static/images/home/homeFootImg.jpg" alt="">
    <div>
      <p class="moduleFourTil">{{$t('home.OurVision')}}</p>
      <p class="moduleFourTect">{{$t('home.homeFootText')}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name:"moduleFour",
    data(){
      return {

      }
    },
    methods:{

    }
  }
</script>

<style lang="scss" scoped>
.moduleFourCoat {
  font-size: 0;
  position: relative;
  img {
    width: 100%;
  }
  div {
    position: absolute;
    left: 360px;
    bottom: 0;
    padding: 50px;
    background-color: #fff;
    width: 426px;
    .moduleFourTil {
      font-size: 34px;
      font-weight: bold;
      margin-bottom: 20px;
      line-height: 46px;
    }
    .moduleFourTect {
      font-size: 18px;
      line-height: 24px;
    }
  }
}
</style>
