<template lang="html">
  <div :class="{'time-view-root':true,'expand':open}">
    <Expander v-model="open"/>
    <TimeViewLabel :model="model" :open="open"/>
    <Chart :expand="open" :active="active" :model="model" :offsetY="offsetY" :scaleY="scaleY" @offsetYChanged="offsetYChanged" @scaleYChanged="scaleYChanged" @activate="activate"/>
  </div>
</template>

<script>
import Expander from "./timeview-expander.vue";
import TimeViewLabel from "./timeview-label.vue";
import Chart from "./timeview-chart.vue";
import {mapState} from "vuex";
export default {
  props:["active"],
  data(){
    return {
      open:false,
      model:{
        target:"Test Property",
        query:"#AAA",
        component:"Transform",
        labels:[
          {
            name:"X",
            color:"#8E0F0F"
          },
          {
            name:"Y",
            color:"#0F8E0F"
          },
          {
            name:"Z",
            color:"#0F0FBE"
          },
          {
            name:"W",
            color:"#999999"
          }
        ],
        timelines:[
          {
            times:[100,200,300,400],
            values:[10,80,-10,120],
            effects:[{type:"BEZIER",control:[100,100,180,40]},{},{}]
          },
          {
            times:[100,200,300,400],
            values:[30,-80,120,20],
            effects:[{type:"LINEAR"},{},{}]
          },
          {
            times:[100,200,300,400],
            values:[300,-80,420,120],
            effects:[{type:"LINEAR"},{},{}]
          },
          {
            times:[100,200,300,400],
            values:[120,-30,900,1200],
            effects:[{type:"LINEAR"},{},{}]
          }
        ]
      },
      offsetY:0,
      scaleY:1
    };
  },
  components:{
    Expander,
    TimeViewLabel,
    Chart
  },
  mounted(){
    this.$watch("open",function(){
      this.$emit("expandChanged");
    })
  },
  methods:{
    offsetYChanged(v){
      this.offsetY = v;
    },
    scaleYChanged(v){
      this.scaleY = v;
    },
    activate(){
      this.$emit("activate");
    }
  }
}
</script>

<style lang="stylus">
  .time-view-root
    display flex
    height 45px
    background-color #222
    border-bottom solid 1px #6DAFC4
    &.expand
      height 200px
</style>
