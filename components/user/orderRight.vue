<template>
	<div class="rightCoat">
		<p class="myOrder-title">{{ $t("order.myOrder") }}</p>
		<div class="tilCoat">
			<div class="cutBtn">
        <p :class="types == 'all' ? 'cutAll' : ''" @click="cutList('all')">All</p>
				<!-- <p :class="types == 'active' ? 'cutActive' : ''" @click="cutList('active')">Active</p> -->
				<!-- <p :class="types == 'completed' ? 'cutActive' : ''" @click="cutList('completed')">Completed</p> -->
			</div>
		</div>
		<div class="listCoat">
			<div class="itemCoat" v-for="(item, index) in orderList" :key="'aa' + index">
				<div class="itemLeft">
					<p class="timer">{{ item.created_at | timers(1) }}</p>
					<!-- <p class="money">
						{{
						$store.getters.getCurrencyArr[item.order_currency].Symbol
						}}
						{{ item.order_total_price }}
					</p> -->
				</div>
				<div class="itemCenter">
					<div class="quan">
						<div class="quanActive"></div>
					</div>
					<div class="shu"></div>
				</div>
				<div class="itemRight">
					<order-item :orderItemObj="item"></order-item>
				</div>
			</div>
			<div class="loadingCoat">
				<!-- <img
					v-show="loadShow"
					src="//img.lanrentuku.com/img/allimg/1212/5-121204193R0-50.gif"
				/> -->
        <loading v-if="loadShow"></loading>
				<!-- <img v-show="loadShow" src="//img.lanrentuku.com/img/allimg/1212/5-121204193R0-50.gif"> -->
				<p v-show="isDataState">{{ $t("shopList.noData") }}</p>
			</div>
		</div>
		<!-- <ul class="listCoat">
			<li class="orderItem">
				<div class="orderItemTop">
					<div class="orderNo">Order NO.34567</div>
					<div class="orderTime">18.07/2020 16:55:05</div>
				</div>
				<div class="orderItemBottom"></div>
			</li>
		</ul> -->
	</div>
</template>

<script>
// import { MH_API } from "@/api/api";
import orderItem from "./orderItem";
export default {
  name: "orderRight",
  components: {
    orderItem
  },
  props: {},
  data() {
    return {
      orderList: [],
      pages: 1,
      per_page: 5,
      loadShow: false,
      isNowState: false, //判断是否正在请求数据当中
      isDataState: false, //数据是否已请求完毕
      isScroll: true, //判断是否已经触发函数
      types: "all" //all
    };
  },
  mounted() {
    let thif = this;
    window.onscroll = function() {
      if (thif.isScroll && !thif.isNowState && !thif.isDataState) {
        if (
          thif.common.getScrollTop() + thif.common.getClientHeight() >=
          thif.common.getScrollHeight()
        ) {
          //写后台加载数据的函数
          // console.log("距顶部"+scrollTop+"可视区高度"+windowHeight+"滚动条总高度"+scrollHeight);
          thif.isScroll = false;
          thif.getOrderList();
        }
      }
    };
    this.getOrderList();
  },
  methods: {
    getOrderList() {
      let thif = this;
      thif.loadShow = true;
      thif.isNowState = true;
      this.$apis
        .orderList(
          {
            page: this.pages,
            per_page: this.per_page,
            type: this.types
          },
          this.$store.getters.getApiHeader
        )
        .then(res => {
          console.log(res);
          thif.isScroll = true;
          thif.isNowState = false;
          thif.loadShow = false;
          if (res.status == "1") {
            thif.pages++;
            thif.orderList.push(...res.data.items);
            if (res.data.items.length == 0) {
              thif.isDataState = true;
            }
          } else {
            thif.common.msgBox(thif, res.msg, 3);
          }
        })
        .catch(err => {
          thif.isScroll = true;
          thif.isNowState = false;
          thif.loadShow = false;
          console.log(err);
        });
    },
    cutList(type) {
      this.types = type;
      this.pages = 1;
      this.isDataState = false;
      this.orderList = [];
      this.getOrderList();
    }
  }
};
</script>

<style lang="scss" scoped>
.rightCoat {
  min-height: 700px;
  .myOrder-title {
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 30px;
  }
}
.listCoat {
  margin-top: 24px;
  .orderItem{
	width: 1100px;
	height: 200px;
	background: red;
	.orderItemTop{
		background: green;
		width: 100%;
		font-size: 16px;
		// .orderNo{

		// }
		// .orderTime{

		// }
	}
  }
}
.tilCoat {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  height: 60px;
  .cutBtn {
    display: flex;
    height: 100%;
    line-height: 60px;
    p {
      font-weight: 300;
      cursor: pointer;
      width: 200px;
	  height: 100%;
	  color: $fontColor1;
      text-align: center;
    }
    .cutAll {
	  font-weight: normal;
      border-bottom: 2px solid $fontColor1;
    }
  }
}
.itemCoat {
  display: flex;
  flex-direction: row;
  .itemLeft {
    padding-right: 6px;
    .timer {
      white-space: nowrap;
      font-size: 14px;
      color: #777;
    }
    .money {
      white-space: nowrap;
      color: #172D55;;
      font-size: 16px;
      font-weight: bold;
    }
  }
  .itemCenter {
    position: relative;
    height: auto;
    margin-top: 3px;
    .quan {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 18px;
      width: 18px;
      background-color: #fff;
      border-radius: 50%;
      border: 1px solid #ddd;
      position: relative;
      z-index: 20;
      div {
        width: 10px;
        height: 10px;
        background-color: #ddd;
        border-radius: 50%;
      }
      .quanActive {
        background-color: #172D55;;
      }
    }
    .shu {
      position: absolute;
      top: 3px;
      height: 100%;
      width: 0;
      border-left: 1px solid #ddd;
      left: 0;
      right: 0;
      margin: auto;
      z-index: 10;
    }
  }
}
.itemRight {
  margin-left: 20px;
  width: 100%;
}
.loadingCoat {
  margin-top: 12px;
  margin-bottom: 24px;
  text-align: center;
  img {
    height: 30px;
  }
  p {
    font-size: 18px;
    margin-top: 20px;
    color: rgba(102, 102, 102, 0.7);
  }
}
</style>
