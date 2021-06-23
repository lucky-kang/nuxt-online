<template>
	<div class="swpper footer-box">
		<div class="coat">
			<div class="upCoat">
				<div
				 class="list fqas"
				 :class="moveFaqsState ? 'childShow' : ''"
				>
					<p class="footTil">
						{{ $t("footer.Support")|daxie }}
						<span
						 class="moveShow"
						 :class="
								moveFaqsState
									? 'el-icon-arrow-down'
									: 'el-icon-arrow-right'
							"
						 @click="moveFaqsState = !moveFaqsState"
						></span>
					</p>
					<!--  -->
					<p
					 class="item"
					 @click="toFootPage('Delivery')"
					>{{ $t("footer.ShippingDelivery") }}</p>
					<p
					 class="item"
					 @click="toFootPage('Arrange')"
					>{{ $t("footer.ReturnRefund") }}</p>
					<p
					 class="item"
					 @click="toFootPage('Privacy')"
					>{{ $t("footer.PrivacyPolicy") }}</p>
					<p
					 class="item"
					 @click="toFootPage('Term')"
					>{{ $t("footer.TermsofService") }}</p>
					<!-- <p class="item" @click="toFootPage('BrandName')">{{ $t("footer.BrandName") }}</p> -->
				</div>
				<div
				 class="list about"
				 :class="moveAboutState ? 'childShow' : ''"
				>
					<p class="footTil">
						{{ $t("footer.ABOUTS") }}
						<span
						 class="moveShow"
						 :class="
								moveAboutState
									? 'el-icon-arrow-down'
									: 'el-icon-arrow-right'
							"
						 @click="moveAboutState = !moveAboutState"
						></span>
					</p>
					<p
					 class="item firstItem"
					 @click="toFootPage('FAQs')"
					>{{ $t("footer.FAQs") }}</p>
					<p
					 class="item firstItem"
					 @click="toFootPage('About')"
					>{{ $t("footer.OurStory") }}</p>
					<p class="item">
						<nuxt-link to="/contact">{{ $t("footer.Contact") }}</nuxt-link>
					</p>
          <p class="item">
            <nuxt-link to="/becomeAnAffiliate">{{ $t("footer.BecomeAA") }}</nuxt-link>
          </p>
				</div>
				<div
				 class="list contact"
				 :class="moveContactState ? 'childShow' : ''"
				>
					<p class="footTil">
						{{ $t("footer.REGISTERANDSAVE") }}
						<span
						 class="moveShow"
						 :class="
								moveContactState
									? 'el-icon-arrow-down'
									: 'el-icon-arrow-right'
							"
						 @click="moveContactState = !moveContactState"
						></span>
					</p>
					<p class="item firstItem">{{ $t("footer.BeTheFirst") }}</p>
					<div class="contactIpt">
						<img
						 src="../../static/images/icon/footEmail.png"
						 alt=""
						>
						<input
						 @keydown.enter="toPage"
						 placeholder="Enter your email"
						 v-model="footEmail"
						 type="text"
						>
					</div>
				</div>
				<div class="followCoat">
					<div class="follow-us">
						{{ $t("footer.FOLLOWTil") }}
					</div>
					<div class="followIcon">
						<a
						 href="https://www.instagram.com/frissonlife_official"
						 target="_blank"
						>
							<img
							 src="../../static/images/icon/ins.png"
							 alt=""
							>
						</a>
						<a
						 href="https://www.facebook.com/FrissonLife-101073678672063"
						 target="_blank"
						>
							<img
							 src="../../static/images/icon/facebook.png"
							 alt=""
							>
						</a>
					</div>
				</div>
				<div
				 class="list download"
				>
					<p class="footTil">{{ $t("footer.DOWNLOADTil") }}</p>
					<div class="imgCoat">
						<div class="imgCoat-left">
							<a
							 href="https://apps.apple.com/us/app/frisson-art-of-living/id1557186463"
							 target="_blank"
							>
								<img
								 class="appstore"
								 src="~static/images/img/appstore.png"
								 alt=""
								>
							</a>
							<a
							 href="https://play.google.com/store/apps/details?id=com.gv.frisson"
							 target="_blank"
							>
								<img
								 class="googleplay"
								 src="~static/images/img/googleplay.png"
								 alt=""
								>
							</a>
						</div>
						<!-- <div class="imgCoat-right">
							<img
							 src="~/static/images/img/QRCode.png"
							 alt=""
							>
						</div> -->
					</div>
				</div>
			</div>
			<!-- <hr> -->
			<div class="centerCoat">
				<div class="list left">
					<!-- <p class="footTil">{{ $t("footer.EASYTil") }}</p> -->
					<div class="iconCoat">
						<!-- <img :src="item" v-for="(item, index) in iconArr1" :key="'a' + index" alt=""> -->
						<img
						 src="../../static/images/icon/icon_americanexpress.png"
						 alt=""
						>
						<img
						 src="../../static/images/icon/icon_applepay.png"
						 alt=""
						>
						<img
						 src="../../static/images/icon/Mastercard.png"
						 alt=""
						>
						<img
						 src="../../static/images/icon/icon_paypal.png"
						 alt=""
						>
						<img
						 src="../../static/images/icon/VISA.png"
						 alt=""
						>
					</div>
				</div>
				<div
				 class="list right"
				 v-if="false"
				>
					<p class="footTil">{{ $t("footer.FOLLOWTil") }}</p>
					<div class="iconCoat">
						<a
						 href="https://www.instagram.com/foroomarket/?utm_source=Website&utm_medium=Footer&utm_campaign=Ins"
						 target="_blank"
						>
							<img
							 src="~static/images/icon/ins.png"
							 alt=""
							>
						</a>
						<a
						 href="https://www.facebook.com/ForooMarket/?utm_source=Website&utm_medium=Footer&utm_campaign=Facebook"
						 target="_blank"
						>
							<img
							 src="~static/images/icon/facebook.png"
							 alt=""
							>
						</a>
						<a
						 href="https://www.linkedin.com/company/31060175/admin/?utm_source=Website&utm_medium=Footer&utm_campaign=LinkedIn"
						 target="_blank"
						>
							<img
							 src="~static/images/icon/linkedin.png"
							 alt=""
							>
						</a>
						<a
						 href="https://www.tiktok.com/@foroomarket?utm_source=Website&utm_medium=Footer&utm_campaign=Tiktok"
						 target="_blank"
						>
							<img
							 src="~static/images/icon/tiktok.png"
							 alt=""
							>
						</a>
					</div>
				</div>
			</div>
			<!-- <hr> -->
			<div
			 class="forooCopyright"
			 v-html="$t('footer.Copyright2')"
			></div>
		</div>
	</div>
</template>

<script>
export default {
  name: "f-footer",
  data() {
    return {
      moveFaqsState: false,
      moveAboutState: false,
      moveContactState: false,
      footEmail: ""
      //   iconArr2: [
      //     {
      //       image: "https://cdn.foroo.co.uk/wp-content/assets/icon/share_ins.svg",
      //       url: "https://www.instagram.com/foroomarket/?utm_source=Website&utm_medium=Footer&utm_campaign=Ins"
      //     },
      //     {
      //       image:"https://cdn.foroo.co.uk/wp-content/assets/icon/share_facebook.svg",
      //       url: "https://www.facebook.com/ForooMarket/?utm_source=Website&utm_medium=Footer&utm_campaign=Facebook"
      // 	},
      //     {
      //     	image:"https://cdn.foroo.co.uk/wp-content/assets/icon/share_linkedin.svg",
      //     	url:
      //     		"https://www.linkedin.com/company/31060175/admin/?utm_source=Website&utm_medium=Footer&utm_campaign=LinkedIn"
      //     },
      //     {
      //     	image:"https://cdn.foroo.co.uk/wp-content/assets/icon/share_tiktok.svg",
      //     	url:
      //     		"https://www.tiktok.com/@foroomarket?utm_source=Website&utm_medium=Footer&utm_campaign=Tiktok"
      //     }
      //   ]
    };
  },
  mounted() {
    if (!sessionStorage.getItem("recordRoute")) {
      sessionStorage.setItem("recordRoute", JSON.stringify([this.$route.name]));
    } else {
      let routeArr = JSON.parse(sessionStorage.getItem("recordRoute"));
      if (routeArr.indexOf(this.$route.name) == -1) {
        routeArr.push(this.$route.name);
        sessionStorage.setItem("recordRoute", JSON.stringify(routeArr));
      }
    }
  },
  methods: {
    toPage() {
      if (this.footEmail) {
        if (this.$store.getters.getLoginToken) {
          this.$router.push({
            path: "/user/order"
          });
        } else {
          this.$router.push({
            path: "/login",
            query: {
              regEmail: this.footEmail
            }
          });
        }
      }
    },
    toFootPage(pageName) {
      this.$router.push({
        path: "/footPage/" + pageName
      });
      // window.open(news.href, "_blank");
      // this.$router.resolve({
      //   path:'/footPage/'+pageName,
      // })
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./footer";
</style>
