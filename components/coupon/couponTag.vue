<template>
  <div class="couponTagCoat">
    <div class="navCoat">
      <img
        v-for="(item,index) in tagData?tagData:[]"
        :key="'couponTag'+index"
        :src="item.image_message"
        alt=""
        :width="precent"
        @click="cutClass(item)"
      >
    </div>
    <div
      class="shopCoat"
      v-show="activeItem.relation_id == item.relation_id"
      v-for="(item,index) in tagData?tagData:[]"
      :key="'couponTaga'+index"
    >
      <div
        class="shopItem"
        v-for="(itemSon,indexSon) in item.shopData"
        :key="'couponTagb'+indexSon"
      >
        <active-shop-item :shopObj="itemSon"></active-shop-item>
      </div>
    </div>
    <p
      class="noData"
      v-show="activeItem.shopState"
    >{{$t('common.NoData')}}</p>
    <div class="loadingCoat">
      <loading
        v-show="loadShow&&!activeItem.shopState"
        type="spinner"
        color="#1989fa"
      ></loading>
    </div>
    <el-backtop :right="10">
      <img src="~/static/images/icon/goTop.svg" class="toTop">
    </el-backtop>
  </div>
</template>

<script>
import activeShopItem from "@/components/shopItem/activeShopItem";
export default {
  name: "couponTag",
  props: {
    tagData: {
      type: Array,
      value: []
    }
  },
  components: {
    activeShopItem
  },
  data() {
    return {
      pages: 1,
      loadShow: false,
      activeItemId: "",
      activeItem: null,
      isNowState: false, //判断是否正在请求数据当中
      isDataState: false, //数据是否已请求完毕
      isScroll: true //判断是否已经触发函数
    };
  },
  computed: {
    precent() {
      let precent = "100%";
      let { length } = this.tagData;
      if (length == 0) {
        precent = "100%";
      } else if (length == 5) {
        precent = "22%";
      } else if (length == 6) {
        precent = "18%";
      } else if (length == 7) {
        precent = "15%";
      } else if (length == 5) {
        precent = "13%";
      }
      return precent;
    }
  },
  created() {
    window.addEventListener("scroll", this.scrollMethod);
    for (var i = 0; i < this.tagData.length; i++) {
      this.$set(this.tagData[i], "shopData", []);
      // this.tagData[i].shopData = [];
      this.tagData[i].shopState = false;
      this.tagData[i].shopPage = 1;
      if (i == 0) {
        this.activeItemId = this.tagData[0].relation_id;
        this.activeItem = this.tagData[0];
      }
    }
    this.getShopData(this.tagData[0]);
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollMethod);
  },
  methods: {
    scrollMethod() {
      let thif = this;
      if (thif.isScroll && !thif.isNowState && !thif.isDataState) {
        if (
          thif.common.getScrollTop() + thif.common.getClientHeight() >=
          thif.common.getScrollHeight() - 50
        ) {
          //写后台加载数据的函数
          thif.isScroll = false;
          this.getShopData(this.activeItem);
        }
      }
    },
    cutClass(item) {
      this.pages = 1;
      this.activeItem = item;
      this.activeItemId = item.relation_id;
      if (this.activeItem.shopData.length == 0) {
        this.getShopData(this.activeItem);
      }
    },
    getShopData(item) {
      let thif = this;
      thif.loadShow = true;
      let sendObj = {
        page: this.pages,
        per_page: 16
      };
      sendObj[item.type] = item.relation_id;
      this.$apis
        .getShopList(sendObj, this.$store.getters.getApiHeader)
        .then(res => {
          thif.loadShow = false;
          thif.isScroll = true;
          thif.isNowState = false;
          if (res.status == 1) {
            thif.pages++;
            item.shopData.push(...res.data.items);
          } else {
            thif.common.msgBox(thif, res.msg, 3);
          }
          if (res.data.items.length == 0) {
            item.shopState = true;
          }
        })
        .catch(err => {
          thif.loadShow = false;
          thif.isScroll = true;
          thif.isNowState = false;
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.toTop {
  width: 100%;
  height: 100%;
}
.navCoat {
  width: 100%;
  display: flex;
  justify-content: center;
  img {
    cursor: pointer;
  }
}
.shopCoat {
  display: flex;
  flex-wrap: wrap;
  margin-top: 60px;
  margin-bottom: 70px;
}
.shopItem {
  margin: 10px;
}
.noData {
  font-size: 14px;
  text-align: center;
  padding-bottom: 20px;
}
.loadingCoat {
  text-align: center;
}
</style>
