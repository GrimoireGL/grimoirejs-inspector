<style lang="stylus">
.number-editor
  display flex
  flex-direction column
  justify-content center
</style>
<template>
<div class="number-editor">
  <input type="text" v-model="attribute.value" v-on:change="changed"></input>
</div>
</template>

<script>
export default {
  props:["attribute"],
  methods:{
    changed:function(e){
      this.$store.dispatch("changeValue",this.attribute);
    }
  }
}
</script>
