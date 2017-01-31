import MessageManager from "../MessageManager";
import store from "./storeRoot";
class RootModel {
    constructor() {
        MessageManager.on("initialize", (m) => {
            store.commit("reset");
        });
        MessageManager.on("new-tree", (m) => {
            store.commit("addGoml", m.result);
        });
        MessageManager.on("node-added", (m) => { //TODO fix
            const index = this.findNodesIndex(m.root);
            this.nodes[index] = m.root;
            store.dispatch("selectGoml",index);
        });
        MessageManager.post({
            type: "sync-devtool"
        });
        this.isNotFirstLoad = true;
    }

    findNodesIndex(root) {
        for (var i = 0; i < this.nodes.length; i++) {
            if (root.key === this.nodes[i].key) {
                return i;
            }
        }
        throw new Error("Specified node tree was not found");
    }

    reset() {
        store.commit("reset");
        if (this.isNotFirstLoad) {
            MessageManager.post({
                type: "sync-devtool"
            });
        }
    }
}

export default new RootModel();
