import MessageManager from "../MessageManager";
import NodeModel from "./NodeModel";
class RootModel {
    constructor() {
        this.currentNodeIndex = -1;
        this.contextLoaded = false;
        this.currentNodes = [];
        this.treeLabels = [];
        this.nodes = [];
        this.scriptElements = [];
        this.nodeModel = new NodeModel();
        MessageManager.on("initialize", (m) => {
          this.reset();
        });
        MessageManager.on("new-tree", (m) => {
            this.contextLoaded = true;
            this.nodes.push(m.result.rootNode);
            this.scriptElements.push(m.result.scriptElement);
            if (this.nodes.length === 1) {
                this.currentNodeIndex = 0;
                this.updateCurrentNode(0);
                this.nodeModel.selectNode(m.result.rootNode.key);
            }
            this.updateTreeLabels();
        });
        MessageManager.on("node-added", (m) => {
            const index = this.findNodesIndex(m.root);
            this.nodes[index] = m.root;
            this.updateCurrentNode(index);
        });
        MessageManager.post({
            type: "sync-devtool"
        });
        this.isNotFirstLoad = true;
    }

    updateTreeLabels() {
        const arr = new Array(this.scriptElements.length);
        for (var i = 0; i < this.scriptElements.length; i++) {
            const scTag = this.scriptElements[i];
            arr[i] = "";
            arr[i] += scTag.id !== "" ? "#" + scTag.id : "";
            arr[i] += scTag.className !== "" ? "." + scTag.className : "";
            if (arr[i] === "") {
                arr[i] = "(NONAME)";
            }
        }
        this.treeLabels = arr;
    }

    setCurrentNode(index) {
        if (index !== this.currentNodeIndex) {
            this.currentNodeIndex = index;
            this.currentNodes = this.nodes[index];
        }
    }

    updateCurrentNode(index) {
        if (index === this.currentNodeIndex) {
            this.currentNodes = this.nodes[index];
        }
    }

    findNodesIndex(root) {
        for (var i = 0; i < this.nodes.length; i++) {
            if (root.key === this.nodes[i].key) {
                return i;
            }
        }
        throw new Error("Specified node tree was not found");
    }

    reset(){
      this.contextLoaded = false;
      this.currentNodeIndex = -1;
      this.currentNodes = [];
      this.treeLabels = [];
      this.nodes = [];
      this.nodeModels = [];
      this.scriptElements = [];
      this.nodeModel = new NodeModel();
      if (this.isNotFirstLoad) {
          MessageManager.post({
              type: "sync-devtool"
          });
      }
    }
}

export default new RootModel();
