import vuex from "vuex";
import vue from "vue";
import MessageManager from "../MessageManager";
vue.use(vuex);

let attributeCache = {};

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
        tree:null,
        activeGomlIndex:-1,
        contextLoaded:false,
        currentNode:null
    },
    mutations: {
        addGoml(state, gomlInfo) {
            state.gomls = state.gomls.concat([gomlInfo]);
            state.labels = state.labels.concat([toLabel(gomlInfo)]);
            if(state.gomls.length === 1){ // if new tree is first one.
              store.dispatch("selectGoml",0);
            }
        },
        setSelectedGoml(state,index){
          state.activeGomlIndex = index;
        },
        setCurrentNode(state,nodeInfo){
          state.currentNode = nodeInfo;
          attributeCache = {};
          for(let componentName in nodeInfo.components)
          {
              const componentInfo = nodeInfo.components[componentName];
              for(let attributeName in componentInfo.attributes)
              {
                const attrInfo = componentInfo.attributes[attributeName];
                attributeCache[attrInfo.id] = attrInfo;
              }
          }
        },
        setAttributeChanges(state,attributes){
          for(let i = 0; i < attributes.length; i++){
            const change = attributes[i];
            attributeCache[change.id].value = change.value;
          }
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
            state.tree = null;
            state.currentNode = null;
        }
    },
    getters:{
      currentNodeId:function(state){
        if(state.currentNode === null){
          return null;
        }
        return state.currentNode.nodeId;
      }
    },
    actions:{
      async selectGoml(context,index){
        const gomlId = context.state.gomls[index].key;
        const result = await MessageManager.call({
          type:"fetch-tree",
          key:gomlId
        });
        context.commit("setCurrentTree",result.root);
        context.commit("setSelectedGoml",index);
        context.commit("contextLoaded");
        context.dispatch("selectNode",gomlId);
      },
      async selectNode(context,nodeId){
        const result = await MessageManager.call({
          type:"fetch-node",
          key:nodeId
        });
        result.node.nodeId = nodeId;
        context.commit("setCurrentNode",result.node);
      },
      async changeValue(context,attribute){
        await MessageManager.post({
          type:"attribute-change",
          model:attribute
        });
      },
      async reload(context){
        context.commit("reset");
        MessageManager.post({
            type: "sync-devtool"
        });
      }
    }
});

MessageManager.on("attribute-changed",(v)=>{
  store.commit("setAttributeChanges",v.changes);
});

MessageManager.on("new-tree", (m) => {
    store.commit("addGoml", m.result);
});

MessageManager.on("initialize", (m) => {
    store.dispatch("reload");
});
export default store;
