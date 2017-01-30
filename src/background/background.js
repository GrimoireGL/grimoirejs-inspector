import MessageManager from "./MessageManager";
const mm = new MessageManager();
console.log("background script");
chrome.runtime.onConnect.addListener(function(port) {
    // devTools側からのリスナー
    var devtoolListener = function(message, sender, sendResponse) {
        if (mm.verifyDevtoolMessage(message)) {
          if(message.type === "connection-establish"){
            mm.establish(port);
          }else{
            mm.toContent(message);
          }
        }
    }

    // Listen to messages sent from the DevTools page
    port.onMessage.addListener(devtoolListener);
    port.onDisconnect.addListener(function(port) {
        port.onMessage.removeListener(devToolsListener);
        mm.disconnect();
    });
});

// Receive message from content script and relay to the devTools page for the
// current tab
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // Messages from content scripts should have sender.tab set
    mm.toDevTool(request,sender);
    return true;
});
