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
    const cy1 = LayoutCalculator.valueToScreenY(scaleY,offsetY,effect.control[1],true,args.canvasHeight);
    const cy2 = LayoutCalculator.valueToScreenY(scaleY,offsetY,effect.control[3],true,args.canvasHeight);
    context.bezierCurveTo(cx1,cy1,cx2,cy2,next[0],next[1]);
  }

  getValue(args,x){
    let t = 0.5;
    let nextDiff = 0.25;
    let actX = (args.next[0] - args.current[0]) * x + args.current[0];
    for(let i = 0; i < 500; i ++){
      const c = this.getBezierValue(t,args.current[0],args.effect.control[0],args.effect.control[2],args.next[0]);
      if(Math.abs(c - actX) < args.EPS/2){
        break;
      }
      if(c < actX){
        t += nextDiff;
      }else{
        t -= nextDiff;
      }
      nextDiff /= 2;
    }
    return this.getBezierValue(t,args.current[1],args.effect.control[1],args.effect.control[3],args.next[1]);
  }

  getBezierValue(t,p1,p2,p3,p4){
    const it = 1 - t;
    return Math.pow(it,3) * p1 +  3 * Math.pow(it,2) * t * p2 + 3 * it * Math.pow(t,2) * p3 + Math.pow(t,3) * p4;
  }

  movePoint(args){
    const effect = args.effect;
    if(args.previous){
      // control point X can not exceed point x
      if(effect.control[0] > args.point[0]){
        effect.control.splice(0,1,args.point[0]);
      }
      if(effect.control[2] > args.point[0]){
        effect.control.splice(2,1,args.point[0]);
      }
    }else{
      // point x cannnot exceeds control point x
      if(effect.control[0] < args.point[0]){
        effect.control.splice(0,1,args.point[0]);
      }
      if(effect.control[2] < args.point[0]){
        effect.control.splice(2,1,args.point[0]);
      }
    }
  }
}
