<template lang="html">
  <div class="image-button-container">
    <div :style="borderStyle" class="image-button-border-container">
      <img :src="src" v-if="!isSVG">
      <svg :src="src" v-if="isSVG"/>
      <div class="image-button-overlay" @click="click">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:["src","height","width","isSVG"],
  computed:{
    borderStyle(){
      return {
        width: this.width + "px",
        height: this.height + "px"
      };
    }
  },
  methods:{
    click(){
      this.$emit("click");
    }
  }
}
</script>

<style lang="stylus">
  .image-button-container
    height 100%
    display flex
    flex-direction column
    justify-content center
    .image-button-border-container
      position relative
      .image-button-overlay
        background-color white
        opacity 0
        position absolute
        left 0
        right 0
        top 0
        bottom 0
        &:hover
          opacity 0.3
          cursor pointer
    .svg-hover-stroke-highlight:hover
      color orange

</style>
