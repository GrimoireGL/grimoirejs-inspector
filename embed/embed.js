import MessageManager from "./MessageManager";
import ObjectConverter from "./ObjectConverter";
MessageManager.on("sync-devtool", function() {
    if(!!window.GrimoireJS) {
        function observeRoot(element) {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === "childList") {
                        for (let i = 0; i < mutation.addedNodes.length; i++) {
                            const addedNode = mutation.addedNodes[i];
                            MessageManager.post({
                                type: "node-added",
                                parent: ObjectConverter.fromElement(addedNode.parentElement),
                                addedNode: ObjectConverter.fromElement(addedNode),
                                root: ObjectConverter.fromElement(element)
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
            const components = node._components.map(m=>ObjectConverter.fromComponent(m));
            MessageManager.post({
                type: "node-info",
                nodeName: node.name.name,
                className: node.element.className,
                id: node.element.id,
                components: components
            });
        });

        for (let key in window.GrimoireJS.rootNodes) {
            const root = window.GrimoireJS.rootNodes[key];
            MessageManager.post({
                type: "new-tree",
                result: {
                    key: key,
                    rootNode: ObjectConverter.fromElement(root.element),
                    scriptElement: ObjectConverter.fromElement(root.companion.get("scriptElement"), true)
                }
            });
            observeRoot(root.element);
        }
    }
});
MessageManager.post({
    type: "initialize"
});
