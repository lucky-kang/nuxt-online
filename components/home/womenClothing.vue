<template>
  <div class="womenClothingCoat" v-if="JSON.stringify($store.state.womenClothing) != '{}'">
    <img class="womenClothingImg" src="~/static/images/img/womenClothing.png">
    <el-container class="womenClothing-container">
      <el-aside width="560px" height="960px">
        <img :src="$store.state.womenClothing.image" alt="">
        <h3>{{$store.state.womenClothing.name}}</h3>
        <p></p>
      </el-aside>
      <el-container>
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
        </ul>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "womenClothing",
  props: {
    womenClothingObj: {
      type: Array,
      value: []
    }
  },
  data() {
    return {
      womenClothingObj: {}
    };
  },
  mounted() {
    // this.getRecommend();
  },
  methods: {
    getRecommend() {
      let thif = this;
      this.$apis
        .getDealsWeek({ tag: 3779, page: 1, per_page: 100 })
        .then(res => {
          console.log(res, "getDealsWeek");
          if (res.status == 1) {
            thif.womenClothingObj = res.data;
          } else {
            thif.common.msgBox(thif, res.msg, 3);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    toShopDetail(id) {
      this.buryingPoint.productClick(id);
      this.$router.push({
        path: "/product/" + id
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.womenClothingCoat {
  margin-bottom: 60px;
  position: relative;
  .womenClothingImg {
    margin: 99px auto 60px;
    display: block;
  }
  .shopItem {
    position: relative;
    .shopImg {
      width: 312.5px;
      height: 312.5px;
    }
    .shopTitle {
      width: 312.5px;
      padding: 2px 4px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-family: Ubuntu;
      font-weight: 300;
      font-size: 14px;
      line-height: 26px;
      color: $fontColor1;
    }
    .priceCoat {
      padding: 0 4px;
      display: flex;
      align-items: flex-end;
      flex-direction: row;
      color: #111;
      .nowPrice {
        font-size: 24px;
        color: #282828;
      }
      .yuanPrice {
        padding: 2px 4px;
        opacity: 0.6;
        font-size: 20px;
        position: relative;
      }
      .yuanPrice::after {
        content: "";
        height: 1px;
        width: 100%;
        margin-left: 2px;
        @include center;
        background-color: #111;
      }
    }
    .huiCoat {
      background: url(/images/icon/tag_discount_bg.png) center no-repeat;
      line-height: 0;
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      height: 45px;
      width: 45px;
      justify-content: center;
      background-size: contain;
      span {
        color: #fff;
        font-size: 14px;
        font-weight: bold;
      }
      // .huiImg {
      //   margin-right: 5px;
      //   height: 32px;
      // }
    }
  }
}
</style>
