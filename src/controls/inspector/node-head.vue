<style lang="stylus">
  .node-head-container
    border-bottom: solid 2px gray;
    & h1
      color:#6DAFC4
      font-size:16px
      margin:10px 20px
      padding: 0
      letter-spacing:0px
      word-spacing:0px
  .node-head-suffix
    color:#A87C6B
    font-weight:400
</style>
<template>
<div class="node-head-container">
    <h1>
      <span>&lt;{{tagName}}<span class="node-head-suffix"><span v-if="haveId">#{{id}}</span><span v-if="haveClass">.{{className}}</span></span>&gt;</span>
    </h1>
</div>
</template>

<script>
export default {
    props: ["tagName","id","className"],
    computed:{
      haveId:function(){
        return this.id !== "" && !!this.id;
      },
      haveClass:function(){
        return this.className !== "" && !!this.className;
      }
    }
}
</script>
