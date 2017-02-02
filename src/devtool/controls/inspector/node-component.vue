<style lang="stylus">
  .node-component-container
    border-bottom: solid 2px gray;
    & h2
      font-size:10px
      margin:1px 5px
      padding: 0
      > span.name
        color:lightgray
        font-weight:800
    .toggle
      color: white
      &:hover
        cursor:pointer
</style>

<template>
  <div class="node-component-container">
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
    <div v-for="attr in component.attributes" v-if="open">
      <NodeAttribute :attribute="attr"/>
    </div>
  </div>
</template>

<script>
import NodeAttribute from "./node-attribute.vue";
export default {
    components:{
      NodeAttribute:NodeAttribute
    },
    props: ["component"],
    data:()=>{
      return {
        open:true
      };
    },
    methods:{
      toggle: function(e) {
          e.stopPropagation();
          this.open = !this.open;
      }
    }
}
</script>
