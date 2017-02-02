import UnsupportedEditor from "./unsupported.vue";
import BooleanEditor from "./boolean.vue";
import StringEditor from "./string.vue";

export default function(type){
  switch(type){
    case "Boolean":
      return BooleanEditor;
    case "Number":
    case "String":
      return StringEditor;
    default:
      return UnsupportedEditor;
  }
};
