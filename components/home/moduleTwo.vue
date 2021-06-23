<template>
  <div class="moduleTwoCoat">
    <p class="til">{{$t('home.moduleTwoTil')}}</p>
    <div class="listCoat">
      <div class="imgCoat"
        v-for="(item,index) in imgArr"
        :style="{width:item.width+'px',heigit:item.heigit+'px'}"
        @click="toShopList(item)"
        :key="'moduleTwo'+index">
        <div>
          <p v-html="item.text"></p>
        </div>
        <img :src="item.image" alt="">
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name:'moduleTwo',
    data(){
      return {
        imgArr:[
          {
            image:require('../../static/images/home/moduleTwo1.jpg'),
            text:this.$t('home.ThrowsCushions'),
            width:600,
            heigit:300,
            category_id:720003
          },
          {
            image:require('../../static/images/home/moduleTwo2.jpg'),
            text:this.$t('home.lighting'),
            width:300,
            heigit:300,
            category_id:710000
          },
          {
            image:require('../../static/images/home/moduleTwo3.jpg'),
            text:this.$t('home.kitchen'),
            width:300,
            heigit:300,
            category_id:730010
          },
          {
            image:require('../../static/images/home/moduleTwo4.jpg'),
            text:this.$t('home.wallDecor'),
            width:300,
            heigit:300,
            category_id:720001
          },
          {
            image:require('../../static/images/home/moduleTwo5.jpg'),
            text:this.$t('home.decorativeAccessories'),
            width:300,
            heigit:300,
            category_id:720005
          },
          {
            image:require('../../static/images/home/moduleTwo6.jpg'),
            text:this.$t('home.furniture'),
            width:600,
            heigit:300,
            category_id:730000
          },
        ]
      }
    },
    methods:{
      toShopList(item){
        this.$router.push({
          path:"/categories",
          query:{
            category:item.category_id,
            navName: item.text
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .moduleTwoCoat {
    margin-top: 90px;
    .til {
      padding: 0 20px;
      font-size: 22px;
      text-align: center;
      line-height: 30px;
      margin-bottom: 90px;
      font-weight: 400;
    }
  }
.moduleTwoCoat{
  .listCoat {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    .imgCoat {
      position: relative;
      font-size: 0;
      overflow: hidden;
      cursor: pointer;
      img {
        width: 100%;
        transition: transform 0.5s;
        position: relative;
        z-index: 0;
      }
      div {
        position: absolute;
        padding: 20px;
        left: 0;
        bottom: 0;
        z-index: 10;
        p {
          font-size: 22px;
          color: #fff;
          font-weight: bold;
          max-width: 100%;
          padding-bottom: 4px;
        }
      }
    }
    .imgCoat:hover {
      img {
        transform: scale(1.1);
      }
      p {
        border-bottom: 4px solid #fff;
      }
    }
  }
}
</style>
