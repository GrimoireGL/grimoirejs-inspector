<template lang="html">
  <div>
  <div class="timebelt-root">
    <div class="property-header">
      <p>Properties</p>
    </div>
    <div class="timebelt-container">
      <canvas ref="timebelt"/>
      <div class="timebelt-cursor-container">
        <TimeCursor :length="timeViewHeight" :lineHeight="timeViewHeight" :offsetX="offsetX" :currentTime="currentTime" :scale="scale"/>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import TimebeltDrawer from "../../animation/TimebeltDrawer";
import TimeCursor from "./timeline-cursor.vue";
export default {
    props: ["offsetX", "scale","timeViewHeight","currentTime"],
    mounted() {
        this.beltDrawer = new TimebeltDrawer(this.$refs.timebelt);
        this.$watch("offsetX", () => {
            this.beltDrawer.offsetX = this.offsetX;
            this.beltDrawer.onDraw();
        }, {
            immediate: true
        });
        this.$watch("scale", () => {
            this.beltDrawer.scale = this.scale;
            this.beltDrawer.onDraw();
        }, {
            immediate: true
        });
        this.beltDrawer.onResize();
    },
    components: {
        TimeCursor
    }
}
</script>

<style lang="stylus">
.timebelt-root
  width 100%
  height 24px
  display flex
  .property-header
    width 156px
    min-width 156px
    border-right solid 1px black
    z-index 100
    background-color black
  .timebelt-container
    flex 1
    position relative
  .timebelt-cursor-container
    position absolute
    width 100%
    top 5px
    left 0px;
    z-index 10
</style>
