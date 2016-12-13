<style lang="stylus">
  .dg.a
    margin-right: 0px !important;
  .close-button
    display:none
</style>

<template>
<div>
    <NodeHead :tagName="nodeModel.nodeName" :id="nodeModel.id" :className="nodeModel.className" />
    <div ref="inspector">
    </div>
</div>
</template>

<script>
import NodeHead from "./inspector/node-head.vue";
import NodeComponent from "./inspector/node-component.vue";
import InspectorUI from "../inspectorUI";
import AttributeController from "./inspector/AttributeController";
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
    mounted:function(){
     this.$refs.inspector.appendChild(InspectorUI.domElement);
    },
    updated:function(){
      InspectorUI.removeAllFolder();
      const components = this.nodeModel.components;
      for(let i = 0; i < components.length; i++){
        const c = components[i];
        const f = InspectorUI.addFolder(c.name);
        f.closed = false;
        AttributeController.set(f,c.attributes);
      }
    }
}
</script>
