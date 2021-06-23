<template>
	<div class="rightCoat">
		<div class="tilCoat">
			<p>{{$t("PersonalCenter.MyAddress")}}</p>
		</div>
		<div class="listCoat">
			<div class="addressListCoat">
				<div class="item" v-show="Object.keys(addressItem).length && !editShow">
					<div class="list">
						<p class="left">{{$t("PersonalCenter.YourName")}}</p>
						<p class="rights">
							{{ addressItem.shipping_first_name + " " + addressItem.shipping_last_name }}
						</p>
					</div>
					<div class="list">
						<p class="left">{{$t("PersonalCenter.Address")}}</p>
						<p class="rights">
							{{ addressItem.shipping_address1 }}，{{ addressItem.shipping_address2 }}<br />
							{{ addressItem.shipping_city }},{{ addressItem.shipping_state }}
						</p>
					</div>
					<div class="list">
						<p class="left">{{$t("PersonalCenter.Country")}}</p>
						<p class="rights">{{ addressItem.shipping_country }}</p>
					</div>
					<div class="list">
						<p class="left">{{$t("PersonalCenter.ZIPPostCode")}}</p>
						<p class="rights">{{ addressItem.shipping_postcode }}</p>
					</div>
					<div class="list">
						<p class="left">{{$t("PersonalCenter.Photo")}}</p>
						<p class="rights">{{ addressItem.shipping_phone }}</p>
					</div>
					<div class="listFoot">
						<p @click="editAddress(2, addressId)">{{$t("PersonalCenter.Edit")}}</p>
						<!-- <p class="shu">|</p>
            <p>Delete</p> -->
					</div>
				</div>
			</div>
			<button
			 class="addBtn"
			 @click="editAddress(1, '')"
			 v-if="!Object.keys(addressItem).length && !editShow"
			>
				<span class="el-icon-circle-plus-outline"></span>
				<span>{{$t("PersonalCenter.AddNew")}}</span>
			</button>
		</div>
		<edit-address
		 v-if="editShow"
		 :editShow="editShow"
		 :addressType="addressType"
		 :addressId="addressId"
		 @refresh="getAddressList"
		 @editClose="editShow = false"
		></edit-address>
    <!-- <div v-if="editShow" @click="editShow = !editShow">88888</div> -->
	</div>
</template>

<script>
// import { MH_API } from "@/api/api";
import editAddress from "@/components/editAddress/editAddress";
export default {
  name: "addressRight",
  components: {
    editAddress
  },
  data() {
    return {
      addressItem: {},
      editShow: false,
      addressType: 1,
      addressId: ""
    };
  },
  mounted() {
    this.getAddressDefault();
  },
  methods: {
    getAddressDefault() {
      this.$apis
        .addressDefault({}, this.$store.getters.getApiHeader)
        .then(res => {
          if (res.status == 1) {
            let addressDefault =
              Object.keys(res.data.item).length != 0 ? res.data.item : {};
            if (Object.keys(addressDefault).length) {
              this.addressId = addressDefault.id;
              this.addressItem = addressDefault.shipping_address;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
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
.rightCoat {
  min-height: 700px;
}
.listCoat {
  margin-top: 24px;
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
    font-size: 14px;
    width: 45%;
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
      font-size: 12px;
      p {
        color: $fontColor2;
		cursor: pointer;
      }
      .shu {
        padding: 0 8px;
      }
    }
  }
}
.addBtn {
  margin-bottom: 30px;
  margin-top: 36px;
  font-size: 14px;
  padding: 0 24px;
  height: 38px;
  border: 1px solid $bjColor;
  border-radius: 5px;
  background-color: transparent;
  display: flex;
  align-items: center;
  .el-icon-circle-plus-outline {
    font-size: 18px;
    margin-right: 8px;
  }
  span {
    color: $bjColor;
  }
}
</style>
