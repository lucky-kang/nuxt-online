<template>
  <div class="confirmCoat">
    <!-- <p class="til">Verification Status</p> -->
    <img v-show="showImg!=-1" :src="imgArr[showImg]" alt="">
    <p v-show="showImg!=-1" class="context">{{textArr[showImg]}}</p>
    <button v-show="showImg==0" @click="seekEmail">Resend</button>
    <f-footer></f-footer>
  </div>
</template>

<script>
  import fFooter from "@/components/footer/f-footer";
  export default {
    name:'confirm_register',
    components:{
      fFooter
    },
    data(){
      return {
        imgArr:[
          require('../static/images/icon_verification@2x.png'),
          require('../static/images/icon_failed@2x.png'),
          require('../static/images/icon_verified@2x.png'),
        ],
        textArr:[
          'Verification email expired',
          'Verification failed',
          'Verified'
        ],
        showImg:-1,
        onceSend:true
      }
    },
    mounted(){
      this.submitSeekEmail();
    },
    methods:{
      submitSeekEmail(){
        this.$apis.submitSeekEmail({token:this.$route.query.token}).then(res => {
          console.log(res);
          if(res.status == 1){
            this.showImg = 2;
          } else if(res.status == 12058){
            this.showImg = 0;
          } else {
            this.showImg = 1;
          }
          console.log(this.showImg)
        }).catch(err => {
          this.showImg = 1;
          console.log(err);
        })
      },
      seekEmail(){
        if(!this.onceSend) {
          this.common.msgBox(this,'You have sent successfully, please do not send again',2);
          return;
        }
        this.$apis.seekEmail({}).then(res => {
          console.log(res);
          if(res.status == 1){
            this.common.msgBox(this,res.msg,1);
          } else {
            this.common.msgBox(this,res.msg,3);
          }
        }).catch(err => {
          console.log(err);
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .confirmCoat {
    text-align: center;
  }
  .til {
    font-size: 24px;
    text-align: center;
    margin-top: 62px;
  }
  img {
    margin-top: 62px;
    width: 189px;
  }
  .context {
    font-size: 27px;
    margin: 46px auto;
  }
  button {
    vertical-align: top;
    width: 268px;
    height: 57px;
    background-color: #191919;
    color: #fff;
    font-size: 18px;
    border-radius: 4px;
  }
</style>