<style lang="stylus">
.number-editor
  display flex
  flex-direction column
  justify-content center
</style>
<template>
<div class="number-editor">
  <input type="text" :value="attribute.value"></input>
</div>
</template>

<script>
export default {
  props:["attribute"]
}
</script>
