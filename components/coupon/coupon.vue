<template>
  <div
    class="couponCoat"
    :style="couponArr.length == 3 ? 'margin-left: -1.2rem' : ''"
  >
    <img
      v-for="(item,index) in couponArr"
      :key="'couponPage'+index"
      :src="item.coupon_received==0?item.coupon_img:item.received_img"
      alt=""
      :width="precent"
      @click="receiveCoupon(item)"
      v-show="!receiveCouponStop"
    >
    <img
      v-for="(item,index) in couponArr"
      :key="'couponPage'+index"
      :src="item.coupon_received==0?item.coupon_img:item.received_img"
      alt=""
      :width="precent"
      v-show="receiveCouponStop"
    >
    <!-- :width="item.pic_size.split('_')[0]"
      :height="item.pic_size.split('_')[1]" -->
  </div>
</template>

<script>
import jsCookie from "@/utils/js-cookie";
export default {
  name: "activeCoupon",
  props: {
    couponArr: {
      type: Array,
      value: []
    }
  },
  data() {
    return {
      receiveCouponStop: false
    };
  },
  computed: {
    precent() {
      let precent = "";
      let { length } = this.couponArr;
      if (length == 2) {
        precent = "64%";
      } else if (length == 3) {
        precent = "33%";
      } else {
        precent = "40%";
      }
      return precent;
    }
  },
  methods: {
    receiveCoupon(item) {
      if (!jsCookie.get("userId")) {
        let { name } = this.$route;
        // this.common.msgBox(this,'please Login',3)
        this.$router.push({
          path: "/login",
          query: {
            name
          }
        });
        // this.$store.dispatch("loginDialogVisible", true);
        return;
      }
      if (item.coupon_received != 0) {
        this.common.msgBox(this,this.$t('activeModule.CouponHas'),2)
        return;
      }
      this.receiveCouponStop = true;
      //防止用户狂点击领取操作
      this.$apis
        .receiveCoupon(
          { coupon_config_id: item.relation_id, item_id: item.item_id },
          jsCookie.get("userId")
        )
        .then(res => {
          this.receiveCouponStop = false;
          if (res.status == 1) {
            this.common.msgBox(this, "Received successfully!", 1);
            item.coupon_received = 1;
          } else {
            this.common.msgBox(this, res.msg, 3);
          }
        })
        .catch(err => {
          this.receiveCouponStop = false;
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.couponCoat {
  display: flex;
  // flex-wrap: wrap;
  justify-content: center;
  img {
    cursor: pointer;
    position: relative;
  }
  .form-onlyRead{
    pointer-events: none;
  }
  .receiveCouponLoading {
    background: red;
    position: absolute;
  }
}
</style>
