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
  width:240px
  border-left: 1px solid gray;
  height:100%
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
</style>

<template>
<div class="root-container">
    <div class="root-main">
        <div class="container">
            <div class="container-main">
                <p class="container-context-notfound" v-if="!model.contextLoaded">Grimoire.js context was not found.</p>
                <Container :rootNode="model.currentNodes" :model="model" v-else/>
            </div>
            <div class="container-side">
                <Inspector :nodeModel="model.nodeModel"/>
            </div>
        </div>
    </div>
    <div class="root-footer">
        <FooterComponent :model="model"/>
    </div>
</div>
</template>

<script>
import FooterComponent from "./controls/footer-component.vue";
import Container from "./controls/container.vue";
import Inspector from "./controls/inspector.vue";

export default {
    props:{},
    components: {
        FooterComponent: FooterComponent,
        Container: Container,
        Inspector: Inspector
    },
    data: function() {
        return {
            model:{}
        }
    }
}
</script>
