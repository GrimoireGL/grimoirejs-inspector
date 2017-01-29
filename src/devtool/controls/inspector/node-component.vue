<style lang="stylus">
  .node-component-container
    border-bottom: solid 2px gray;
    & h2
      color:#6DAFC4
      font-weight:300
      font-size:12px
      margin:5px 20px
      padding: 0
</style>

<template>
  <div class="node-component-container">
    <h2>
      {{cModel.name}}
    </h2>
    <div v-for="attr in cModel.attributes">
      <NodeAttribute :attribute="attr"/>
    </div>
  </div>
</template>

<script>
import NodeAttribute from "./node-attribute.vue";
export default {
    components:{
      NodeAttribute:NodeAttribute
    },
    props: ["cModel"]
}
</script>
