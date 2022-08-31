import { def } from './utils.js';

// 得到Array.prototype
const arrayPrototype = Array.prototype;

// 以Array.prototype为原型创建arrayMethods对象，并暴露
export const arrayMethods = Object.create(arrayPrototype);

// 要被改写的7个数组方法
const methodsNeedChange = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
];

methodsNeedChange.forEach(methodName => {
    const original = arrayPrototype[methodName];
    def(arrayMethods, methodName, function () {
        const result = original.apply(this, arguments);
        const args = [...arguments];
        const ob = this.__ob__;

        let inserted = [];

        switch (methodName) {
            case 'push':
            case 'unshift':
                inserted = args;
                break;
            case 'splice':
                inserted = args.slice(2);
                break;
        }

        if (inserted) {
            ob.observeArray(inserted);
        }

        console.log('啦啦啦');

        ob.dep.notify();

        return result;
    }, false);
});