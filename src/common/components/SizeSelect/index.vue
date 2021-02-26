<template>
  <el-dropdown
    id="size-select"
    trigger="click"
    @command="handleSetSize"
  >
    <div>
      <svg-icon
        class="size-icon"
        name="size"
      />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="item of sizeOptions"
        :key="item.value"
        :disabled="size===item.value"
        :command="item.value"
      >
        {{
          item.label }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { BasicConfig } from '@/store/modules/app'

@Component({
  name: 'SizeSelect'
})
export default class extends Vue {
  private sizeOptions = [
    { label: 'Default', value: 'default' },
    { label: 'Medium', value: 'medium' },
    { label: 'Small', value: 'small' },
    { label: 'Mini', value: 'mini' }
  ]

  get size() {
    return BasicConfig.size
  }

  /**
   * 设置页面尺寸
   * @param size
   * @private
   */
  private handleSetSize(size: string) {
    (this as any).$ELEMENT.size = size
    BasicConfig.SetSize(size)
    this.$confirm('修改尺寸成功,刷新后生效, 是否立刻刷新?', '尺寸切换', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      BasicConfig.ToggleAppResh()
      this.$message({
        message: '切换成功',
        type: 'success'
      })
    })

  }
}
</script>
