<style lang="stylus">
  .node-attribute-header-container
    padding 3px 3px
    border-top #888 solid 1px
    display flex
    justify-content space-between;
    & p
      color:white
      font-size:10px
      padding: 0
      letter-spacing:0px
      word-spacing:0px
      margin 0px 5px
      font-weight 700
    .converter
      color #AAA
      font-weight 400
      font-size smaller
      &:before
        content:" "
    &.grow
      flex-grow:1
      -webkit-flex-grow:1
</style>
<template>
<div class="node-attribute-container">
    <div class="node-attribute-header-container">
        <div>
        <p>{{attribute.name}}</p>
        <p class="converter">({{attribute.converter}})</p>
      </div>
        <component :is="editor" :attribute="attribute"/>
    </div>
</div>
</template>

<script>
import EditorFinder from "./editors/EditorFinder";
export default {
    props: ["attribute"],
    computed:{
        editor:function(){
          return EditorFinder(this.attribute.converter);
        }
    }
}
</script>
