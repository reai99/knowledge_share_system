<template>
  <div>
    props传来的值: {{title}}
  </div>
</template>

<script lang="ts">
import {Component,Prop, Vue} from "vue-property-decorator"
@Component({
  name: "editArticleType",
})
export default class EditArtcleType extends Vue {
  @Prop({ default: '内容'}) title: string
}

</script>

<style scoped>

</style>
