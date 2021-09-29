export class Stack {
    constructor() {
        this.top = -1;
        this.items = {};
    }

    get peak() {
        return this.items[this.top];
    }

    push(value) {
        this.top +=1;
        this.items[this.top] = value;
    }

    pop() {
        if (this.top === -1) return undefined;
        let peak = this.peak;
        delete this.items[this.top];
        this.top -=1;
        return peak;
    }
}
