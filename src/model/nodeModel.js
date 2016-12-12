import MessageObserver from "../MessageObserver";
class NodeModel{
  constructor(){
      this.nodeName = null;
      this.components = [];
      MessageObserver.on("node-info",this.onNodeInfoMessage.bind(this));
  }

  onNodeInfoMessage(m){
    this.nodeName = m.nodeName;
    this.components = m.components;
  }

  selectNode(key){
    MessageObserver.post({
      type:"fetch-node",
      key:key
    });
  }
}

export default NodeModel;
