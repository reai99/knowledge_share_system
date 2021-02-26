<template>
  <div>
      <svg-icon name="language" @click="selectLang" color="#eee"/>
        <el-card class="box-card"  v-if="langListVisible">
      <div slot="header" class="clearfix" >
        <svg-icon name="international" width="24" height="24"   color="#eee"/>
        <span :style="{ 'margin-left': '10px' }">{{ $t("i18nView.title") }}</span>
        <span class="close" @click="selectListCLose">x</span>
      </div>
        <el-radio-group class="radio-group-list" v-model="lang" size="small">
          <el-radio class="radio-item" label="zh" border>
           {{ $t("i18nView.zh") }}
          </el-radio>
          <el-radio class="radio-item" label="en" border>
            {{ $t("i18nView.en") }}
          </el-radio>
          <el-radio class="radio-item" label="es" border>
            {{ $t("i18nView.es") }}
          </el-radio>
          <el-radio class="radio-item" label="ja" border>
            {{ $t("i18nView.ja") }}
          </el-radio>
          <el-radio class="radio-item" label="ko" border>
            {{ $t("i18nView.ko") }}
          </el-radio>
          <el-radio class="radio-item" label="it" border>
            {{ $t("i18nView.it") }}
          </el-radio>
        </el-radio-group>
    </el-card>
    <div :class="langListVisible ? 'contianer-hidden' : '' "> </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { BasicConfig } from '@/store/modules/app'
import local from "./local";
import Cookies from "@/utils/cookie"
@Component({
  name: "I18n"
})
export default class extends Vue {
  private langListVisible = false;
  created() {
    const viewName = "i18nView";
    if (!this.$i18n.getLocaleMessage("en")[viewName]) {
      this.$i18n.mergeLocaleMessage("en", local.en);
      this.$i18n.mergeLocaleMessage("zh", local.zh);
      this.$i18n.mergeLocaleMessage("es", local.es);
      this.$i18n.mergeLocaleMessage("ja", local.ja);
      this.$i18n.mergeLocaleMessage("ko", local.ko);
      this.$i18n.mergeLocaleMessage("it", local.it);
    }
  }
  get lang() {
    return this.$i18n.locale;
  }
  set lang(lang) {
    // 本地记录当前选择的语言
    Cookies.set('lang', lang)
    BasicConfig.SetLanguage(lang)
    this.$i18n.locale = lang;
  }
  private selectLang() {
    this.langListVisible = true
  }
  private selectListCLose() {
    this.langListVisible = false
  }
}
</script>

<style lang="scss" scoped>
.contianer-hidden{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: rgba(0,0,0,.5);
  z-index: 99998;
}
.box-card {
  position: fixed;
  height: 240px;
  width: 310px;
  left: 50%;
  top:50%;
  margin-left: -150px;
  margin-top:-120px;
  z-index: 99999;
  background: $languageBg;
  color: #eee;
  box-shadow: 0 0 8px  $languageBg;
  /deep/ .el-card__body{
    padding: 5px 10px;
  }
  .radio-group-list{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }
  .radio-item{
    flex: 1;
    max-width: 140px;
    min-width: 140px;
    margin:0;
    margin-left: 0!important;
    margin-top: 18px;
    text-align: center;
    color: #eee;
  }
  .radio-item:nth-child(2n+1){
    margin-right: 10px;
  }
   /deep/ .el-radio.is-bordered.is-checked{
     background: #fff;
     border-color: #fff;
   }
}
.clearfix{
  position: relative;
  text-align: left;
  display: flex;
  .close {
    position: absolute;
    right: -10px;
    top: -15px;
    font-size:21px;
  }
}
.item-btn {
  margin-bottom: 15px;
  margin-left: 0px;
}

.block {
  padding: 25px;
}
</style>
