<template>
  <div class="container">
    <a-form
      :model="loginForm"
      :rules="rules"
      ref="loginForm"
      class="demo-loginForm"
    >
      <div class="title-container">
        <h3 class="title">
          系统登陆
        </h3>
      </div>

      <a-form-item prop="username">
        <a-input v-model="loginForm.username" autocomplete="off" allow-clear>
          <span class="svg-container" slot="prefix">
            <svg-icon name="user" />
          </span>
        </a-input>
      </a-form-item>
      <a-form-item prop="password">
        <a-input-password
          type="password"
          v-model="loginForm.password"
          autocomplete="off"
        >
          <span class="svg-container" slot="prefix">
            <svg-icon name="password" />
          </span>
        </a-input-password>
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          @click="submitForm"
          style="width: 100%"
          :loading="loginStatus"
        >
          登陆
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { isValidUsername } from "@/utils/validate";

@Component({
  name: "Login",
  components: {}
})
export default class extends Vue {
  private selectLangStyle = {
    icoColor: "#fff",
    bgColor: ""
  };
  private loginStatus = false;
  private validateUsername = (rule, value: string, callback: Function) => {
    if (!isValidUsername(value)) {
      callback(new Error("Please enter the correct user name"));
    } else {
      callback();
    }
  };

  private validatePassword = (rule, value: string, callback: Function) => {
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
    console.log("ok");
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
    /deep/ .a-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    /deep/ .ant-input-affix-wrapper {
      width: 100%;
      height: 46px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 4px;
      input {
        padding-left: 35px;
        height: 46px;
        background: transparent;
        border: 0px;
        border-radius: 0px;
        color: #eee;
        caret-color: #eee;
        -webkit-appearance: none;
        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px #292950 inset !important;
          -webkit-text-fill-color: #fff !important;
        }
        &:focus {
          border-radius: 4px;
          height: 44px;
        }
      }
    }

    .svg-container {
      fill: #889aa4;
      vertical-align: middle;
      text-align: center;
      display: inline-block;
      height: 14px;
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
  }
}
</style>
