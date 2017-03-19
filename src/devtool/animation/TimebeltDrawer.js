import LayoutCalculator from "./LayoutCalculator";
export default class TimebeltDrawer {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
    }

    _observeResize() {
        window.addEventListener("resize", this.resize.bind(this));
    }

    resize() {
        this.canvas.style.width = this.canvas.parentElement.clientWidth + "px";
        this.canvas.style.height = this.canvas.parentElement.clientHeight + "px";
        this.canvas.height = this.canvas.parentElement.clientHeight * 2;
        this.canvas.width = this.canvas.parentElement.clientWidth * 2;
        this.redraw();
    }


    redraw() {
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
        for(let grid of LayoutCalculator.columnEnumrator(this.scale,this.offsetX)){
            if (grid.screenX > this.canvas.width) {
                break;
            }
            const height = LayoutCalculator.getHeightByImportance(grid.importance);
            const width = LayoutCalculator.getWidthByImportance(grid.importance);
            const style = LayoutCalculator.getStyleByImportance(grid.importance);
            this._drawVertical(grid.screenX,height,width,style);
            this._drawText(LayoutCalculator.toTimeLabel(this.scale,grid.time),grid.screenX,height + 3,style);
        }
    }
}
