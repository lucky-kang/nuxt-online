<template>
  <div class="groupCoat">
    <div class="shopCoat" v-if="groupData">
    <img v-lazy="groupData.product.image" alt="">
      <div class="shopRight">
        <p class="shopName">{{groupData.product.name}}</p>
        <div>
          <p class="sellPrice" v-html="$store.getters.getCurrencySymbol+' '+groupData.product.group_price"></p>
          <p class="yuanPrice" v-html="$store.getters.getCurrencySymbol+' '+groupData.product.regular_price"></p>
        </div>
      </div>
      <button class="openInApp" @click="goApp">{{ $t("GroupDeal.OpenInApp") }}</button>
    </div>
    <div class="freeBuyer">
      <div class="free">
        <img src="../static/images/group/icon_freeshipping.png" alt="">
        <p>{{ $t("GroupDeal.FreeShipping") }}</p>
      </div>
      <p class="shu">|</p>
      <div class="free">
        <img src="../static/images/group/icon_icon_buyerprotection.png" alt="">
        <p>{{ $t("GroupDeal.BuyerProtection") }}</p>
      </div>
    </div>
    <div class="invitation">
      <div class="til">
        <p>{{ $t("GroupDeal.Invitation") }}</p>
        <div></div>
      </div>
      <div class="invitTime" v-show="groupData?(groupData.rest_time!=0&&groupData.rest_users_count!=0):false">
        <p>{{ $t("GroupDeal.Only") }}<span>{{groupData?groupData.rest_users_count:''}}</span> {{ $t("GroupDeal.PlaceLeft") }}</p>
      </div>
      <div class="invitCount" v-if="groupData&&groupData.rest_users_count!=0">
        <p class="invitText">{{endInShow?'Invitation Expired in':'End In'}} </p>
        <div>
          <p>{{countObj.hours|keepNum}}</p>
          <span>:</span>
          <p>{{countObj.fen|keepNum}}</p>
          <span>:</span>
          <p>{{countObj.miao|keepNum}}</p>
        </div>
      </div>
      <p class="invitText" v-show="groupData?(groupData.rest_users_count!=0&&groupData.rest_time==0):false">{{ $t("GroupDeal.GroupExpired") }}</p>
      <p class="invitText" v-show="groupData?(groupData.rest_users_count==0):false">{{ $t("GroupDeal.GroupFull") }}</p>
      <div class="userCard" v-if="groupData">
        <div v-for="(item,index) in groupData.group_deal_users" :key="'group'+index">
          <img v-if="item.avatar" v-lazy="item.avatar" alt="">
          <div v-if="!item.avatar" :style="{background:colorArr[item.color]}">{{item.nickname|cut}}</div>
          <p class="owner" v-show="item.is_opener==1">{{ $t("GroupDeal.OWNER") }}</p>
        </div>
        <div v-show="groupData?(groupData.rest_users_count!=0):false">
          <img src="../static/images/group/invite.png" alt="">
        </div>
      </div>
      <div class="joinGroup">
        <button @click="goApp">{{ $t("GroupDeal.JoinGroup") }}</button>
      </div>
    </div>
    <div class="regulation">
      <div class="til">
        <p>{{ $t("GroupDeal.Invitation") }}</p>
        <div></div>
      </div>
      <div class="GroupDealRegulation">
        <img src="../static/images/group/GroupDealRegulation.png" alt="">
      </div>
    </div>

    <div class="mayLikeCoat">
      <p class="mayTil">{{ $t("cart.MayLike") }}</p>
      <div class="mayCoat">
        <div class="shopCard" v-for="(item,index) in shopArr" :key="'deal'+index">
          <list-card :shopObj="item" :fuhao="$store.getters.getCurrencySymbol"></list-card>
        </div>
      </div>
      <p v-show="isDataState" class="noData">{{ $t("common.NoData") }}</p>
    </div>
  </div>
</template>

<script>
  import listCard from "@/components/shopCard/shopItem";
  import { Loading } from "element-ui";
  // https://beta.foroo.co.uk/group_deal?product_id=146324&group_deal_open_id=893&r_id=146324&r_type=product
  export default {
    name:'group_deal',
    components:{
      listCard
    },
    data(){
      return {
        shopArr:[],
        page:1,
        loadShow: false,
        isNowState: false, //
        isDataState: false, //
        isScroll: true, //
        groupData:null,
        countObj:{hours:0,fen:0,miao:0},
        colorArr:{
          "a": '#CC6A87',
          "b": '#EA9085',
          "c": '#537D91',
          "d": '#AF8BAF',
          "e": '#4D4C7D',
          "f": '#CC7F5D',
          "g": '#434E52',
          "h": '#3282B8',
          "i": '#BE7575',
          "j": '#719192',
          "k": '#6A6ECC',
          "l": '#44656C',
          "m": '#915366',
          "n": '#8D254A',
          "o": '#207C60',
          "p": '#737529',
          "q": '#102A86',
          "r": '#0F8787',
          "s": '#544B1A',
          "t": '#59127B',
          "u": '#C04851',
          "v": '#A5A58D',
          "w": '#EFAFAD',
          "x": '#D6A01D',
          "y": '#4D4C7D',
          "z": '#A53860',
        },
        timer:'',
        endInShow:false,
      }
    },
    mounted() {
      window.addEventListener("scroll", this.scrollMethod);
      this.getShopData(this.$route.query.product_id);
      this.getGroupDetail();
      this.buryingPoint.pageView();
    },
    destroyed() {
      window.removeEventListener("scroll", this.scrollMethod);
    },
    computed:{

    },
    filters:{
      cut(value){
        return value.substring(0,1).toUpperCase();
      },
      keepNum(value){
        if(String(value).length == 1){
          return '0'+String(value);
        } else {
          return value;
        }
      }
    },
    methods:{
      goApp(){
        window.location.href = this.$route.query.redirect_url;
      },
      scrollMethod() {
        let thif = this;
        if (thif.isScroll && !thif.isNowState && !thif.isDataState) {
          if (
            thif.common.getScrollTop() + thif.common.getClientHeight() >=
            thif.common.getScrollHeight()
          ) {
            thif.isScroll = false;
            thif.getShopData(this.$route.query.product_id);
          }
        }
      },
      setTimeNum(){
        if(this.countObj.miao==0&&this.countObj.fen==0&&this.countObj.hours==0){
          clearInterval(this.timer);
          this.endInShow = true;
          return;
        }
        this.countObj.miao--;
        if(this.countObj.miao==-1){
          this.countObj.miao = 59;
          this.countObj.fen--;
          if(this.countObj.fen == -1){
            this.countObj.fen = 59;
            if(this.countObj.hours!=0){
              this.countObj.hours--
            }
          }
        }
      },
      getShopData(id){
        let thif = this;
        thif.isNowState = true;
        // thif.isDataState = true;
        thif.loadShow = true;
        this.$apis.recommendShopId({id:id,page:thif.page,per_pag:12},this.$store.getters.getApiHeader).then(res=>{
          thif.isScroll = true;
          thif.isNowState = false;
          thif.loadShow = false;
          console.log(res)
          if(res.status == 1){
            thif.page++;
            thif.shopArr.push(...res.data);
            if(res.data.length<12){
              thif.isDataState = true;
            }
          }
        }).catch(error=>{
          thif.isNowState = false;
          thif.loadShow = false;
          console.log(error);
        })
      },
      getGroupDetail(){
        // groupDetail
        Loading.service({
          lock: true,
          text: "Loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        this.$apis.groupDetail({group_id:this.$route.query.group_deal_open_id}).then(res => {
          console.log(res);
          Loading.service().close();
          if(res.status == 1){
            for(let i=0;i<res.data.group_deal_users.length;i++) {
              res.data.group_deal_users[i].color = res.data.group_deal_users[i].nickname.substring(0,1).toLowerCase();
            }
            this.groupData = res.data;
            if(this.groupData.rest_time!=0){
              // {hours:3,fen:0,miao:0}
              this.countObj = this.common.timeHour(this.groupData.rest_time);
              this.timer = setInterval(this.setTimeNum,1000);
            }
          }
        }).catch(err => {
          Loading.service().close();
          console.log(err);
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .groupCoat {
    background: #E5E5E5;
    position: relative;
  }
  .shopCoat {
    background-color: #fff;
    padding: .24rem;
    display: flex;
    position: relative;
    img {
      height: 2.2rem;
      border-radius: 4px;
      margin-right: .24rem;
    }
    .shopRight {
      display: flex;
      height: 2.2rem;
      flex-direction: column;
      justify-content: space-between;
      .shopName {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        font-size: .32rem;
        line-height: .4rem;

      }
      div {
        .sellPrice {
          font-size: .48rem;
          line-height: .56rem;
          color: #FF8334;
          margin-bottom: 0.08rem;
        }
        .yuanPrice {
          font-size: .32rem;
          color: #555555;
          position: relative;
          width: fit-content;
        }
        .yuanPrice:after {
          content: '';
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%);
          width: 100%;
          border-top: 1px solid #555;
          padding-top: 2px;
        }
      }
    }
    button {
      position: absolute;
      right: 0;
      height: .56rem;
      border-top-left-radius: 1rem;
      border-bottom-left-radius: 1rem;
      background-color: $fontColor1;
      color: #fff;
      padding-left: 0.22rem;
      padding-right: 2px;
      bottom: .68rem;
    }
  }
  .freeBuyer {
    height: .48rem;
    background-color: #FCE690;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: .26rem;
    div {
      display: flex;
      align-items: center;
    }
    img {
      height: .24rem;
      margin-right: 0.08rem;
    }
    .shu {
      margin: 0 .92rem;
    }
  }

  .invitation {
    margin-top: .24rem;
    background-color: #fff;
    padding-bottom: .3rem;
  }
    .til {
      padding: .38rem .3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      width: 100%;
      p {
        font-size: .36rem;
        line-height: .44rem;
        position: relative;
        // wdith:3.6rem;
        padding:0 .2rem;
        z-index: 2;
        background-color: #fff;
      }
      div {
        border-top: 1px solid #eee;
        position: absolute;
        top: 50%;
        left:50%;
        width: 6.8rem;
        transform: translateX(-50%);
        z-index: 1;
      }
    }
  .invitTime {
    font-size: .28rem;
    text-align: center;
    span {
      color: #FF8334;
    }
  }
  .invitCount {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 0.12rem;
    div {
      display: flex;
      align-items: center;
      margin-left: 0.06rem;
      p {
        width: .44rem;
        height: .44rem;
        font-size: .28rem;
        color: #fff;
        text-align: center;
        line-height: .44rem;
        border-radius: 4px;
        background-color: #FF8334;
      }
      span {
        color: #FF8334;
        font-size: .38rem;
        padding: 0 0.1rem;
      }
    }
  }
  .invitText {
    font-size: .28rem;

    text-align: center;
    line-height: .44rem;
  }
  .userCard {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    margin-top: .36rem;
    margin-bottom: .48rem;
    padding: 0 .24rem;
    div {
      width: .96rem;
      margin:0 .3rem;
      font-size: 0;
      img {
        width: .96rem;
        border-radius: 2rem;
        vertical-align: top;
      }
      div {
        width: .96rem;
        height: .96rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: .36rem;
        color: #fff;
      }
    }
    .owner {
      margin-top: -0.16rem;
      padding: 0.04rem 0;
      background-color: #FF8334;
      border-radius: 1rem;
      color: #fff;
      font-size: 0.2rem;
      text-align: center;
      position: relative;
      z-index: 2;
    }
  }
  .joinGroup {
    padding: 0 .24rem;
    display: flex;
    button {
      height: .88rem;
      width: 100%;
      border-radius: 4px;
      background-color: $fontColor1;
      color: #fff;
      font-size: .32rem;
      vertical-align: top;
    }
  }
  .regulation {
    margin-top: .24rem;
    background-color: #fff;
    .GroupDealRegulation {
      padding: 0 .24rem;
      display: table;
      img {
        width: 100%;
        vertical-align: top;
      }
    }
  }
  .mayLikeCoat {
    padding: 0 .24rem .6rem;
    .mayTil {
      font-size: .32rem;
      line-height: .4rem;
      color: $fontColor1;
      margin: .3rem 0;
    }
    .mayCoat {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

    }
  }
  .shopCard {
    width: 3.4rem;
    padding: 0.16rem;
    background-color: #fff;
    border-radius: 0.16rem;
    margin-bottom: .24rem;
  }
  .noData {
    font-size: .24rem;
    text-align: center;
    margin: .12rem 0;
  }
</style>
