class ObjectConverter {
    fromElement(element, noRecursive) {
        let children;
        if (!noRecursive) {
            children = [];
            for (let i = 0; i < element.children.length; i++) {
                children.push(this.fromElement(element.children[i]));
            }
        }
        return {
            key: element.getAttribute("x-gr-id"),
            className: element.className,
            tagName: element.tagName,
            id: element.id,
            children: children
        };
    }

    fromComponent(component) {
        return {
            name: component.name.name,
            attributes: component.attributes.toArray().map(m => this.fromAttribute(m))
        };
    }

    fromAttribute(attr) {
        try {
            const converter = attr.declaration.converter;
            switch (converter) {
                case "Number":
                case "String":
                case "Angle2D":
                case "Boolean":
                    return {
                        name: attr.name.name,
                        value: attr.Value
                    };
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
        } catch (e) {
            return {
                name: attr.name.name,
                value: e.toString()
            };
        }
    }
}

export default new ObjectConverter();
