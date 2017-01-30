export default class MessageManager{
  constructor(){

  }

  establish(port){
    this.devToolPort = port;
    console.log("connection established to");
    console.log(port);
  }

  disconnect(){
    if(this.devToolPort){
      this.devToolPort = null;
    }
  }

  toDevTool(request,sender){
    if (sender.tab && request.$source === "grimoire-inspector") {
        const tabId = sender.tab.id;
        if(this.devToolPort){
          this.devToolPort.postMessage(request);
          console.log(`Background -> DevTool`);
          console.log(request);
        }
    }
  }

  toContent(message){
    if (this.verifyDevtoolMessage(message)) {
        chrome.tabs.sendMessage(message.$tabId, message);
        console.log(`Background -> ContentScript`);
        console.log(message);
    }
  }

  verifyDevtoolMessage(message){
    return message.$source === "grimoire-inspector-dev-tool";
  }
}
