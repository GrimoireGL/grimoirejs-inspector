import MessageObserver from "../../MessageObserver";
import InspectorUI from "../../inspectorUI";
const vectorSwizzle = [".x", ".y", ".z", ".w"];
class AttributeController {
    constructor() {
        MessageObserver.on("attribute-update", (m) => {
            if (this.inputObjects) {
                for (let ci = 0; ci < m.components.length; ci++) {
                    const cname = m.components[ci].name;
                    this.setValues(m.components[ci].attributes, this.inputObjects[cname]);
                }
            }
        })
    }

    getChangeHandler(cname, attrName, isVector) {
        return function(v) {
            MessageObserver.post({
                type: "attribute-manual-change",
                attrName: attrName,
                cName: cname,
                value: v
            })
        };
    }

    setFolder(cname, folder, attributes, inputObject) {
        this.setValues(attributes, inputObject);
        let c;
        for (let i = 0; i < attributes.length; i++) {
            const at = attributes[i];
            if (at.isColor) {
                c = folder.addColor(inputObject, at.name).listen();
                c.onChange(this.getChangeHandler(cname, at.name));
            } else if (at.isVector) {
                for (let j = 0; j < at.length; j++) {
                    c = folder.add(inputObject, at.name + vectorSwizzle[j]).listen();
                    //c.onChange(this.getChangeHandler(cname,at.name,j));
                }
            } else {
                c = folder.add(inputObject, at.name).listen();
                c.onChange(this.getChangeHandler(cname, at.name));
            }
        }
    }

    setValues(attributes, inputObject) {
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
                    if (inputObject[at.name + vectorSwizzle[j]] != value[j]) {
                        inputObject[at.name + vectorSwizzle[j]] = value[j];
                    }
                }
            } else {
                if (inputObject[at.name] != value) {
                    inputObject[at.name] = value;
                }
            }
        }
    }

    set(components) {
        this.inputObjects = {};
        for (let i = 0; i < components.length; i++) {
            const c = components[i];
            const f = InspectorUI.addFolder(c.name);
            f.closed = false;
            this.inputObjects[c.name] = {};
            this.setFolder(c.name, f, c.attributes, this.inputObjects[c.name]);
        }
    }
}

export default new AttributeController();
