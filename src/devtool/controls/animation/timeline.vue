<template lang="html">
  <div class="timeline-root">
    <TimeBelt :offsetX="offsetX" :scale="scale" :timeViewHeight="timeViewHeight" currentTime="200"  v-on:offsetXChanged="offsetXChanged" v-on:scaleChanged="scaleChanged"/>
    <div class="timeview-scroll-container">
      <div ref="timeviews" class="timeview-container">
        <Timeview :offsetX="offsetX" :scale="scale" v-on:offsetXChanged="offsetXChanged" v-on:scaleChanged="scaleChanged" v-on:expandChanged="expandChanged"/>
        <Timeview :offsetX="offsetX" :scale="scale" v-on:offsetXChanged="offsetXChanged" v-on:scaleChanged="scaleChanged" v-on:expandChanged="expandChanged"/>
      </div>
    </div>
  </div>
</template>

<script>
import Timeview from "./timeview.vue";
import TimeBelt from "./timebelt.vue";
export default {
  data(){
    return {
      offsetX:0,
      scale:1,
      timeViewHeight:0
    };
  },
  components:{
    Timeview,
    TimeBelt
  },
  methods:{
    offsetXChanged(v){
      this.offsetX = v;
    },
    scaleChanged(v){
      this.scale = v;
    },
    expandChanged(){
      this.timeViewHeight = this.$refs.timeviews.clientHeight;
    }
  },
  mounted(){
    window.addEventListener("resize",()=>{
      this.timeViewHeight = this.$refs.timeviews.clientHeight;
    });
    this.timeViewHeight = this.$refs.timeviews.clientHeight;
  }
}
</script>

<style lang="stylus">
.timeline-root
  flex 1
  display flex
  overflow-x hidden
  flex-direction column
  height 100%
  .timeview-scroll-container
    flex 1
    overflow-x hidden

</style>
