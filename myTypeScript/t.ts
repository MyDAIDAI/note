function identity(arg: number): number {
    return arg;
}

// 函数后的T可以帮助捕获用户传入的类型
function identityByT<T>(arg: T): T {
    return arg;
}

let identityName:number = identityByT<number>(123);

interface Lengthwise {
    length: number;
}
function loggingIdentity<T extends Lengthwise>(arg: T): T {
    // 编译器会推断参数arg的类型为T的数组，所以可以在函数内部调用数组方法
    console.log(arg.length);
    
    return arg;
}
loggingIdentity({val: 2, length: 1});

let myIdentity: <T extends Lengthwise>(arg: T) => T = loggingIdentity;

interface GenericIdentityFn<T> {
    (arg: T[]): T
}

// let genericIdentityFn: GenericIdentityFn<number> = myIdentity;
// const data: number= genericIdentityFn([1]);

class GenericNumber<T> {
    zeroVal: T;
    add: (x: T, y: T) => T;
}
const genricNumber = new GenericNumber<number>();
genricNumber.zeroVal = 123;

interface CInterface<T> {
    new(): T;
}
// 工厂函数，传入构造函数
function create<T>(c: {new(): T}): T {
    return new c();
}

interface Named {
    name: string;
}
let x: Named;
let y = {name: '123', location: 'name'}
x = y;
// UMD模块是指那些既可以作为模块使用（通过导入），又可以作为全局（在没有模块加载器的环境里）使用的模块

function extend<T, U>(first: T, second: U): T & U {
    const result = <T & U>{};
    const mergeObj = Object.assign({}, first, second);
    Object.keys(mergeObj)?.reduce((pre, cur) => {
        pre[cur] = mergeObj[cur];
        return pre;
    }, result);
    return result;
}
class Person {
    constructor(public name: string) {}
}
interface Loggable {
    log(): void
}
class ConsoleLog implements Loggable {
    log() {}
}
let jim = extend(new Person('jim'), new ConsoleLog());
console.log('jim', jim.log());
