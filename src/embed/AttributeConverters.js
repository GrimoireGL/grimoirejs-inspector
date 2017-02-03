export const Attr2Model = function(result,attr){
  switch (result.converter) {
      case "Number":
      case "String":
      case "Angle2D":
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
        result.value = attr.Value.eularAngles.rawElements;
        return;
      default:
        result.value = "Non supported";
        return;
      }
}

export const Model2Attr = function(model){
  switch(model.converter){
    default:
      return model.value;
  }
}
