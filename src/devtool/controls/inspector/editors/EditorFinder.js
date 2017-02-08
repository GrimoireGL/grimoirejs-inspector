import UnsupportedEditor from "./unsupported.vue";
import BooleanEditor from "./boolean.vue";
import StringEditor from "./string.vue";
import Vector3Editor from "./vector3.vue";
import Color3Editor from "./color3.vue";
import Color4Editor from "./color4.vue";
export default function(type){
  switch(type){
    case "Boolean":
      return BooleanEditor;
    case "Number":
    case "String":
    case "Angle2D":
      return StringEditor;
    case "Vector3":
    case "Rotation3":
      return Vector3Editor;
    case "Color3":
      return Color3Editor;
    case "Color4":
      return Color4Editor;
    default:
      return UnsupportedEditor;
  }
};
