<template>
  <div class="currency-country" id="currency-country">
          <div :class="currencyListShow ? 'currency currencySelect' : 'currency'" @click="currencySelectClick" id="currency">
            <img
              id="currencyImg"
              v-if="$store.getters.getCurrency == 'EUR'"
              src="~/static/images/icon/EUR.jpg"
            >
            <img
              id="currencyImg"
              v-else-if="$store.getters.getCurrency == 'USD'"
              src="~/static/images/icon/usd.jpg"
            >
            <img
              id="currencyImg"
              v-else-if="$store.getters.getCurrency == 'GBP'"
              src="~/static/images/icon/GBP.jpg"
            >
            <img
              id="currencyImg"
              v-else-if="$store.getters.getCurrency == 'VND'"
              src="~/static/images/icon/VND.jpg"
            >
            <p id="currencyP">{{ $store.getters.getCurrency }}</p>
            <i id="currencyI" class="el-icon-arrow-down"></i>
            <div class="currencyList">
              <div v-for="(v,i) in $store.getters.getCurrencyObj" :key="'currencyItem'+i" class="currencyItem">
                <span @click="menuSelCurrency(JSON.stringify(v))">{{ v.country }} ({{ $store.getters.getCurrencyArr[v.country].Symbol }})</span>
              </div>
            </div>
          </div>
          <div :class="countryListShow ? 'country countrySelect' : 'country'" @click="countrySelectClick" id="country">
            <img id="countryImg" src="~/static/images/icon/positionIcon.png" alt="">
            <p id="countryP">{{$store.getters.getCountry}}</p>
            <i id="countryI" class="el-icon-arrow-down"></i>
            <div class="countryList">
              <div v-for="(v, key) in $store.getters.getCountryArr" :key="'countryItem'+key" class="countryItem">
                <span @click="menuSelCountry(JSON.stringify({v,key}))">{{ v.country }}</span>
              </div>
            </div>
          </div>
        </div>
</template>

<script>

export default {
  name: "currencyCountry",
  data() {
    return {
      currencyListShow: false,
      countryListShow: false
    };
  },
  mounted() {
    window.addEventListener("click",this.documentClick);
  },
  destroyed(){
    document.removeEventListener('click', this.documentClick);
  },
  methods: {
    documentClick(e){
      e = e || window.event;
      var target = e.target || e.srcElement;
      if(target.id == 'country' || 
        target.id == 'currency' || 
        target.id == 'currency-country' || 
        target.id == 'currencyImg' || 
        target.id == 'currencyP' || 
        target.id == 'currencyI' ||
        target.id == 'countryImg' || 
        target.id == 'countryP' || 
        target.id == 'countryI'
      ) {
        return;
      }
      this.currencyListShow = false;
      this.countryListShow = false; 
    },
    currencySelectClick(){
      this.currencyListShow = !this.currencyListShow;
    },
    countrySelectClick(){
      this.countryListShow = !this.countryListShow;
    },
    //国家切换
    menuSelCountry(v) {
      console.log(
        "menuSelCountry++--***",
        this.$store.getters.getCurrencySymbol
      );
      let item = JSON.parse(v);
      let obj = JSON.parse(this.$store.getters.getInitDataObj);
      obj.countryName = item.v.country;
      obj.countryKey = item.key;
      this.$store.dispatch("actInitDataObj", JSON.stringify(obj));
      // let d = new Date();
      // d.setTime(d.getTime() + 2 * 60 * 1000);
      // let expires = d.toUTCString();
      document.cookie =
        "initDataObj=" +
        JSON.stringify(obj) +
        "; Path=/";
      //如果切换了国家，给定一个标识，头部导航也跟着更新
      localStorage.setItem("topNavRefresh", true);
      location.reload();
    },
    
    //币种切换
    menuSelCurrency(v) {
      console.log("menuSelCurrency--");
      let item = JSON.parse(v);
       console.log(item,'item')
      let obj = JSON.parse(this.$store.getters.getInitDataObj);
      console.log(obj,'obj+++')
      obj.currency = item.country;
      this.$store.dispatch("actInitDataObj", JSON.stringify(obj));
      // let d = new Date();
      // d.setTime(d.getTime() + 2 * 60 * 60 * 1000);
      // let expires = d.toUTCString();
      console.log(obj,'obj4564565764564')
      document.cookie =
        "initDataObj=" +
        JSON.stringify(obj) +
        "; Path=/";
      location.reload();
    },
  }
};
</script>
<style lang="scss" scoped>
.currency-country{
      background: #FFFFFF;
      border: 1px solid #F0F1F3;
      border-radius: 4px;
      bottom: 25%;
      left: 2%;
      z-index: 10;
      font-size: 14px;
      position: fixed;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .currency,.country{
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 9px 12px;
        cursor: pointer;
        p{
          margin: 0 4px;
        }
      }
      .currency{
        position: relative;
        .currencyList{
          // top: 27px;
          bottom: 29px;
          left: -12px;
          position: absolute;
          transition:visibility .5s, opacity .5s;
          opacity: 0;
          visibility: hidden;
          min-width: 98px;
          box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.09);
          .currencyItem{
            width: 100%;
            background: #fff;
            position: relative;
            padding: 13px 0 13px 18px;
          }
          .currencyItem:hover{
            span{
              margin-left: 10px;
              transition: 0.5s;
            }
          }
        }
      }
      .currencySelect{
        transition: .5s;
        .currencyList{
          visibility:visible;
          opacity: 1;
        }
      }
      .country{
        transition:display .5s, opacity .5s;
        opacity: 0;
        display: none;

        position: relative;
        .countryList{
          // top: 27px;
          bottom: 29px;
          left: -12px;
          position: absolute;
          transition:visibility .5s, opacity .5s;
          opacity: 0;
          visibility: hidden;
          min-width: 184px;
          box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.09);
          .countryItem{
            width: 100%;
            background: #fff;
            position: relative;
            padding: 13px 0 13px 18px;
          }
          .countryItem:hover{
            span{
              margin-left: 10px;
              transition: 0.5s;
            }
          }
        }
      }
      .countrySelect{
        transition: .5s;
        .countryList{
          visibility:visible;
          opacity: 1;
        }
      }
    }
    .currency-country:hover{
      transition: .5s;
      .country{
        display: block;
        opacity: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 9px 12px;
        cursor: pointer;
      }
    }
</style>