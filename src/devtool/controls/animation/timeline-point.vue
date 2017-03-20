<template lang="html">
  <svg :style="style" class="chart-point" width="12" height="12" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" @mouseover="over" @mouseout="out" @mousedown="down" @click="click">
   <g>
    <title>{{value}}</title>
      <g id="svg_2">
        <circle :fill="color" :stroke="strokeColor" :stroke-width="strokeWidth" cx="6" cy="6" :r="size" id="svg_1"/>
      </g>
   </g>
  </svg>
</template>

<script>
export default {
  props:["color","left","top","size","value","selected"],
  data(){
    return {
      mouseon:false,
      mousehold:false
    };
  },
  computed:{
    strokeColor(){
      return this.selected ? "orange" :"black";
    },
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
    },
    click(){
      this.$emit("click");
    },
    deletePressed(){
      debugger;
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
    });
  }
}
</script>

<style lang="stylus">
.chart-point
  transform translateX(-50%)
  z-index 1000
</style>
