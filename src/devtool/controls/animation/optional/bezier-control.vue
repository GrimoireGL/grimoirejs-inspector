<template lang="html">
  <div class="bezier-controls">
    <Point color="yellow" size="2" :left="c1ScreenX" :top="effect.control[1]" v-on:drag="handleDrag(0,$event)"/>
    <Point color="yellow" size="2" :left="c2ScreenX" :top="effect.control[3]" v-on:drag="handleDrag(1,$event)"/>
    <svg xmlns="http://www.w3.org/2000/svg" class="bezier-line-container" :style="linesStyle">
      <line :x1="p1ScreenX" :y1="p1[1]*0.5" :x2="c1ScreenX" :y2="this.effect.control[1]" stroke="yellow"/>
      <line :x1="p2ScreenX" :y1="p2[1]*0.5" :x2="c2ScreenX" :y2="this.effect.control[3]" stroke="yellow"/>
    </svg>
  </div>
</template>

<script>
import Point from "../timeline-point.vue";
import LayoutCalculator from "../../../animation/LayoutCalculator";
export default {
    components: {
        Point
    },
    props: ["effect", "p1", "p2", "scale", "offsetX"],
    computed: {
        c1ScreenX() {
            return LayoutCalculator.timeToScreenX(this.scale, this.offsetX, this.effect.control[0])/2;
        },
        c2ScreenX() {
            return LayoutCalculator.timeToScreenX(this.scale, this.offsetX, this.effect.control[2])/2;
        },
        p1ScreenX(){
          return LayoutCalculator.timeToScreenX(this.scale,this.offsetX,this.p1[0])/2;
        },
        p2ScreenX(){
          return LayoutCalculator.timeToScreenX(this.scale,this.offsetX,this.p2[0])/2;
        },
        linesStyle(){
          return {
            width:this.p2ScreenX + "px",
            height:"250px"
          };
        }
    },
    methods: {
        handleDrag(i, e) {
            const effect = this.effect;
            const nx = effect.control[2 * i] + LayoutCalculator.screenXToTime(this.scale, this.offsetX, e.movementX);
            if(nx > this.p2[0] || nx < this.p1[0]){
              return;
            }
            effect.control.splice(2 * i, 1, nx);
            effect.control.splice(2 * i + 1, 1, effect.control[2 * i + 1] + e.movementY);
            this.$emit("effectChanged", effect);
        }
    }
}
</script>

<style lang="stylus">
.bezier-line-container
  top 0
  right 0
  bottom 0
  left 0
  position absolute
  pointer-events none
</style>
