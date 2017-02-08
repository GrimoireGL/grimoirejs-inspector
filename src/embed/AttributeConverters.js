export const Attr2Model = function(result,attr){
  switch (result.converter) {
      case "Number":
      case "String":
      case "Boolean":
        return;
      case "Color3":
      case "Color4":
      case "Vector2":
      case "Vector3":
      case "Vector4":
        result.value = attr.Value.rawElements
        return;
      case "Rotation3":
        result.value = attr.Value.eularAngles.rawElements.map(v=>v / 2 / Math.PI * 360);
        return;
      case "Angle2D":
        result.value = attr.Value / 2 / Math.PI * 360;
        return;
      default:
        result.value = "Non supported";
        return;
      }
}

export const Model2Attr = function(model){
  switch(model.converter){
    case "Rotation3":
      return `${model.value[0]},${model.value[1]},${model.value[2]}`
    case "Angle2D":
      return `${model.value}`;
    default:
      return model.value;
  }
}
