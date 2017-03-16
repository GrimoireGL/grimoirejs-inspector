import LayoutCalculator from "./LayoutCalculator";
import Effects from "./Effects";
export default class TimeLineChartDrawer {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.context.scale(2, 2);
        this.mouse = [0, 0]; // coordinates of mouse pointer
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
            this._drawPointer();
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

    _drawHorizontal(y, width = 1, color = "#333") {
        this.context.beginPath();
        this.context.moveTo(0, y);
        this.context.lineTo(this.canvas.width, y);
        this.context.lineWidth = width;
        this.context.strokeStyle = color;
        this.context.stroke();
    }

    _drawText(text, y, style = "white") {
        this.context.fillStyle = style;
        this.context.fillText(text, 3, y - 2);
    }


    _drawGrid() {
        if (this.offsetX === void 0 || this.scaleX === void 0 || this.scaleY === void 0 || this.offsetY === void 0) {
            return;
        }
        let stride = LayoutCalculator.getStride(this.scaleX);
        let lastX = stride - (this.offsetX % stride);
        for (let grid of LayoutCalculator.columnEnumrator(this.scaleX, this.offsetX)) {
            if (grid.screenX > this.canvas.width) {
                break;
            }
            const width = LayoutCalculator.getWidthByImportance(grid.importance);
            const style = LayoutCalculator.getStyleByImportance(grid.importance);
            this._drawVertical(grid.screenX, width, style);
        }
        for (let row of LayoutCalculator.rowEnumrator(this.scaleY, this.offsetY)) {
            const importance = row.importance;
            this._drawHorizontal(row.screenY, LayoutCalculator.getWidthByImportance(importance), LayoutCalculator.getStyleByImportance(importance, true));
            if (importance >= 1)
                this._drawText(row.value, row.screenY, LayoutCalculator.getStyleByImportance(importance, true));
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
                const x = LayoutCalculator.timeToScreenX(this.scaleX, this.offsetX, t, true);
                const y = LayoutCalculator.valueToScreenY(this.scaleY, this.offsetY, timeline.values[j], true);
                if (j === 0) {
                    this.context.moveTo(x, y);
                } else {
                    const e = timeline.effects[j - 1];
                    let type;
                    if (!e || e.type === void 0 || e.type === "LINEAR") {
                        type = "LINEAR"
                    } else {
                        type = e.type;
                    }
                    const x2 = LayoutCalculator.timeToScreenX(this.scaleX, this.offsetX, t, true);
                    const y2 = LayoutCalculator.valueToScreenY(this.scaleY, this.offsetY, timeline.values[j - 1], true);
                    Effects[type].drawEffect({
                        context: this.context,
                        scaleX: this.scaleX,
                        scaleY: this.scaleY,
                        offsetX: this.offsetX,
                        offsetY: this.offsetY,
                        effect: e,
                        current: [x2, y2],
                        next: [x, y]
                    });
                }
            }
            this.context.stroke();
        }
    }

    _drawPointer() {
        const x = this.mouse[0];
        const y = this.mouse[1];
        const t = LayoutCalculator.screenXToTime(this.scaleX, this.offsetX, x, true);
        for (let i = 0; i < this.timelines.length; i++) {
            const timeline = this.timelines[i];
            const times = timeline.times;
            const values = timeline.values;
            for (let j = 0; j < times.length; j++) {
                if (times[j] < t && times[j + 1] > t) {
                    const effect = timeline.effects[j];
                    let type = "LINEAR"
                    if (effect && effect.type) {
                        type = effect.type;
                    }
                    const ey = Effects[type].getValue({
                        current: [times[j], values[j]],
                        next: [times[j + 1], values[j + 1]],
                        effect: effect
                    }, (t - times[j]) / (times[j + 1] - times[j]));
                    const sy = LayoutCalculator.valueToScreenY(this.scaleY, this.offsetY, ey, true);
                    const sx = x * 2;
                    if (Math.abs(y * 2 - sy) < 5.0) {
                        this.context.beginPath();
                        this.context.arc(sx, sy, 5, 0, 2 * Math.PI, false);
                        this.context.fillStyle = 'green';
                        this.context.fill();
                        this.context.strokeStyle = 'black';
                        this.context.stroke();
                        return;
                    }
                }
            }
        }
    }
}
