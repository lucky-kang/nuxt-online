<template>
  <div class="layout">
    <new-header v-if="showHeader"></new-header>
    <Nuxt/>
    <currency-country></currency-country>
  </div>
</template>

<script>
import newHeader from "@/components/newHeader2/n-header";
import currencyCountry from "@/components/currencyCountry/currencyCountry";
export default {
  name: "Root",
  components: {
    newHeader,
    currencyCountry
  },
  data(){
    return {
      showHeader: true
    }
  },
  created(){
    let {name} = this.$route;
    if(name == 'share_invitation2'){
      this.showHeader = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.layout{
  // position: relative;
}
.nuxt_blank_a{
  cursor: default;
  display: block;
}
.b-container {
  margin: 0 auto;

  @media (min-width: $screen-sm-min) {
    width: $container-sm;
  }

  @media (min-width: $screen-md-min) {
    width: $container-md;
  }

  @media (min-width: $screen-lg-min) {
    width: $container-lg;
  }
}

.b-cursor {
  cursor: pointer;
}

@keyframes backOpacity {
  0% {
    opacity: 1;
  }

  25% {
    opacity: 0.5;
  }

  50% {
    opacity: 1;
  }

  75% {
    opacity: 0.5;
  }

  100% {
    opacity: 1;
  }
}

.animation_opactiy {
  animation: backOpacity 2s ease-in-out infinite;
}

.router-fade-enter-active,
.router-fade-leave-active {
  transition: opacity 0.3s;
}

.router-fade-enter,
.router-fade-leave-active {
  opacity: 0;
}

.bounce-enter-active {
  animation: bounce-in 0.3s;
}

.bounce-leave-active {
  animation: bounce-in 0.3s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

// .el-loading-mask {
//   position: fixed;
//   height: 100%;
//   width: 100%;
//   top: 0;
//   left: 0;
// }

@media only screen and (max-width: 1000px) {
  .el-pagination.is-background .btn-next,
  .el-pagination.is-background .btn-prev,
  .el-pagination.is-background .el-pager li {
    background-color: #ebf5fb;
    border-radius: 5px;
  }
}
</style>
