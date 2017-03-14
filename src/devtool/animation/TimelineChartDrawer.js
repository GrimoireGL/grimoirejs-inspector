import LayoutCalculator from "./LayoutCalculator";
import TimeEffect from "./TimeEffect";
export default class TimeLineChartDrawer {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.context.scale(2, 2);
        this._observeResize();
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
        if (this.expand) {
            this._drawChart();
        } else {

        }
    }

    _clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    _drawVertical(x, width = 1, color = "white") {
        this.context.beginPath();
        this.context.moveTo(x, 0);
        this.context.lineTo(x, this.canvas.height);
        this.context.lineWidth = width;
        this.context.strokeStyle = color;
        this.context.stroke();
    }

    _drawHorizontal(y,width = 1, color = "white"){
      this.context.beginPath();
      this.context.moveTo(0, y);
      this.context.lineTo(this.canvas.width,y);
      this.context.lineWidth = width;
      this.context.strokeStyle = color;
      this.context.stroke();
    }

    _drawGrid() {
        if (this.offsetX === void 0 || this.scaleX === void 0) {
            return;
        }
        let stride = LayoutCalculator.getStride(this.scaleX);
        let lastX = stride - (this.offsetX % stride);
        for (let grid of LayoutCalculator.gridEnumrator(this.scaleX, this.offsetX)) {
            if (grid.screenX > this.canvas.width) {
                break;
            }
            const width = LayoutCalculator.getWidthByImportance(grid.importance);
            const style = LayoutCalculator.getStyleByImportance(grid.importance);
            this._drawVertical(grid.screenX, width, style);
        }
        this._drawHorizontal(LayoutCalculator.valueToScreenY(this.scaleY,this.offsetY,0,true));;
    }

    _drawChart() {
        if (!this.timelines) {
            return;
        }
        for (let i = 0; i < this.timelines.length; i++) {
            const timeline = this.timelines[i];
            this.context.beginPath();
            this.context.lineWidth = 2;
            this.context.strokeStyle = this.labels[i].color;
            for (let j = 0; j < timeline.times.length; j++) {
                const t = timeline.times[j];
                const x = LayoutCalculator.timeToScreenX(this.scaleX, this.offsetX, t,true);
                const y = LayoutCalculator.valueToScreenY(this.scaleY,this.offsetY,timeline.values[j],true);
                if (j === 0) {
                    this.context.moveTo(x, y);
                } else {
                    const e = timeline.effects[j - 1];
                    if (!e || e.type === void 0 || e.type === "LINEAR") {
                        this.context.lineTo(x, y);
                    } else {
                      const x2 = LayoutCalculator.timeToScreenX(this.scaleX, this.offsetX, t,true);
                      const y2 = LayoutCalculator.valueToScreenY(this.scaleY,this.offsetY,timeline.values[j-1],true);
                      TimeEffect.drawEffect(this.context,this.scaleX, this.offsetX, e, [x2, y2],[x, y]);
                    }
                }
            }
            this.context.stroke();
        }
    }
}
