<template lang="html">
  <div class="animation-toolbelt-root">
    <ImageButton src="../../../../resources/images/play.svg" width="18" height="18"/>
    <p>file:</p>
    <Dropdown value="test" :list="list" width="120"/>
  </div>
</template>

<script>
import ImageButton from "../common/image-button.vue";
import Dropdown from "../common/dropdown.vue";
export default {
  components:{ImageButton,Dropdown},
  data(){
    return {
      list:["A","B","C"]
    };
  }
}
</script>

<style lang="stylus">
div.animation-toolbelt-root
  height 25px
  border-bottom solid 1px black
  display flex
  padding 0px 10px
  >p
    display flex
    align-items center
    height 100%
    padding 0px 3px
</style>
