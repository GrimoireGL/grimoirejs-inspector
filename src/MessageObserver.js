class MessageObserver{
  constructor(){
    // connect to background page
    this.bpc = chrome.runtime.connect({
        name: "panel"
    });
    this.bpc.onMessage.addListener(this.onRecieve.bind(this));
    this.handlers = {};
  }

  post(message){
    if(message.type === void 0){
      throw new Error("message type should be specified");
    }
    const nm = Object.assign({
      $tabId:chrome.devtools.inspectedWindow.tabId,
      $source:"grimoire-inspector-dev-tool"
    },message);
    this.bpc.postMessage(nm);
  }

  onRecieve(message){
    if(this.handlers[message.type]){
      this.handlers[message.type](message);
    }
  }

  on(key,handler){
    this.handlers[key] = handler;
  }

  init(){
    this.bpc.postMessage({
        name: 'init',
        tabId: chrome.devtools.inspectedWindow.tabId
    });
  }
}

const mo = new MessageObserver();
mo.init();
export default mo;
