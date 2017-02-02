import vuex from "vuex";
import vue from "vue";
import MessageManager from "../MessageManager";
vue.use(vuex);

function toLabel(goml) {
    let result = ""
    result += goml.id !== "" ? "#" + goml.id : "";
    result += goml.className !== "" ? "." + goml.className : "";
    if (result === "") {
        result = "(NONAME)";
    }
    return result;
}
const store = new vuex.Store({
    state: {
        gomls: [],
        labels: [],
        inspected: {},
        tree:null,
        activeGomlIndex:-1,
        contextLoaded:false,
        currentNode:null
    },
    mutations: {
        addGoml(state, gomlInfo) {
            state.gomls = state.gomls.concat([gomlInfo]);
            state.labels = state.labels.concat([toLabel(gomlInfo)]);
            if(state.gomls.length === 1){
              store.dispatch("selectGoml",0);
            }
        },
        setSelectedGoml(state,index){
          state.activeGomlIndex = index;
        },
        setCurrentNode(state,nodeInfo){
          state.currentNode = nodeInfo;
        },
        setCurrentTree(state,tree){
          state.tree = tree;
        },
        contextLoaded(state){
          state.contextLoaded = true;
        },
        reset(state) {
            state.gomls = [];
            state.labels = [];
            state.activeGomlIndex = -1;
            state.contextLoaded = false;
        }
    },
    actions:{
      async selectGoml(context,index){
        const gomlId = context.state.gomls[index].key;
        const result = await MessageManager.call({
          type:"fetch-tree",
          key:gomlId
        });
        await context.dispatch("selectNode",gomlId);
        context.commit("setCurrentTree",result.root);
        context.commit("setSelectedGoml",index);
        context.commit("contextLoaded");
      },
      async selectNode(context,nodeId){
        const result = await MessageManager.call({
          type:"fetch-node",
          key:nodeId
        });
        context.commit("setCurrentNode",result.node);
      }
    }
});

export default store;
