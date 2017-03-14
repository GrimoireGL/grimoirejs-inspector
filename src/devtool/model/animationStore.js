export default {
  namespaced:true,
  state:{
    offsetX:0,
    scaleX:1,
    currentTime:200
  },
  mutations:{
    setScaleX(state,scaleX){
      state.scaleX = scaleX;
    },
    setOffsetX(state,offsetX){
      state.offsetX = offsetX;
    },
    setCurrentTime(state,currentTime){
      state.currentTime = currentTime;
    }
  }
};
