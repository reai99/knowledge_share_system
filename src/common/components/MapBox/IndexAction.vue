<template>
  <div id="map"></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import mapboxgl from "mapbox-gl";
import MapboxLanguage from "@mapbox/mapbox-gl-language";
@Component({
  name: "mapbox"
})
export default class extends Vue {
  created() {
    this.getPlaceSource()
  }
  mounted() {
    this.initMap();
  }
  private getPlaceSource() {
    (this as any).$axios.get("https://geo.datav.aliyun.com/areas/bound/geojson?code=510000").then(res => {
      console.log(res)
    })
  }
  private initMap() {
    mapboxgl.accessToken =
      "pk.eyJ1IjoibWFvcmV5IiwiYSI6ImNqNWhrenIwcDFvbXUyd3I2bTJxYzZ4em8ifQ.KHZIehQuWW9AsMaGtATdwA";
    const map = new mapboxgl.Map({
      container: "map",
      center: [102.16, 35.62],
      zoom: 3.4,
      style: "mapbox://styles/mapbox/dark-v9",
      // hash: true,
      pitch: 0,
      bearing: 0
    });
    mapboxgl.setRTLTextPlugin(
      "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.1.0/mapbox-gl-rtl-text.js"
    );
    map.addControl(
      new MapboxLanguage({
        defaultLanguage: "zh"
      })
    );
    map.on("load", function() {
      map.showTileBoundaries = true;
      // map.showCollisionBoxes = true;
      // map.showPadding = true;

      map.setPaintProperty("background", "background-color", "#45516E");
      // 获取地图上所有的layers,因为是遍历object 对象，可以用object.keys来遍历
      Object.keys(map.style._layers).map(v => {
        const opt = map.style._layers[v];
        //  添加颜色
        if (opt.id.includes("water") && opt.type == "fill") {
          map.setPaintProperty(opt.id, "fill-color", "#182c4e");
        }
      });

      map.addSource("sichuan", {
        type: "geojson",
        data:
          "https://geo.datav.aliyun.com/areas/bound/geojson?code=510000_full"
      });

      // 蓝色遮罩层颜色设定，透明度通过feature-state 的值的情况来设定颜色透明度
      map.addLayer({
        id: "addlayermask",
        type: "fill",
        source: "sichuan",
        layout: {},
        paint: {
          "fill-color": "#286BFF",
          "fill-opacity": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            0.7,
            0
          ]
        }
      });
      // 设置地图区域边沿的线宽和颜色值
      map.addLayer({
        id: `sichuan-line`,
        type: "line",
        source: "sichuan",
        layout: {},
        paint: {
          "line-width": 1.5,
          "line-color": "#286BFF"
        }
      });
    });
  }
}
</script>
<style>
body {
  margin: 0;
  padding: 0;
}

#map {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}
</style>