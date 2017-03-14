<template lang="html">
  <div class="timeline-root">
    <TimeBelt :timeViewHeight="timeViewHeight"/>
    <div class="timeview-scroll-container">
      <div ref="timeviews" class="timeview-container">
        <Timeview  v-on:expandChanged="expandChanged"/>
        <Timeview v-on:expandChanged="expandChanged"/>
      </div>
    </div>
  </div>
</template>

<script>
import Timeview from "./timeview.vue";
import TimeBelt from "./timebelt.vue";
import {mapState,mapMutations} from "vuex";
export default {
  data(){
    return {
      timeViewHeight:0,
    };
  },
  components:{
    Timeview,
    TimeBelt
  },
  methods:{
    expandChanged(){
      this.timeViewHeight = this.$refs.timeviews.clientHeight;
    },
    ...mapMutations("animation",["setOffsetX","setOffsetY","setScaleX","setScaleY","setCurrentTime"])
  },
  mounted(){
    window.addEventListener("resize",()=>{
      this.timeViewHeight = this.$refs.timeviews.clientHeight;
    });
    this.timeViewHeight = this.$refs.timeviews.clientHeight;
  },
  computed:{
    ...mapState("animation",["scaleX","scaleY","offsetX","offsetY","currentTime"])
  }
}
</script>

<style lang="stylus">
.timeline-root
  flex 1
  display flex
  overflow-x hidden
  overflow-y hidden
  flex-direction column
  height 100%
  .timeview-scroll-container
    height 100%
    flex 1
    overflow-x hidden

</style>
