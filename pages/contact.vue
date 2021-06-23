<template>
  <div class="container">
    <div class="f-container">
      <div class="about-us" v-html="contactHtml"></div>
      <div class="msgCoat">
        <div class="iptCoat">
          <p>Name</p>
          <input v-model="sendName" type="text">
        </div>
        <div class="iptCoat">
          <p>Email</p>
          <input v-model="sendEmail" type="text">
        </div>
      </div>
      <div class="msgCoat msgCoat2">
        <p>Message</p>
        <textarea name="" v-model="sendText" cols="30" rows="10"></textarea>
      </div>
      <div class="btnCoat">
        <button @click="toSubmit">Send</button>
      </div>
    </div>
    <f-footer></f-footer>
  </div>
</template>

<script>
  import fFooter from "@/components/footer/f-footer";
  import htmlModule from "@/utils/contactHTML";
  export default {
    name: "Contact",
    components: {
      fFooter
    },
    data() {
      return {
        activeNames: [""],
        usName: '',
        usEmail: '',
        usComment: '',
        maskState:false,
        contactHtml:'',
        sendName:'',
        sendEmail:'',
        sendText:'',
      };
    },
    created(){
      this.contactHtml = htmlModule.contactHtml
      console.log()
    },
    mounted(){
      this.buryingPoint.pageView();
    },
    methods: {
      toSubmit() {
        if (this.sendName == '' || this.sendText == '' || this.sendEmail == '') {
          this.common.msgBox(this, 'Please complete the information', 3);
          return;
        }
        let thif = this;
        // suggest
        this.$apis.suggest({name: this.sendName,message: this.sendText}).then(res => {
          console.log(res);
          if(res.status == 1){
            this.common.msgBox(this, res.msg, 1);
          } else {
            this.common.msgBox(this, res.msg, 3);
          }
        }).catch(err => {
          console.log(err);
        })
      }
    }
  };
</script>
<style lang="scss">
  .el-collapse-item__header {
    font-size: 18px !important;
    height: auto;
    font-weight: normal;
  }
</style>
<style lang="scss" scoped>
  .container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    // align-items: center;
    // margin-top: 158px;
  }
  .fHeader {
    background-color: #fff;
  }
  .f-container {
    padding: 20px 0;
    width: 1200px;
    margin-top: 20px;
    margin-bottom: 20px;
    flex: 1 1 auto;
    display: flex;
    justify-content: space-around;
    background-color: #fff;
    flex-direction: column;
    margin: auto;
    h3 {
      margin: 24px 0;
      padding: 12px 0;
      font-size: 20px;
      font-weight: 550;
      border-bottom: 1px solid #ddd;
    }

    .about-us {
      /deep/ p {text-align: center;}
      /deep/ a {
        color: deepskyblue;
        span,p,strong,b,i {
          color: deepskyblue;
        }
      }
    }
  }
  .msgCoat {
    width: 900px;
    margin: auto;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
      p {
        font-size: 16px;
        line-height: 28px;
        margin-bottom: 8px;
      }
    .iptCoat {
      width: 440px;
      input {
        border: 1px solid $borderColor;
        height: 44px;
        padding: 8px 10px;
        font-size: 14px;
        width: 100%;
      }
    }
  }
  .msgCoat2 {
    display: block;
      textarea {
        border: 1px solid $borderColor;
        width: 100%;
        height: 200px;
        padding: 12px;
      }
  }
  .btnCoat {
    margin: auto;
    margin-top: 20px;
    width: 900px;
    font-size: 0;
    button {
      font-size: 16px;
      font-weight: bold;
      color: #fff;
      background-color: $btnBjColor;
      width: 90px;
      height: 46px;
    }
  }
</style>
