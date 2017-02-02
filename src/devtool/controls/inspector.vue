<style lang="stylus">
  .dg.a
    margin-right: 0px !important;
  .close-button
    display:none
</style>

<template>
<div>
  <div v-if="nodeSelected">
      <NodeHead :tagName="currentNode.nodeName" :id="currentNode.id" :className="currentNode.className" />
      <div class="components-container" v-for="component in currentNode.components">
        <div class="component-wrap">
          <NodeComponent :component="component"/>
        </div>
      </div>
  </div>
</div>
</template>

<script>
import NodeHead from "./inspector/node-head.vue";
import NodeComponent from "./inspector/node-component.vue";
import InspectorUI from "../inspectorUI";
import {mapState} from "vuex";
export default {
    props: {
        nodeModel: {
            default: function() {
                return {};
            }
        }
    },
    components: {
        NodeHead: NodeHead,
        NodeComponent:NodeComponent
    },
    data: function() {
        return {

        }
    },
    computed:{
      nodeSelected:function(){
        return !!this.$store.state.currentNode;
      },
      ...mapState(["currentNode"])},
    mounted:function(){
     //this.$refs.inspector.appendChild(InspectorUI.domElement);
    },
    updated:function(){
      // InspectorUI.removeAllFolder();
      // const components = this.nodeModel.components;
      // AttributeController.set(components);
    }
}
</script>
