import Watcher from "./Watcher";

export default class Compile {
    constructor(el, vue) {
        this.$el = document.querySelector(el);
        this.$vue = vue;
        if(this.$el) {
            let $frag = this.node2Fragment(this.$el);
            this.compile($frag);
            this.$el.appendChild($frag);
        }
    }
    node2Fragment(el) {
        let fragment = document.createDocumentFragment();
        let child; 
        while(child = el.firstChild) {
            fragment.appendChild(child);
        } 
        return fragment
    }
    compile(el) {
        let nodes = el.childNodes;
        let reg = /\{\{(.*)\}\}/;
        nodes.forEach(node => {
            let text = node.textContent;
            if(node.nodeType == 1) {
                this.compileElement(node);
            }else if (node.nodeType == 3 && reg.test(text)) {
                this.compileText(node, text.match(reg)[1]);
            }
        });
    }
    compileElement(node) {
        let nodeAttrs = node.attributes;
        //[].call(nodeAttrs);
        Array.prototype.slice.call(nodeAttrs).forEach(attr => {
            let name = attr.name;
            let value = attr.value;
            let dir = name.substring(2);
            if(name.indexOf("v-") == 0) {
                if(dir == "model") {

                }else if (dir == "if"){
                    console.log("这里是if指令", value)
                } else if(dir == "for") {

                }
            }
        });
    }
    compileText(node, name) {
        node.textContent = this.getValue(this.$vue, name);
        new Watcher(this.$vue, name, val => {
            node.textContent = val;
        })
    }
    getValue(vue, name) {
        let val = vue;
        let keys = name.split(".");
        keys.forEach(key => {
            val = val[key]
        });
        return val;
    }
}