<template>
  <div class="rightCoat">
    <div class="tilCoat">
      <p>{{ $t("orderDetail.ORDERDETAIL") }}</p>
    </div>
    <div class="listCoat">
      <div class="left">
        <div class="list">
          <div class="tilName">
            <p>{{ $t("orderDetail.OrderNumber") }}</p>
          </div>
          <div class="tilText tilTextOne">
            <p>{{ orderData ? orderData.master_order_id : "" }}</p>
            <b
              @click="copy()"
              :data-clipboard-text="orderData ? orderData.master_order_id : ''"
              id="copyOrderId"
            >{{ $t("orderDetail.COPY") }}</b>
          </div>
        </div>
        <div class="list">
          <div class="tilName">
            <p>{{ $t("orderDetail.OrderDate") }}</p>
          </div>
          <div class="tilText">
            <p>
              {{
              orderData
              ? orderData.created_at
              : "" | timers(5)
              }}
            </p>
          </div>
        </div>
        <div class="list">
          <div class="tilName">
            <p>{{ $t("orderDetail.PaymentStatus") }}</p>
          </div>
          <div class="tilText">
            <p style="color:#C37071;font-weight: bold;">
              {{ orderData ? orderData.status_text : "" }}
            </p>
          </div>
        </div>
        <div class="list">
          <div class="tilName">
            <p>{{ $t("orderDetail.ShippingAddress") }}</p>
          </div>
          <div class="tilText">
            <p>
              {{ orderData ? orderData.shipping_address.shipping_first_name : "" }}
              {{ orderData ? orderData.shipping_address.shipping_last_name : "" }}
            </p>
            <p>
              {{ orderData ? orderData.shipping_address.shipping_address1 : "" }}
            </p>
            <p>
              {{ orderData ? orderData.shipping_address.shipping_address2 : "" }}
            </p>
            <p>
              {{ orderData ? orderData.shipping_address.shipping_state : "" }},
              {{ orderData ? orderData.shipping_address.shipping_state_abbr : "" }},
              {{ orderData ? orderData.shipping_address.shipping_postcode : "" }}
            </p>
            <p>{{ orderData ? orderData.shipping_address.shipping_country : "" }}</p>
            <p>{{ orderData ? orderData.shipping_address.shipping_phone : "" }}</p>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="summary">
          <p class="sumTil">{{ $t("orderDetail.Summary") }}</p>
        </div>
        <div class="sumListCoat">
          <div class="sumList">
            <p>{{ $t("orderDetail.Subtotal") }}</p>
            <p>
              {{
              orderData
              ? $store.getters.getCurrencyArr[
              orderData.order_currency
              ].Symbol
              : ""
              }}{{ orderData ? orderData.order_subtotal_price : "" }}
            </p>
          </div>
          <div class="sumList">
            <p>{{ $t("orderDetail.Standard") }}</p>
            <p>{{ $t("orderDetail.Free") }}</p>
          </div>

          <div
            class="sumList"
            v-if="orderData ? Number(orderData.coupon_price) : false"
          >
            <p>{{ $t("orderDetail.Coupon") }}</p>
            <p>-{{orderData ? $store.getters.getCurrencyArr[orderData.order_currency].Symbol : ""}}{{ orderData ? orderData.coupon_price : '' }}</p>
          </div>
          <div
            class="sumList"
            v-if="orderData ? Number(orderData.point_price) : false"
          >
            <p>{{ $t("orderDetail.Points") }}</p>
            <p>-{{orderData ? $store.getters.getCurrencyArr[orderData.order_currency].Symbol : ""}}{{ orderData ? orderData.point_price : ''}}</p>
          </div>
          <div
            class="sumList"
            v-if="orderData ? Number(orderData.service_price) : false"
          >
            <p>{{ $t("orderDetail.ServiceFee") }}</p>
            <p>{{orderData ? $store.getters.getCurrencyArr[orderData.order_currency].Symbol : ""}}{{ orderData ? orderData.service_price : '' }}</p>
          </div>
        </div>
        <div class="totalPay">
          <p class="totalPayTil">
            {{ $t("orderDetail.TotaltoPay") }}
          </p>
          <p class="totalPayText">
            {{
            orderData
            ? $store.getters.getCurrencyArr[
            orderData.order_currency
            ].Symbol
            : ""
            }}{{ orderData ? orderData.order_total_price : "" }}
          </p>
        </div>
        <div class="btnCoat">
          <button
            class="pay"
            v-if="orderData ? orderData.status == 1 && orderData.allow_cancel == 1 : false"
            @click="toCheckoutTwo"
          >
            <!-- <img
						 v-show="payBtnShow"
						 src="~/static/images/icon/timefff.png"
						 alt=""
						/> -->
            <p>{{ countDown }} {{ $t("orderDetail.PayNow") }} </p>
          </button>
          <button
            class="clearPay"
            @click="cancelClick()"
            v-if="orderData ? orderData.status == 1 && orderData.allow_cancel == 1 : false"
          >
            {{ $t("orderDetail.CANCELORDER") }}
          </button>
        </div>
      </div>
    </div>
    <!-- orderData?(orderData.order_note?true:false):false -->
    <div
      class="order_note"
      v-if="orderData?(orderData.user_note?true:false):false"
    >
      <p class="order_noteTil">{{ $t("orderDetail.OrderNote") }}</p>
      <p>{{orderData?orderData.user_note:''}}</p>
    </div>
    <div class="itemCoat">
      <div class="itemTil">
        <p>{{ $t("orderDetail.Item") }}({{ itemList.length }})</p>
      </div>
      <div class="itemListCoat">
        <div
          class="list"
          v-for="(item, index) in itemList"
          :key="'bc' + index"
        >
          <div class="imgCoat">
            <img
              v-lazy="item.sku_image_url"
              alt=""
            />
          </div>
          <div class="contCoat">
            <p class="orderText">
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
              <!-- <span>{{orderData ? $store.getters.getCurrencyArr[orderData.order_currency].country : ''}}</span> -->
              <p class="sellPrice">
                {{orderData ? $store.getters.getCurrencyArr[orderData.order_currency].Symbol : ''}}
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
          <!-- 父订单支付状态为PAID时显示sku的订单状态 -->
          <div class="statusTextCoat">
            <p>{{item.status_text}}</p>
            <!-- Tracking Info -->
            <!-- sku订单状态为SHIPPED或Received时显示物流信息 -->
            <div
              class="trackingInfo"
              @click="showshipment(item,item.order_id)"
              v-if="item.status == 4 || item.status == 5"
            >
              {{ $t("orderDetail.TrackingInfo") }}
            </div>
          </div>
          <!-- 父订单支付状态为PAID时才显示sku的订单操作按钮 -->
          <div
            class="orderOperation"
            v-if="orderData.status == 2"
          >
            <!-- <div
						 v-if="item.item_receive == 0"
						 class="haveReceivedCoat"
						 @click="haveReceived(item.order_id)"
						>
						</div> -->
            <el-button
              v-if="item.item_receive == 1"
              class="haveReceivedCoat"
              @click="haveReceived(item.order_id)"
              :loading="receiptOrderLoading"
            > {{ $t("orderDetail.HaveReceived") }}</el-button>
            <div
              v-if="item.item_cancel == 1"
              class="cancelOrderCoat"
              @click="cancelChildOrder(item.order_id)"
            >
              <p>{{ $t("orderDetail.CancelOrder") }}</p>
            </div>
            <div
              v-if="item.item_refund == 1"
              class="requestRefundCoat"
              @click="requestRefund(item.order_id)"
            >
              <p>{{ $t("orderDetail.RequestRefund") }}</p>
            </div>
            <!-- <div
						 class="writeReviewCoat"
						 @click="writeReview()"
						>
							<p>Write a Review</p>
						</div> -->
          </div>
        </div>
      </div>
    </div>
    <div
      class="cancelMasking"
      v-show="cancelMaskingShow"
    >
      <div class="maskCont">
        <span
          class="el-icon-close"
          @click="cancelMaskingShow = false"
        ></span>
        <p class="maskTil">
          {{ $t("orderDetail.reason") }}
        </p>
        <div
          class="cancelList"
          v-for="(item, index) in reasonsList"
          :key="'gg' + index"
        >
          <p>{{ item.title }}</p>
          <span
            :class="
							index == cancelActive ? 'el-icon-success' : 'quan'
						"
            @click="cancelActive = index"
          ></span>
        </div>
        <div
          class="writeCoat"
          v-show="cancelActive == reasonsList.length - 1"
        >
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            v-model="reasonsText"
            placeholder="Please write your reason for cancellation"
          ></textarea>
        </div>
        <div class="btnCoat">
          <button
            :class="cancelActive != 'no' ? 'btnActive' : ''"
            @click="clearOrder"
          >
            {{ $t("orderDetail.SUBMIT") }}
          </button>
        </div>
      </div>
    </div>

    <shi-pment
      v-if="showshipmentState"
      :dataInfo="showshipmentdata"
      @editClose="showshipmentState = false"
    ></shi-pment>
  </div>
</template>

<script>
// import { MH_API } from "@/api/api";

// import orderItem from "./orderItem";
import ShiPment from "~/components/order/shipment";
export default {
  name: "viewOrderDetail",
  components: {
    ShiPment
  },
  props: {
    orderData: {
      type: Object
    }
  },
  head() {
    return {
      script: [
        {
          src:
            "https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js"
        }
      ]
    };
  },
  data() {
    return {
      showshipmentState: false,
      itemList: [],
      orderData: null,
      keepInterval: 0,
      countDown: "",
      timeObj: null,
      countDownShow: false,
      reasonsList: [],
      cancelActive: "no",
      reasonsText: "",
      cancelMaskingShow: false,
      ifStatus: "", //记录订单状态
      payBtnShow: false, //支付组按钮显示状态
      payText: "", //支付组按钮显示文本
      payBtnType: 1, //支付按钮点击执行的方法
      cancelBtnShow: false, //取消按钮显示状态
      cancelText: "", //取消订单按钮显示文本
      cancelBtnType: 1, //取消按钮点击执行方法,
      showshipmentdata: {},
      receiptOrderLoading: false
    };
  },
  mounted() {
    this.getOrderDetail();
  },
  methods: {
    getOrderDetail() {
      // let orderData = this.orderData;
      // this.orderData = orderData;
      let line_items = this.orderData.line_items;
      this.itemList = line_items;
      let { status, status_text } = this.orderData;
      this.cancelOrderReasons();
    },
    copy() {
      let thif = this;
      let clipboard = new ClipboardJS("#copyOrderId");
      clipboard.on("success", function(e) {
        e.clearSelection(); //选中需要复制的内容
        clipboard.destroy();
        thif.$message(thif.$t("shopDetail.CopySuccessfully"));
      });
      clipboard.on("error", function(e) {
        clipboard.destroy();
        thif.$message(thif.$t("shopDetail.CopyError"));
      });
    },
    toCheckoutTwo() {
      this.$router.push({
        path: "/checkoutTwo",
        query: {
          orderId: this.$route.query.orderId
        }
      });
    },
    showshipment(item, id) {
      console.log(item, "oooo", id);
      let shipmentinfo = null;
      if (item.item_shipment.length != null) {
        shipmentinfo = {
          details: [
            {
              message: "In the packaging",
              date: "",
              location: ""
            }
          ]
        };
      } else {
        shipmentinfo = item.item_shipment["shipment"];
      }
      this.showshipmentdata = shipmentinfo;
      this.showshipmentState = !this.showshipmentState;
    },
    //已支付的父订单的子sku订单确认收货
    haveReceived(order_id) {
      let thif = this;
      this.$confirm("Have You Recevied Your Items?", {
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel"
      }).then(() => {
        // this.receiptOrderLoading = true;
        thif.receiptOrder(order_id);
      });
    },
    //已支付的父订单的子sku订单退款,走发邮件退款
    requestRefund(order_id) {
      let thif = this;
      let email = "support@frissonlife.com";
      let subject = `Refund Child Order (${order_id})`;
      this.$confirm(
        `If you have any issues with your product, please contact our email at <a href="mailto:${email}?subject=${subject}" style='color: #f55915'>support@frissonlife.com</a> to inform us of your order number.`,
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: "Contact",
          cancelButtonText: "Cancel"
        }
      ).then(() => {
        thif.cancelOrderSendEmail(order_id, 1);
      });
    },
    //已支付的父订单的子sku订单取消,走发邮件取消订单
    cancelChildOrder(order_id) {
      let thif = this;
      let email = "support@frissonlife.com";
      let subject = `Cancel Child Order (${order_id})`;
      this.$confirm(
        `If you have any issues with your product, please contact our email at <a href="mailto:${email}?subject=${subject}" style='color: #f55915'>support@frissonlife.com</a> to inform us of your order number.`,
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: "Contact",
          cancelButtonText: "Cancel"
        }
      ).then(() => {
        thif.cancelOrderSendEmail(order_id, 2);
        //   let sendObj = {
        //     order_id: order_id,
        //     cancel_type: "order"
        //     // reason_id: String(reasonsObj.id)
        //   };
        //   this.$apis
        //     .clearOrder(sendObj, this.$store.getters.getApiHeader)
        //     .then(res => {
        //       if (res.status == 1) {
        // 		thif.common.msgBox(thif, res.msg, 1);
        // 		thif.getOrderDetail();
        //       } else {
        // 		thif.common.msgBox(thif, res.msg, 3);
        // 		thif.getOrderDetail();
        //       }
        //     })
        //     .catch(err => {
        //       console.log(err);
        //     });
      });
    },
    // 未支付的父订单取消
    cancelClick() {
      //cancelMaskingShow = true
      if (this.cancelBtnType == 1) {
        this.cancelMaskingShow = true;
      } else {
        //退款程序
        // 单纯弹窗提示联系客服
        this.$alert(
          "If you have any issues with your product, please contact our email at <span style='color: #f55915'>support@frissonlife.com</span> to inform us of your order number.",
          "WARNING",
          {
            confirmButtonText: "CONFIRM",
            dangerouslyUseHTMLString: true
          }
        );
      }
    },
    //确认收货接口
    receiptOrder(order_id) {
      let obj = {
        order_id
      };
      this.$apis
        .receiptOrder(obj, this.$store.getters.getApiHeader)
        .then(res => {
          //   this.receiptOrderLoading = false;
          if (res.status == 1) {
            this.getOrderDetail();
            this.common.msgBox(this, res.msg, 1);
          } else {
            this.common.msgBox(this, res.msg, 3);
          }
        })
        .catch(err => {
          //   this.receiptOrderLoading = false;
          console.log(err);
        });
    },
    //取消订单接口
    clearOrder() {
      let thif = this;
      let reasonsObj = this.reasonsList[this.cancelActive];
      let sendObj = null;
      if (reasonsObj.type == 1) {
        sendObj = {
          master_order_id: this.$route.query.orderId,
          cancel_type: "master_order",
          reason_id: String(reasonsObj.id)
        };
      } else if (reasonsObj.type == 2) {
        sendObj = {
          master_order_id: this.$route.query.orderId,
          cancel_type: "master_order",
          reason_id: String(reasonsObj.id),
          reason_content: this.reasonsText
        };
      }
      this.$apis
        .clearOrder(sendObj, this.$store.getters.getApiHeader)
        .then(res => {
          console.log(res);
          if (res.status == 1) {
            thif.common.msgBox(thif, res.msg, 1);
            thif.cancelMaskingShow = false;
            thif.$router.go(-1);
          } else {
            thif.cancelMaskingShow = false;
            thif.common.msgBox(thif, res.msg, 3);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //取消订单原因
    cancelOrderReasons() {
      let thif = this;
      this.$apis
        .cancelOrderReasons({}, this.$store.getters.getApiHeader)
        .then(res => {
          console.log(res);
          if (res.status == 1) {
            thif.reasonsList = res.data.items;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //发起邮箱
    cancelOrderSendEmail(orderId, type) {
      let email = "support@frissonlife.com";
      let subject;
      //type=1为退款发邮件
      if (type == 1) {
        subject = `Refund Child Order (${orderId})`;
      }
      //type=2为取消订单发邮件
      if (type == 2) {
        subject = `Cancel Child Order (${orderId})`;
      }
      window.location.href = `mailto:${email}?subject=${subject}`;
    }
  },

  beforeDestroy() {
    clearInterval(this.keepInterval);
  }
};
</script>

<style lang="scss" scoped>
@import "./viewOrderDetail";
</style>
