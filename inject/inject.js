function injectScript(file, node) {
    var s, th;
    th = document.getElementsByTagName(node)[0];
    s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', file);
    s.setAttribute('x-injectedBy',"GrimoireJS Inspector");
    return th.appendChild(s);
};

window.addEventListener('message', function(event) {
  // Only accept messages from the same frame
  if (event.source !== window) {
    return;
  }
  var message = event.data;

  if (typeof message !== 'object' || message === null ||
      !message.source === 'grimoire-inspector') {
    return;
  }
  chrome.runtime.sendMessage(message);
});

window.addEventListener("DOMContentLoaded", () => {
    injectScript(chrome.extension.getURL('../lib/embed.js'), "body");
});

chrome.runtime.onMessage.addListener((message)=>{
  if(message.$source === "grimoire-inspector-dev-tool"){
    window.postMessage(message,"*");
  }
});
