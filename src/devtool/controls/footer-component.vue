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
    <span class="icon-embed2" v-on:click="toggle"></span>
    <span v-for="(item,index) in labels">
      <TabItem :index="index" :name="item"/>
    </span>
</div>
</template>

<script>
import {
    mapState
} from "vuex";
import TabItem from "./footer/tabitem.vue";

export default {
    components: {
        TabItem: TabItem
    },
    computed: mapState(["labels"]),
    methods: {
        toggle() {
            // TODO show something context menu to select
            if (this.$store.state.currentTab === "Node") {
                this.$store.commit("setCurrentTab", "Animation");
            } else {
                this.$store.commit("setCurrentTab", "Node");
            }
        }
    }
}
</script>
