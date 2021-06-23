<template>
  <div class="coat">
    <img
      v-for="(item,index) in images?images:[]"
      :key="'couponPage'+index"
      :src="item.image"
      alt=""
      :width="precent"
      @click="toDetail(item)"
    >
    <!-- :width="item.pic_size.split('_')[0]" 
    :height="item.pic_size.split('_')[1]" -->
  </div>
</template>

<script>
export default {
  name: "mySwiper",
  props: {
    images: {
      type: Array,
      value: [{ image: require("~/static/images/default@3x.png") }]
    },
    mdEventName: {
      type: String
    }
  },
  data() {
    return {};
  },
  created() {
    // console.log(images)
  },
  mounted() {
    // console.log(this.images)
  },
  computed: {
    precent() {
      let precent = "100%";
      let { length } = this.images;
      if (length == 2) {
        precent = "49%";
      } else if (length == 3) {
        precent = "32%";
      } else {
        precent = "100%";
      }
      return precent;
    }
  },
  methods: {
    toDetail(item) {
      if (item.type == "tag") {
        let navName = '';
        switch (item.relation_id) {
          case '3814':
            navName = "Adults' costumes"
            break;
          case '3815':
            navName = "Kids costumes"
            break;
          case '3816':
            navName = "Pets' costumes"
            break;
          case '3817':
            navName = "Decor"
            break;
          case '3818':
            navName = "Accessories"
            break;
          default:
            break;
        }
        // 跳商品分分类页
        this.$router.push({
          path: "/categories",
          query: {
            tag: item.relation_id,
            parentNavName: "Home",
            navName
          }
        });
      }
      //跳商品详情
      if (item.type == "product") {
        this.$router.push({
          path: "/product/" + item.relation_id
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.coat {
  display: flex;
  justify-content: space-between;
  img {
    cursor: pointer;
  }
}
</style>
