<template lang="html">
  <div class="animation-tab-root">
    <Toolbelt/>
    <Timeline/>
  </div>
</template>

<script>
import Toolbelt from "./toolbelt.vue";
import Timeline from "./timeline.vue";
export default {
  components:{
    Toolbelt,
    Timeline
  }
}
</script>

<style lang="stylus">
  .animation-tab-root
    display flex
    flex-direction column
    height 100%
</style>
