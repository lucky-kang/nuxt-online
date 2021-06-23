<template>
  <div>
    <div class="orderDetail-container">
      <div class="coat">
        <el-row :gutter="20">
          <el-col :lg="4" :sm="4" :xs="4">
             <order-left></order-left>
          </el-col>
          <el-col :lg="20" :sm="20" :xs="20" style="margin-bottom: 50px;">
            <order-detail-right></order-detail-right>
          </el-col>
        </el-row>
      </div>
    </div>
    <f-footer></f-footer>
  </div>
</template>

<script>
//   import {MH_API} from '@/api';
  import fFooter from '@/components/footer/f-footer'
  import orderLeft from "@/components/user/orderLeft"
  import orderDetailRight from "@/components/user/orderDetailRight"
  export default {
    name:'orderDetail',
    components: {
      fFooter,
      orderLeft,
      orderDetailRight
    },
    data() {
      return {

      }
    },
    created() {

    },
    mounted() {
			this.buryingPoint.pageView();
		},
    methods: {

    }
  }
</script>

<style lang="scss" scoped>
.orderDetail-container{
  margin: 1.5rem auto 0;
	width: 1200px;
}
  .coat {
    margin-top: 24px;
  }
</style>
