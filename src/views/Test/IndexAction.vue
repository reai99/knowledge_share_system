<template>
  <div>
  <mapbox/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Mapbox from '@/common/components/MapBox/IndexAction.vue'
@Component({
  name: 'textDemo',
  components: {
    Mapbox
  }
})
export default class extends Vue{

}
</script>
<style>
</style>
