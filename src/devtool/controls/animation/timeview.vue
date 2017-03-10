<template lang="html">
  <div :class="{'time-view-root':true,'expand':open}">
    <Expander v-model="open"/>
    <TimeViewLabel :model="model" :open="open"/>
    <Chart :expand="open" :offsetX="offsetX" :scale="scale" :model="model" v-on:offsetXChanged="offsetXChanged" v-on:scaleChanged="scaleChanged"/>
  </div>
</template>

<script>
import Expander from "./timeview-expander.vue";
import TimeViewLabel from "./timeview-label.vue";
import Chart from "./timeview-chart.vue";
export default {
  props:["offsetX","scale"],
  data(){
    return {
      open:false,
      model:{
        name:"Test Property",
        labels:[
          {
            name:"X",
            color:"#FF0000"
          },
          {
            name:"Y",
            color:"#00FF00"
          },
          {
            name:"Z",
            color:"#0000FF"
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
            effects:[{type:"BEZIER",control:[100,100,200,40]},{},{}]
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
      }
    };
  },
  components:{
    Expander,
    TimeViewLabel,
    Chart
  },
  methods:{
    offsetXChanged(v){
      this.$emit("offsetXChanged",v);
    },
    scaleChanged(v){
      this.$emit("scaleChanged",v);
    }
  },
  mounted(){
    this.$watch("open",function(){
      this.$emit("expandChanged");
    })
  }
}
</script>

<style lang="stylus">
  .time-view-root
    display flex
    height 15px
    background-color dimgray
    border-bottom solid 1px black
    &.expand
      height 200px
</style>
