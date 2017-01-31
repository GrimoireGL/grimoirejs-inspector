class MessageManager {
    constructor() {
        // connect to background page
        this.bpc = chrome.runtime.connect({
            name: "panel"
        });
        this.bpc.onMessage.addListener(this.onRecieve.bind(this));
        this.handlers = {};
    }

    post(message) {
        if (message.type === void 0) {
            throw new Error("message type should be specified");
        }
        const nm = Object.assign({
            $tabId: chrome.devtools.inspectedWindow.tabId,
            $source: "grimoire-inspector-dev-tool"
        }, message);
        this.bpc.postMessage(nm);
    }

    onRecieve(message) {
        if (this.handlers[message.type]) {
            this.handlers[message.type](message);
        }else{
          console.warn(`No handler found for message type "${message.type}"`);
        }
    }

    on(key, handler) {
        this.handlers[key] = handler;
    }

    init() {
        if (chrome.devtools.inspectedWindow) {
            this.post({
              type:"connection-establish"
            })
        }else{
          console.log("invalid")
        }
    }
}

const mm = new MessagerManager();
mm.init();
export default mm;
