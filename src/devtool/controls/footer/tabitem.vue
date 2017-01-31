<style lang="stylus">
span.footer-tabitem
  color:white
  font-size:11px;
  height:16px;
  line-height:16px;
  &.active
    background-color:rgb(199, 134, 38);
    color:#040201
    cursor:pointer
  &:hover
    background-color:rgb(179, 114, 18);
    color:#040201
    cursor:pointer

</style>

<template>
<span class="footer-tabitem" v-bind:class="{active:isActive}" v-on:click="toggle">
    <span>&nbsp;</span>
{{name}}
<span>&nbsp;</span>
<span>
</template>

<script>
import RootModel from "../../model/rootModel";
export default {
    props: ["name", "index"],
    computed: {
        isActive: function() {
          return this.$store.state.activeGomlIndex === this.index;
        }
    },
    methods:{
      toggle:function(){
        RootModel.setCurrentNode(this.index);
      }
    }
};
</script>
