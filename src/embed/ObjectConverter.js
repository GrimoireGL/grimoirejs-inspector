import {Attr2Model} from "./AttributeConverters";
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
      const converter = attr.declaration.converter;
        try {
            let attrInfo = {
              converter:converter,
              name:attr.name.name,
              value:attr.Value,
              id:attr.__id__
            };
            Attr2Model(attrInfo,attr);
            return attrInfo;
        } catch (e) {
            return {
                name: attr.name.name,
                value: e.toString(),
                converter:converter,
                id:attr.__id__
            };
        }
    }
}

export default new ObjectConverter();
