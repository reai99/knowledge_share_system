<template>
  <div class="main-contianer">
    <el-card class="box-card">
      <el-row :gutter="30">
         <el-col class="statistics-item" :span="8">1</el-col>
         <el-col class="statistics-item"  :span="8">2</el-col>
         <el-col class="statistics-item" :span="8">3</el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component({
  name: "DashBoard"
})
export default class extends Vue {
  private name = "这是主页！";
}
</script>
<style>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
<style lang="scss" scoped>
.main-contianer {
  padding: 10px;
  box-sizing: border-box;
  background: #f6f6f6;
  min-height: 100vh;
}
</style>
