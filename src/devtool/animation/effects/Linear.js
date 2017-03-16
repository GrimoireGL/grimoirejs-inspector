export default class Linear{
  constructor(){
    this.optionalControl = null;
  }

  drawEffect(args){
    args.context.lineTo(args.next[0],args.next[1]);
  }

  getValue(args,t){
    return args.current[1] + (args.next[1] - args.current[1]) * t; 
  }
}
