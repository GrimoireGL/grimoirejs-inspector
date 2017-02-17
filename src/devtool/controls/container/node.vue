<style lang="stylus">
div.container-node-indent
  margin-left:16px
p.node-tag
  color:#6B9DB2
  letter-spacing:0px
  white-space:nowrap
  &:hover
    background-color:#704D35
span.node-tag-expander
  cursor:pointer
  color:dimgray
  font-size:10px
span.node-expander-points
  cursor:pointer
  color:dimgray
  font-size:10px
p.selected-node-highlight
  font-weight 800
  background-color:#454545
</style>
<template>
<div class="container-node-indent" v-on:click="select">
    <p :class="{'node-tag':true,'selected-node-highlight':isSelected}">
        <span class="node-tag-expander" v-on:click="toggle" v-if="!open && hasChild">▶︎</span>
        <span class="node-tag-expander" v-on:click="toggle" v-if="open && hasChild">▼</span>
        <span>&lt;{{node.tagName}}</span>
        <Attribute keyName="id" :value="node.id" />
        <Attribute keyName="class" :value="node.className" />
        <span v-if="!hasChild ">/&gt;</span>
        <span v-else>&gt;</span>
        <span v-if="!open && hasChild">
            <span class="node-expander-points" v-on:click="toggle">...</span>
        <span>&lt;/{{node.tagName}}&gt;</span>
        </span>
    </p>
    <div v-if="hasChild && open">
        <div v-for="child in node.children">
            <Node :node="child" :layer="childLayer" />
        </div>
    </div>
    <p v-if="hasChild && open" :class="{'node-tag':true,'selected-node-highlight':isSelected}">
        <span>&lt;/{{node.tagName}}&gt;</span>
    </p>
</div>
</template>

<script>
import Attribute from "./attribute.vue";
import RootModel from "../../model/rootModel";
import {mapGetters} from "vuex";
export default {
    name: "Node",
    props: ["node", "layer"],
    components: {
        Attribute: Attribute
    },
    data: function() {
        return {
            open: this.layer <= 2
        }
    },
    computed: {
        hasChild: function() {
            return !!this.node && !!this.node.children && this.node.children.length > 0;
        },
        childLayer: function() {
            return this.layer + 1;
        },
        isSelected:function(){
          return this.node.key === this.currentNodeId;
        },
        ...mapGetters(["currentNodeId"])
    },
    methods: {
        toggle: function(e) {
            e.stopPropagation();
            this.open = !this.open;
        },
        select: function(e) {
            e.stopPropagation();
            this.$store.dispatch("selectNode",this.node.key);
        }
    }
}
</script>
