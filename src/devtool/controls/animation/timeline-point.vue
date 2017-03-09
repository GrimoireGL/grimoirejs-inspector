<template lang="html">
  <svg :style="style" class="chart-point" width="12" height="12" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" v-on:mouseover="over" v-on:mouseout="out" v-on:mousedown="down">
   <g>
    <title>Layer 1</title>
      <g id="svg_2">
        <circle :fill="color" stroke="#000000" :stroke-width="strokeWidth" cx="6" cy="6" r="4" id="svg_1"/>
      </g>
   </g>
  </svg>
</template>

<script>
export default {
  props:["color","left","top"],
  data(){
    return {
      mouseon:false,
      mousehold:false
    };
  },
  computed:{
    strokeWidth(){
      return this.mouseon ? 2: 1;
    },
    style(){
      return {
        cursor: this.mouseon ? "pointer" : "arrow",
        position:"absolute",
        left:this.left + "px",
        top:this.top + "px",
        transform:"translate(-50%,-50%)"
      };
    }
  },
  methods:{
    over(){
      this.mouseon = true;
    },
    out(){
      this.mouseon = false;
    },
    down(){
      this.mousehold = true;
    }
  },
  mounted(){
    document.addEventListener("mouseup",()=>{
      this.mousehold = false;
    });
    document.addEventListener("mousemove",(e)=>{
      if(this.mousehold){
        this.$emit("drag",e);
      }
    })
  }
}
</script>

<style lang="stylus">
.chart-point
  transform translateX(-50%)
  z-index 1000
</style>
