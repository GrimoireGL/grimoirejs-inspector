import LayoutCalculator from "./LayoutCalculator";
import BezierControl from "../controls/animation/optional/bezier-control.vue";
export default class TimeEffect{
  static drawEffect(context,scaleX,scaleY,offsetX,offsetY,effect,current,next){
    switch(effect.type){
      case "BEZIER":
        const cx1 = LayoutCalculator.timeToScreenX(scaleX,offsetX,effect.control[0],true);
        const cx2 = LayoutCalculator.timeToScreenX(scaleX,offsetX,effect.control[2],true);
        const cy1 = LayoutCalculator.valueToScreenY(scaleY,offsetY,effect.control[1],true);
        const cy2 = LayoutCalculator.valueToScreenY(scaleY,offsetY,effect.control[3],true);
        context.bezierCurveTo(cx1,cy1,cx2,cy2,next[0],next[1]);
        break;
      default:
        throw new Error("Unsupported animation effect");
    }
  }

  static getOptionalControl(type){
    switch(type){
      case "BEZIER":
        return BezierControl;
      default:
        return null;
    }
  }
}
