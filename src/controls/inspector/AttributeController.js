import MessageObserver from "../../MessageObserver";
const vectorSwizzle = [".x", ".y", ".z", ".w"];
class AttributeController {
    set(folder, attributes) {
        const inputObject = {};
        for (let i = 0; i < attributes.length; i++) {
            const at = attributes[i];
            if (typeof at.name !== "string") {
                throw new Error("Name must be string");
            }
            let value = at.value;
            if (value === null || value === void 0) {
                value = "(null)[Non editable]";
            }
            if (at.isVector) {
                for (let j = 0; j < at.length; j++) {
                    inputObject[at.name + vectorSwizzle[j]] = value[j];
                }
            } else {
                inputObject[at.name] = value;
            }
        }
        for (let i = 0; i < attributes.length; i++) {
            const at = attributes[i];
            if (at.isColor) {
                folder.addColor(inputObject, at.name);
            } else if (at.isVector) {
                for (let j = 0; j < at.length; j++) {
                  folder.add(inputObject,at.name + vectorSwizzle[j]);
                }
            } else {
                folder.add(inputObject, at.name);
            }
        }
        MessageObserver.on("attribute-updated",function(m){
          if(m.isVector){
            for(let i =0; i < m.length; i++){
              inputObject[m.attrName + vectorSwizzle[i]] = m.value[i];
            }
          }
        })
    }
}

export default new AttributeController();
