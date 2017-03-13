import MessageManager from "./MessageManager";
import ObjectConverter from "./ObjectConverter";
import AttributeWatcher from "./AttributeWatcher";
import MutationSummary from "mutation-summary";
import UUID from "uuid/v4";
import Responses from "./Responses";
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

        for (let key in window.GrimoireJS.rootNodes) {
            const root = window.GrimoireJS.rootNodes[key];
            const message = ObjectConverter.fromElement(root.companion.get("scriptElement"), true);
            message.key = key;
            MessageManager.post({
                type: "new-tree",
                result: message
            });
            //observeRoot(root.element);
        }
    }
});

MessageManager.on("attribute-change",function(m){
  AttributeWatcher.set(m.model);
});

MessageManager.response("query-nodes",function(m){
  const gr = window.GrimoireJS;
  const root = gr.rootNodes[m.rootKey];
  const nodes = root.tree(m.query).nodes[0];
  return nodes.map(n=>ObjectConverter.fromElement(n.element,true));
});

// register response handlers
for(let message in Responses){
  MessageManager.response(message,Responses[message]);
}
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
                }, true)// send to content script
            }
        }
    },
    queries: [{
        element: "iframe"
    }]
});

// Messaging for mocker
//const messagePort = new MessagePort();
