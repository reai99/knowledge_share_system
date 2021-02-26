<template>
  <div class="container">
    <el-form
      :model="loginForm"
      :rules="rules"
      ref="loginForm"
      class="demo-loginForm"
    >
      <div class="title-container">
        <h3 class="title">
          {{ $t("login.title") }}
        </h3>
        <select-lang
          class="set-language"
          :contentStyle="selectLangStyle"
        ></select-lang>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon name="user" />
        </span>
        <el-input
          v-model="loginForm.username"
          autocomplete="off"
          :placeholder="$t('login.username')"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon name="password" />
        </span>
        <el-input
          type="password"
          v-model="loginForm.password"
          :placeholder="$t('login.password')"
          autocomplete="off"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          v-waves
          type="primary"
          @click="submitForm"
          style="width: 100%"
          :loading="loginStatus"
        >
          {{ $t("login.logIn") }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import { isValidUsername } from "@/utils/validate";

@Component({
  name: "Login",
  components: {
    selectLang: () => import("@/common/components/SetLanguage/index.vue")
  }
})
export default class extends Vue {
  private selectLangStyle = {
    icoColor: "#fff",
    bgColor: ""
  };
  private loginStatus = false;
  private validateUsername = (rule: any, value: string, callback: Function) => {
    if (!isValidUsername(value)) {
      callback(new Error("Please enter the correct user name"));
    } else {
      callback();
    }
  };

  private validatePassword = (rule: any, value: string, callback: Function) => {
    if (value.length < 6) {
      callback(new Error("The password can not be less than 6 digits"));
    } else {
      callback();
    }
  };
  private rules = {
    password: [{ validator: this.validatePassword, trigger: "blur" }],
    username: [{ validator: this.validateUsername, trigger: "blur" }]
  };
  private loginForm = {
    username: "",
    password: ""
  };
  private submitForm() {
    (this.$refs.loginForm as any).validate(valid => {
      if (valid) {
        if (!this.loginStatus) {
          this.loginStatus = true;
        }
        (this as any).$axios.post("/api/login", this.loginForm).then(res => {
          if (res && res.ok) {
            window.localStorage.setItem("token", res.data.token);
            this.loginStatus = false
            this.$message.success("登录成功");
            this.$router.push({ name: "dashboard" });
          } else {
            this.$message.error(res.error || "操作错误,请稍后重试");
          }
        });
      } else {
        this.$message.error("信息验证不通过");
        return false;
      }
    });
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
  background: #0f0c29; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to bottom,
    $loginBg,
    #0f0c29
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to bottom,
    $loginBg,
    #0f0c29
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  .demo-loginForm {
    background: $loginBg;
    border-radius: 4px;
    min-width: 330px;
    box-shadow: 0 0 36px rgba(255, 255, 255, 0.15);
    padding: 20px 25px;
    border-radius: 8px;
    /deep/ .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    /deep/ .el-input {
      width: 85%;
      height: 46px;
      input {
        height: 46px;
        background: transparent;
        border: 0px;
        border-radius: 0px;
        padding: 12px 0px;
        color: #eee;
        caret-color: #eee;
        -webkit-appearance: none;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px #292950 inset !important;
          -webkit-text-fill-color: #fff !important;
        }
      }
    }
    .svg-container {
      fill: #889aa4;
      vertical-align: middle;
      width: 40px;
      text-align: center;
      display: inline-block;
    }
  }

  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: #eee;
      margin: 10px auto 30px auto;
      text-align: center;
      font-weight: bold;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 3px;
      font-size: 18px;
      right: 0px;
      cursor: pointer;
    }
  }
}
</style>
