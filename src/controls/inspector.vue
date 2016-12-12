<style>

</style>

<template>
<div>
    <NodeHead :nodeName="nodeModel.nodeName" />
    <div v-for="c in nodeModel.components">
      <NodeComponent :cModel="c"/>
    </div>
</div>
</template>

<script>
import NodeHead from "./inspector/node-head.vue";
import NodeComponent from "./inspector/node-component.vue";
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
    }
}
</script>
