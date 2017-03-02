<template lang="html">
  <svg :style="{left:calcLeft}" class="current-frame-cursor" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
  	 :viewBox="calcViewBox" style="enable-background:new 0 0 5 79;" xml:space="preserve">
  <g>
  	<g>
  		<polygon class="st0" points="0,15.2 0,0.1 4.9,0.1 4.9,15.3 2.5,19.9"/>
  	</g>
  	<line class="st1" x1="2.5" y1="13.2" x2="2.5" :y2="calcY2"/>
  </g>
  </svg>
</template>

<script>
import LayoutCalculator from "../../animation/LayoutCalculator";
export default {
  props:["lineHeight","offsetX","scale","currentTime"],
  computed:{
    calcY2(){
      return this.lineHeight + 19;
    },
    calcViewBox(){
      return `0 0 5 ${this.calcY2 + 19}`;
    },
    calcLeft(){
      return (this.currentTime - this.offsetX) * this.scale;
    }
  }
}
</script>

<style lang="stylus">
.current-frame-cursor
  position absolute
  width 5px
  transform translateX(-50%)
.st0{fill:#8CC63F;opacity:0.8;cursor:col-resize;}
.st1{fill:none;stroke:#8CC63F;stroke-miterlimit:10;opacity:0.8;cursor:col-resize;}
</style>
