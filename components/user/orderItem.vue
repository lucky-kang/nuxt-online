<template>
  <div class="listCoats">
    <div class="qipao"></div>
    <div class="listHead">
      <div class="hLeft">
        <p>{{ $t("order.order") }} #</p>
        <p class="orderNum">
          {{ orderItemObj ? orderItemObj.master_order_id : "" }}
        </p>
      </div>
      <div class="hRight">
        <!-- <div class="inervalCoat" v-if="payShow" @click="toPay()">
					<img
						src="~/static/images/icon/timef55915.png"
						alt=""
					/>
					<p>PAY ({{ countDown }})</p>
				</div> -->
        <p class="orderState">
          {{ orderItemObj ? orderItemObj.status_text : "" }}
        </p>
        <span
          class="el-icon-arrow-right b-cursor"
          @click="toOrderDetail"
        ></span>
      </div>
    </div>
    <div
      class="list"
      v-for="(item, index) in orderItemObj.line_items"
      :key="'bc' + index"
    >
      <div class="imgCoat">
        <img
          v-lazy="item.sku_image_url"
          alt=""
        />
      </div>
      <div class="contCoat">
        <p
          class="orderText"
          @click="linkHandle(item)"
        >
          {{ item.goods_name }}
        </p>
        <div class="orderSel">
          <p
            v-for="(attrItem, index) in item.attributes"
            :key="'attr' + index"
          >
            {{ attrItem }}&nbsp;
          </p>
        </div>
        <div class="orderDec">
          <!-- <span>{{$store.getters.getCurrencyArr[orderItemObj.order_currency].country}}</span> -->
          <p class="sellPrice">
            {{$store.getters.getCurrencyArr[orderItemObj.order_currency].Symbol}}
            {{ item.order_total_price }}
          </p>
          <span>x {{ item.sku_quantity }}</span>
        </div>
      </div>
      <div
        class="dateCoat"
        v-if="item.msg"
      >
        {{item.msg.date_title + '：' + item.msg.date_note}}
      </div>
      <div
        class="statusTextCoat"
      >
        {{item.status_text}}
      </div>
    </div>
    <div class="masterOrderOperation">
      <div class="orderSubDec">
        <p>{{ $t("order.Qty") }}: {{orderItemObj ? orderItemObj.line_items ? orderItemObj.line_items.length : 0 : []}}&nbsp;{{ $t("order.Items") }}</p>
        <span class="total">{{ $t("order.order") }}Total: </span>
        <!-- <span class="total">Total: <span>{{$store.getters.getCurrencyArr[orderItemObj.order_currency].country}}</span></span> -->
        <p class="totalPrice">
          {{$store.getters.getCurrencyArr[orderItemObj.order_currency].Symbol}}
          {{orderItemObj ? orderItemObj.order_total_price : ''}}
        </p>
      </div>
      <div
        class="payCoat"
        v-if="payShow"
        @click="toPay()"
      >
        <p>{{ $t("order.PayNow") }}</p>
      </div>
      <div
        class="detailsCoat"
        v-if="detailsShow"
        @click="toOrderDetail"
      >
        <p>{{ $t("order.Details") }}</p>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "orderItem",
  props: {
    orderItemObj: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      keepInterval: 0,
      countDown: "",
      timeObj: null,
      payShow: false,
      detailsShow: false
    };
  },
  mounted() {
    let { status, status_text } = this.orderItemObj;
    if (status == 1 && status_text == "UNPAID") {
      this.payShow = true;
    }
    if (status == 2 && status_text == "PAID") {
      this.detailsShow = true;
    }
    // let thif = this;
    // if (this.orderItemObj) {
    // 	if (thif.orderItemObj.rest_payment_time == 0) {
    // 		return;
    // 	} else {
    // 		thif.payShow = true;
    // 		thif.timeObj = thif.common.timeHour(
    // 			thif.orderItemObj.rest_payment_time
    // 		);
    // 		thif.countDown =
    // 			thif.timeObj.hours +
    // 			":" +
    // 			thif.timeObj.fen +
    // 			":" +
    // 			thif.timeObj.miao;
    // 		this.keepInterval = setInterval(function() {
    // 			if (
    // 				thif.timeObj.miao == 0 &&
    // 				thif.timeObj.fen == 0 &&
    // 				thif.timeObj.hours == 0
    // 			) {
    // 				thif.payShow = false;
    // 				clearInterval(thif.keepInterval);
    // 				return;
    // 			}
    // 			thif.timeObj.miao == 0
    // 				? (thif.timeObj.miao = 59)
    // 				: thif.timeObj.miao--;
    // 			thif.timeObj.miao < 10
    // 				? (thif.timeObj.miao = "0" + thif.timeObj.miao)
    // 				: "";
    // 			if (thif.timeObj.miao == 0) {
    // 				thif.timeObj.fen == 0
    // 					? (thif.timeObj.fen = 59)
    // 					: thif.timeObj.fen--;
    // 				thif.timeObj.fen < 10
    // 					? (thif.timeObj.fen = "0" + thif.timeObj.fen)
    // 					: "";
    // 				if (thif.timeObj.fen == 0) {
    // 					thif.timeObj.hours == 0
    // 						? ""
    // 						: thif.timeObj.hours--;
    // 					thif.timeObj.hours < 10
    // 						? (thif.timeObj.hours =
    // 								"0" + thif.timeObj.hours)
    // 						: "";
    // 				}
    // 			}
    // 			thif.countDown =
    // 				thif.timeObj.hours +
    // 				":" +
    // 				thif.timeObj.fen +
    // 				":" +
    // 				thif.timeObj.miao;
    // 		}, 1000);
    // 	}
    // }
  },
  // beforeDestroy() {
  // 	clearInterval(this.keepInterval);
  // },
  methods: {
    linkHandle(item) {
      this.$router.push("/product/" + item.goods_id);
    },
    toOrderDetail() {
      this.$router.push({
        path: "/user/orderDetail",
        query: {
          orderId: this.orderItemObj.master_order_id
        }
      });
    },
    toPay() {
      this.$router.push({
        path: "/checkoutTwo",
        query: {
          orderId: this.orderItemObj.master_order_id
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.listCoats {
  width: 100%;
  border: 1px solid #ddd;
  background-color: #fff;
  margin-bottom: 20px;
  position: relative;
}
.qipao {
  position: absolute;
  top: 10px;
  left: -15px;
  width: 15px;
  height: 17px;
  overflow: hidden;
}
.qipao:before {
  border-color: #ddd transparent transparent transparent;
  border-width: 32px 28px 0;
  display: block;
  content: "";
  width: 0;
  height: 0;
  border-style: solid;
}
.qipao:after {
  position: absolute;
  top: 1px;
  left: 2px;
  border-color: #fff transparent transparent transparent;
  border-width: 30px 28px 0;
  display: block;
  content: "";
  width: 0;
  height: 0;
  border-style: solid;
}

.listHead {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  height: 42px;
  padding: 0 20px;
  .hLeft {
    display: flex;
    flex-direction: row;
    .orderNum {
      font-weight: bold;
    }
  }
  .hRight {
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    padding-right: 20px;
    // .inervalCoat {
    //   display: flex;
    //   flex-direction: row;
    //   align-items: center;
    //   border: 1px solid $bjColor;
    //   padding: 2px 4px;
    //   border-radius: 5px;
    //   cursor: pointer;
    //   margin-right: 12px;
    //   img {
    //     height: 18px;
    //     margin-right: 3px;
    //   }
    //   p {
    //     font-size: 13px;
    //     color: $bjColor;
    //     // font-weight: bold;
    //   }
    // }
    .orderState {
      color: #3B65B3;
      font-size: 16px;
      font-weight: bold;
    }
    .el-icon-arrow-right {
      padding: 5px;
      display: flex;
      position: absolute;
      right: -15px;
      font-size: 18px;
      font-weight: bold;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
.list {
  display: flex;
  width: 95%;
  flex-direction: row;
  align-items: center;
  padding: 12px 20px;
  position: relative;
  margin: 23px auto;
  background: #F0F1F3;
  .imgCoat {
    display: flex;
    padding-right: 16px;
    img {
      height: 75px;
    }
  }
  .contCoat {
    position: relative;
    padding-right: 20px;
    min-height: 75px;
    max-width: 34%;
    font-size: 14px;
    margin-left: 20px;
    .orderText {
      font-size: 13px;
      color: $fontColor1;
    }
    .orderSel {
      display: flex;
      flex-direction: row;
      margin-top: 4px;
      p {
        margin-right: 6px;
        font-size: 14px;
        color: $fontColor2;
        font-weight: bold;
      }
    }
    .orderDec {
      display: flex;
      margin: 10px 0;
      align-items: center;
      span {
        font-weight: bold;
      }
      .sellPrice {
        font-weight: bold;
        margin: 0 7px;
      }
    }
    span {
      line-height: 18px;
      color: $fontColor1;
      font-size: 14px;
    }
  }
  .dateCoat {
    font-size: 16px;
    text-align: center;
  }
  .statusTextCoat {
    font-size: 16px;
    color: $fontColorBlue;
    margin-left: 25px;
  }
}
.masterOrderOperation {
  width: 100%;
  height: 110px;
  .orderSubDec {
    font-size: 18px;
    display: flex;
    justify-content: flex-end;
    width: 100%;
    padding-right: 22px;
    p,
    span {
      font-weight: bold;
    }
    .total {
      margin: 0 11px;
    }
  }
  .payCoat,
  .detailsCoat {
    font-size: 16px;
    text-align: center;
    line-height: 30px;
    float: right;
    margin: 30px 60px;
    border-radius: 4px;
    padding: 3px 16px;
    p {
      cursor: pointer;
    }
  }
  .payCoat {
    background: #c37071;
    p {
      color: #fff;
    }
  }
  .detailsCoat {
    border: 1px solid #c37071;
    p {
      color: #c37071;
    }
  }
}
</style>
