import vuex from "vuex";
import vue from "vue";
vue.use(vuex);
const store = new vuex.Store(
  {
    state:{
      gomls:[],
      inspected:{}
    },
    mutations:{
      addGoml(state,gomlInfo){
        state.gomls.push(gomlInfo);
      }
    },
    actions:{
      load(context){
        
      }
    }
  }
);

export default store;
