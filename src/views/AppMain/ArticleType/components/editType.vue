<template>
  <div class="container">
    <el-form-item
        label="类型名称"
    >
      <el-input v-model="editTypeForm.typeName"/>
    </el-form-item>
    <el-form-item
        label="排序"
    >
      <el-input v-model="editTypeForm.sort"/>
    </el-form-item>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator"

@Component({
  name: "editArticleType",
})
export default class EditArticleType extends Vue {
  private editTypeForm: ArtTypeForm = {
    id: 0,
    typeName: '',
    sort: '',
  }
  private  getArticleTypeItem() {
    this.editTypeForm = {
      id: 1,
      typeName: '测试1111',
      sort: '666',
    }
  }
  created() {
    this.getArticleTypeItem()
  }
}

</script>

<style scoped>

</style>
