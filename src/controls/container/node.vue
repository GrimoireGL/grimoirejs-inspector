<style lang="stylus">
div.container-node-indent
  margin-left:16px
p.node-tag
  color:#6B9DB2
  letter-spacing:0px
  white-space:nowrap
  &:hover
    background-color:#704D35
</style>
<template>
<div>
    <p class="node-tag" v-on:click="toggle">
        <span>&lt;</span>
        <span>{{node.tagName}}</span>
        <Attribute keyName="id" :value="node.id"/>
        <Attribute keyName="class" :value="node.className"/>
        <span v-if="!hasChild ">/</span>
        <span>&gt;</span>
        <span v-if="!open && hasChild">
          <span>...</span>
          <span>&lt;</span>
          <span>/</span>
          <span>{{node.tagName}}</span>
          <span>&gt;</span>
        </span>
    </p>
    <div class="container-node-indent" v-if="hasChild && open">
      <div v-for="child in node.children">
        <Node :node="child" :layer="childLayer" :model="model"/>
      </div>
    </div>
    <p v-if="hasChild && open" class="node-tag" v-on:click="toggle">
        <span>&lt;</span>
        <span>/</span>
        <span>{{node.tagName}}</span>
        <span>&gt;</span>
    </p>
</div>
</template>

<script>
import Attribute from "./attribute.vue";
export default {
    name: "Node",
    props: ["model","node","layer"],
    components:{
      Attribute:Attribute
    },
    data: function() {
        return {
          open: this.layer<=2
        }
    },
    computed: {
        hasChild: function() {
            return !!this.node && !!this.node.children && this.node.children.length > 0;
        },
        childLayer:function(){
          return this.layer + 1;
        }
    },
    methods:{
      toggle:function(){
        this.open = !this.open;
        this.model.nodeModel.selectNode(this.node.key);
      }
    }
}
</script>
