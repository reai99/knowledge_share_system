<template>
  <div class="constainer">
    <el-form-item
        label="类型名称"
    >
      <el-input v-model="formData.typeName"/>
    </el-form-item>
    <el-form-item
        label="排序"
    >
      <el-input v-model="formData.sort"/>
    </el-form-item>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator"

@Component({
  name: "addArticleType",
})
export default class AddArticleType extends Vue {
  private formData: ArtTypeForm = {
    typeName: '',
    sort: '',
  }
}

</script>
<style lang="scss" scoped>
.constainer {
  padding: 10px;
  box-sizing: border-box;
}
</style>
