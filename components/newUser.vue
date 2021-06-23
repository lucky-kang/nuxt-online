<template>
	<div>
		<el-dialog
			class="newUserDialog"
			width="30%"
			:visible.sync="newUserDialogVisible"
			:before-close="handleClose"
		>
		<h1 class="new-to-foroo-h">New to Foroo ?</h1>
		<h1 class="off-h">30% OFF</h1>
		<h2 class="only-h">Only For New Foroo User!</h2>
			<el-form
				:model="validateNewRegisterForm"
				:rules="rules"
				status-icon
				ref="validateNewRegisterForm"
				label-width="200px"
				class="login-form_"
			>
				<el-form-item v-if="!passWordShow" class="el-form-item-email_" label="" prop="email">
					<el-input
						placeholder="Enter your email adress"
						v-model="validateNewRegisterForm.email"
					></el-input>
				</el-form-item>
				<el-form-item v-else class="el-form-item-pass_" label="" prop="pass">
					<el-input type="password" v-model="validateNewRegisterForm.pass"></el-input>
				</el-form-item>
				<el-form-item class="el-form-item-signIn_">
					<el-button
						v-if="!passWordShow"
						:type="disabled1 ? 'info' : 'primary'"
						:disabled="disabled1"
						@click="signIn('validateNewRegisterForm')"
					>CREATE AN ACCOUNT</el-button>
					<el-button
						v-else
						:type="disabled2 ? 'info' : 'primary'"
						:disabled="disabled2"
						@click="register('validateNewRegisterForm')"
					>REGISTER</el-button>
				</el-form-item>
				<el-form-item class="el-form-item-facebook_">
					<el-button type="primary" @click="goFacebook()">FACEBOOK</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
// import { MH_API } from "@/api/api";
import jsCookie from "@/utils/js-cookie";
import { Loading } from "element-ui";
export default {
  name: "loginRegister",
  props: {
    newUserDialogVisible: {
      type: Boolean
    }
  },
  data() {
    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    var validateEmail = (rule, value, callback) => {
      if (value === "") {
        this.disabled1 = true;
        callback(new Error("Email cannot be empty."));
      } else if (!reg.test(value)) {
        this.disabled1 = true;
        callback(new Error("Please enter a valid email address."));
      } else {
        this.disabled1 = false;
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        this.disabled2 = true;
        callback(new Error("Password cannot be empty."));
      } else {
        this.disabled2 = false;
        callback();
      }
    };
    return {
      logEmail: "",
      logPass: "",
      regUsername: "",
      regEmail: "",
      regPass: "",
      rememberState: false,
      disabled1: true,
      disabled2: true,
      passWordShow: false,
      validateNewRegisterForm: {
        pass: "",
        email: ""
      },
      rules: {
        email: [
          {
            validator: validateEmail,
            trigger: "change"
          }
        ],
        pass: [
          {
            validator: validatePass,
            trigger: "change"
          }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "This field is required.",
            trigger: "change"
          }
        ]
      }
    };
  },
  mounted() {
    let userinfo = localStorage.getItem("forooUserInfo");

    if (userinfo != null && userinfo != "null") {
      this.rememberState = true;
      let objs = JSON.parse(userinfo);
      this.logEmail = objs.email;
      this.logPass = objs.pass;
    }
  },
  methods: {
    handleClose(done) {
      this.$store.dispatch("newUserDialogVisible", false);
    },
    signIn(formName) {
      let thif = this;

      this.$refs[formName].validate(valid => {
        if (valid) {
          this.passWordShow = valid;
        } else {
          return false;
        }
      });
    },
    register(formName) {
      let thif = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          Loading.service({
            lock: true,
            text: "Registering",
            background: "rgba(0, 0, 0, 0.7)"
          });
          var { pass, email } = this.validateNewRegisterForm;
          this.$apis
            .register({ email, password: pass }, {})
            .then(res => {
              if (res.status == 1) {
                thif.$store.dispatch("loginDialogVisible", false);
                Loading.service().close(); // token加入全局状态管理
                thif.getUserInfo(res.data.user_id);
                thif.$store.dispatch("actLoginToken", res.data.token); // localStorage.setItem("loginToken", res.data.token);
                jsCookie.set("loginToken", res.data.token, {
                  expires: 7,
                  path: "/"
                });
                thif.$store.dispatch("actUserId", res.data.user_id); // localStorage.setItem("userId", res.data.user_id);
                jsCookie.set("userId", res.data.user_id, {
                  expires: 7,
                  path: "/"
                });
                thif.$router.go(-1);
              } else {
                Loading.service().close();
                thif.common.msgBox(thif, res.msg, 3);
              }
            })
            .catch(err => {
              Loading.service().close();
              console.log(err);
            });
        } else {
          return false;
        }
      });
    },
    getUserInfo(id) {
      let thif = this;
      this.$apis
        .getUsetInfo({ user_id: id }, this.$store.getters.getApiHeader)
        .then(res => {
          // console.log(res);
          if (res.status == 1) {
            thif.$store.dispatch("actUserInfo", res.data);
            thif.$store.dispatch("newUserDialogVisible", false);
          } else {
            thif.common.msgBox(thif, res.msg, 3);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.newUserDialog /deep/ .el-dialog {
  width: 500px!important;
  height: 361.5px;
  /deep/ .el-dialog__close{
    position: absolute;
    font-size: 32px;
    top: -14px;
    right: -15px;
  }
	background: url(/images/img/newToForooBg.jpg) center center no-repeat;
	background-size: cover;
	  padding: 72px 0;
	  .new-to-foroo-h{
		  color: black;
		  font-size: 32px;
		  font-weight: bold;
		  position: absolute;
      top: 13%;
      left: 50%;
	  }
	  .off-h{
      color: red;
      font-weight: bold;
      position: absolute;
      top: 28%;
      left: 60%;
      font-size: 35px;
	  }
	  .only-h{
      color: black;
      position: absolute;
      top: 38%;
      left: 48%;
	  }
}
/deep/ .el-dialog__body {
  padding: 0;
  .el-tabs__nav {
    width: 100%;
    .el-tabs__active-bar {
      background: black;
    }
    #tab-SignIn,
    #tab-Register {
      width: 50%;
      text-align: center;
      color: #555555;
    }
    .el-tabs__item .is-top .is-active {
      color: black;
    }
  }
}
.login-form_ {
  position: absolute;
  bottom: -59px;
  right: 8px;
  .el-form-item-email_,
  .el-form-item-pass_,
  .el-form-item-privacy-policy_ {
    margin-bottom: 12px !important;
    /deep/ .el-form-item__label {
      width: 173px !important;
    }
    /deep/ .el-form-item__content {
      margin-left: 68px !important;
      .el-input {
        width: 50% !important;
        margin: 0 204px;
        input {
          border: 1px solid black;
        }
      }
      /deep/ .el-form-item__error {
        left: 204px;
      }
    }
  }
  .el-form-item-pass {
    /deep/ .el-form-item__label {
      margin-left: -27px !important;
    }
  }
  .el-form-item-privacy-policy_ {
    /deep/ .el-checkbox__input.is-checked {
      .el-checkbox__inner {
        background-color: black;
        border-color: black;
      }
    }
    /deep/ .el-checkbox__input.is-checked + .el-checkbox__label {
      color: black;
    }
  }
  .el-form-item-signIn_ {
    /deep/ .el-form-item__content {
      margin-left: 273px !important;
      margin: 4px 8px 16px;
      .el-button /deep/ .el-button--info .is-disabled {
        background: #c8c9cc;
      }
      /deep/ .el-button--primary {
        background: black;
      }
      button {
        width: 225.5px;
        span {
          color: #fff;
        }
      }
    }
  }
  .el-form-item-facebook_ {
    /deep/ .el-form-item__content {
      margin-left: 273px !important;
      margin: -29px 16px 22px;
      button {
        width: 225.5px;
        background: #4267b2;
        margin-bottom: 30px;
        span {
          color: #fff;
        }
      }
    }
  }
}
</style>
