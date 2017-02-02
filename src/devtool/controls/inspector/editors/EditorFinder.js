import UnsupportedEditor from "./unsupported.vue"
export default function(type){
  switch(type){
    default:
      return UnsupportedEditor;
  }
};
