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
    this.canvas.height = this.canvas.parentElement.clientHeight * 2;
    this.canvas.width = this.canvas.parentElement.clientWidth * 2;
    this.canvas.style.width = this.canvas.parentElement.clientWidth + "px";
    this.canvas.style.height = this.canvas.parentElement.clientHeight + "px";
    this.onDraw();
  }

  onDraw(){
    if(this.expand){
      this._drawVertical(10);
      this._drawVertical(20);
      this._drawVertical(30);
    }else{
      this._clear();
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
}
