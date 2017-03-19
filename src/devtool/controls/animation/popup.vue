<template lang="html">
  <div class="animation-popup">
    <p>Effects<p>
    <div class="effect-container">
      <ImageButton src="../../../../resources/images/effects/linear.svg" width="32" height="32" @click="clicked('LINEAR')"/>
      <ImageButton src="../../../../resources/images/effects/bezier.svg" width="32" height="32" @click="clicked('BEZIER')"/>
    </div>
  </div>
</template>

<script>
import ImageButton from "../common/image-button.vue";
export default {
  components:{ImageButton},
  methods:{
    clicked(type){
      this.$emit("effectTypeChanged",type);
    }
  }
}
</script>

<style lang="stylus">
.animation-popup
  width 120px
  display flex
  flex-direction column
  background-color #333
  padding 3px
  box-shadow 1px 1px 1px black
  .effect-container
    display flex
</style>
