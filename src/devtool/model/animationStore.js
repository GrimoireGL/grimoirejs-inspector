export default {
  namespaced:true,
  state:{
    offsetX:0,
    offsetY:0,
    scaleX:1,
    scaleY:1,
    currentTime:200
  },
  mutations:{
    setScaleX(state,scaleX){
      state.scaleX = scaleX;
    },
    setScaleY(state,scaleY){
      state.scaleY = scaleY;
    },
    setOffsetX(state,offsetX){
      state.offsetX = offsetX;
    },
    setOffsetY(state,offsetY){
      state.offsetY = offsetY;
    },
    setCurrentTime(state,currentTime){
      state.currentTime = currentTime;
    }
  }
};
