<template>
  <div class="moduleThreeCoat">
    <div class="mtLeft">
      <p class="mtLeftTil">{{$t('home.FrissonLighting')}}</p>
      <p class="mtLeftTil2">{{$t('home.ModuleThree1')}}</p>
      <button @click="toShopList()">{{$t('home.ShopAll')}}</button>
    </div>
    <div class="mtRight">
      <img class="img1" src="../../static/images/home/moduleThree1.jpg" alt="">
      <img class="img2" src="../../static/images/home/moduleThree2.jpg" alt="">
      <img class="img3" src="../../static/images/home/moduleThree3.jpg" alt="">
      <img class="img4" src="../../static/images/home/moduleThree4.jpg" alt="">
      <img class="img5" src="../../static/images/home/moduleThree5.jpg" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name:'moduleThree',
    data(){
      return {
      }
    },
    methods:{
      toShopList(){
        this.$router.push({
          path:"/categories",
          query:{
            category:'710000',
            navName: 'Lighting'
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

.moduleThreeCoat {
  display: flex;
  justify-content: center;
  margin-top: 90px;
  align-items: center;
  margin-bottom: 90px;
  .mtLeft {
    margin-right: 68px;
    font-size: 0;
    
    .mtLeftTil {
      font-size: 34px;
      font-weight: 600;
      margin-bottom: 10px;
    }
    .mtLeftTil2 {
      font-size: 18px;
      line-height: 25px;
      margin-bottom: 50px;
    }
    button {
      cursor: pointer;
      background-color: $btnBjColor;
      color: #fff;
      height: 48px;
      width: 158px;
      font-size: 16px;
    }
    button:hover {
      background-color: $buttonBlueHover;
    }
  }
.mtRight {
  width: 536px;
  height: 330px;
  position: relative;
  img {
    position: absolute;
    filter: drop-shadow(0px 5px 20px rgba(0, 0, 0, 0.1));
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
  }
  .img1 {
    height: 276px;
    width: 276px;
    z-index: 5;
  }
  .img2 {
    width: 162px;
    height: 162px;
    z-index: 1;


    right: auto;
    top: 0;
    left: 0px;
    bottom: auto;
  }
  .img3 {
    width: 90px;
    height: 90px;
    z-index: 1;


    bottom: auto;
    left: auto;
    top: 48px;
    right: 40px;
  }
  .img4 {
    width: 206px;
    height: 206px;
    z-index: 1;

    bottom: 0px;
    left: 32px;
    top: auto;
    right: auto;
  }
  .img5 {
    width: 148px;
    height: 148px;
    z-index: 1;


    bottom: 20px;
    left: auto;
    top: auto;
    right: 0;
  }
}

}


</style>
