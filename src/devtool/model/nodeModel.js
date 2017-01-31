import MessageManager from "../MessageManager";
class NodeModel{
  constructor(){
      this.nodeName = null;
      this.components = [];
      MessageManager.on("node-info",this.onNodeInfoMessage.bind(this));
  }

  onNodeInfoMessage(m){
    this.nodeName = m.nodeName;
    this.className = m.className;
    this.id = m.id;
    this.components = m.components;
  }

  selectNode(key){
    MessageManager.post({
      type:"fetch-node",
      key:key
    });
  }
}

export default NodeModel;
