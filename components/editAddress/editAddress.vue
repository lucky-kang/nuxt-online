<template>
  <div class="editCoat">
    <div class="editCont">
      <div class="sddressBody">
        <div class="listCoat">
          <!-- <div class="tilText">Name<em>*</em></div> -->
          <div class="iptCoat">
            <div class="ipt sort">
              <p class="iptText">* {{$t("checkoutAddress.FirstName")}} <span v-show="!shippingAddressObj.shipping_first_name&&saveState">{{$t('address.Incomplete')}}</span></p>
              <input
                :class="!shippingAddressObj.shipping_first_name&&saveState?'noText':''"
                type="text"
                placeholder="First Name"
                v-model="shippingAddressObj.shipping_first_name"
              />
              <!-- <p v-show="!shippingAddressObj.first_name">required</p> -->
            </div>
            <div class="ipt sort">
              <p class="iptText">
                * {{$t("checkoutAddress.LastName")}}
                <span v-show="!shippingAddressObj.shipping_last_name&&saveState">{{$t('address.Incomplete')}}</span>
              </p>
              <input
                :class="!shippingAddressObj.shipping_last_name&&saveState?'noText':''"
                type="text"
                placeholder="Last Name"
                v-model="shippingAddressObj.shipping_last_name"
              />
              <!-- <p v-show="!shippingAddressObj.last_name">required</p> -->
            </div>
          </div>
        </div>

        <div class="listCoat listCoatNoflex">
          <p class="iptText">
            * {{$t("checkoutAddress.PhoneNumber")}}
            <span v-show="!shippingAddressObj.shipping_phone&&saveState">{{$t('address.Incomplete')}}</span>
          </p>
          <div class="iptCoat">
            <div class="ipt">
              <input
                :class="!shippingAddressObj.shipping_phone&&saveState?'noText':''"
                type="text"
                v-model="shippingAddressObj.shipping_phone"
                placeholder="Phone number"
              />
            </div>
          </div>
        </div>

        <div class="listCoat listCoatNoflex">
          <p class="iptText">
            * {{$t("checkoutAddress.Country")}}
            <span v-show="!country&&saveState">{{$t('address.Incomplete')}}</span>
          </p>
          <div class="iptCoat selCoat">
            <div @click="selShow = !selShow">
              <span class="el-icon-d-caret"></span>
              <input
                :class="!country&&saveState?'noText':''"
                type="text"
                placeholder=""
                :readonly="true"
                v-model="country"
              />
            </div>

            <div
              class="sel"
              v-show="selShow"
            >
              <!-- 通过国家接口获得 -->
              <p
                class="selItem"
                @click="selCountry(item, key)"
                v-for="(item, key) in countrys"
                :key="key"
              >
                {{ item }}
              </p>
            </div>
          </div>
        </div>

        <div class="listCoat listCoatNoflex">
          <p class="iptText">
            * {{$t("checkoutAddress.Address1")}}
            <span v-show="!shippingAddressObj.shipping_address1&&saveState">{{$t('address.Incomplete')}}</span>
          </p>
          <div class="iptCoat">
            <div class="ipt">
              <input
                type="text"
                :class="!shippingAddressObj.shipping_address1&&saveState?'noText':''"
                v-model="shippingAddressObj.shipping_address1"
                placeholder="* Address 1"
              />
              <!-- <p v-show="!shippingAddressObj.address_1">required</p> -->
            </div>
          </div>
        </div>

        <div class="listCoat listCoatNoflex">
          <p class="iptText">
            * {{$t("checkoutAddress.Address2")}}
          </p>
          <div class="iptCoat">
            <div class="ipt">
              <input
                type="text"
                v-model="shippingAddressObj.shipping_address2"
                placeholder="* Address 2"
              />
              <!-- <p v-show="!shippingAddressObj.address_2">required</p> -->
            </div>
          </div>
        </div>
        <div class="listCoat">
          <div class="iptCoat">
            <div class="ipt sort selCoat">
              <p class="iptText">
                * {{$t("editAddress.StateCity")}}
                <span v-show="!shippingAddressObj.shipping_state&&saveState">{{$t('address.Incomplete')}}</span>
              </p>
              <div @click="selStateShow = !selStateShow">
                <span
                  class="el-icon-d-caret"
                  v-show="shippingAddressObj.shipping_country_abbr && (shippingAddressObj.shipping_country_abbr == 'US' || shippingAddressObj.shipping_country_abbr == 'FR' || shippingAddressObj.shipping_country_abbr == 'DE')"
                  @click="selStateShow = !selStateShow"
                ></span>
                <input
                  type="text"
                  placeholder="* State/City "
                  v-model="state"
                  :class="!state&&saveState?'noText':''"
                  :disabled="(shippingAddressObj.shipping_country_abbr && (shippingAddressObj.shipping_country_abbr == 'US' || shippingAddressObj.shipping_country_abbr == 'FR' || shippingAddressObj.shipping_country_abbr == 'DE'))"
                  :readonly="countryTotal?countryTotal.country_states[shippingAddressObj.shipping_country]: false"
                />
                <!-- <p v-show="!state">required</p> -->
              </div>
              <div
                class="sel"
                v-if="countryTotal? countryTotal.country_states[shippingAddressObj.shipping_country_abbr]:false"
                v-show="selStateShow"
              >
                <!-- 通过国家接口获得  countryTotal.country_states[shippingAddressObj.state] -->
                <p
                  class="selItem"
                  @click="selState(item, key)"
                  v-for="(item, key) in countryTotal.country_states[shippingAddressObj.shipping_country_abbr]"
                  :key="key"
                >
                  {{ item }}
                </p>
              </div>
            </div>
            <div class="ipt sort">
              <p class="iptText">
                * {{$t("editAddress.townCity")}}
                <span v-show="!shippingAddressObj.shipping_city&&saveState">{{$t('address.Incomplete')}}</span>
              </p>
              <input
                type="text"
                placeholder="*Town/City"
                :class="!shippingAddressObj.shipping_city&&saveState?'noText':''"
                v-model="shippingAddressObj.shipping_city"
              />
              <!-- <p v-show="!shippingAddressObj.city">required</p> -->
            </div>
          </div>
        </div>

        <div class="listCoat">
          <div class="iptCoat">
            <div class="ipt sort">
              <p class="iptText">
                * {{$t("editAddress.Postcode")}}
                <span v-show="!shippingAddressObj.shipping_postcode&&saveState">{{$t('address.Incomplete')}}</span>
              </p>
              <input
                type="text"
                :class="!shippingAddressObj.shipping_postcode&&saveState?'noText':''"
                v-model="shippingAddressObj.shipping_postcode"
                placeholder="* Postcode "
              />
            </div>
          </div>
        </div>
        <div class="btnCoat">
          <div>
            <button @click="saveAddress"><i v-show="saveLoading" class="el-icon-loading" style="color:#fff"></i><span v-show="!saveLoading">{{$t("editAddress.SAVE")}}</span></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { Loading } from "element-ui";
export default {
  name: "editAddress",
  props: {
    editShow: {
      type: Boolean,
      value: false
    },
    addressType: {
      type: Number,
      value: 1
    },
    addressId: {
      type: String,
      value: ""
    }
  },
  data() {
    return {
      saveState: false,
      country: "",
      state: "",
      selShow: false,
      shippingAddressObj: {
        shipping_address1: "",
        shipping_address2: "",
        shipping_city: "",
        shipping_country: "",
        shipping_country_abbr: "",
        shipping_first_name: "",
        shipping_last_name: "",
        shipping_phone: "",
        shipping_postcode: "",
        shipping_state: "",
        shipping_state_abbr: ""
      },
      billingAddressObj: {
        billing_address1: "",
        billing_address2: "",
        billing_city: "",
        billing_country: "",
        billing_country_abbr: "",
        billing_first_name: "",
        billing_last_name: "",
        billing_phone: "",
        billing_postcode: "",
        billing_state: "",
        billing_state_abbr: ""
      },
      oldAddress: null,
      iptState: true,
      countryTotal: null,
      countrys: {},
      stateArr: null,
      selStateShow: false,
      saveLoading: false
    };
  },
  mounted() {
    // You have not made any changes 您没有做任何改动
    // 获得的默认国家自动填入
    this.country = this.shippingAddressObj.shipping_country;

    if (this.addressType == 1) {
      console.log(this.addressType, 1);
    } else {
      this.getAddress(this.addressId); //可以用props
    }
    this.getCountry();
  },
  methods: {
    selCountry(item, itemKey) {
      this.country = item;
      this.shippingAddressObj.shipping_country = item;
      this.shippingAddressObj.shipping_country_abbr = itemKey;
      this.selShow = false;
      this.stateArr = null;
      this.shippingAddressObj.shipping_state = "";
      this.shippingAddressObj.shipping_city = "";
      this.state = "";
      for (let key in this.countryTotal.country_states) {
        if (key == itemKey) {
          this.stateArr = this.countryTotal.country_states[key];
        }
      }
    },
    selState(item, key) {
      this.selStateShow = false;
      this.state = item;
      this.shippingAddressObj.shipping_state_abbr = key;
    },
    checkIpt() {
      console.log(this.shippingAddressObj);
      this.iptState = true;
      for (let key in this.shippingAddressObj) {
        if (
          !this.shippingAddressObj[key] &&
          key != "shipping_state_abbr" &&
          key != "shipping_country_abbr" &&
          key != "shipping_address2"
        ) {
          console.log(key);
          return (this.iptState = false);
        }
      }
    },
    saveAddress() {
      this.saveState = true;
      this.shippingAddressObj.shipping_state = this.state;
      // this.shippingAddressObj.shipping_state_abbr = this.state;
      let { shippingAddressObj } = this;
      if((shippingAddressObj.shipping_country_abbr != 'US' && shippingAddressObj.shipping_country_abbr != 'FR' && shippingAddressObj.shipping_country_abbr != 'DE')){
        this.shippingAddressObj.shipping_state_abbr = this.state;
      }
      this.checkIpt();
      if (!this.iptState) {
        return;
      }
      // Loading.service({
      //   lock: true,
      //   text: "Loading",
      //   background: "rgba(0, 0, 0, 0.7)"
      // });
      this.saveLoading = true;
      if (this.addressType == 1) {
        this.addAddress();
      } else {
        this.setAddress();
      }
    },
    getAddress(id) {
      let thif = this;
      this.$apis
        .getAddressItem(
          {
            id
          },
          this.$store.getters.getApiHeader
        )
        .then(res => {
          if (res.status == 1) {
            // thif.shippingAddressObj = res.data;
            // thif.oldAddress = res.data;
            // thif.country = res.data.country;
            // thif.shippingAddressObj.country = res.data.country_abbr;
            // thif.state = res.data.state;
            // thif.shippingAddressObj.state = res.data.state_abbr;

            let addressData = res.data.item;
            thif.oldAddress = addressData;
            let { shipping_address, billing_address } = addressData;
            thif.shippingAddressObj = shipping_address;
            thif.billingAddressObj = billing_address;
            let {
              shipping_country,
              shipping_country_abbr,
              shipping_state,
              shipping_state_abbr
            } = shipping_address;
            thif.country = shipping_country;
            thif.shippingAddressObj.shipping_country = shipping_country;
            thif.state = shipping_state;
            thif.shippingAddressObj.shipping_state = shipping_state;
          } else {
            thif.common.msgBox(thif, res.msg, 3);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    addAddress() {
      let thif = this;
      this.billingAddressObj = {
        billing_address1: this.shippingAddressObj.shipping_address1,
        billing_address2: this.shippingAddressObj.shipping_address2,
        billing_city: this.shippingAddressObj.shipping_city,
        billing_country: this.shippingAddressObj.shipping_country,
        billing_country_abbr: this.shippingAddressObj.shipping_country_abbr,
        billing_first_name: this.shippingAddressObj.shipping_first_name,
        billing_last_name: this.shippingAddressObj.shipping_last_name,
        billing_phone: this.shippingAddressObj.shipping_phone,
        billing_postcode: this.shippingAddressObj.shipping_postcode,
        billing_state: this.shippingAddressObj.shipping_state,
        billing_state_abbr: this.shippingAddressObj.shipping_state_abbr
      }
      let obj = {
        shipping_address: this.shippingAddressObj,
        billing_address: this.billingAddressObj
      };
      this.$apis
        .addAddress(obj, this.$store.getters.getApiHeader)
        .then(res => {
          console.log(res);
          if (res.status == 1) {
            // thif.common.msgBox(thif, res.msg, 1);
            location.reload();
          } else {
            // Loading.service().close();
            this.saveLoading = false;
            thif.common.msgBox(thif, res.msg, 3);
          }
        })
        .catch(err => {
          // Loading.service().close();
          this.saveLoading = false;
          console.log(err);
        });
    },
    setAddress() {
      let thif = this;
      if (
        thif.countryTotal.country_states[
          this.shippingAddressObj.shipping_country
        ]
      ) {
        console.log("000");
      } else {
        console.log("111");
        this.shippingAddressObj.shipping_state = this.state;
      }
      this.billingAddressObj = {
        billing_address1: this.shippingAddressObj.shipping_address1,
        billing_address2: this.shippingAddressObj.shipping_address2,
        billing_city: this.shippingAddressObj.shipping_city,
        billing_country: this.shippingAddressObj.shipping_country,
        billing_country_abbr: this.shippingAddressObj.shipping_country_abbr,
        billing_first_name: this.shippingAddressObj.shipping_first_name,
        billing_last_name: this.shippingAddressObj.shipping_last_name,
        billing_phone: this.shippingAddressObj.shipping_phone,
        billing_postcode: this.shippingAddressObj.shipping_postcode,
        billing_state: this.shippingAddressObj.shipping_state,
        billing_state_abbr: this.shippingAddressObj.shipping_state_abbr
      }
      let obj = {
        id: this.addressId,
        shipping_address: this.shippingAddressObj,
        billing_address: this.billingAddressObj
      };
      console.log(obj, "+-+-+-");
      this.$apis
        .setAddress(obj, this.addressId, this.$store.getters.getApiHeader)
        .then(res => {
          if (res.status == 1) {
            // thif.common.msgBox(thif, res.msg, 1);
            thif.$emit("refresh");
            thif.$emit("editClose");
            location.reload();
            // thif.$router.go(0)
          } else {
            // Loading.service().close();
            this.saveLoading = false;
            thif.common.msgBox(thif, res.msg, 3);
          }
        })
        .catch(err => {
          // Loading.service().close();
          this.saveLoading = false;
          console.log(err);
        });
    },
    getCountry() {
      let thif = this;
      this.$apis
        .getCountry({}, this.$store.getters.getApiHeader)
        .then(res => {
          console.log(res, "getCountry-----");
          if (res.status == 1) {
            thif.countryTotal = res.data.items;
            thif.countrys = res.data.items.countries;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    closeEdit() {
      this.$emit("editClose");
    }
  }
};
</script>

<style lang="scss" scoped>
.editCoat{
  margin-bottom: 54px;
}
.editCont {
  font-size: 12px;
  background-color: #fff;
  width: 100%;
}

// .sddressBody {
//   padding: 24px;
// }

.listCoat {
  margin-bottom: 20px;
  display: flex;
  .iptCoat {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;

    input {
      width: 100%;
      border: 1px solid $borderColor;
      padding: 10px 15px;
      border-radius: 3px;
      font-size: 16px;
      color: $fontColor1;
    }

    .noText {
      border: 1px solid #ff2b2b;
    }

    .ipt {
      width: 100%;
    }

    .sort {
      width: 48.5%;
    }
  }

  .selCoat {
    position: relative;
    cursor: pointer;

    div {
      width: 100%;
      position: relative;
    }

    input {
      cursor: pointer;
    }

    .el-icon-d-caret {
      position: absolute;
      right: 6px;
      top: 50%;
      transform: translateY(-50%);
    }

    .sel {
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      background-color: #fff;
      border: 1px solid $borderColor;
      padding: 6px 0;
      max-height: 200px;
      overflow-y: scroll;
      z-index: 999;
      box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);

      p {
        line-height: 20px;
        padding: 0 12px;
        color: $fontColor1;
      }

      p:hover {
        background-color: $bjColor;
        color: #fff;
      }
    }
  }
}

.iptText {
  margin-bottom: 10px;

  span {
    color: #ff2b2b;
    margin-left: 10px;
  }
}

.listCoatNoflex {
  display: block;
}

.btnCoat {
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;

  div {
    text-align: center;
    width: 100%;
    button {
      width: 280px;
      cursor: pointer;
      background-color: $btnBjColor;
      height: 42px;
      border-radius: 5px;
      span{
        font-size: 18px;
        font-weight: 550;
        color: #fff;
        letter-spacing: 1px;
      }
    }
  }
}
</style>
