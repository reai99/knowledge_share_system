<template>
  <div class="container">
    <el-form label-width="60px" size="small">
      <el-form-item label="id:">
        {{ formData.id }}
      </el-form-item>
      <el-form-item label="名称:">
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item label="描述:">
        <el-input
          v-model="formData.description"
          type="textarea"
          placeholder="请输入内容"
          rows="4"
          maxlength="200"
          show-word-limit
        />
      </el-form-item>
      <el-form-item label="地址:">
        <el-input v-model="formData.href" />
      </el-form-item>
    </el-form>
    <div style="text-align: center">
      <el-button type="primary" size="small" @click="submitData"
        >确认</el-button
      >
      <el-button size="small" @click="cancel">取消</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"

@Component({
  name: "editMind",
})
export default class EditMind extends Vue {
  @Prop({ default: () => ({}) }) data
  private formData = {
    id: "",
    name: "",
    description: "",
    href: "",
  }

  private submitData() {
    this.$emit("confirmDialog", this.formData)
  }

  private cancel() {
    this.$emit("closeDialog")
  }

  created() {
    var keys = Object.keys(this.data)
    keys.forEach(v => {
      this.formData[v] = this.data[v]
    })
  }
}
</script>

<style scoped>
#nameWidth {
  text-align: left;
  box-sizing: content-box;
  border: 1px solid transparent;
  width: -webkit-max-content;
  width: -moz-max-content;
  width: max-content;
  min-width: 16px;
  min-height: 21px;
  white-space: pre-wrap;
  color: #6d6d6d;
}
</style>
