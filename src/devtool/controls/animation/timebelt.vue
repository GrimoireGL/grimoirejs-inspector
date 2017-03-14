<template lang="html">
  <div>
  <div class="timebelt-root">
    <div class="property-header">
      <p>clip:</p>
      <Dropdown value="ABC" width="120"/>
    </div>
    <div class="timebelt-container">
      <canvas ref="timebelt" v-on:wheel.prevent="wheel" v-on:mousemove="move"/>
      <div class="timebelt-cursor-container">
        <TimeCursor :lineHeight="timeViewHeight"/>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import TimebeltDrawer from "../../animation/TimebeltDrawer";
import TimeCursor from "./timeline-cursor.vue";
import LayoutCalculator from "../../animation/LayoutCalculator";
import Dropdown from "../common/dropdown.vue";
import {mapState,mapMutations} from "vuex";
export default {
    props: ["timeViewHeight"],
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
        this.$watch("scaleX", () => {
            this.beltDrawer.scale = this.scaleX;
            this.beltDrawer.onDraw();
        }, {
            immediate: true
        });
        this.beltDrawer.onResize();
    },
    methods:{
      wheel(e){
        if (Math.abs(e.deltaY) >= 0.0) {
            let scale = this.scaleX;
            const lastScale = scale;
            scale*= 1.0 + e.deltaY * 0.01;
            if (this.scaleX !== scale && scale > 0.0001 && scale < 10) {
                const timeDelta = LayoutCalculator.screenXToTime(scale,0,this.lastX)
                - LayoutCalculator.screenXToTime(lastScale,0,this.lastX);
                this.setOffsetX(this.offsetX - timeDelta / 2.0)
                this.setScaleX(scale);
            }
        }
      },
      move(e){
        this.lastX = e.offsetX;
      },
      ...mapMutations("animation",["setScaleX","setOffsetX"])
    },
    computed:{
      ...mapState("animation",["scaleX","offsetX","currentTime"])
    },
    components: {
        TimeCursor,
        Dropdown
    }
}
</script>

<style lang="stylus">
.timebelt-root
  width 100%
  height 24px
  display flex
  .property-header
    display flex
    width 156px
    min-width 156px
    border-right solid 1px black
    z-index 100
    background-color black
    p
      display flex
      align-items center
      height 100%
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
