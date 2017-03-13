<template lang="html">
  <div class="nodebox-root" v-on:click.stop="showPopup">
    <div class="label-container">
      <p class="nodebox-value-label">{{value}}</p>
    </div>
    <div class="popup-container-outline" :style="containerStyle">
      <div class="popup-container-inline">
        <input type="text" v-model="query" placeholder="Query"/>
        <div class="candidate-list">
          <p v-for="v in nodes"><span>&lt;{{v.tagName}}<span class="node-head-suffix"><span v-if="v.id">#{{v.id}}</span><span v-if="v.className">.{{v.className}}</span></span>&gt;</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MessageManager from "../../MessageManager";
export default {
  props:["value"],
  data(){
    return {
      show:false,
      nodes:[],
      query:""
    };
  }
  ,
  computed:{
    containerStyle(){
      return {
        display: this.show ? "block" : "none"
      }
    }
  },
  methods:{
    showPopup(){
      this.show = true;
    },
    queryNodes(q){
      const rootKey = this.$store.getters.currentRootKey;
      MessageManager.call({
        type:"query-nodes",
        rootKey:rootKey,
        query:q
      }).then(v=>{
        const arr = [];
        for(let key in v){
          const n = new Number(key);
          if(!isNaN(n)){
            arr.push(v[key]);
          }
        }
        this.nodes = arr;
      });
    }
  },
  mounted(){
    document.addEventListener("click",()=>{
      this.show = false
    });
    this.$watch("query",()=>{
      this.queryNodes(this.query ? this.query : "*");
    })
    this.queryNodes("*")
  }
}
</script>

<style lang="stylus">
  .nodebox-root
    height 100%
    display flex
    flex-direction column
    justify-content center
    width 120px
    .label-container
      margin 3px 0px
      border 1px solid white
    .nodebox-value-label
      display flex
      height 100%
      align-items center
    .popup-container-outline
      position relative
      z-index 10000
      .popup-container-inline
        position absolute
        background-color dimgray
        .candidate-list
          max-height 140px
          overflow-y scroll
</style>
