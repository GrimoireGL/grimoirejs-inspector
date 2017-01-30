class MessageManager {
    constructor() {
      this.handlers = {};
      window.addEventListener("message",this.onRecieve.bind(this));
    }

    onRecieve(message){
      if(message.data.$source !== "grimoire-inspector-dev-tool"){
        return;
      }
      if(this.handlers[message.data.type]){
        this.handlers[message.data.type](message.data);
      }
    }

    post(message,toContent) {
        const packet = Object.assign({
            $source: "grimoire-inspector",
            $toContent: toContent? true:undefined
        }, message);
        if(packet.type === void 0){
          throw new Error("Type must be specified");
        }
        window.postMessage(packet, "*");
    }

    on(type,handler){
      this.handlers[type] = handler;
    }
}

export default new MessageManager();
