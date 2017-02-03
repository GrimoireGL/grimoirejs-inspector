<style lang="stylus">
.vector3-editor
  display flex
  .x
    background-color rgba(255,0,0,0.3)
  .y
    background-color rgba(0,255,0,0.3)
  .z
    background-color rgba(0,0,255,0.3)
  p
    font-weight 600
    margin 0
    padding 0 3px
    color white
    vertical-align middle
  input
    flex-grow 1
    flex-shrink 1
    height 14px
    width 40px
</style>
<template>
<div class="vector3-editor">
  <p class="x">X</p>
  <input type="text" :value="attribute.value[0]"></input>
  <p class="y">Y</p>
  <input type="text" :value="attribute.value[1]"></input>
  <p class="z">Z</p>
  <input type="text" :value="attribute.value[2]"></input>
</div>
</template>

<script>
export default {
  props:["attribute"]
}
</script>
