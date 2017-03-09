import LayoutCalculator from "./LayoutCalculator";
export default class TimeEffect{
  static drawEffect(context,scale,offset,effect,current,next){
    switch(effect.type){
      case "BEZIER":
        const cx1 = LayoutCalculator.timeToScreenX(scale,offset,effect.control[0]);
        const cx2 = LayoutCalculator.timeToScreenX(scale,offset,effect.control[2]);
        context.bezierCurveTo(cx1,effect.control[1],cx2,effect.control[2],next[0],next[1]);
        break;
      default:
        throw new Error("Unsupported animation effect");
    }
  }
}
