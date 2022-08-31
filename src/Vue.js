import Compile from "./Compile";
import observe from "./observe";
import Watcher from "./Watcher";
export default class Vue {
    constructor(options) {
         this.$options = options || {};
         this._data = options.data || undefined;
         //数据变成响应式的
        observe(this._data);
        this._initData();
        this._initWatch();
         new Compile(options.el, this);
    }
    _initData() {
        let self = this;
        Object.keys(this._data).forEach(key => {
            Object.defineProperty(self._data, key, {
                get() {
                    return self._data[key];
                },
                set(newValue) {
                    self._data[key] = newValue;
                }
            })
        })
    }
    _initWatch() {
        let self = this;
        let watch = this.$options.watch;
        Object.keys(watch).forEach(key => {
            new Watcher(self, key, watch[key])
        }) 
    }
}