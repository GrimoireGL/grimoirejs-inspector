<template lang="html">
  <div class="timeview-chart-root-wrap">
    <div class="animation-popup-container">
      <div class="popup-container-inside" :style="popupContainerStyle" @mousedown.stop>
        <Popup @effectTypeChanged="effectTypeChanged"/>
      </div>
    </div>
  <div class="timeview-chart-root">
    <canvas :style="canvasStyle" ref="chart" class="animation-chart" @wheel.prevent="wheel" @mousemove="move" @mousedown="down" @click="click" @dblclick="dblclick" @contextmenu="contextmenu"/>
    <div class="timeview-chart-points" v-if="expand">
      <div v-for="(value,index) in points">
          <Point :color="value.color" :left="value.left" :top="value.top" :value="value.value" @drag="handleDrag(value,$event)" @click="handleClick(value,$event)" :selected="value.selected" size="4"/>
      </div>
      <components v-if="selectedEffect" :is="selectedEffect.control" :effect="selectedEffect.effect" :p1="selectedEffect.p1" :p2="selectedEffect.p2" :offsetY="offsetY" :scaleY="scaleY" @effectChanged="effectChanged(selectedEffect,$event)"/>
    </div>
  </div>
</div>
</template>

<script>
import TimeLineChartDrawer from "../../animation/TimeLineChartDrawer";
import Point from "./timeline-point.vue";
import LayoutCalculator from "../../animation/LayoutCalculator";
import Effects from "../../animation/Effects";
import Popup from "./popup.vue";
import EffectConfigurators from "../../animation/EffectConfigurators";
import {
    mapState,
    mapMutations
} from "vuex";
export default {
    components: {
        Point,
        Popup
    },
    props: ["expand", "model", "offsetY", "scaleY","active"],
    data() {
        return {
            lastX: 0,
            lastY: 0,
            drag: false,
            onChartLine: false,
            selectedTimelineIndex: -1,
            selectedLineIndex: -1,
            selectedPointIndex: -1,
            popupPosition:[0,0],
            popupOpen:false,
            currentPopupSelection:null
        }
    },
    computed: {
        selectedType(){
          if(this.selectedTimelineIndex === -1){
            return null;
          }else{
            if(this.selectedPointIndex !== -1){
              return "point";
            }
            else{
              return "line";
            }
          }
        },
        canvasStyle() {
            return {
                cursor: (this.onChartLine ? "pointer" : "default"),
                width: "300px",
                height: "400px"
            };
        },
        popupContainerStyle(){
          return {
            left:this.popupPosition[0] + "px",
            top: this.popupPosition[1] + "px",
            display: this.popupOpen ? "block" : "none"
          };
        },
        points() {
            const arr = [];
            for (let i = 0; i < this.model.labels.length; i++) {
                const label = this.model.labels[i];
                const timeline = this.model.timelines[i];
                for (let j = 0; j < timeline.times.length; j++) {
                  let selected = false;
                  if(i === this.selectedTimelineIndex && j === this.selectedPointIndex && this.selectedType === "point"){
                    selected = true;
                  }
                    arr.push({
                        timelineIndex:i,
                        timeline: timeline,
                        index: j,
                        color: label.color,
                        left: LayoutCalculator.timeToScreenX(this.scaleX, this.offsetX, timeline.times[j]),
                        top: LayoutCalculator.valueToScreenY(this.scaleY, this.offsetY, timeline.values[j]),
                        value: timeline.values[j],
                        selected:selected
                    })
                }
            }
            return arr;
        },
        selectedEffect() {
            if (this.selectedTimelineIndex >= 0 && this.selectedLineIndex >= 0) {
                const timeline = this.model.timelines[this.selectedTimelineIndex];
                const effect = timeline.effects[this.selectedLineIndex];
                const effectControl = Effects[this.getType(effect)].optionalControl;
                if (effectControl === null) {
                    return null;
                }
                const p1 = [timeline.times[this.selectedLineIndex], timeline.values[this.selectedLineIndex]];
                const p2 = [timeline.times[this.selectedLineIndex + 1], timeline.values[this.selectedLineIndex + 1]];
                return {
                    control: effectControl,
                    effect: effect,
                    timeline: timeline,
                    index: this.selectedLineIndex,
                    p1: p1,
                    p2: p2
                };
            } else {
                return null;
            }
        },
        ...mapState("animation", ["offsetX", "scaleX"])
    },
    mounted() {
        document.addEventListener("mouseup", (e) => {
            this.drag = false;
        });
        document.addEventListener("mousedown",(e)=>{
            this.popupOpen = false;
        });
        document.addEventListener("keydown",(e)=>{
          if(e.keyCode === 8 || e.KeyCode === 46){
            if(this.active && this.selectedType === "point" && this.selectedPointIndex !== -1){
              const timeline = this.model.timelines[this.selectedTimelineIndex];
              if(this.selectedPointIndex === 0 && timeline.times.length === 1){
                return;
              }
              timeline.times.splice(this.selectedPointIndex,1);
              timeline.values.splice(this.selectedPointIndex,1);
              timeline.effects.splice(this.selectedPointIndex,1);
              this.chartDrawer.redraw();
            }
          }
        });
        document.addEventListener("mousemove", (e) => {
            if (this.drag) {
                const nx = this.offsetX - LayoutCalculator.movementXToTimeDelta(this.scaleX, e.movementX);
                this.setOffsetX(Math.max(0, nx));
                const ny = this.offsetY + LayoutCalculator.movementYToValueDelta(this.scaleY, e.movementY);
                this.$emit("offsetYChanged", ny);
            }
        });
        this.chartDrawer = new TimeLineChartDrawer(this.$refs.chart, this.expand);
        this.chartDrawer.timelines = this.model.timelines;
        this.chartDrawer.labels = this.model.labels;
        this.chartDrawer.cursorHandler = (overCursor) => {
            this.onChartLine = overCursor;
        };
        this.chartDrawer.lineClicked = (args) => {
            this.selectedTimelineIndex = args.timelineIndex;
            this.selectedLineIndex = args.index;
            this.selectedPointIndex = -1;
            if(args.hitTestResult && args.hitTestResult.betweenPoints){
              const result = args.hitTestResult;
              this.chartDrawer.selectLine(result.timelineIndex,result.index);
            }else{
              this.chartDrawer.unselectLine();
            }
        };
        this.$watch("model", () => {
            this.chartDrawer.timelines = this.model.timelines;
            this.chartDrawer.labels = this.model.labels;
            this.chartDrawer.redraw();
        });
        this.$watch("expand", () => {
            this.chartDrawer.expand = this.expand;
            this.chartDrawer.resize();
        });
        this.$watch("offsetX", () => {
            this.chartDrawer.offsetX = this.offsetX;
            this.chartDrawer.redraw();
        }, {
            immediate: true
        });
        this.$watch("scaleX", () => {
            this.chartDrawer.scaleX = this.scaleX;
            this.chartDrawer.redraw();
        }, {
            immediate: true
        });
        this.$watch("offsetY", () => {
            this.chartDrawer.offsetY = this.offsetY;
            this.chartDrawer.redraw();
        }, {
            immediate: true
        });
        this.$watch("active",()=>{
          if(!this.active){
            debugger;
            this.chartDrawer.unselectLine();
            this.selectedLineIndex = -1;
            this.selectedPointIndex = -1;
            this.selectedTimelineIndex = -1;
          }
        })
        this.$watch("scaleY", () => {
            this.chartDrawer.scaleY = this.scaleY;
            this.chartDrawer.redraw();
        }, {
            immediate: true
        });
        this.chartDrawer.resize();
    },
    methods: {
        wheel(e) {
            this.popupOpen = false;
            if (Math.abs(e.deltaX) >= 0.0) {
                const offsetX = Math.max(0, LayoutCalculator.screenXToTime(this.scaleX, 0, e.deltaX) + this.offsetX);
                if (offsetX !== this.offsetX) {
                    this.setOffsetX(offsetX);
                }
            }
            if (Math.abs(e.deltaY) >= 0.0 && this.expand) {
                if (e.ctrlKey) {
                    let scale = this.scaleY;
                    const lastScale = scale;
                    scale *= 1.0 + e.deltaY * 0.01;
                    if (this.scaleY !== scale && scale > 0.001 && scale < 1000) {
                        // const timeDelta = LayoutCalculator.screenXToTime(scale,0,this.lastX)
                        // - LayoutCalculator.screenXToTime(lastScale,0,this.lastX);
                        // this.setOffset(this.offsetX - timeDelta / 2.0)
                        this.$emit("scaleYChanged", scale);
                    }
                } else {
                    const offsetY = LayoutCalculator.movementYToValueDelta(this.scaleY, -e.deltaY) + this.offsetY;
                    if (offsetY !== this.offsetY) {
                        this.$emit("offsetYChanged", offsetY);
                    }
                }
            }
        },
        move(e) {
            this.lastX = e.offsetX;
            this.lastY = e.offsetY;
            this.chartDrawer.mouse = [e.offsetX, e.offsetY];
            this.chartDrawer.redraw();
        },
        down(e) {
            this.drag = true;
        },
        // handlers for dragging point
        handleDrag(val, e) {
            this.activate();
            // move points
            const xdiff = LayoutCalculator.movementXToTimeDelta(this.scaleX, e.movementX);
            if (val.timeline.times[val.index] + xdiff < 0) {
                return;
            }
            // Check the point is between the last point and next one.
            if (e.movementX > 0) {
                if (val.index + 1 < val.timeline.times.length) {
                    if (val.timeline.times[val.index] + xdiff >= val.timeline.times[val.index + 1]) {
                        return;
                    }
                }
            } else {
                if (val.index - 1 >= 0) {
                    if (val.timeline.times[val.index] + xdiff <= val.timeline.times[val.index - 1]) {
                        return;
                    }
                }
            }
            // move point data
            const ydiff = LayoutCalculator.movementYToValueDelta(this.scaleY, e.movementY);
            val.timeline.times.splice(val.index, 1, val.timeline.times[val.index] + xdiff);
            val.timeline.values.splice(val.index, 1, val.timeline.values[val.index] - ydiff);
            // verify effect parameters
            this.adjustMovePoint(val.timeline,val.index);
            this.chartDrawer.redraw();
        },
        handleClick(val,e){
          this.activate();
          this.selectedTimelineIndex = val.timelineIndex;
          this.selectedLineIndex = -1;
          this.selectedPointIndex = val.index;
          this.chartDrawer.unselectLine();
        },
        // check effect parameters are valid after moving points
        adjustMovePoint(timeline,index){
          if (index > 0) { // previous effect
              const effect = timeline.effects[index - 1];
              const type = this.getType(effect);
              if(Effects[type].movePoint){
                Effects[type].movePoint({
                    point: [timeline.times[index], timeline.values[index]],
                    timeline: timeline,
                    effect: effect,
                    previous:true
                });
                // notify array changed
                timeline.effects.splice(index - 1, 1, Object.assign(effect));
              }
          }
          if (index !== timeline.times.length - 1) { // next effect
              const effect = timeline.effects[index];
              const type = this.getType(effect);
              if (Effects[type].movePoint) {
                  Effects[type].movePoint({
                      point: [timeline.times[index], timeline.values[index]],
                      timeline: timeline,
                      effect: effect,
                      previous:false
                  });
                  // notify array changed
                  timeline.effects.splice(index, 1, Object.assign(effect));
              }
          }
        },
        effectChanged(v, e) {
            v.timeline.effects.splice(v.index, 1, e);
            this.chartDrawer.redraw();
        },
        click(e) {
            this.chartDrawer.onClick();
            this.activate();
        },
        contextmenu(e){
          e.preventDefault();
          this.activate();
          this.chartDrawer.onClick();
          const result = this.chartDrawer.hitTest(e.offsetX,e.offsetY);
          if(result && result.betweenPoints){
            this.popupPosition = [result.screenX/2,result.screenY/2];
            this.popupOpen = true;
            this.currentPopupSelection = {
              timeline:result.timeline,
              index:result.index
            };
          }
        },
        dblclick(e){
          this.activate();
          const result = this.chartDrawer.hitTest(e.offsetX,e.offsetY);
          if(result){
            let insertIndex = -1;
            if(result.betweenPoints){
              insertIndex = result.index + 1;
            }else{
              if(result.index === 0){
                insertIndex = 0;
              }else{
                insertIndex = result.timeline.times.length;
              }
            }
            result.timeline.times.splice(insertIndex,0,result.time);
            result.timeline.values.splice(insertIndex,0,result.value);
            result.timeline.effects.splice(insertIndex,0,{});
            this.adjustMovePoint(result.timeline,insertIndex);
            if(insertIndex !== 0){
              this.adjustMovePoint(result.timeline,insertIndex - 1);
            }
            this.chartDrawer.redraw();
          }
        },
        getType(effect) {
            if (!effect || !effect.type) {
                return "LINEAR";
            }
            return effect.type;
        },
        effectTypeChanged(type){
          const selections = this.currentPopupSelection;
          const i = selections.index;
          const timeline = selections.timeline;
          const ne = EffectConfigurators[type]({
            current:[timeline.times[i],timeline.values[i]],
            next:[timeline.times[i + 1],timeline.values[i + 1]]
          });
          timeline.effects.splice(selections.index,1,ne);
          this.chartDrawer.redraw();
        },
        activate(){
          this.$emit("activate");
        },
        ...mapMutations("animation", ["setOffsetX"])
    }
}
</script>

<style lang="stylus">
  .timeview-chart-root-wrap
    position relative
    width 100%
    height 100%
    flex 1
    .timeview-chart-root
      position relative
      height 100%
      width 100%
      overflow-x hidden
      overflow-y hidden
      canvas
        user-select none
        background-color #222
    .timeview-chart-points
      position absolute
      top 0px
      left 0px
      .point-container
        position absolute
    .animation-popup-container
      position relative
      z-index 100000
      .popup-container-inside
        position absolute
        width 10px
        height 10px
</style>
