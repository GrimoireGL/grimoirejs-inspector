<style lang="stylus">
  .node-head-container
    border-bottom: solid 2px gray;
    & p
      color:#6DAFC4
      font-size:16px
      margin:10px 20px
      padding: 0
      letter-spacing:0px
      word-spacing:0px
</style>
<template>
<div class="node-attribute-container">
  <p>{{attribute.name}}</p>
</div>
</template>

<script>
export default {
    props: ["attribute"]
}
</script>
