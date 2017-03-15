<template lang="html">
  <div class="bezier-controls">
    <Point color="yellow" size="2" :left="c1ScreenX" :top="c1ScreenY" v-on:drag="handleDrag(0,$event)"/>
    <Point color="yellow" size="2" :left="c2ScreenX" :top="c2ScreenY" v-on:drag="handleDrag(1,$event)"/>
    <svg xmlns="http://www.w3.org/2000/svg" class="bezier-line-container" :style="linesStyle">
      <line :x1="p1ScreenX" :y1="p1ScreenY" :x2="c1ScreenX" :y2="c1ScreenY" stroke="yellow"/>
      <line :x1="p2ScreenX" :y1="p2ScreenY" :x2="c2ScreenX" :y2="c2ScreenY" stroke="yellow"/>
    </svg>
  </div>
</template>

<script>
import Point from "../timeline-point.vue";
import LayoutCalculator from "../../../animation/LayoutCalculator";
import {mapState} from "vuex";
export default {
    components: {
        Point
    },
    props: ["effect", "p1", "p2","offsetY","scaleY"],
    computed: {
        c1ScreenX() {
            return LayoutCalculator.timeToScreenX(this.scaleX, this.offsetX, this.effect.control[0]);
        },
        c2ScreenX() {
            return LayoutCalculator.timeToScreenX(this.scaleX, this.offsetX, this.effect.control[2]);
        },
        p1ScreenX(){
          return LayoutCalculator.timeToScreenX(this.scaleX,this.offsetX,this.p1[0]);
        },
        p2ScreenX(){
          return LayoutCalculator.timeToScreenX(this.scaleX,this.offsetX,this.p2[0]);
        },
        p1ScreenY(){
          return LayoutCalculator.valueToScreenY(this.scaleY,this.offsetY,this.p1[1]);
        },
        p2ScreenY(){
          return LayoutCalculator.valueToScreenY(this.scaleY,this.offsetY,this.p2[1]);
        },
        c1ScreenY(){
          return LayoutCalculator.valueToScreenY(this.scaleY, this.offsetY, this.effect.control[1]);
        },
        c2ScreenY(){
          return LayoutCalculator.valueToScreenY(this.scaleY, this.offsetY, this.effect.control[3]);
        },
        linesStyle(){
          return {
            width:this.p2ScreenX + "px",
            height:"250px"
          };
        },
        ...mapState("animation",["scaleX","offsetX"])
    },
    methods: {
        handleDrag(i, e) {
            const effect = this.effect;
            const nx = effect.control[2 * i] + LayoutCalculator.movementXToTimeDelta(this.scaleX, e.movementX);
            if(nx > this.p2[0] || nx < this.p1[0]){
              return;
            }
            const ydiff = LayoutCalculator.movementYToValueDelta(this.scaleY,e.movementY);
            effect.control.splice(2 * i, 1, nx);
            effect.control.splice(2 * i + 1, 1, effect.control[2 * i + 1] - ydiff);
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
