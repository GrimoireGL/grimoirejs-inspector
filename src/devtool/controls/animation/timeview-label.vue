<template lang="html">
  <div class="timeview-label-root">
    <p>{{model.name}}</p>
    <div class="timeview-labels-container">
      <p v-for="label of model.labels" v-if="open">{{label.name}}
        <Point :color="label.color"/>
      </p>
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
    border-right solid 1px black
    background-color dimgray
    .timeview-labels-container
      display flex
      flex 1
      flex-direction column
      justify-content space-between
</style>
