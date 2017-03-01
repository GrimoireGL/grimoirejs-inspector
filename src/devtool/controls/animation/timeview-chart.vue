<template lang="html">
  <div class="timeview-chart-root">
    <canvas ref="chart" v-on:wheel.prevent="wheel"/>
  </div>
</template>

<script>
import TimeLineChartDrawer from "../../animation/TimeLineChartDrawer";
export default {
    props: ["expand", "offsetX", "scale"],
    mounted() {
        this.chartDrawer = new TimeLineChartDrawer(this.$refs.chart, this.expand);
        this.$watch("expand", () => {
            this.chartDrawer.expand = this.expand;
            this.chartDrawer.onResize();
        });
        this.$watch("offsetX", () => {
            this.chartDrawer.offsetX = this.offsetX;
            this.chartDrawer.onDraw();
        }, {
            immediate: true
        });
        this.$watch("scale", () => {
            this.chartDrawer.scale = this.scale;
            this.chartDrawer.onDraw();
        }, {
            immediate: true
        });
        this.chartDrawer.onResize();
    },
    methods: {
        wheel(e) {
            if (Math.abs(e.deltaX) >= 0.0) {
                const offsetX = Math.max(0, e.deltaX + this.offsetX);
                if (offsetX !== this.offsetX) {
                    this.$emit("offsetXChanged", offsetX);
                }
            }
            if (Math.abs(e.deltaY) >= 0.0) {
                let scale = this.scale;
                scale*= 1.0 + e.deltaY * 0.01;
                if (this.scale !== scale && scale > 0.0001 && scale < 10000) {
                    this.$emit("scaleChanged", scale);
                }
            }
        }
    }
}
</script>

<style lang="stylus">
  .timeview-chart-root
    height 100%
    overflow-x hidden
    overflow-y hidden
    flex 1
</style>
