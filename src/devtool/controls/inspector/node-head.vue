<style lang="stylus">
  .node-head-container
    border-bottom: solid 2px gray;
    & h1
      color:#6DAFC4
      font-size:16px
      margin:10px 20px
      padding: 0
      letter-spacing:0px
      word-spacing:0px
  .node-head-suffix
    color:#A87C6B
    font-weight:400
</style>
<template>
<div class="node-head-container">
    <h1>
      <span>&lt;{{tagName}}<span class="node-head-suffix"><span v-if="haveId">#{{id}}</span><span v-if="haveClass">.{{className}}</span></span>&gt;</span>
    </h1>
    <!-- <Chrome value="test"  @change-color="onChange"/> -->
</div>
</template>

<script>
import {Chrome} from "vue-color";
export default {
    props: ["tagName","id","className"],
    computed:{
      haveId:function(){
        return this.id !== "" && !!this.id;
      },
      haveClass:function(){
        return this.className !== "" && !!this.className;
      }
    },
    components:{
      Chrome
    },
    data:function(){
      let test = {
        colors:{
          hex:"#FF0000",
          rgba:{
            r:255,
            g:0,
            b:0,
            a:1
          },
          a:1
        }
      };
      return {
        test
      }
    },
    methods:{
      onChange:function(v){
        console.log(v);
      }
    }
}
</script>
