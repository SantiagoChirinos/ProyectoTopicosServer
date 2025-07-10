export declare class Stack<T> {
    private arr;
    constructor();
    push(value: T): void;
    pop(): T | void;
    top(): T | void;
    isVoid(): boolean;
}
