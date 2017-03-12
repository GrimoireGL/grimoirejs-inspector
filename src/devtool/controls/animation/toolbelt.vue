<template lang="html">
  <div class="animation-toolbelt-root">
    <ImageButton src="../../../../resources/images/play.svg" width="18" height="18"/>
  </div>
</template>

<script>
import ImageButton from "../common/image-button.vue";
export default {
  components:{ImageButton}
}
</script>

<style lang="stylus">
div.animation-toolbelt-root
  height 25px
  border-bottom solid 1px black
  display flex
  padding 0px 10px
</style>
