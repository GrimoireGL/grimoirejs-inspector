<template lang="html">
  <svg :style="{left:calcLeft}" class="current-frame-cursor" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
  	 :viewBox="calcViewBox" style="enable-background:new 0 0 5 79;" xml:space="preserve" v-on:mousedown="down">
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
import {mapState,mapMutations} from "vuex";
export default {
  props:["lineHeight"],
  data(){
    return {
      drag:false
    };
  },
  computed:{
    calcY2(){
      return this.lineHeight + 19;
    },
    calcViewBox(){
      return `0 0 5 ${this.calcY2 + 19}`;
    },
    calcLeft(){
      return (this.currentTime - this.offsetX) * this.scaleX;
    },
    ...mapState("animation",["offsetX","scaleX","currentTime"])
  },
  methods:{
    down(){
      this.drag = true;
    },
    ...mapMutations("animation",["setCurrentTime"])
  },
  mounted(){
    document.addEventListener("mouseup",()=>{
      this.drag = false;
    });
    document.addEventListener("mousemove",(e)=>{
      if(!this.drag)return;
      const diffTime = LayoutCalculator.movementXToTimeDelta(this.scaleX,e.movementX);
      const time = diffTime + this.currentTime;
      if(time >= 0){
        this.setCurrentTime(time);
      }
    });
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
