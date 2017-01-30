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

  toDevTool(request,sender,fromBackground){
    const tabId = sender?sender.tab.id:null;
    if ((request.$source === "grimoire-inspector" && tabId === this.tabId) || fromBackground) {
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
        this.tabId = message.$tabId;
        console.log(`Background -> ContentScript:${message.$tabId}`);
        console.log(message);
    }
  }

  verifyDevtoolMessage(message){
    return message.$source === "grimoire-inspector-dev-tool";
  }
}
