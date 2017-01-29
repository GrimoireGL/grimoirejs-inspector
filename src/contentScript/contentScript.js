import MessageUtil from "./MessageUtil";
const injectedFile = chrome.extension.getURL('../../lib/embed.js');
const iframeWindows = [];

function injectScriptToBody() {
    const body = document.getElementsByTagName("body").item(0);
    injectScript(body, document);
}

function injectScript(target, doc) {
    const　 s = doc.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', injectedFile);
    s.setAttribute('x-injectedBy', "GrimoireJS Inspector");
    return target.appendChild(s);
};

function injectToIframe(id) {
    const frames = document.getElementsByClassName(id);
    const frameWindow = frames[0].contentWindow;
    const frameDocument = frameWindow.document;
    observeMessage(frameWindow);
    if (frameDocument.readyState === "complete" || frameDocument.readyState === "loaded") {
        const body = frameDocument.getElementsByTagName("body").item(0);
        injectScript(body, frameDocument);
        iframeWindows.push(frameWindow);
    } else {
        frameWindow.addEventListener("DOMContentLoaded", () => {
            const body = frameDocument.getElementsByTagName("body").item(0);
            injectScript(body, frameDocument);
            iframeWindows.push(frameWindow);
        });
    }
};

function observeMessage(wnd) {
    // EmbedWindow -> ContentScript -> BackgroundScript -> Inspector
    wnd.addEventListener('message', function(event) {
        // Only accept messages from the same frame
        var message = event.data;
        if (!MessageUtil.verifyMessage(message)) return;
        if (message.$toContent) {
            injectToIframe(message.id);
        } else {
            MessageUtil.toBackground(message);
        }
    });
}

observeMessage(window);

window.addEventListener("DOMContentLoaded", () => {
    injectScriptToBody();
});

// Inspector -> BackgroundScript -> ContentScript -> EmbedWindow
chrome.runtime.onMessage.addListener((message) => {
    MessageUtil.toWindow(window, message);
    // iframeWindows.forEach(f => {
    //     MessageUtil.toWindow(message,f);
    // })
});
