import LayoutCalculator from "./LayoutCalculator";
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
    let stride =  LayoutCalculator.getStride(this.scale);
    let lastX = stride -  (this.offsetX % stride);
    for(let grid of LayoutCalculator.gridEnumrator(this.scale,this.offsetX)){
        if (grid.screenX > this.canvas.width) {
            break;
        }
      const width = LayoutCalculator.getWidthByImportance(grid.importance);
      const style = LayoutCalculator.getStyleByImportance(grid.importance);
      this._drawVertical(grid.screenX,width,style);
    }
  }
}
