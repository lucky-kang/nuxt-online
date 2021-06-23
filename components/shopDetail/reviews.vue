<template>
  <div class="coat">
    <el-row :gutter="20">
      <el-col :lg="24" :sm="24" :xs="24">
        <div class="leftCoat">
          <div v-if="hasReviews && comment_rating" class="comment_rating">
            <el-rate
              :value="Number(comment_rating)"
              disabled
              allow-half
              show-score
              :colors="starColor"
              disabled-void-color="#d8d9dc"
              score-template="{ value }"
            ></el-rate>
          </div>
          <img class="no-review-img" v-if="!hasReviews" src="~static/images/img/review.png">
          <p v-if="!hasReviews" class="noReviews">{{ $t("shopDetail.reviews.noReviewsYet") }}</p>
          <div v-if="hasReviews" class="listCoat">
            <div class="list" v-for="(item, index) in reviewsData" :key="'ab' + index">
              <div class="listTil">
                <img v-if="item.avatar" class="avatar" :src="item.avatar" alt="">
                <div v-if="!item.avatar" class="reviewImg" :style="{'background':wordColor[$options.filters.cutStr3(item.nickname)]}">
                    {{item.nickname | cutStr4}}
                </div>
                <div class="name-date">
                  <div class="nickname">{{ item.nickname |cutStr }}</div>
                  <div class="createdTime">{{ item.created_at | conversionTime }}</div>
                </div>
              </div>
              <div class="starCoat">
                <el-rate
                  :value="Number(item.rating)"
                  disabled
                  allow-half
                  :colors="starColor"
                  disabled-void-color="#d8d9dc"
                  score-template="{ value }"
                ></el-rate>
                <span class="eveyScore">{{item.rating.toFixed(1)}}</span>
              </div>
              <p class="reviewsText">{{ item.content }}</p>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :lg="hasReviews ? 10 : 24" :sm="24" :xs="24" v-if="false">
        <div class="rightCoat">
          <p class="til" v-if="hasReviews">{{ $t("shopDetail.reviews.addReview") }}</p>
          <p class="til" v-if="!hasReviews">
            {{ $t("shopDetail.reviews.firstReview") }} “{{
            shopTil
            }}”
          </p>
          <div class="setStarCoat">
            <p>{{ $t("shopDetail.reviews.yourRating") }}</p>
            <el-rate v-model="setStar" :colors="starColor"></el-rate>
          </div>
          <div class="textCoat">
            <p>{{ $t("shopDetail.reviews.yourReview") }}</p>
            <textarea name="" id="" cols="45" rows="10" style="max-width: 100%;min-height: 120px;"></textarea>
          </div>
          <!-- <div class="emailCoat">
            <div class="emailItem">
              <p>Name *</p>
              <input type="text">
            </div>
            <div class="emailItem">
              <p>Email *</p>
              <input type="text">
            </div>
          </div>
          <div class="saveUserCoat">
            <input type="checkbox" id="saveUser">
            <label for="saveUser">Save my name, email, and website in this browser for the next time I comment.</label>
          </div>-->
          <div class="btnCoat">
            <button>{{ $t("shopDetail.reviews.SUBMIT") }}</button>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-pagination
      v-if="hasReviews"
      class="mypagination"
      background=""
      layout="pager"
      :page-size="page"
      @current-change="handleCurrentChange"
      :total="countNumber"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "reviews",
  props: {
    shopId: {
      type: String
    },
    shopTil: {
      type: String
    },
    //总页数
    countNumber: {
      type: Number
    },
    comment_rating: {
      type: Number
    }
  },
  data() {
    return {
      setStar: 0,
      hasReviews: false,
      reviewsData: [],
      starColor: ["#FFD282",'#FFD282','#FFD282'],
      page: 4,//每页显示条数
      wordColor:{
          "a":"#586695",
          "b":"#562501",
          "c":"#661713",
          "d":"#694639",
          "e":"#255933",
          "f":"#592029",
          "g":"#601042",
          "h":"#500344",
          "i":"#671989",
          "j":"#632914",
          "k":"#165260",
          "l":"#672492",
          "m":"#714150",
          "n":"#440202",
          "o":"#319072",
          "p":"#756713",
          "q":"#249542",
          "r":"#207815",
          "s":"#714330",
          "t":"#027515",
          "u":"#791505",
          "v":"#045901",
          "w":"#898157",
          "x":"#255773",
          "y":"#255933",
          "z":"#017952"
      }
    };
  },
  mounted() {
    this.handleCurrentChange(1);
  },
  methods: {
    handleCurrentChange(val) {
      this.$apis
        .getReviews(
          {
            product_id: this.shopId,
            page: val,
            per_page: this.page
          },
          {}
        )
        .then(res => {
          console.log(res);
          if (res.status == 1) {
            if (res.data.length != 0) {
              this.hasReviews = true;
            }
            this.reviewsData = res.data.items;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  filters: {
    conversionTime: function(time) { //author: meizz
      let fmt = "MM/dd/yyyy"
      const date = new Date(time * 1000)
      const o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
    },
    cutStr(str) {
      let firstStr = str.slice(0, 1);
      let lastStr = str.slice(str.length - 1, str.length);
      return firstStr + "***" + lastStr;
    },
    cutStr2(str) {
      let firstStr = str.slice(0, 20);
      return firstStr + "...";
    },
    cutStr3(str) {
      return str.slice(0, 1).toLowerCase();
    },
    cutStr4(str) {
      return str.slice(0, 1);
    },
  }
};
</script>

<style lang="scss" scoped>
@import "./reviews";
</style>
