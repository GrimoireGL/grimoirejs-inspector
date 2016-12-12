var connections = {};
var cacheLog = {};
chrome.runtime.onConnect.addListener(function(port) {

    var extensionListener = function(message, sender, sendResponse) {
        // The original connection event doesn't include the tab ID of the
        // DevTools page, so we need to send it explicitly.
        if (message.name == "init") {
            connections[message.tabId] = port;
            if (cacheLog[message.tabId]) {
                const l = cacheLog[message.tabId];
                for (let i = 0; i < l.length; i++) {
                    port.postMessage(l[i]);
                }
            }
            return;
        } else {
            if (message.$source === "grimoire-inspector-dev-tool") {
                chrome.tabs.sendMessage(message.$tabId,message);
            }
        }
    }

    // Listen to messages sent from the DevTools page
    port.onMessage.addListener(extensionListener);

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
        } else {
            if (request.$source === "grimoire-inspector") {
                if (!cacheLog[tabId]) {
                    cacheLog[tabId] = [];
                } else if (request.type === "finding-context") {
                    cacheLog[tabId].splice(0, cacheLog[tabId].length);
                }
                cacheLog[tabId].push(request);
            }
        }
    } else {
        console.log("sender.tab not defined.");
    }
    return true;
});
