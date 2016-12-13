import MessageManager from "./MessageManager";

MessageManager.on("sync-devtool", function() {
    if(!!window.GrimoireJS) {
        function elementToObject(element, noRecursive) {
            let children;
            if (!noRecursive) {
                children = [];
                for (let i = 0; i < element.children.length; i++) {
                    children.push(elementToObject(element.children[i]));
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

        function attributeToObject(attr) {
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

        function componentToObject(component) {
            return {
                name: component.name.name,
                attributes: component.attributes.toArray().map(m => attributeToObject(m))
            };
        }

        function observeRoot(element) {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === "childList") {
                        for (let i = 0; i < mutation.addedNodes.length; i++) {
                            const addedNode = mutation.addedNodes[i];
                            MessageManager.post({
                                type: "node-added",
                                parent: elementToObject(addedNode.parentElement),
                                addedNode: elementToObject(addedNode),
                                root: elementToObject(element)
                            })
                        }
                    }
                });
            });
            observer.observe(element, {
                attributes: true,
                childList: true,
                characterData: true,
                subtree: true
            });
        }

        MessageManager.on("fetch-node", function(m) {
            const node = window.GrimoireJS.nodeDictionary[m.key];
            if (!node) {
                return;
            }
            const components = node._components;
            const arr = new Array(components.length);
            for (let i = 0; i < arr.length; i++) {
                arr[i] = componentToObject(components[i]);
            }
            MessageManager.post({
                type: "node-info",
                nodeName: node.name.name,
                className: node.element.className,
                id: node.element.id,
                components: arr
            });
        });

        for (let key in window.GrimoireJS.rootNodes) {
            const root = window.GrimoireJS.rootNodes[key];
            MessageManager.post({
                type: "new-tree",
                result: {
                    key: key,
                    rootNode: elementToObject(root.element),
                    scriptElement: elementToObject(root.companion.get("scriptElement"), true)
                }
            });
            observeRoot(root.element);
        }
    }
});
MessageManager.post({
    type: "initialize"
});
