var connections = {};
var cacheLog = {};
chrome.runtime.onConnect.addListener(function(port) {

    // devTools側からのリスナー
    var devtoolListener = function(message, sender, sendResponse) {
        if (message.name == "init") {
            connections[message.tabId] = port;
            if (cacheLog[message.tabId]) {
                const l = cacheLog[message.tabId];
                for (let i = 0; i < l.length; i++) {
                    port.postMessage(l[i]);
                }
                l.splice(0, cacheLog[tabId].length);
            }
            return;
        } else {
            if (message.$source === "grimoire-inspector-dev-tool") {
                chrome.tabs.sendMessage(message.$tabId, message);
            }
        }
    }

    // Listen to messages sent from the DevTools page
    port.onMessage.addListener(devtoolListener);
    port.onDisconnect.addListener(function(port) {
        port.onMessage.removeListener(extensionListener);

        var tabs = Object.keys(connections);
        for (var i = 0, len = tabs.length; i < len; i++) {
            if (connections[tabs[i]] == port) {
                delete connections[tabs[i]]
                break;
            }
        }
    });
});

// Receive message from content script and relay to the devTools page for the
// current tab
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // Messages from content scripts should have sender.tab set
    if (sender.tab) {
        var tabId = sender.tab.id;
        if (tabId in connections) {
            connections[tabId].postMessage(request);
        }
    } else {
        console.log("sender.tab not defined.");
    }
    return true;
});
