import MessageManager from "./MessageManager";
import ObjectConverter from "./ObjectConverter";
import {Model2Attr} from "./AttributeConverters";
class AttributeWatcher {
    constructor() {

    }

    attach(node){
      this.observing = node;
    }

    detach(){
      this.observing = null;
    }

    set(model){
      if(this.observing){
        this.observing.setAttribute(model.name,Model2Attr(model));
      }else{
        console.warn("There is no observing node");
      }
    }
}

export default new AttributeWatcher();
