<template>
  <div class="container">
    <card-table
        style="margin: 15px 0"
        :column="column"
        :data="tableData"
    >
      <template slot-scope="scope" slot="opertor">
        <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)">
          编辑
        </el-button>
        <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">
          删除
        </el-button>
      </template>
    </card-table>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator"

@Component({
  name: 'IndexAction',
  components: {
    CardTable: () => import("@/common/components/CardTable/index.vue")
  }
})

export default class extends Vue {
  private column = [
    { type: 'selection', width: '35px'},
    { type: 'index', label: '顺序', width: '60px' },
    {label: '名称', prop: 'name'},
    {label: '排序', prop: 'sort'},
    {label: '创建时间', prop: 'createtime'}
  ]
  private tableData = [
    {
      name: '测试1',
      sort: 666,
      createtime: '2020-12-12'
    }
  ];

  private handleEdit(index: number, row: any) {
    console.log(index, row)
  }

  private handleDelete(index: number, row: any) {
    console.log(index, row)
  }
}

</script>
<style lang="scss" scoped>
.container {
  padding: 15px;
  box-sizing: border-box;
}
</style>
