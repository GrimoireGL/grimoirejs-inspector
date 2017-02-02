export default function(attr){
  switch (attr.converter) {
      case "Number":
      case "String":
      case "Angle2D":
      case "Boolean":
        return;
      case "Color3":
      case "Color4":
          return {
              name: attr.name.name,
              value: attr.Value.rawElements,
              isColor: true
          };
      case "Vector2":
      case "Vector3":
      case "Vector4":
          return {
              name: attr.name.name,
              value: attr.Value.rawElements,
              isVector: true,
              length: ["Vector2", "Vector3", "Vector4"].indexOf(converter) + 2
          };
      case "Rotation3":
          return {
              name: attr.name.name,
              value: attr.Value.eularAngles.rawElements,
              isVector: true,
              length: 3
          };
      default:
          return {
              name: attr.name.name,
              value: !!attr.Value ? "(Object)[Non Editable]" : "(null or undefined)[Non Editable]"
          };
  }
}
