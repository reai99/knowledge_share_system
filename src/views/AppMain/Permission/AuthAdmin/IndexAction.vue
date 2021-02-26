<template>
  <div>
    {{$t(name)}}
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component({
  name: 'AuthAdmin',
})

export  default class extends Vue {
  private name = '这是权限管理页面！'
}

</script>
<style lang="scss" scoped>

</style>
