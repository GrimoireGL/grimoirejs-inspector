import Vue from "vue";
import Vuex from "vuex";
import Store from "./model/storeRoot";
import root from "./root.vue";
import MessageManager from "./MessageManager";

Store.dispatch("reload");
const rc = new Vue(root).$mount("#app");
