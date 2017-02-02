export default function(attr){
  switch (attr.converter) {
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
        attr.value = attr.Value.rawElements
        return;
      case "Rotation3":
        attr.value = attr.Value.eularAngles.rawElements;
        return;
      default:
          return {
              name: attr.name.name,
              value: !!attr.Value ? "(Object)[Non Editable]" : "(null or undefined)[Non Editable]"
          };
  }
}
