<style lang="stylus">
  p.container-context-notfound
    font-size:24px;
    font-weight:bold;
    color:dimgray;
    text-align:center;
    padding-top:32px;
div.hierarchy-container span
  padding:0
  margin:0
div.hierarchy-container p
  padding:0
  margin:0
</style>

<template>
  <div class="hierarchy-container">
    <Node :node="rootNode" layer="0"/>
  </div>
</template>

<script>
  import Node from "./container/node.vue";

  export default {
    components:{
      Node:Node
    },
    props:["rootNode","model"],
    data: function() {
        return {

        }
    }
  }
</script>
