<template>
  <el-table
      :data="data"
      :border="border"
      center
      style="width: 100%"
  >
    <el-table-column
        v-for="(item, i) in column"
        :key="i"
        :prop="item.prop"
        :index="item.index"
        :type="item.type"
        :label="item.label"
        :width="item.width"
    >
    </el-table-column>
    <el-table-column label="操作">
      <slot name="opertor" ></slot>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import {Component, Vue, Prop} from "vue-property-decorator"

@Component({
  name: 'cardTable',
})
export default class extends Vue {
  @Prop({ required: true, default: []}) private data: any[];
  @Prop({ required: true, default: []}) private column: any[];
  @Prop({ default: true }) private  border: boolean;
  @Prop({ default: 'medium' }) private  size: string;

}
</script>
<style>
</style>
