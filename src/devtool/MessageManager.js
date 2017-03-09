import UUID from "uuid/v4";
class MessageManager {
    constructor() {
        if(chrome.devtools){ // For Devtool
          this.bpc = chrome.runtime.connect({name: "panel"});
          this.bpc.onMessage.addListener(this.onRecieve.bind(this));
          this.postDelegate = (message) => this.bpc.postMessage(message);
        }else if(window && window.gri && window.gri.messagePostDelegate){ // For mock page
          this.postDelegate = (message) => window.gri.messagePostDelegate(message);
        }else{
          this.postDelegate = (message) => console.warn(message);
        }
        this.handlers = {};
    }

    post(message) {
        this.verifyMessage(message);
        const nm = Object.assign({
            $tabId: chrome && chrome.devtools ? chrome.devtools.inspectedWindow.tabId : 0,
            $source: "grimoire-inspector-dev-tool"
        }, message);
        this.postDelegate(nm);
    }
    // Devtool -> Embed -> Devtool
    call(message) {
      const type = message.type;
      const callId = UUID();
      this.verifyMessage(message);
      return new Promise((resolve,reject)=>{
        const handler = (message)=>{
          if(callId === message.$callId){
            resolve(message);
            this.off(type,handler);
          }
        };
        this.on(type,handler);
        this.post(Object.assign({
          $callId:callId
        },message));
      });
    }

    //private use
    onRecieve(message) {
        if (this.handlers[message.type]) {
            this.handlers[message.type].forEach(f=>f(message));
        }else{
          console.warn(`No handler found for message type "${message.type}"`);
        }
    }

    on(key, handler) {
      if(this.handlers[key] === void 0){
        this.handlers[key] = [];
      }
      this.handlers[key].push(handler);
    }

    off(key,handler){
      if(this.handlers[key] === void 0){
        return;
      }
      const index = this.handlers[key].indexOf(handler);
      if(index !== -1){
        this.handlers[key].splice(index,1);
      }
    }

    verifyMessage(message){
      if (typeof message.type !== "string" || message.type === "") {
          throw new Error("message type should be specified");
      }
    }

    init() {
        // connect to background page
        if ((chrome && !chrome.devtools)/*For mock*/ || chrome.devtools.inspectedWindow) {
            this.post({
              type:"connection-establish"
            })
        }else{
          throw new Error("Connection establish failed between background page");
        }
    }
}

const mm = new MessageManager();
mm.init();
export default mm;
