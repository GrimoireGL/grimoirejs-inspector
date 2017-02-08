<style lang="stylus">
  .color-box-container
    margin 0 8px
    .color-box
      width 18px
      height 18px
      border-radius 5px
      border solid 1px white
      background-image url(../../../../resources/images/tp.png)
      background-size 100% 100%
      .color-box-colored
        width 100%
        height 100%
        border-radius 5px
      .color-box-highlight
        width 100%
        height 100%
        border-radius 5px
        background-color black
        opacity 0
        &:hover
          cursor pointer
          opacity 0.2
      .color-box-float
        position relative
        transform translate(-50%,50%)
        .color-box-float-inner
          position absolute
          right 0px


</style>

<template>
  <div class="color-box-container">
    <div class="color-box" v-on:click.stop>
      <div class="color-box-colored" :style="{'background-color':rgba}" >
        <div class="color-box-highlight" v-on:click="openEditor">
        </div>
      </div>
      <div class="color-box-float" v-if="open">
        <div class="color-box-float-inner">
        <Chrome :value="inputColor" @change-color="changeColor"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Chrome} from "vue-color";
  function componentToHex(c) {
    const hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  function rgbToHex(r, g, b) {
     return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

  export default {
    props:["value"],
    data:function(){
      return {
        open:false
      };
    },
    components:{
      Chrome
    },
    methods:{
      openEditor:function(){
        this.open = !this.open;
      },
      changeColor:function(v){
        this.$emit("input",[v.rgba.r/255,v.rgba.g/255,v.rgba.b/255,v.a]);
        this.$emit("colorChanged",v);
      }
    },
    mounted:function(){
      document.addEventListener("click",()=>{
        this.open = false;
      });
    },
    computed:{
      rgba:function(){
        return `rgba(${this.inputColor.rgba.r},${this.inputColor.rgba.g},${this.inputColor.rgba.b},${this.inputColor.a})`;
      },
      inputColor:function(){
        const v = this.value;
        return {
          hex:rgbToHex(v[0] * 255,v[1] * 255, v[2] * 255),
          rgba:{
            r:v[0] * 255,
            g:v[1] * 255,
            b:v[2] * 255,
            a:0
          },
          a:v[3] !== void 0?v[3]:1
        };
      }
    }
  }
</script>
