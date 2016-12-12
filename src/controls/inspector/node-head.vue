<style lang="stylus">
  .node-head-container
    border-bottom: solid 2px gray;
    & h1
      color:#6DAFC4
      font-size:16px
      margin:10px 20px
      padding: 0
</style>
<template>
  <div class="node-head-container">
    <h1>
      <span>&lt;</span>
      {{nodeName}}
      <span>&gt;</span>
    </h1>
  </div>
</template>

<script>
export default {
    props: ["nodeName"]
}
</script>
