<template lang="html">
  <div class="timeview-label-root">
    <p class="target-label">{{model.target}}</p>
    <p class="component-label"><span>component:</span>{{model.component}}</p>
    <p class="query-label"><span>query:</span>{{model.query}}</p>
    <div class="timeview-labels-container" v-for="label of model.labels" v-if="open">
      <p>{{label.name}}</p>
      <svg height="3" width="100">
        <line x1="0" y1="0" x2="100" y2="0" :stroke="label.color" stroke-width="3"/>
      </svg>
    </div>
  </div>
</template>

<script>
import Point from "./timeline-point.vue";
export default {
    components:{Point},
    props: ["model", "open"]
}
</script>

<style lang="stylus">
  .timeview-label-root
    width 120px
    min-width 120px
    height 100%
    display flex
    flex-direction column
    padding 0 10px
    border-right solid 1px white
    background-color #222
    z-index 100
    .target-label
      font-weight 600
    .component-label
      font-size 10px
      color gray
    .query-label
      font-size 10px
      color gray
    p
      user-select none
    .timeview-labels-container
      display flex
      flex 1
      flex-direction column
</style>
