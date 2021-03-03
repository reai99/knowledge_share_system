
<template>
  <div class="contianer">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="create-art-form">
      <el-form-item label="文章名称" prop="name">
        <el-input v-model="ruleForm.name" autocomplete="off" placeholder="请输入" clearable></el-input>
      </el-form-item>
      <el-form-item label="文章描述" prop="description">
        <el-input v-model="ruleForm.description" autocomplete="off" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="关键词" prop="keyword">
        <el-input v-model="ruleForm.keyword" autocomplete="off" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="文章类型" prop="type">
        <el-select v-model="ruleForm.type" placeholder="请选择文章类型">
          <el-option v-for="(item, index) in artTypeData" :label="item.label" :value="item.value"
                     :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-input v-model="ruleForm.author" autocomplete="off" clearable></el-input>
      </el-form-item>
        <el-row class="article-editor">
          <Tinymce :height="400" :value="'122222'"/>
        </el-row>
    </el-form>
    <div class="btn-group">
      <el-button type="primary">提交</el-button>
      <el-button >暂存</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

@Component({
  name: 'createArticle',
  components: {
    Tinymce: () => import('@/common/components/Tinymce/index.vue')
  }
})
export default class extends Vue {
  private ruleForm = {
    name: '',
    description: '',
    keyword: '',
    type: '',
    author: ''
  }
  private artTypeData = [
    {label: '面试题', value: '1'},
    {label: '知识点', value: '2'},
    {label: '其他', value: '3'}
  ]
  private rules = {
    name: [
      {required: true, message: '请输入文章名称', trigger: 'blur'}
    ],
    type: [
      {required: true, message: '请选择类型', trigger: 'blur'}
    ],
    author: [
      {required: true, message: '请输入作者名称', trigger: 'blur'}
    ]
  }
}

</script>
<style scoped lang="scss">
.contianer {
  padding: 15px;
  .create-art-form{
    margin-right: 200px;
  }
  .article-editor{
    margin-left: 100px;
  }
  .btn-group{
    text-align: center;
    height: 80px;
    line-height: 80px;
  }
}
@media screen and (max-width: 780px){
  .create-art-form {
    margin-right: 10px!important;
  }
  .article-editor{
    margin-left: 0px!important;
  }
}
</style>
