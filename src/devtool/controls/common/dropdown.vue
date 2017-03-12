<template lang="html">
  <div class="dropdown-container" v-on:click.stop="clicked" :style="rootStyle">
    <div class="label-container">
      <p class="label">{{value}}</p>
      <p>▼</p>
    </div>
    <div class="elements-container" :style="containerStyle">
      <p v-for="v in list">{{v}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props:["value","list","width"],
  data(){
    return {
      show:false
    };
  },
  computed:{
    containerStyle(){
      return {
        display: this.show ? "block": "none",
        width:this.width + "px"
      };
    },
    rootStyle(){
      return {
        width: this.width + "px"
      }
    }
  },
  methods:{
    clicked(){
      this.show = !this.show;
    }
  },
  mounted(){
    document.addEventListener("click",()=>{
      this.show = false;
    });
  }
}
</script>

<style lang="stylus">
  .dropdown-container
    position relative
    margin 3px 0px
    border 1px solid white
    p
      padding 2px
      height 100%
      &:hover
        cursor pointer
        background-color darkgray
    >.elements-container
      position absolute
      z-index 1000
      background-color dimgray
    .label-container
      width 100%
      display flex
      .label
        flex 1
</style>
