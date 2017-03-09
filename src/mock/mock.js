const inspectWindow = window.open("http://localhost:8080/src/mock/debug.html", "gr-inspectedWindow");
inspectWindow.addEventListener("message",packet=>{
  console.log(packet);
});
inspectWindow.gri = window;
window.gri = {
    messagePostDelegate(message) {
      inspectWindow.postMessage(message,"*");
    }
};
