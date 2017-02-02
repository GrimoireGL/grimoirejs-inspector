<style lang="stylus">
  .node-attribute-header-container
    background-color:lightgray;
    display flex;
    justify-content space-between;
    & p
      color:dimgray
      font-size:10px
      padding: 0
      letter-spacing:0px
      word-spacing:0px
      margin 0px 5px
    &.grow
      flex-grow:1
      -webkit-flex-grow:1
</style>
<template>
<div class="node-attribute-container">
    <div class="node-attribute-header-container">
        <p>{{attribute.name}}</p>
        <p class="grow"></p>
        <p>{{attribute.converter}}</p>
    </div>
    <component :is="editor"/>
</div>
</template>

<script>
import EditorFinder from "./editors/EditorFinder";
export default {
    props: ["attribute"],
    data:function(){
      return {
        editor:EditorFinder(this.attribute.converter)
      }
    }
}
</script>
