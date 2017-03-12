<template lang="html">
  <div>
  <div class="timebelt-root">
    <div class="property-header">
      <p>Properties</p>
    </div>
    <div class="timebelt-container">
      <canvas ref="timebelt" v-on:wheel.prevent="wheel" v-on:mousemove="move"/>
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
import LayoutCalculator from "../../animation/LayoutCalculator";
export default {
    props: ["offsetX", "scale","timeViewHeight","currentTime"],
    data(){
      return {
        lastX:0
      }
    },
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
    methods:{
      wheel(e){
        if (Math.abs(e.deltaY) >= 0.0) {
            let scale = this.scale;
            const lastScale = scale;
            scale*= 1.0 + e.deltaY * 0.01;
            if (this.scale !== scale && scale > 0.0001 && scale < 10) {
                const timeDelta = LayoutCalculator.screenXToTime(scale,this.offsetX,this.lastX)
                - LayoutCalculator.screenXToTime(lastScale,this.offsetX,this.lastX);
                this.$emit("offsetXChanged",this.offsetX - timeDelta * 2.0)
                this.$emit("scaleChanged", scale);
            }
        }
      },
      move(e){
        this.lastX = e.offsetX;
      }
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
