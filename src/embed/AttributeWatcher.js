import MessageManager from "./MessageManager";
import ObjectConverter from "./ObjectConverter";
class AttributeWatcher {
    constructor() {
        this.watching = [];
        this.components = {};
        MessageManager.on("attribute-manual-change", (m) => {
          this.components[m.cName][m.attrName].Value = m.value;
        });
    }

    watch(node) {
        this.node = node;
        node._components.forEach(c => {
            this.components[c.name.name] = {};
            c.attributes.toArray().forEach(a=>{
              this.components[c.name.name][a.name.name] = a;
            })
        });
        node._components.forEach(c => c.attributes.toArray().forEach(a => this.addHandler(a, this.onChanged.bind(this))));
    }

    onChanged() {
        const components = this.node._components.map(m => ObjectConverter.fromComponent(m));
        MessageManager.post({
            type: "attribute-update",
            components: components
        });
    }

    addHandler(attr, func) {
        this.watching.push({
            attr: attr,
            handler: func
        });
        attr.watch(func);
    }

    removeHandlers() {
        for (let i = 0; i < this.watching.length; i++) {
            const target = this.watching[i];
            target.attr.removeObserver(target.handler);
        }
        this.watching.splice(0, this.watching.length);
    }
}

export default new AttributeWatcher();
