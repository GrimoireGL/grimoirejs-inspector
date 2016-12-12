import MessageManager from "./MessageManager";

MessageManager.post({
    type: "finding-context",
    existing: !!window.GrimoireJS
});
if (!!window.GrimoireJS) {

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

    function componentToObject(component){
      return {
        name:component.name.name
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

    MessageManager.on("fetch-node",function(m){
      const node = window.GrimoireJS.nodeDictionary[m.key];
      if(!node){
        return;
      }
      const components = node._components;
      const arr = new Array(components.length);
      for(let i = 0; i < arr.length; i++){
        arr[i] = componentToObject(components[i]);
      }
      console.log(components);
      MessageManager.post({
        type:"node-info",
        nodeName:node.name.name,
        components:arr
      })
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
