<template>
  <div class="d-flex flex-grow-1">
    <mindmap
      v-model="mmdata"
      :gps="options.gps.value"
      :fitView="options.fitView.value"
      :draggable="options.draggable.value"
      :keyboard="options.keyboard.value"
      :showNodeAdd="options.showNodeAdd.value"
      :contextMenu="options.contextMenu.value"
      :zoomable="options.zoomable.value"
      :showUndo="options.showUndo.value"
      :xSpacing="xSpacing"
      :ySpacing="ySpacing"
      :strokeWidth="strokeWidth"
      :download="options.download.value"
      @updateNodeName="updateNodeName"
      @click="click"
    ></mindmap>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator"
import mindmap from '@/common/components/MindMap/index.vue'

@Component({
  name: "CreateMind",
  components: { mindmap },
})
export default class App extends Vue {
  showSource = false
  onboarding = 0
  length = 3
  mmdata = [
  {
    "name":"如何学习TS",
    "children":
    [
      {
        "name":"预备知识",
        "children": [
          { "name":"HTML & CSS", "href": 'http://baidu.com', "description": '撒大嫂大嫂大大说分手开发的'}, 
          { "name":"JavaScript", "href": 'http://baidu.com', "description": '撒qweqqwasdasdasdas大嫂大嫂大大说分手开发的'},
          { "name":"DOM", "href": 'http://zreai.com', "description": '撒大嫂大嫂大大说分撒大嫂大大说手开发的'},
          { "name":"SVG" , "description": 'asadasdasdas撒大嫂asdasdas大嫂大大说分手开发的' },
          { "name":"test" },
        ],
      },
    ],
  },
]
  items = [
    { title: 'template' },
    { title: 'script' },
  ]
  options = {
    gps: { value: true },
    fitView: { value: true },
    keyboard: { value: true },
    draggable: { value: true },
    showNodeAdd: { value: true },
    contextMenu: { value: true },
    zoomable: { value: true },
    showUndo: { value: true },
    download: { value: true },
  }
  xSpacing = 20
  ySpacing = 20
  strokeWidth = 4

  updateNodeName(...args) {
    console.log('updateNodeName', ...args)
  }
  click(...args) {
    console.log('click', args)
    var data = args[0]
    if(data.href) {
      window.open(data.href, 'blank')
    }

  }
  mounted() {}
}
</script>
<style>
</style>
