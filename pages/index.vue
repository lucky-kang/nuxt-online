<template>
  <div id="app">
    <!-- <home-swiper :imgArr="imgArr"></home-swiper> -->
    <img class="homeB" @click="goAllCategoryList" src="~/static/images/homeB.jpg" alt="">
    <div class="f-container"
      v-loading="loading"
    >
    <module-one :shopList="module1Data"></module-one>

    <module-two></module-two>

    <module-three></module-three>

    



    </div>
    <module-four></module-four>
    <!-- <newuser-masking></newuser-masking> -->
    <f-footer></f-footer>
    <use-bar></use-bar>
  </div>
</template>

<script>
let isServer = true;
import fFooter from "@/components/footer/f-footer";
import homeSwiper from "@/components/home-swiper/home-swiper";
import shopCard from "@/components/listCard/listCard";
// import newuserMasking from "@/components/newuserMasking";
import detailWeek from "@/components/home/detailWeek";
import exclusiveBanner from "@/components/home/exclusiveBanner";
import womenClothing from "@/components/home/womenClothing";
import moduleOne from "@/components/home/moduleOne";
import moduleTwo from "@/components/home/moduleTwo";
import moduleThree from "@/components/home/moduleThree";
import moduleFour from "@/components/home/moduleFour";
import useBar from "@/components/useBar/useBar";

export default {
  name: "Home",
  head() {
    return {
      title: "Frisson | You deserve a better life"
    };
  },
  components: {
    fFooter,
    homeSwiper,
    shopCard,
    // newuserMasking,
    moduleTwo,
    moduleThree,
    moduleFour,
    useBar
  },
  async asyncData({ params, store, app, error, route }) {
    let { search, category } = route.query;
      let fetchData = {};
      try {
        let [
          requestModule1Data
        ] = await Promise.all([
          app.$apis.getShopList({
            per_page: 12,
            category_id: '720000',
            orderby: "recommend",
            page: 1,
          })
        ]);
        console.log('9999999-------99999')
        console.log(requestModule1Data)
        if(requestModule1Data.status == 1){
          fetchData.module1Data = requestModule1Data.data;
        } else {
           fetchData.module1Data = null
        }

        return fetchData;
      } catch (error) {
        console.log(error);
        return {};
      }
  },
  data() {
    return {
      title: "Frisson | You deserve a better life",
      loading: false,
      loadShow: false,
      shopState: false,
      viewMoreNoShow: false,
      isScroll: true, //判断是否已经触发函数
      dealsWeekShow: true,
      TrendingNowPage: 2,
      TrendingNowData: [],
      imgArr: [],
    };
  },
  mounted() {
    if (!isServer) {
      console.log("mounted not server11");
      this.loading = true;
      this.loadShow = false;
      this.getHomeData();
    }
    this.buryingPoint.pageView();
    console.log(this.module1Data)
  },
  methods: {
    viewMore() {
      this.getHomeData();
    },
    goAllCategoryList(){
      this.$router.push({
        path: "/categories",
        query: {
          category: '0'
        }
      });
    },
    async getHomeData() {
      let thif = this;
      return;
      this.loadShow = true;
      try {
        let [requestTrendingNowData] = await Promise.all([
          this.$apis.recommendShop(
            { page: this.TrendingNowPage, per_page: 16, type: 1 },
            this.$store.getters.getApiHeader
          )
        ]);
        if (requestTrendingNowData.status == 1) {

        }
      } catch (error) {
        this.loading = false;
        this.loadShow = false;
        this.isScroll = true;
        console.log(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  @import './style/index.scss'
</style>
