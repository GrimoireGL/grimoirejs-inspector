import MessageManager from "./MessageManager";
import ObjectConverter from "./ObjectConverter";
import {Model2Attr} from "./AttributeConverters";
import UUID from "uuid/v4";
class AttributeWatcher {
    constructor() {
      this.duration = 200;
      this.onChangeBinded = this.onChange.bind(this);
      this.onSendingPeriodBinded = this.onSendingPeriod.bind(this);
    }
    /**
     * Observe mutation of attributes included in specified node.
     */
    attach(node){
      if(this.observing === node){
        return;
      }
      this.ignoreChange = false;
      this.intervalId = setInterval(this.onSendingPeriodBinded,this.duration);
      this.watchingAttributes = {};
      this.changes = {};
      this.hasChange = false;
      this.observing = node;
      this.observing._components.forEach(c=>{
        c.attributes.forEach(a=>{
          a.__id__ = UUID();
          this.watchingAttributes[a.__id__] = a;
          a.watch(this.onChangeBinded);
        });
      });
    }

    onChange(newV,oldV,attr){
      if(this.ignoreChange){
        this.ignoreChange = false;
        return;
      }
      this.changes[attr.__id__] = attr;
      this.hasChange = true;
    }

    onSendingPeriod(){
      if(this.hasChange){
        const changes = [];
        for(let key in this.changes){
          changes.push(ObjectConverter.fromAttribute(this.changes[key]));
        }
        MessageManager.post({
          type:"attribute-changed",
          changes
        })
      }
    }

    /**
     * Cancel observing mutation of attributes.
     */
    detach(){
      if(!this.observing){
        return;
      }
      clearInterval(this.intervalId);
      this.observing._components.forEach(c=>{
        c.attributes.forEach(a=>{
          if(a.unwatch){
            a.unwatch(this.onChangeBinded);
          }else{
            a.removeObserver(this.onChangeBinded);
          }
          a.__id__ = void 0;
        });
      });
      this.observing = null;
    }

    set(model){
      if(this.observing){
        this.ignoreChange = true;
        this.observing.setAttribute(model.name,Model2Attr(model));
      }
    }
}

export default new AttributeWatcher();
