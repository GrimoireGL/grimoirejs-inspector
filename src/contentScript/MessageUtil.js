const debugMode = false;
export default class MessageUtil{
  static toBackground(message){
    chrome.runtime.sendMessage(message);
    if(!debugMode)return;
    console.log(`ContentScript -> BackgroundPage\n${message.type}`);
    console.log(message);
  }

  static toWindow(wnd,message){
    try{
      wnd.postMessage(message,"*");
    }catch(e){
      return false;
    }
    if(!debugMode)return true;
    console.log(`ContentScript -> Window\n${message.type}`);
    console.log(message);
    return true;
  }


  static verifyMessage(message){
    return (typeof message === "object" && message !== null && message.$source === "grimoire-inspector");
  }
}
