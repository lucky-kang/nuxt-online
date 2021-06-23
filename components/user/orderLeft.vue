<template>
	<div class="leftCoat">
		<div class="navCoat">
			<!-- <p class="personalCenter">{{$t("PersonalCenter.PersonalCenter")}}</p> -->
			<nuxt-link
				to="/user/order"
				:class="$route.name == 'order' || $route.name == 'user-orderDetail'? 'nuxt-link-active navActive': ''"
			>{{ $t("header.Orders") }}</nuxt-link>
			<nuxt-link
				to="/user/address"
				:class="$route.name == 'address' ? 'nuxt-link-active navActive' : ''"
			>{{ $t("header.Addresses") }}</nuxt-link>

      <nuxt-link
				to="/user/coupon"
				:class="$route.name == 'coupon' ? 'nuxt-link-active navActive' : ''"
			>{{ $t("header.Coupons") }}</nuxt-link>
      <nuxt-link
				to="/user/wishList"
				:class="$route.name == 'wishlist' ? 'nuxt-link-active navActive' : ''"
			>{{ $t("header.WishList") }}</nuxt-link>
			<!-- <a href="/#/accountDetail" :class="$route.name=='accountDetail'?'navActive':''">{{$t('header.AccountDetails')}}</a> -->
			<!-- <a href="/#/wishlist" :class="$route.name=='wishlist'?'navActive':''">{{$t('header.Wishlist')}}</a> -->
		</div>
	</div>
</template>

<script>
export default {
  name: "orderLeft",
  data() {
    return {
      breadcrumb: [
        {
          name: "women",
          id: 123,
          children: {
            name: "dress",
            id: 456
          }
        }
      ]
    };
  },
  created() {
    console.log(this.$store.getters.getUserInfo);
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.tilCoat {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 15px;
  height: 60px;
  border-bottom: 1px solid #ddd;
  img {
    height: 30px;
    border-radius: 50%;
    margin-right: 8px;
  }
  p {
    font-weight: bold;
    color: #111;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.navCoat {
  font-size: 14px;
  padding: 12px 0;
  display: flex;
  flex-direction: column;
  .personalCenter {
    font-weight: 300;
    font-size: 16px;
	height: 32px;
    line-height: 32px;
  }
  a {
    cursor: pointer;
    line-height: 32px;
    font-weight: 300;
  }
  a:hover {
    font-weight: bold;
  }
  .navActive,.nuxt-link-active {
    font-weight: bold;
  }
}
</style>
