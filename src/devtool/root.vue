<style lang="stylus">
.container
  display:flex
  height:100%;
.container-main
  flex:1
  height:100%
  max-height:100%
  overflow:auto
.container-side
  width:245px
  border-left: 1px solid gray
  height:100%
  max-height:100%
  overflow:auto
.root-container
  height:100%
.root-main
  height:calc(100% - 16px);
.root-footer
  border-top: 1px solid gray;
  height:16px
p.container-context-notfound
  font-size:24px;
  font-weight:bold;
  color:dimgray;
  text-align:center;
  padding-top:32px;
div
  margin:0px
  padding:0px
input
  outline 0
  border:solid 1px #888;
  -moz-box-shadow: inset 0 0 4px rgba(0,0,0,0.2);
  -webkit-box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.2);
  box-shadow: inner 0 0 4px rgba(0, 0, 0, 0.2);
  background-color dimgray
  color white
  padding 0 2px
  font-size 10px
  &:focus
    border:solid 1px #EEA34A;

.container-component-root
  height 100%
</style>

<template>
<div class="root-container">
    <div class="root-main">
        <div class="container">
            <div class="container-main">
                <p class="container-context-notfound" v-if="!contextLoaded">Grimoire.js context was not found.</p>
                <div v-else class="container-component-root">
                    <NodeTab v-if="nodeTab"/>
                    <AnimationTab v-if="animationTab"/>
                </div>
            </div>
            <div class="container-side">
                <Inspector />
            </div>
        </div>
    </div>
    <div class="root-footer">
        <FooterComponent/>
    </div>
</div>
</template>

<script>
import FooterComponent from "./controls/footer-component.vue";
import NodeTab from "./controls/node-tab.vue";
import Inspector from "./controls/inspector.vue";
import storeRoot from "./model/storeRoot";
import AnimationTab from "./controls/animation/animation-tab.vue";
import {
    mapState
} from "vuex";
export default {
    props: {},
    store: storeRoot,
    components: {
        FooterComponent,
        Inspector,
        NodeTab,
        AnimationTab
    },
    computed: {
        ...mapState(["contextLoaded", "currentTab"]),
        nodeTab: function() {
            return this.currentTab === "Node";
        },
        animationTab: function() {
            return this.currentTab === "Animation";
        }
    }
}
</script>
