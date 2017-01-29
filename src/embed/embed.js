import MessageManager from "./MessageManager";
import ObjectConverter from "./ObjectConverter";
import AttributeWatcher from "./AttributeWatcher";
import MutationSummary from "mutation-summary";
import UUID from "uuid/v4";
MessageManager.on("sync-devtool", function() {
    if (!!window.GrimoireJS) {
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
            AttributeWatcher.removeHandlers();
            const node = window.GrimoireJS.nodeDictionary[m.key];
            if (!node) {
                return;
            }
            const components = node._components.map(m => ObjectConverter.fromComponent(m));
            MessageManager.post({
                type: "node-info",
                nodeName: node.name.name,
                className: node.element.className,
                id: node.element.id,
                components: components
            });
            AttributeWatcher.watch(node);
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
if (!!window.GrimoireJS) {
    MessageManager.post({
        type: "initialize"
    });
}
const iframeObserver = new MutationSummary({
    callback: (e) => {
        for (let i = 0; i < e.length; i++) {
            for (let j = 0; j < e[i].added.length; j++) {
                const elem = e[i].added[j];
                const id = UUID();
                elem.className += " " + id;
                MessageManager.post({
                    type: "add-iframe",
                    id: id
                }, true)
            }
        }
    },
    queries: [{
        element: "iframe"
    }]
});
