import isPromise from "is-promise";
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
        this.handlers[message.data.type].forEach(f=>f(message.data));
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

    response(type,handler){
      this.on(type,(message)=>{
        const result = handler(message);
        if(isPromise(result)){
          result.then((actualResult)=>{
            actualResult.$callId = message.$callId;
            actualResult.type = type;
            this.post(actualResult);
          });
        }else{
          result.$callId = message.$callId;
          result.type = type;
           this.post(result);
        }
      });
    }

    on(type,handler){
      if(this.handlers[type] === void 0){
        this.handlers[type] = [];
      }
      this.handlers[type].push(handler);
    }

    off(type,handler){
      if(this.handlers[type] === void 0){
        return
      }
      const index = this.handlers[type].indexOf(handler);
      if(index !== -1){
        this.handlers[type].splice(index,1);
      }
    }
}

export default new MessageManager();
