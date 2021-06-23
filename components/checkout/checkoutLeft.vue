<template>
  <div class="tabCoat">
    <!-- <p class="tabTil">{{$t('checkout.SHIPPINGADDRESS')}}</p> -->
    <div class="listCoat">
      <p class="addressListTil">{{$t('checkout.SHIPPINGADDRESS')}}</p>
      <div v-show="!editShow">
        <div
          class="addressListCoat"
          v-if="addressDefault.id"
        >
          <div class="item">
            <!-- <p class="tabTil">{{$t('checkout.SHIPPINGADDRESS')}}</p> -->
            <div class="list">
              <!-- <p class="left">Your Name:</p> -->
              <p class="rights">
                {{addressDefault.shipping_address.shipping_first_name+" "+addressDefault.shipping_address.shipping_last_name}} &nbsp;&nbsp;&nbsp;&nbsp;
                {{ addressDefault.shipping_phone }}
              </p>
            </div>
            <div class="list">
              <!-- <p class="left">Address:</p> -->
              <p class="rights">
                {{ addressDefault.shipping_address.shipping_city }}
                {{ addressDefault.shipping_address.shipping_state }},
                {{ addressDefault.shipping_address.shipping_country }}
                {{ addressDefault.shipping_address.shipping_postcode }}
                {{ addressDefault.shipping_address.shipping_address1 }}
                {{addressDefault.shipping_address.shipping_address2}}

              </p>
            </div>
            <!-- <div class="list">
              <p class="left">Country:</p>
              <p class="rights">{{ addressDefault.country }}</p>
            </div>
            <div class="list">
              <p class="left">ZIP/Post Code:</p>
              <p class="rights">{{ addressDefault.postcode }}</p>
            </div>
            <div class="list">
              <p class="left">Phone:</p>
              <p class="rights">{{ addressDefault.phone }}</p>
            </div> -->
            <div class="listFoot">
              <img
                @click="editAddress(2, addressDefault.id)"
                src="../../static/images/icon/writeAddressIcon.png"
                alt=""
              >
              <p @click="editAddress(2, addressDefault.id)">{{$t('checkout.Edit')}}</p>
              <!-- <p class="shu">|</p>
              <p>Delete</p> -->
            </div>
          </div>
        </div>
        <button
          class="addBtn"
          @click="editAddress(1, '')"
          v-if="!addressDefault.id"
        >
          <span class="el-icon-circle-plus-outline"></span>
          <span>{{$t('checkout.AddNewAddress')}}</span>
        </button>
      </div>
      <edit-address
        v-if="editShow"
        :editShow="editShow"
        :addressType="addressType"
        @refresh="addressDefaults"
        :addressId="addressId"
        @editClose="editShow = false"
      ></edit-address>
    </div>

    <div
      colspan="2"
      class="textareaCoat"
    >
      <p class="tdTil">{{ $t("footer.Email") }}</p>
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        v-model="OrderEmail"
        @input="changeOrderEmail"
      ></textarea>
      <p class="emailTip">{{$t('footer.EmailTip')}}</p>
    </div>

    <div
      colspan="2"
      class="textareaCoat"
    >
      <p class="tdTil">{{ $t("checkout.OrderNotes") }}</p>
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        v-model="OrderNotes"
        :placeholder="$t('checkout.notesDelivery')"
      ></textarea>
    </div>

    <div class="deliveryCard">
      <p class="tdTil">{{$t('checkout.DELIVERY')}}</p>
      <div class="deliveryCont">
        <div class="deliveryLeft">
          <p>{{$t('checkout.ExpressShopping')}}</p>
          <p><span>3-5</span> {{$t('checkout.WorkingDays')}}</p>
        </div>
        <p
          class="deliveryRight"
          v-if="shopObj && !!Number(shopObj.delivery_price)"
        >{{$store.getters.getCurrencySymbol}}{{shopObj.delivery_price}}</p>
        <p
          v-else
          class="deliveryRight"
        >{{$t('checkout.FREE')}}</p>
      </div>
    </div>
    <!-- <div
      class="deliveryTag"
      v-if="shopObj && $store.getters.getCountry == 'United Kingdom (UK)' && !!shopObj.delivery_price_limit && (Number(shopObj.delivery_price_limit.limit) - Number(shopObj.subtotal)) > 0"
    >
      <div class="deliveryLeft">Buy {{$store.getters.getCurrencySymbol}}
        {{Number(shopObj.delivery_price_limit.limit) - Number(shopObj.subtotal) | numToFix}} more to enjoy FREE SHIPPING!</div>
      <div class="deliveryRight">
        <span
          class="add"
          @click="goHome()"
        >Add ></span>
      </div>
    </div> -->
    <!-- <div class="paymentCard">
      <p class="tdTil">{{$t('checkout.PAYMENTMETHOD')}}</p>
      <div class="paymentCont">
        <div class="selCoat">
          <div></div>
        </div>
        <img
          src="../../static/images/checkout/checkoutCard.png"
          alt=""
        >
        <div class="paymentText">
          <p>{{$t('checkout.OnlinePayment')}}</p>
          <p>{{$t('checkout.Creditordebit')}}</p>
        </div>
      </div>
    </div> -->
    <div class="itemCard">
      <p class="tdTil">{{shopObj?shopObj.items_count:''}}{{$t('checkout.Item')}}(s)</p>
      <div class="itemCoat">
        <div
          class="itemList"
          v-for="(item, index) in shopObj ? shopObj.items : []"
          :key="'gq' + index"
        >
          <img
            :src="item.image"
            alt=""
          >
          <p><span
              v-for="(attrItem,attrIndex) in item.attributes"
              :key="index+'jb'+attrIndex"
            >
              {{attrItem}}<i>/</i>
            </span></p>
          <div class="priceToat">
            <span class="shop_price">{{$store.getters.getCurrencySymbol}}{{item.shop_price}}</span>
            <span class="reference_price" v-if="item.shop_price != item.reference_price">{{$store.getters.getCurrencySymbol}}{{item.reference_price}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import editAddress from "@/components/editAddress/checkoutAddress";
export default {
  name: "checkoutLeft",
  components: {
    editAddress
  },
  props: {
    shopObj: {
      type: Object,
      value: null
    },
    addressDefault: {
      type: Object
    }
  },
  data() {
    return {
      selShow: false,
      selCountry: "",
      emailAddress: "",
      OrderNotes: "",
      OrderEmail: "",
      emailState: false,
      countryObj: [],
      editShow: false,
      addressType: 1,
      addressId: ""
    };
  },
  mounted() {
    if (this.$store.getters.getUserInfo) {
      this.$store.getters.getUserInfo.email
        ? (this.emailState = true)
        : (this.emailState = false);
    }
    if (this.$store.getters.getEmail) {
      this.OrderEmail = this.$store.getters.getEmail;
    }
  },
  methods: {
    goHome() {
      this.$router.push({
        path: "/"
      });
    },
    changeOrderEmail(e) {
      this.$bus.$emit("orderEmail", e.target.value);
    },
    addressDefaults() {
      this.$emit("getDefaultAdd");
    },
    editAddress(type, id) {
      this.editShow = true;
      this.addressType = type;
      this.addressId = String(id);
    }
  }
};
</script>

<style lang="scss" scoped>
.tabCoat {
  width: 100%;
  .tabTil {
    font-size: 18px;
    color: #555;
    padding: 10px 0 12px;
    font-weight: bold;
    padding-left: 12px;
  }
}
.tdTil {
  font-size: 24px;
  color: #555;
  font-weight: 550;
  padding: 30px 0;
  line-height: 30px;
  color: $fontColor1;
}
.rightCoat {
  min-height: 700px;
}
.listCoat {
  // margin-top: 10px;
  background-color: #fff;
  padding: 35px 40px 30px;
}
.addressListTil {
  font-size: 24px;
  font-weight: 550;
  line-height: 30px;
  margin-bottom: 20px;
}
.tilCoat {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  height: 60px;
  border-bottom: 1px solid #ddd;
  p {
    font-weight: bold;
    color: #111;
  }
}
.addressListCoat {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  .item {
    display: flex;
    flex-direction: column;
    font-size: 16px;
    width: 100%;
    padding: 15px 20px;
    border: 1px solid $borderColor;
    border-radius: 5px;
    .list {
      display: flex;
      padding: 3px 0;
    }
    p {
      line-height: 20px;
    }
    .left {
      color: $fontColor2;
      width: 122px;
    }
    .rights {
      color: $fontColor1;
      text-align: left;
    }
    .listFoot {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      font-size: 18px;
      align-items: center;
      img {
        height: 20px;
        cursor: pointer;
        margin-right: 4px;
      }
      p {
        cursor: pointer;
        color: $bjColor;
      }
      .shu {
        padding: 0 8px;
      }
    }
  }
}
.addBtn {
  cursor: pointer;
  margin-bottom: 0px;
  margin-top: 36px;
  font-size: 24px;
  padding: 0 24px;
  height: 38px;
  border: 1px dashed #9b9b9b;
  border-radius: 5px;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 120px;
  .el-icon-circle-plus-outline {
    font-size: 24px;
    margin-right: 8px;
  }
  span {
    color: #9b9b9b;
  }
}
.textareaCoat {
  padding: 0px 38px 30px;
  margin-top: 20px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  .emailTip {
    font-family: Ubuntu;
    font-size: 16px;
    line-height: 16px;
    color: $fontColorBlue;
    margin-top: 14px;
  }
}
textarea {
  resize: none;
  width: 100%;
  height: 50px;
  background-color: #f5f5f5;
  padding: 15px 11px 0;
  font-size: 16px;
  border-radius: 4.4px;
  line-height: 20px;
}
.deliveryCard {
  padding: 0 38px 30px;
  background-color: #fff;
  margin-top: 20px;
  .deliveryCont {
    background-color: #f5f5f5;
    border-radius: 4.4px;
    padding: 15px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .deliveryLeft {
      font-size: 16px;
      line-height: 22px;
      span {
        color: $bjColor;
      }
    }
    .deliveryRight {
      font-weight: 500;
      font-size: 24px;
    }
  }
}
.deliveryTag {
  width: 100%;
  height: 0.64rem;
  font-size: 18px;
  display: flex;
  padding: 0 43px;
  justify-content: space-between;
  align-items: center;
  background: #ffd9c0;
  .deliveryLeft {
    color: #f55915;
  }
  .deliveryRight {
    .add {
      cursor: pointer;
      color: #f55915;
    }
  }
}
.paymentCard {
  padding: 0 38px 30px;
  background-color: #fff;
  margin-top: 20px;
  .paymentCont {
    display: flex;
    align-items: center;
    .selCoat {
      height: 20px;
      width: 20px;
      border-radius: 50%;
      border: 1px solid $bjColor;
      position: relative;
      div {
        width: 11px;
        height: 11px;
        position: absolute;
        border-radius: 50%;
        background-color: $bjColor;
        top: 0;
        left: 0;
        margin: auto;
        bottom: 0;
        right: 0;
      }
    }
    img {
      height: 88px;
      margin-left: 16px;
      margin-right: 20px;
    }
    .paymentText {
      font-size: 16px;
      line-height: 24px;
    }
  }
}
.itemCard {
  background-color: #fff;
  margin-top: 20px;
  padding: 0 38px 0px;
  padding-right: 8px;
  .itemCoat {
    display: flex;
    flex-wrap: wrap;
    .itemList {
      margin-bottom: 30px;
      margin-right: 30px;
      font-size: 16px;
      width: 120px;
      img {
        width: 100%;
        border-radius: 12px;
      }
      p {
        font-size: 0.18rem;
        line-height: .3rem;
        margin-top: 6px;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        span:last-child i {display: none;}
      }
      .priceToat{
        .shop_price{
          font-size: 0.18rem;
        }
        .reference_price{
          font-size: .12rem;
          color: #999;
          text-decoration-line: line-through;
        }
      }
    }
  }
}
</style>
