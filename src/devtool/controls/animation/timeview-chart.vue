<template lang="html">
  <div class="timeview-chart-root">
    <canvas ref="chart" v-on:wheel.prevent="wheel" v-on:mousemove="move"/>
    <div class="timeview-chart-points" v-if="expand">
      <div v-for="(value,index) in points">
          <Point :color="value.color" :left="value.left" :top="value.top" v-on:drag="handleDrag(value,$event)" size="4"/>
      </div>
      <div v-for="(value,index) in effects" class="effects">
        <components :is="value.control" :effect="value.effect" :p1="value.p1" :p2="value.p2" :offsetX="offsetX" :scale="scale" v-on:effectChanged="effectChanged(value,$event)"/>
      </div>
    </div>
  </div>
</template>

<script>
import TimeLineChartDrawer from "../../animation/TimeLineChartDrawer";
import Point from "./timeline-point.vue";
import LayoutCalculator from "../../animation/LayoutCalculator";
import TimeEffect from "../../animation/TimeEffect";
export default {
    components:{Point},
    props: ["expand", "offsetX", "scale","model"],
    data(){
      return {
        lastX:0
      }
    },
    computed:{
      points(){
        const arr = [];
        for(let i = 0; i < this.model.labels.length; i++){
          const label = this.model.labels[i];
          const timeline = this.model.timelines[i];
          for(let j = 0; j < timeline.times.length; j++){
            arr.push({
              timeline:timeline,
              index:j,
              color:label.color,
              left:LayoutCalculator.timeToScreenX(this.scale,this.offsetX,timeline.times[j]) / 2,
              top: timeline.values[j] / 2
            })
          }
        }
        return arr;
      },
      effects(){
        const arr = [];
        for(let i = 0; i < this.model.labels.length; i++){
          const label = this.model.labels[i];
          const timeline = this.model.timelines[i];
          for(let j = 0; j < timeline.effects.length; j++){
            const effect = timeline.effects[j];
            const effectControl = TimeEffect.getOptionalControl(effect.type);
            if(effectControl === null){
              continue;
            }
            const p1 = [timeline.times[j],timeline.values[j]];
            const p2 = [timeline.times[j + 1],timeline.values[j + 1]];
            arr.push({
              control:effectControl,
              effect:effect,
              timeline:timeline,
              index:j,
              p1:p1,
              p2:p2
            });
          }
        }
        return arr;
      }
    },
    mounted() {
        this.chartDrawer = new TimeLineChartDrawer(this.$refs.chart, this.expand);
        this.chartDrawer.timelines = this.model.timelines;
        this.chartDrawer.labels = this.model.labels;
        this.$watch("model",()=>{
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
                const offsetX = Math.max(0, LayoutCalculator.screenXToTime(this.scale,0,e.deltaX) + this.offsetX);
                if (offsetX !== this.offsetX) {
                    this.$emit("offsetXChanged", offsetX);
                }
            }
        },
        move(e){
          this.lastX = e.offsetX;
        },
        calcDisplayPx(t){
          return LayoutCalculator.timeToScreenX(t) + "px";
        },
        handleDrag(val,e){
          const xdiff = LayoutCalculator.screenXToTime(this.scale,0,e.movementX);
          if(val.timeline.times[val.index] + xdiff < 0){
            return;
          }
          if(e.movementX > 0){
            if(val.index + 1 < val.timeline.times.length){
              if(val.timeline.times[val.index] + xdiff >= val.timeline.times[val.index + 1]){
                return;
              }
            }
          }else{
            if(val.index - 1 >=0){
              if(val.timeline.times[val.index] + xdiff <= val.timeline.times[val.index - 1]){
                return;
              }
            }
          }
          val.timeline.times.splice(val.index,1,val.timeline.times[val.index] + xdiff);
          val.timeline.values.splice(val.index,1,val.timeline.values[val.index] + e.movementY);
          this.chartDrawer.onDraw();
        },
        effectChanged(v,e){
          v.timeline.effects.splice(v.index,1,e);
          this.chartDrawer.onDraw();
        }
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
  .timeview-chart-points
    position absolute
    top 0px
    left 0px
    .point-container
      position absolute
</style>
