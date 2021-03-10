<template>
  <div>
    <el-input v-model="input"></el-input>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator"
@Component({
  name: "addArticleType",
})
export default class AddArticleType extends Vue {
  private input = '' 
}

</script>
<style>
</style>
