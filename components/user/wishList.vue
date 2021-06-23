<template>
  <div class="wishlistCoat">
    <p class="rTil">{{$t('header.WishList')}}</p>
    <div
      class="listCard"
      v-loading="loadShow"
    >
      <el-row :gutter="20">
        <el-col
          :lg="6"
          :sm="8"
          :xs="12"
          v-for="(item, index) in shopData"
          :key="index"
          class="el-col-item"
        >
          <list-card
            class="shopItem"
            :index="index"
            :shopObj="item"
          ></list-card>
        </el-col>
      </el-row>
      <div
        style="margin: 80px auto 0;text-align: center;"
        v-show="!shopData.length && !loadShow"
      >
        <img
          src="~/static/images/img/noSearchResults.png"
          alt=""
        >
      </div>
      <div
        class="pangia"
        v-if="shopData.length"
      >
        <div
          @click="prevPage"
          class="left-prev"
          v-if="pageData.current_page != 1"
        ><i class="el-icon-arrow-left"></i></div>
        <ul>
          <li
            v-for="(k,j) in pageData.total_page"
            :key="'pag-data'+j"
            @click="goPageNum(k)"
            :class="k == pageData.current_page ? 'selectedli' : ''"
          >{{k}}</li>
        </ul>
        <div
          @click="nextPage"
          class="right-next"
          v-if="pageData.current_page != pageData.total_page"
        ><i class="el-icon-arrow-right"></i></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "myWishList",

  data() {
    return {
      shopData: [],
      loadShow: false,
      pageData: null,
      pages: 1
    };
  },
  mounted() {
    this.getShopData();
  },
  methods: {
    goPageNum(pageNum) {
      this.pages = pageNum;
      this.getShopData();
    },
    prevPage() {
      let { current_page, total_page } = this.pageData;
      if (current_page > 1) {
        this.pages--;
        this.getShopData();
      }
    },
    nextPage() {
      let { current_page, total_page } = this.pageData;
      if (current_page < total_page) {
        this.pages++;
        this.getShopData();
      }
    },
    getShopData() {
      let thif = this;
      this.loadShow = true;
      let user_id = this.$store.getters.getUserId;
      let obj = {
        per_page: 12,
        page: this.pages
      };
      this.$apis
        .getFavoritesList(obj, user_id)
        .then(res => {
          if (res.status == 1) {
            thif.loadShow = false;
            thif.shopData = res.data.items;
            thif.pageData = res.data.pages;
          } else {
            thif.loadShow = false;
            thif.common.msgBox(thif, res.msg, 3);
          }
        })
        .catch(err => {
          thif.loadShow = false;
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.wishlistCoat {
  .rTil {
    font-size: 24px;
    font-weight: 500;
    margin-top: 16px;
    margin-bottom: 38px;
    font-weight: bold;
  }
  .listCard {
    min-height: 500px;
    .el-col-item {
      min-height: 318px;
      .shopItem {
        // margin-bottom: 32px;
        width: 225px;
        /deep/ .imgCoat {
          width: 225px;
          height: 225px;
        }
        /deep/ .shopTitle {
          width: 225px;
        }
      }
    }
    .pangia {
      font-size: 0.14rem;
      display: flex;
      margin: 0.9rem 0 0.8rem;
      justify-content: center;
      .left-prev,
      .right-next {
        width: 0.4rem;
        height: 0.4rem;
        border-radius: 50%;
        background: #172d55;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        i {
          color: #fff;
          font-size: 0.16rem;
        }
      }
      ul {
        display: flex;
        padding: 0 0.2rem;
        align-items: center;
        li {
          cursor: pointer;
        }
        li:not(:last-child) {
          margin-right: 0.2rem;
        }
        .selectedli {
          color: #999999;
        }
      }
    }
  }
}
</style>
