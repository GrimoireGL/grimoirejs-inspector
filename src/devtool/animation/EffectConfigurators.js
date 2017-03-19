export default {
  LINEAR(args){
    return {};
  },
  BEZIER(args){
    return {
      type:"BEZIER",
      control:[args.next[0],args.current[1],args.current[0],args.next[1]]
    };
  }
};
