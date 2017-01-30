const debugMode = false;
export default class MessageUtil{
  static toBackground(message){
    chrome.runtime.sendMessage(message);
    console.log(`ContentScript -> BackgroundPage\n${message.type}`);
    console.log(message);
  }

  static toWindow(wnd,message){
    wnd.postMessage(message,"*");
    console.log(`ContentScript -> Window\n${message.type}`);
    console.log(message);
  }


  static verifyMessage(message){
    return (typeof message === "object" && message !== null && message.$source === "grimoire-inspector");
  }
}
