const debugMode = false;
export default class MessageUtil{
  static toBackground(message){
    chrome.runtime.sendMessage(message);
    console.log(`ContentScript -> BackgroundPage\n`,JSON.stringify(message,null,2));
  }

  static toWindow(wnd,message){
    wnd.postMessage(message,"*");
    console.log(`ContentScript -> Window\n`,JSON.stringify(message,null,2),wnd);
  }


  static verifyMessage(message){
    return (typeof message === "object" && message !== null && message.$source === "grimoire-inspector");
  }
}
