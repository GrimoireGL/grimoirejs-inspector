import MessageManager from "../MessageManager";
import store from "./storeRoot";
class RootModel {
    constructor() {
        // MessageManager.on("initialize", (m) => {
        //     store.commit("reset");
        // });

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
