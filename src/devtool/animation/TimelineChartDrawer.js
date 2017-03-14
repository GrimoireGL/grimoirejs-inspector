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

    _drawGrid() {
        if (this.offsetX === void 0 || this.scale === void 0) {
            return;
        }
        let stride = LayoutCalculator.getStride(this.scale);
        let lastX = stride - (this.offsetX % stride);
        for (let grid of LayoutCalculator.gridEnumrator(this.scale, this.offsetX)) {
            if (grid.screenX > this.canvas.width) {
                break;
            }
            const width = LayoutCalculator.getWidthByImportance(grid.importance);
            const style = LayoutCalculator.getStyleByImportance(grid.importance);
            this._drawVertical(grid.screenX, width, style);
        }
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
                const x = LayoutCalculator.timeToScreenX(this.scale, this.offsetX, t,true);
                if (j === 0) {
                    this.context.moveTo(x, timeline.values[j]);
                } else {
                    const e = timeline.effects[j - 1];
                    if (!e || e.type === void 0 || e.type === "LINEAR") {
                        this.context.lineTo(x, timeline.values[j]);
                    } else {
                      const x2 = LayoutCalculator.timeToScreenX(this.scale, this.offsetX, t,true);
                      TimeEffect.drawEffect(this.context,this.scale, this.offsetX, e, [x2, timeline.values[j - 1]], [x, timeline.values[j]]);
                    }
                }
            }
            this.context.stroke();
        }
    }
}
