import BezierControl from "../../controls/animation/optional/bezier-control.vue";
import LayoutCalculator from "../LayoutCalculator";
export default class Bezier{
  constructor(){
    this.optionalControl = BezierControl;
  }

  drawEffect(args){
    const effect = args.effect;
    const scaleX = args.scaleX;
    const offsetX = args.offsetX;
    const scaleY = args.scaleY;
    const offsetY = args.offsetY;
    const context = args.context;
    const next = args.next;
    const cx1 = LayoutCalculator.timeToScreenX(scaleX,offsetX,effect.control[0],true);
    const cx2 = LayoutCalculator.timeToScreenX(scaleX,offsetX,effect.control[2],true);
    const cy1 = LayoutCalculator.valueToScreenY(scaleY,offsetY,effect.control[1],true);
    const cy2 = LayoutCalculator.valueToScreenY(scaleY,offsetY,effect.control[3],true);
    context.bezierCurveTo(cx1,cy1,cx2,cy2,next[0],next[1]);
  }

  getValue(args,t){
    return 0;
  }
}
