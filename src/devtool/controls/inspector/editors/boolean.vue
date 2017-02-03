<style lang="stylus">
</style>
<template>
<div class="boolean-editor">
  <input type="checkbox" v-model="attribute.value" v-on:change="changed" ref="checkbox"></input>
</div>
</template>

<script>
export default {
  props:["attribute"],
  methods:{
    changed:function(e){
      const cb = this.$refs.checkbox;
      this.$store.dispatch("changeValue",this.attribute);
    }
  }
}
</script>
