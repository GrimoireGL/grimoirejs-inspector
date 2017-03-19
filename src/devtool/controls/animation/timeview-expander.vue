<template lang="html">
  <div class="timeview-expander">
    <p v-if="open" v-on:click="toggle">▼</p>
    <p v-else  v-on:click="toggle">▶︎</p>
  </div>
</template>

<script>
export default {
    props: ["name","value"],
    computed:{
      open(){
        return this.value;
      }
    },
    methods: {
        toggle() {
          this.$emit("input",!this.open);
        }
    }
}
</script>

<style lang="stylus">
  .timeview-expander
    position relative
    height 100%
    width 16px
    z-index 100
    background-color #222
    p
      user-select none
    p:hover
      cursor pointer
      user-select none
</style>
