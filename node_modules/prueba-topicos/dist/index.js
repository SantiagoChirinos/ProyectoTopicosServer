export class Stack {
    constructor() {
        this.arr = [];
    }
    push(value) {
        this.arr.push(value);
    }
    pop() {
        if (this.arr.length) {
            return this.arr.pop();
        }
    }
    top() {
        if (this.arr.length) {
            return this.arr[this.arr.length - 1];
        }
    }
    isVoid() {
        if (this.arr.length)
            return false;
        return true;
    }
}
//# sourceMappingURL=index.js.map