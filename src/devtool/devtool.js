import "./inspectorUI";
import Vue from "vue";
import Vuex from "vuex";
import Store from "./model/storeRoot";
import root from "./root.vue";
import MessageManager from "./MessageManager";
import RootModel from "./model/rootModel";

const rc = new Vue(root).$mount("#app");
rc.model = RootModel;
