import ObjectConverter from "./ObjectConverter";
import AttributeWatcher from "./AttributeWatcher";
export default {
  "fetch-tree":function(m){
    // response for fetching tree message
    // reply structure of descendents of specified node.
    if(!window.GrimoireJS)return;
    const rootNode = window.GrimoireJS.rootNodes[m.key];
    if(rootNode === void 0)return;
    return {
      root:ObjectConverter.fromElement(rootNode.element)
    };
  },
  "fetch-node":function(m){
    // response for fetching node message
    // reply structure of descendents of specified code
    AttributeWatcher.detach();
    if(!window.GrimoireJS)return;
    const node = window.GrimoireJS.nodeDictionary[m.key];
    if (!node) {
        return;
    }
    AttributeWatcher.attach(node);
    const components = node._components.map(m => ObjectConverter.fromComponent(m));
    return {
      node:{
        nodeName: node.name.name,
        className: node.element.className,
        id: node.element.id,
        components: components
    }
  };
  }
};
