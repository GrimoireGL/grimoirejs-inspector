<template lang="html">
  <div class="timeview-chart-root">
    <canvas ref="chart" class="animation-chart" v-on:wheel.prevent="wheel" v-on:mousemove="move" v-on:mousedown="down"/>
    <div class="timeview-chart-points" v-if="expand">
      <div v-for="(value,index) in points">
          <Point :color="value.color" :left="value.left" :top="value.top" :value="value.value" v-on:drag="handleDrag(value,$event)" size="4"/>
      </div>
      <div v-for="(value,index) in effects" class="effects">
        <components :is="value.control" :effect="value.effect" :p1="value.p1" :p2="value.p2" :offsetY="offsetY" :scaleY="scaleY" v-on:effectChanged="effectChanged(value,$event)"/>
      </div>
    </div>
  </div>
</template>

<script>
import TimeLineChartDrawer from "../../animation/TimeLineChartDrawer";
import Point from "./timeline-point.vue";
import LayoutCalculator from "../../animation/LayoutCalculator";
import Effects from "../../animation/Effects";
import {
    mapState,
    mapMutations
} from "vuex";
export default {
    components: {
        Point
    },
    props: ["expand", "model", "offsetY", "scaleY"],
    data() {
        return {
            lastX: 0,
            lastY: 0,
            drag: false
        }
    },
    computed: {
        points() {
            const arr = [];
            for (let i = 0; i < this.model.labels.length; i++) {
                const label = this.model.labels[i];
                const timeline = this.model.timelines[i];
                for (let j = 0; j < timeline.times.length; j++) {
                    arr.push({
                        timeline: timeline,
                        index: j,
                        color: label.color,
                        left: LayoutCalculator.timeToScreenX(this.scaleX, this.offsetX, timeline.times[j]),
                        top: LayoutCalculator.valueToScreenY(this.scaleY, this.offsetY, timeline.values[j]),
                        value: timeline.values[j]
                    })
                }
            }
            return arr;
        },
        effects() {
            const arr = [];
            for (let i = 0; i < this.model.labels.length; i++) {
                const label = this.model.labels[i];
                const timeline = this.model.timelines[i];
                for (let j = 0; j < timeline.effects.length; j++) {
                    const effect = timeline.effects[j];
                    if(!effect || !effect.type){
                      continue;
                    }
                    const effectControl = Effects[effect.type].optionalControl;
                    if (effectControl === null) {
                        continue;
                    }
                    const p1 = [timeline.times[j], timeline.values[j]];
                    const p2 = [timeline.times[j + 1], timeline.values[j + 1]];
                    arr.push({
                        control: effectControl,
                        effect: effect,
                        timeline: timeline,
                        index: j,
                        p1: p1,
                        p2: p2
                    });
                }
            }
            return arr;
        },
        ...mapState("animation", ["offsetX", "scaleX"])
    },
    mounted() {
        document.addEventListener("mouseup", (e) => {
            this.drag = false;
        });
        document.addEventListener("mousemove", (e) => {
            if (this.drag) {
                const nx = this.offsetX - LayoutCalculator.movementXToTimeDelta(this.scaleX, e.movementX);
                this.setOffsetX(Math.max(0, nx));
                const ny = this.offsetY + LayoutCalculator.movementYToValueDelta(this.scaleY, e.movementY);
                this.$emit("offsetYChanged", ny);
            }
        });
        this.chartDrawer = new TimeLineChartDrawer(this.$refs.chart, this.expand);
        this.chartDrawer.timelines = this.model.timelines;
        this.chartDrawer.labels = this.model.labels;
        this.$watch("model", () => {
            this.chartDrawer.timelines = this.model.timelines;
            this.chartDrawer.labels = this.model.labels;
            this.chartDrawer.onDraw();
        });
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
        this.$watch("scaleX", () => {
            this.chartDrawer.scaleX = this.scaleX;
            this.chartDrawer.onDraw();
        }, {
            immediate: true
        });
        this.$watch("offsetY", () => {
            this.chartDrawer.offsetY = this.offsetY;
            this.chartDrawer.onDraw();
        }, {
            immediate: true
        });
        this.$watch("scaleY", () => {
            this.chartDrawer.scaleY = this.scaleY;
            this.chartDrawer.onDraw();
        }, {
            immediate: true
        });
        this.chartDrawer.onResize();
    },
    methods: {
        wheel(e) {
            if (Math.abs(e.deltaX) >= 0.0) {
                const offsetX = Math.max(0, LayoutCalculator.screenXToTime(this.scaleX, 0, e.deltaX) + this.offsetX);
                if (offsetX !== this.offsetX) {
                    this.setOffsetX(offsetX);
                }
            }
            if (Math.abs(e.deltaY) >= 0.0) {
                if (e.ctrlKey) {
                  let scale = this.scaleY;
                  const lastScale = scale;
                  scale*= 1.0 + e.deltaY * 0.01;
                  if (this.scaleY !== scale && scale > 0.001 && scale < 1000) {
                      // const timeDelta = LayoutCalculator.screenXToTime(scale,0,this.lastX)
                      // - LayoutCalculator.screenXToTime(lastScale,0,this.lastX);
                      // this.setOffset(this.offsetX - timeDelta / 2.0)
                      this.$emit("scaleYChanged",scale);
                  }
                } else {
                    const offsetY = LayoutCalculator.movementYToValueDelta(this.scaleY, -e.deltaY) + this.offsetY;
                    if (offsetY !== this.offsetY) {
                        this.$emit("offsetYChanged", offsetY);
                    }
                }
            }
        },
        move(e) {
            this.lastX = e.offsetX;
            this.lastY = e.offsetY;
            this.chartDrawer.mouse = [e.offsetX,e.offsetY];
            this.chartDrawer.onDraw();
        },
        down(e) {
            this.drag = true;
        },
        calcDisplayPx(t) {
            return LayoutCalculator.timeToScreenX(t) + "px";
        },
        handleDrag(val, e) {
            const xdiff = LayoutCalculator.movementXToTimeDelta(this.scaleX, e.movementX);
            if (val.timeline.times[val.index] + xdiff < 0) {
                return;
            }
            // Check the point is between the last point and next one.
            if (e.movementX > 0) {
                if (val.index + 1 < val.timeline.times.length) {
                    if (val.timeline.times[val.index] + xdiff >= val.timeline.times[val.index + 1]) {
                        return;
                    }
                }
            } else {
                if (val.index - 1 >= 0) {
                    if (val.timeline.times[val.index] + xdiff <= val.timeline.times[val.index - 1]) {
                        return;
                    }
                }
            }
            const ydiff = LayoutCalculator.movementYToValueDelta(this.scaleY, e.movementY);
            val.timeline.times.splice(val.index, 1, val.timeline.times[val.index] + xdiff);
            val.timeline.values.splice(val.index, 1, val.timeline.values[val.index] - ydiff);
            this.chartDrawer.onDraw();
        },
        effectChanged(v, e) {
            v.timeline.effects.splice(v.index, 1, e);
            this.chartDrawer.onDraw();
        },
        ...mapMutations("animation", ["setOffsetX"])
    }
}
</script>

<style lang="stylus">
  .timeview-chart-root
    position relative
    height 100%
    overflow-x hidden
    overflow-y hidden
    flex 1
    canvas
      user-select none
      background-color #222
  .timeview-chart-points
    position absolute
    top 0px
    left 0px
    .point-container
      position absolute
</style>
