import "./inspectorUI";
import Vue from "vue";
import Store from "./model/storeRoot";
import root from "./root.vue";
import MessageManager from "./MessageManager";
import RootModel from "./model/rootModel";
setInterval(()=>{
  MessageManager.call({type:"ping"}).then(a=>{
    console.log(a.result);
  });
},1000);

const rc = new Vue(root).$mount("#app");
rc.model = RootModel;
