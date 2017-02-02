<style lang="stylus">
  .node-component-container
    border-bottom: solid 2px gray;
    & h2
      font-size:10px
      padding:1px 5px
      margin:0
      padding: 0
      > span.name
        color:black
        font-weight:800
    .toggle
      color: black
      font-size smaller
      &:hover
        cursor:pointer
    .component-head-container
      background-color lightgray
</style>

<template>
<div class="node-component-container">
    <div class="component-head-container">
    <h2>
      <span class="toggle" v-on:click="toggle">
        <span v-if="open">▼</span>
        <span v-else>▶︎</span>
      </span>
      <span class="enabled">
      </span>
      <span class="name">
        {{component.name}}
      </span>
    </h2>
    </div>
    <div v-for="attr in component.attributes" v-if="open">
        <NodeAttribute :attribute="attr" />
    </div>
</div>
</template>

<script>
import NodeAttribute from "./node-attribute.vue";
export default {
    components: {
        NodeAttribute: NodeAttribute
    },
    props: ["component"],
    data: () => {
        return {
            open: true
        };
    },
    methods: {
        toggle: function(e) {
            e.stopPropagation();
            this.open = !this.open;
        }
    }
}
</script>
