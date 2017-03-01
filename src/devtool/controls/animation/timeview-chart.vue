<template lang="html">
  <div class="timeview-chart-root">
    <canvas ref="chart"/>
  </div>
</template>

<script>
import TimeLineChartDrawer from "../../animation/TimeLineChartDrawer";
export default {
  props:["expand"],
  mounted(){
    this.chartDrawer = new TimeLineChartDrawer(this.$refs.chart,this.expand);
    this.chartDrawer.onResize();
    this.$watch("expand",()=>{
      this.chartDrawer.expand = this.expand;
      this.chartDrawer.onResize();
    });
  }
}
</script>

<style lang="stylus">
  .timeview-chart-root
    width 100%
    height 100%
    flex 1
</style>
