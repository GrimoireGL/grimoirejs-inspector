function injectScript(file, node) {
    var s, th;
    th = document.getElementsByTagName(node);
    for(var i = 0; i < th.length; i++){
      s = document.createElement('script');
      s.setAttribute('type', 'text/javascript');
      s.setAttribute('src', file);
      s.setAttribute('x-injectedBy',"GrimoireJS Inspector");
    return th.item(0).appendChild(s);
    }
};

function injectToIframe(file) {
    var s, th;
    th = document.getElementsByTagName("iframe");
    for(var i = 0; i < th.length; i++){
      var ifDoc = th.item(i).contentWindow.document;
      s = ifDoc.createElement('script');
      s.setAttribute('type', 'text/javascript');
      s.setAttribute('src', file);
      s.setAttribute('x-injectedBy',"GrimoireJS Inspector");
      return ifDoc.body.appendChild(s);
    }
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
  setTimeout(function(){ // TODO to load with injected iframe(such as grimoire.gl-examples). Should use mutation observer
    injectScript(chrome.extension.getURL('../lib/embed.js'), "body");
    //injectToIframe(chrome.extension.getURL('../lib/embed.js'));
  },5000);
});

chrome.runtime.onMessage.addListener((message)=>{
  if(message.$source === "grimoire-inspector-dev-tool"){
    window.postMessage(message,"*");
  }
});
