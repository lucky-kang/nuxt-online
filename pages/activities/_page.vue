<template>
  <div class="container">
    <div class="f-container" v-loading="getActivitiesLoading">
      <div
        v-if="activitiesList.length"
        v-for="(item,index) in activitiesList"
        :key="'activeModule'+index"
      >
        <div class="banner-list" v-if="item.type=='banner'" style="margin: 30px 0;">
            <active-swiper class="bgColor" :images="item.items"></active-swiper>
        </div>
        <div v-if="item.type=='coupon'" style="margin: 30px 0;">
          <coupon class="bgColor" :couponArr="item.items"></coupon>
        </div>
        <div v-if="item.type=='tab'" style="margin: 30px 0;">
          <coupon-tag :tagData="item.items"></coupon-tag>
        </div>
      </div>
    </div>
    <f-footer></f-footer>
  </div>
</template>

<script>
// import { MH_API } from "@/api";
import fFooter from "@/components/footer/f-footer";
import activeSwiper from "@/components/activeSwiper/activeSwiper";
import coupon from "@/components/coupon/coupon";
import couponTag from "@/components/coupon/couponTag";

let page = 1;
export default {
  name: "activitys",
  components: {
    fFooter
  },
  watch: {
    $route(to, from) {
      this.getActivities(this.$route.query.id);
    }
  },
  asyncData({ params, app: { $apis } }) {},
  data() {
    return {
      getActivitiesLoading: false,
      activitiesList: []
    };
  },
  mounted() {
    this.getActivitiesLoading = true;
    this.getActivities(this.$route.query.id);
    this.buryingPoint.pageView();
  },
  destroyed() {},
  methods: {
    getActivities(id) {
      let thif = this;
      this.$apis
        .getActivities({ activity_id: id })
        .then(res => {
          this.getActivitiesLoading = false;
          if (res.status == 1) {
            thif.activitiesList = res.data.item.list;
          } else {
            thif.common.msgBox(thif, res.msg, 3);
          }
        })
        .catch(error => {
          this.getActivitiesLoading = false;
          console.log(error);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.f-container {
  // width: 14.8rem;
  width: 1200px;
  min-height: 600px;
}
</style>