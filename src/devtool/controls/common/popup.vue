<template lang="html">
  <div class="relative-container">
    <div class="absolute-container">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="stylus">
  .relative-container
    position relative
    .absolute-container
      position absolute
</style>
