var ui = new dat.GUI({
    autoPlace: false,
    hideable:false
});

dat.GUI.prototype.removeFolder = function(name) {
  var folder = this.__folders[name];
  if (!folder) {
    return;
  }
  folder.close();
  this.__ul.removeChild(folder.domElement.parentNode);
  delete this.__folders[name];
  this.onResize();
}

dat.GUI.prototype.removeAllFolder = function(){
    var names = Object.keys(this.__folders);
    names.forEach(n=>this.removeFolder(n));
}


export default ui;
