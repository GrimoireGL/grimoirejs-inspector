<style lang="stylus">
.color3-editor
  display flex
  flex-direction column
  justify-content center
</style>
<template>
<div class="color3-editor">
  <ColorBox v-model="attribute.value" v-on:colorChanged="changed"/>
</div>
</template>

<script>
import ColorBox from "../../common/color-box.vue";
export default {
  props:["attribute"],
  components:{
    ColorBox
  },
  methods:{
    changed:function(v){
      this.$store.dispatch("changeValue",this.attribute);
    }
  }
}
</script>
