<template>
  <div class="invitation">
    <p class="til">{{LanguageActive.GETCASHNOW}}</p>
    <div class="coat">
      <el-carousel
        class="listCoat"
        direction="vertical"
        indicator-position="none"
      >
        <el-carousel-item
          v-for="item in withdrawsArr"
          :key="item.created_at"
        >
          <div class="withdrawsItem">
            <p class="withdrawsLeft">{{item.email}}</p>
            <p class="withdrawsRight">Got${{item.amount}} at {{item.created_at | timers(6)}} </p>
          </div>
        </el-carousel-item>
      </el-carousel>
      <div
        class="langerCoat"
        @click="drawerShow=!drawerShow"
      >
        <div>
          <img
            :src="current_icon"
            alt=""
          >
        </div>
        <p>{{LanguageActive.Language}}</p>
        <span class="el-icon-arrow-down"></span>
      </div>
      <div class="CountCoat">
        <img
          class="kuang"
          src="~/static/images/invitation/Rectangle.png"
          alt=""
        >
        <div class="timeCoat">
          <p class="timeTil">{{LanguageActive.TimeLimited}}</p>
          <p class="timeText"><span>{{LanguageActive.CASHGIFT}}</span> {{LanguageActive.FORFOROOCASH}}</p>
          <div class="timeCount">
            <p>{{countObj.hour|keepNum}}</p>
            <span>:</span>
            <p>{{countObj.fen|keepNum}}</p>
            <span>:</span>
            <p>{{countObj.miao|keepNum}}</p>
          </div>
          <p class="money">$100<span>Max</span></p>
        </div>
      </div>
      <p class="forooApp">{{LanguageActive.getapptips}}</p>
      <button
        class="getCash"
        @click="goApp"
      >{{LanguageActive.GETCASHNOW}}</button>
    </div>
    <div class="imgCoat"><img
        src="~/static/images/invitation/bottom.png"
        alt=""
      ></div>
    <div class="footCoat">
      <div class="footLeft">
        <img
          src="~/static/images/icon/logoMove.png"
          alt=""
        >
        <div>
          <p class="market">{{LanguageActive.appname}}</p>
          <p class="downGet">{{LanguageActive.Downloadget}}&nbsp;<span>{{LanguageActive.off3}}</span></p>
        </div>
      </div>
      <button
        class="footRight"
        @click="goApp"
      >{{LanguageActive.gotoapp}}</button>
    </div>

    <!-- 组件 -->
    <el-drawer
      title="Language"
      :visible.sync="drawerShow"
      :direction="'btt'"
    >
      <div class="countryCoat">
        <div
          class="countryList"
          v-for="(item,index) in countryArr"
          :key="'countrya'+index"
        >
          <div class="listLeft">
            <img
              :src="item.icon"
              alt=""
            >
            <p>{{item.full_name}}</p>
          </div>
          <div
            class="listRight"
            :class="country==item.name?'countryActive':''"
            @click="selLanguage(item)"
          >
            <span class="el-icon-check"></span>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import jsCookie from "@/utils/js-cookie";
export default {
  name: "share_invitation2",
  head() {
    return {
      title: "Frisson Invite you",
      meta: [
        {
          name: "viewport",
          content:
            "width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0"
        }
      ],
      script: [
        {
          src:
            "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"
        }
      ]
    };
  },
  data() {
    return {
      shareUrl: "",
      countObj: { hour: 0, fen: 0, miao: 0 },
      drawerShow: false,
      withdrawsArr: [],
      countryArr: [],
      country: "GB",
      current_icon: "https://image.foroo.co.uk/special/currency/gbp.png",
      LanguageActive: {
        currentlanguage: "English",
        TimeLimited: "Time - Limited",
        CASHGIFT: "CASH GIFT",
        FORFOROOCASH: "FOR Frisson CASH",
        getapptips: "Download Frisson APP to get your cash gift！",
        GETCASHNOW: "GET CASH NOW",
        Language: "Language",
        EN: "English",
        FR: "French",
        GE: "German",
        SP: "Spanish",
        VN: "Vietnamese",
        gotoapp: "Go to app",
        appname: "Frisson | You deserve a better life",
        Downloadget: "Download & get",
        off3: "30% off!"
      },
      Language: {
        US: {
          // English
          currentlanguage: "English",
          TimeLimited: "Time - Limited",
          CASHGIFT: "CASH GIFT",
          FORFOROOCASH: "FOR Frisson CASH",
          getapptips: "Download Frisson APP to get your cash gift！",
          GETCASHNOW: "GET CASH NOW",
          Language: "Language",
          EN: "English",
          FR: "French",
          GE: "German",
          SP: "Spanish",
          VN: "Vietnamese",
          gotoapp: "Go to app",
          appname: "Frisson | You deserve a better life",
          Downloadget: "Download & get",
          off3: "30% off!"
        },
        GB: {
          // English
          currentlanguage: "English",
          TimeLimited: "Time - Limited",
          CASHGIFT: "CASH GIFT",
          FORFOROOCASH: "FOR Frisson CASH",
          getapptips: "Download Frisson APP to get your cash gift！",
          GETCASHNOW: "GET CASH NOW",
          Language: "Language",
          EN: "English",
          FR: "French",
          GE: "German",
          SP: "Spanish",
          VN: "Vietnamese",
          gotoapp: "Go to app",
          appname: "Frisson | You deserve a better life",
          Downloadget: "Download & get",
          off3: "30% off!"
        },
        FR: {
          currentlanguage: "Française",
          TimeLimited: "Limité dans le temps",
          CASHGIFT: "Cadeau en espèces",
          FORFOROOCASH: "POUR Frisson CASH",
          getapptips:
            "Téléchargez l'application Frisson pour obtenir votre cadeau en espèces",
          GETCASHNOW: "OBTENEZ DE L'ARGENT MAINTENANT",
          Language: "Langue",
          EN: "Anglaise",
          FR: "Française",
          GE: "Allemande",
          SP: "Espagnol",
          VN: "Vietnamien",
          gotoapp: "Aller à l'App",
          appname: "Frisson - Marché en ligne infini",
          Downloadget: "Télécharger et obtenir",
          off3: "30% de réduction!"
        },
        DE: {
          currentlanguage: "Deutsche",
          TimeLimited: "Zeitbegrenzt",
          CASHGIFT: " BARGELDGESCHENK",
          FORFOROOCASH: "FÜR Frisson CASH",
          getapptips:
            "Laden Sie die Frisson APP herunter, um Ihr Geldgeschenk zu erhalten！",
          GETCASHNOW: "JETZT BARGELD ERHALTEN",
          Language: "Sprache",
          EN: "Englisch",
          FR: "Französisch",
          GE: "Deutsche",
          SP: "Spanisch",
          VN: "Vietnamesisch",
          gotoapp: "Gehe zur App",
          appname: "Frisson - Unendlicher Online-Markt",
          Downloadget: "Herunterladen und herunterladen",
          off3: "30% reduziert!"
        },
        SP: {
          currentlanguage: "Española",
          TimeLimited: "Tiempo limitado",
          CASHGIFT: "REGALO EN EFECTIVO",
          FORFOROOCASH: "PARA Frisson EFECTIVO",
          getapptips:
            "Descargue la aplicación Frisson para obtener su regalo en efectivo！",
          GETCASHNOW: "OBTENGA EFECTIVO AHORA",
          Language: "Idioma",
          EN: "Inglesa",
          FR: "Francesa",
          GE: "Alemana",
          SP: "Española",
          VN: "vietnamita",
          gotoapp: "Ir a la aplicación",
          appname: "Frisson - Mercado Infinito en línea",
          Downloadget: "Descargar y obtener",
          off3: "¡30% de descuento!"
        },
        VN: {
          currentlanguage: "Tiếng Việt",
          TimeLimited: "Thời gian có hạn",
          CASHGIFT: "QUÀ TẶNG TIỀN",
          FORFOROOCASH: "CHO TIỀN MẶT",
          getapptips: "Tải xuống Frisson APP để nhận quà tặng tiền mặt của bạn",
          GETCASHNOW: "NHẬN TIỀN MẶT",
          Language: "Ngôn ngữ",
          gotoapp: "Đi đến ứng dụng",
          EN: "Tiếng Anh",
          FR: "người Pháp",
          GE: "tiếng Đức",
          SP: "người Tây Ban Nha",
          VN: "Tiếng Việt",
          appname: "Frisson - Thị trường trực tuyến vô hạn",
          Downloadget: "Tải xuống và nhận",
          off3: "giảm giá 30!"
        }
      },
      timer: ""
    };
  },
  mounted() {
    this.LanguageActive = this.Language.US;
    this.getWithdraws();
    this.getCountry();
    this.countDown();
    this.firebaseLink();
    this.buryingPoint.pageView();
  },
  filters: {
    keepNum(value) {
      if (String(value).length == 1) {
        return "0" + String(value);
      } else {
        return value;
      }
    }
  },
  methods: {
    firebaseLink() {
      let that = this;
      let url = "";
      // let url_ = 'https://m.foroo.co.uk';
      if (process.env.NODE_MODE == "test") {
        url = "https://beta-m.frissonlife.com";
      } else if (process.env.NODE_MODE == "prod") {
        url = "https://m.frissonlife.com";
      } else {
        url = "https://beta-m.frissonlife.com";
      }
      let { inviteCode } = this.$route.query;
      $.ajax({
        type: "post",
        url:
          "https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyDAosMZMS0s_cMzyqaatIRhwg-SYVrKCtQ",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({
          dynamicLinkInfo: {
            domainUriPrefix: "https://frissonLife.page.link",
            link: `${url}?r_type=Invite&r_InviteCode=${inviteCode}&utm_source=Invite_m`,
            // link: "https://m.foroo.co.uk/?r_type=Invite&r_InviteCode=3D36bD&utm_source=Invite_m",
            androidInfo: {
              androidPackageName: "com.frissonLife.application"
            },
            iosInfo: {
              iosAppStoreId: '1507135899',
              iosBundleId: "com.frissonLife.app"
            }
          }
        }),
        success: function(res) {
          if (res.shortLink) {
            that.shareUrl = res.shortLink;
          }
        },
        error: function(err) {
          console.log(err);
        }
      });
    },
    countDown() {
      this.countObj = { hour: 3, fen: 0, miao: 0 };
      this.timer = setInterval(this.setTimeNum, 1000);
    },
    setTimeNum() {
      if (
        this.countObj.miao == 0 &&
        this.countObj.fen == 0 &&
        this.countObj.hour == 0
      ) {
        clearInterval(this.timer);
        return;
      }
      this.countObj.miao--;
      if (this.countObj.miao == -1) {
        this.countObj.miao = 59;
        this.countObj.fen--;
        if (this.countObj.fen == -1) {
          this.countObj.fen = 59;
          if (this.countObj.hour != 0) {
            this.countObj.hour--;
          }
        }
      }
    },
    goApp() {
      window.location.href = this.shareUrl;
    },
    selLanguage(item) {
      this.country = item.name;
      this.current_icon = item.icon;
      this.LanguageActive = this.Language[item.name];
      this.drawerShow = false;
    },
    getWithdraws() {
      this.$apis
        .withdraws({}, this.$store.getters.getApiHeader)
        .then(res => {
          if (res.status == 1) {
            this.withdrawsArr = res.data.item;
          } else {
            this.common.msgBox(this, res.msg, 3);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getCountry() {
      if (jsCookie.get("initDataObj")) {
        let { countryArr } = JSON.parse(jsCookie.get("initDataObj"));
        for (const key in countryArr) {
          let icon;
          if (key == "US") {
            icon = "https://image.foroo.co.uk/special/country/us.png";
          } else if (key == "GB") {
            icon = "https://image.foroo.co.uk/special/currency/gbp.png";
          } else if (key == "DE") {
            icon = "https://image.foroo.co.uk/special/country/de.png";
          } else if (key == "FR") {
            icon = "https://image.foroo.co.uk/special/country/fr.png";
          }
          this.countryArr.push({
            icon,
            name: key,
            full_name: countryArr[key].country
          });
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.invitation {
  background: linear-gradient(180deg, #ff4763 0%, #e62832 97.92%);
}
.til {
  background-color: #fff;
  font-size: 0.36rem;
  line-height: 0.88rem;
  text-align: center;
  position: fixed;
  width: 100%;
  z-index: 10;
  top: 0;
}
.coat {
  margin-top: 44px;
  padding: 0 0.24rem;
}
.listCoat {
  height: 0.64rem;
  width: 100%;
  background: rgba(0, 0, 0, 0.3);
  margin-top: 0.2rem;
  border-radius: 0.08rem;
  font-size: 0.28rem;
}
.withdrawsItem {
  display: flex;
  height: 0.64rem;
  padding: 0 0.48rem;
  justify-content: space-between;
  p {
    color: #fff;
    line-height: 0.64rem;
  }
}
.langerCoat {
  display: flex;
  margin-top: 0.2rem;
  margin-bottom: 0.32rem;
  justify-content: flex-end;
  font-size: 0.28rem;
  img {
    height: 0.24rem;
    margin-right: 0.12rem;
  }
  p {
    color: #fff;
    margin-right: 0.12rem;
  }
}
/deep/ :focus {
  outline: 0;
}
.countryCoat {
  padding: 0 0.24rem;
  .countryList {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 1rem;
    font-size: 0.28rem;
    img {
      width: 0.48rem;
      margin-right: 0.08rem;
    }
  }
  .listLeft {
    display: flex;
    align-items: center;
  }
  .listRight {
    height: 0.36rem;
    width: 0.36rem;
    border-radius: 50%;
    line-height: 0.36rem;
    border: 1px solid #d6d6d6;
    text-align: center;
    line-height: 0.36rem;
    font-size: 0.2rem;
    .el-icon-check {
      color: #fff;
    }
  }
}
/deep/ .el-drawer__header {
  font-size: 0.32rem;
  text-align: center;
}
/deep/ .el-drawer__header {
  padding-bottom: 0.3rem;
  margin-bottom: 0rem;
  border-bottom: 1px solid #eeeeee;
}
/deep/ .el-drawer.btt {
  border-radius: 4px 4px 0px 0px;
  height: auto !important;
}
.countryActive {
  background-color: $bjColor;
  border: 0;
}
.CountCoat {
  position: relative;
  text-align: center;
  .kuang {
    width: 6.08rem;
    height: 88%;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    padding: 0.2rem 0 0rem;
  }
  .timeCoat {
    position: relative;
    width: 100%;
    text-align: center;
    .timeTil {
      font-size: 0.48rem;
      color: #fff;
      text-align: center;
      margin: auto;
      margin-bottom: 0.12rem;
      width: 3.36rem;
    }
    .timeText {
      font-size: 0.32rem;
      color: #fff;
      line-height: 0.4rem;
      width: 4.4rem;
      margin: auto;
      span {
        color: #fae987;
      }
    }
    .timeCount {
      display: flex;
      align-items: center;
      margin-top: 0.4rem;
      justify-content: center;
      p {
        width: 0.68rem;
        height: 0.68rem;
        box-shadow: inset 0px 1px 5px rgba(244, 58, 77, 0.8);
        background: #ffffff;
        border-radius: 4px;
        font-size: 0.36rem;
        color: #f53a4e;
        line-height: 0.68rem;
        text-align: center;
        letter-spacing: 1px;
      }
      span {
        width: 0.56rem;
        height: 0.68rem;
        display: block;
        text-align: center;
        line-height: 0.68rem;
        color: #fff;
        font-size: 0.36rem;
      }
    }
    .money {
      font-size: 1rem;
      color: #fff;
      padding: 0 3px;
      width: 2.28rem;
      position: relative;
      margin: auto;
      margin-top: 0.4rem;
      span {
        position: absolute;
        left: 100%;
        top: 0;
        font-size: 12px;
        line-height: 0.32rem;
        border: 1px solid #fff;
        padding: 0 2px;
        color: #fff;
      }
    }
  }
}
.forooApp {
  font-size: 0.32rem;
  margin-top: 0.68rem;
  text-align: center;
  color: #fff;
  margin-bottom: 0.2rem;
}
.getCash {
  font-size: 0.44rem;
  color: #ff0100;
  background: linear-gradient(180deg, #faeb89 0%, #f6bf4c 100%);
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.3);
  border-radius: 100px;
  width: 100%;
  padding: 0.24rem;
  line-height: 0.5rem;
  vertical-align: top;
}
.imgCoat {
  width: 100%;
  img {
    width: 100%;
  }
}
.footCoat {
  display: flex;
  padding: 0.42rem 0.2rem;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  position: fixed;
  bottom: -1px;
  left: 0;
  width: 100%;
  img {
    height: 0.72rem;
    margin-right: 0.24rem;
  }
  .footLeft {
    display: flex;
    align-items: center;
    .market {
      font-size: 0.28rem;
      font-weight: 500;
    }
    .downGet {
      font-size: 0.12rem;
      span {
        color: $bjColor;
        font-weight: 500;
      }
    }
  }
  .footRight {
    width: 1.82rem;
    height: 0.68rem;
    color: #fff;
    border-radius: 4px;
    background-color: $fontColor1;
    font-size: 0.28rem;
  }
}
.footRighta {
  display: flex;
}
</style>
