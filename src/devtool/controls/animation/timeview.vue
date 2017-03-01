<template lang="html">
  <div :class="{'time-view-root':true,'expand':open}">
    <Expander v-model="open"/>
    <TimeViewLabel :model="model" :open="open"/>
    <Chart :expand="open"/>
  </div>
</template>

<script>
import Expander from "./timeview-expander.vue";
import TimeViewLabel from "./timeview-label.vue";
import Chart from "./timeview-chart.vue";
export default {
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
        ]
      }
    };
  },
  components:{
    Expander,
    TimeViewLabel,
    Chart
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
