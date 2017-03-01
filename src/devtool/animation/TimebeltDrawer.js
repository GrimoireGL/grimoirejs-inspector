import GridHighlighter from "./GridHighlighter";
export default class TimebeltDrawer {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
    }

    _observeResize() {
        window.addEventListener("resize", this.onResize.bind(this));
    }

    onResize() {
        this.canvas.style.width = this.canvas.parentElement.clientWidth + "px";
        this.canvas.style.height = this.canvas.parentElement.clientHeight + "px";
        this.canvas.height = this.canvas.parentElement.clientHeight * 2;
        this.canvas.width = this.canvas.parentElement.clientWidth * 2;
        this.onDraw();
    }


    onDraw() {
        this._clear();
        this._drawGrid();
    }

    _drawVertical(x,height = 10,width = 1,color = "white"){
      this.context.beginPath();
      this.context.moveTo(x,this.canvas.height - height);
      this.context.lineTo(x,this.canvas.height);
      this.context.lineWidth = width;
      this.context.strokeStyle = color;
      this.context.stroke();
    }

    _drawText(text,x,height = 10,style = "white"){
      this.context.fillStyle = style;
      this.context.textAlign = "center";
      this.context.fillText(text,x,this.canvas.height - height);
    }

    _clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    _drawGrid() {
        if (this.offsetX === void 0 || this.scale === void 0) {
            return;
        }
        let stride = GridHighlighter.getStride(this.scale);
        let lastX =  - (this.offsetX % stride);
        while (true) {
            let x = lastX * this.scale;
            if (x > this.canvas.width) {
                break;
            }
            let actX = lastX + this.offsetX;
            const importance = GridHighlighter.getImportance(this.scale,actX);
            const height = GridHighlighter.getHeightByImportance(importance);
            const width = GridHighlighter.getWidthByImportance(importance);
            const style = GridHighlighter.getStyleByImportance(importance);
            this._drawVertical(x * GridHighlighter.gridScale,height,width,style);
            this._drawText(actX.toFixed(2),x * GridHighlighter.gridScale,height + 3,style);
            lastX += stride;
        }
    }
}
