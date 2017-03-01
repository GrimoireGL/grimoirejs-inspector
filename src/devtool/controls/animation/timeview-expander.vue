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
    height 100%
    p:hover
      cursor pointer
      user-select none
</style>
