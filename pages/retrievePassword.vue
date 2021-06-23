<template>
  <div>
    <div class="forgot-password-one">
      <p class="headTil">Create a new password</p>
      <div class="f-container">
        <el-row :gutter="20">
          <el-col
            :lg="12"
            :offset="6"
            :sm="24"
            :xs="24"
          >
            <div class="listCoat">
              <p
                v-if="!noVaildRetrievePassword"
                class="til"
              >Welcome back, please fill in your<br> new password below</p>
              <el-form
                v-if="!noVaildRetrievePassword"
                :model="validateForgotPasswordForm"
                :rules="rules"
                status-icon
                ref="validateForgotPasswordForm"
                label-width="200px"
                class="login-form-2"
              >

                <el-form-item
                  class="el-form-item-email"
                  label="New Password"
                  prop="password"
                >
                  <el-input
                    type="password"
                    v-model="validateForgotPasswordForm.password"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  class="el-form-item-email checkPass"
                  label="Confirm Password"
                  prop="checkPass"
                >
                  <el-input
                    type="password"
                    v-model="validateForgotPasswordForm.checkPass"
                  ></el-input>
                </el-form-item>
                <el-form-item class="el-form-item-signIn">
                  <el-button
                    :loading="retrievePasswordLoading"
                    type="primary"
                    @click="retrievePassword('validateForgotPasswordForm')"
                  >SAVE</el-button>
                </el-form-item>
              </el-form>
              <div
                v-else
                class="validateForgotPasswordToat"
              >
                <br><br>
                <img
                  src="~/static/images/icon/validateForgotPasswordForm.png"
                >
                <div class="no-longer">
                  This reset password link is no longer
                </div>
                <div class="password-reset">
                  valid,please request a <span @click="reset()">new password reset.</span>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <f-footer></f-footer>
  </div>
</template>

<script>
import fFooter from "@/components/footer/f-footer";
import { Loading } from "element-ui";
export default {
  name: "retrievePassword",
  components: {
    fFooter
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input a password"));
      } else {
        if (this.validateForgotPasswordForm.checkPass !== "") {
          this.$refs.validateForgotPasswordForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter the password again"));
      } else if (value !== this.validateForgotPasswordForm.password) {
        callback(new Error("The two passwords are inconsistent!"));
      } else {
        callback();
      }
    };
    return {
      validateForgotPasswordForm: {
        password: "",
        checkPass: ""
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      },
      noVaildRetrievePassword: false,
      retrievePasswordLoading: false,
    };
  },
  mounted() {
    let { token } = this.$route.query;
    if (token) {
      this.verifyCodes(token);
    }
    this.buryingPoint.pageView();
  },
  methods: {
    verifyCodes(token) {
      Loading.service({
        lock: true,
        text: "verifying mailbox",
        background: "rgba(0, 0, 0, 0.7)"
      });
      this.$apis
        .verifyCodes({ token })
        .then(res => {
          Loading.service().close();
          if (res.status != 1) {
            this.noVaildRetrievePassword = true;
          }
        })
        .catch(err => {
          Loading.service().close();
          console.log(err);
        });
    },
    reset() {
      this.$router.push({ path: "/forgotPassword" });
    },
    retrievePassword(formName) {
      let thif = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.retrievePasswordLoading = true;
          var { password, checkPass, } = this.validateForgotPasswordForm;
          this.$apis
            .resetPassword({ new_password: password, confirm_password: checkPass, token: this.$route.query.token })
            .then(res => {
              this.retrievePasswordLoading = false;
              if (res.status == 1) {
                thif.common.msgBox(thif, 'Create a new password success', 1);
                thif.$router.push({ 
                  path: "/login",
                  query: {
                    goHome: true
                  }
                });
              } else {
                thif.common.msgBox(thif, res.msg, 3);
              }
            })
            .catch(err => {
              this.retrievePasswordLoading = false;
              console.log(err);
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.forgot-password-one{
  margin: 88px auto 0;
}
.login-form-2 {
  width: 300px;
  margin: 0 auto;
  .el-form-item-email {
    /deep/ .el-form-item__label {
      text-align: left;
    }
  }
  .checkPass {
    margin-top: 8px;
  }
  .el-form-item-email,
  .el-form-item-pass,
  .el-form-item-privacy-policy {
    margin-bottom: 0px !important;
    /deep/ .el-form-item__content {
      width: 405px;
      margin-left: 0 !important;
      .el-input {
        // width: 88% !important;
        input {
          width: 300px;
          border: 1px solid black;
        }
        /deep/ .el-input__suffix {
          right: 27%;
        }
      }
    }
  }
  .el-form-item-pass {
    /deep/ .el-form-item__label {
      margin-left: -27px !important;
    }
  }
  .el-form-item-privacy-policy {
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
  .el-form-item-signIn {
    /deep/ .el-form-item__content {
      margin-left: 0 !important;
      margin-top: 36px;
      button {
        width: 300px;
        background: #172D55;
        border-radius: 4px;
        border: none;
        span {
          color: #fff;
        }
      }
      button:hover{
        background:#3B65B3;
      }
    }
  }
  .el-form-item-cancel {
    /deep/ .el-form-item__content {
      margin-left: 68px !important;
      button {
        width: 300px;
        margin-bottom: 12px;
        span {
          color: black;
        }
      }
    }
  }
  #forgot-pass-1 {
    text-decoration: underline;
    float: right;
    margin: 4px 100px 45px;
    color: black;
    font-size: 16px;
  }
}
.f-container {
  margin-bottom: 93px;
}
.headTil {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin: 54px 0px -32px;
}
.listCoat {
  padding: 0 30px;
  margin: 50px 0;
  .til {
    color: #999999 !important;
    font-size: 14px;
    margin-bottom: 30px;
    font-weight: bold;
    text-align: center;
  }
  .validateForgotPasswordToat {
    font-size: 14px;
    img {
      margin: 0 auto;
      display: block;
    }
    .no-longer {
      text-align: center;
      margin: 60px 0 12px;
    }
    .password-reset {
      text-align: center;
      span {
        cursor: pointer;
        font-weight: 600;
        text-decoration: underline;
      }
    }
  }
}
/deep/ .el-icon-loading {
  color: #fff;
}
</style>