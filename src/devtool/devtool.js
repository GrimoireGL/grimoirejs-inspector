import "./inspectorUI";
import Vue from "vue";
import root from "./root.vue";
import MessageObserver from "./MessageObserver";
import RootModel from "./model/rootModel";
const rc = new Vue(root).$mount("#app");
rc.model = RootModel;
