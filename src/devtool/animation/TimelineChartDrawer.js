import GridHighlighter from "./GridHighlighter";
export default class TimeLineChartDrawer {
  constructor(canvas){
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.context.scale(2,2);
    this._observeResize();
  }

  _observeResize(){
    window.addEventListener("resize",this.onResize.bind(this));
  }

  onResize(){
    this.canvas.style.width = this.canvas.parentElement.clientWidth  + "px";
    this.canvas.style.height = this.canvas.parentElement.clientHeight + "px";
    this.canvas.height = this.canvas.parentElement.clientHeight * 2;
    this.canvas.width = this.canvas.parentElement.clientWidth * 2;
    this.onDraw();
  }

  onDraw(){
    this._clear();
    this._drawGrid();
    if(this.expand){

    }else{

    }
  }

  _clear(){
    this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
  }

  _drawVertical(x,width = 1,color = "white"){
    this.context.beginPath();
    this.context.moveTo(x,0);
    this.context.lineTo(x,this.canvas.height);
    this.context.lineWidth = width;
    this.context.strokeStyle = color;
    this.context.stroke();
  }

  _drawGrid(){
    if(this.offsetX === void 0 || this.scale === void 0){
      return;
    }
    let stride =  GridHighlighter.getStride(this.scale);
    let lastX = stride -  (this.offsetX % stride);
    while(true){
      let x = lastX * this.scale;
      if(x > this.canvas.width){
        break;
      }
      let actX = lastX + this.offsetX;
      const importance = GridHighlighter.getImportance(this.scale,actX);
      const width = GridHighlighter.getWidthByImportance(importance);
      const style = GridHighlighter.getStyleByImportance(importance);
      this._drawVertical(x * GridHighlighter.gridScale,width,style);
      lastX += stride;
    }
  }
}
