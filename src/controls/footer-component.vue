<style lang="stylus">
span.icon-embed2
  color:white
  line-height:16px
  height:16px
  border-right:solid 1px gray;
  padding-right:5px;
  padding-left:5px;
div.footer-container
  height:16px
  margin:0
  padding:0
p
  height:16px
  margin:0
  padding:0
</style>

<template>
<div class="footer-container">
    <span class="icon-embed2"></span>
    <span v-for="(item,index) in model.treeLabels">
      <TabItem :index="index" :name="item"/>
    </span>
</div>
</template>

<script>
import TabItem from "./footer/tabitem.vue";

export default {
    props: ["model"],
    components: {
        TabItem: TabItem
    },
    data: function() {
        return {}
    }
}
</script>
