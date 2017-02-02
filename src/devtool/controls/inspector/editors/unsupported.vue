<style lang="stylus">
  .unsupported-editor
    display flex
    text-align center
    justify-content center
    flex-direction column
    p
      color yellow
</style>
<template>
<div class="unsupported-editor">
  <p>Unsupported type</p>
</div>
</template>

<script>
export default {
  props:["attribute"]
}
</script>
