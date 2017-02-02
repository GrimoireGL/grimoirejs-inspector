<style lang="stylus">
</style>
<template>
<div class="boolean-editor">
  <input type="checkbox" :checked="attribute.value"></input>
</div>
</template>

<script>
export default {
  props:["attribute"]
}
</script>
