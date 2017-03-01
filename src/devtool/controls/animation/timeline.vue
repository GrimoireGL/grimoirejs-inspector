<template lang="html">
  <div class="timeline-root">
    <Timeview/>
  </div>
</template>

<script>
import Timeview from "./timeview.vue";
export default {
  components:{
    Timeview
  }
}
</script>

<style lang="stylus">
.timeline-root
  flex 1
  height 100%
</style>
