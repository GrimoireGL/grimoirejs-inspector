export default {
  LINEAR(args){
    return {};
  },
  BEZIER(args){
    const middle = (args.next[0] + args.current[0])/2;
    return {
      type:"BEZIER",
      control:[middle,args.current[1],middle,args.next[1]]
    };
  }
};
