import { Node } from "./LinkedList.js";

export class Stack<T> {
    private top: Node<T> | null = null;
    private length = 0;

    constructor(...initialData: T[]) {
        for (let i = initialData.length - 1; i >= 0; i--) {
            this.push(initialData[i]);
        }
    }

    push(value: T) {
        const newNode = new Node(value);

        if (!this.top) {
            this.top = newNode;
        } else {
            newNode.next = this.top;
            this.top = newNode;
        }

        this.length++;
    }

    pop() {
        if (!this.top) {
            return null;
        }

        const removedNode = this.top;
        this.top = this.top.next;
        this.length--;

        removedNode.next = null;
        return removedNode.value;
    }

    peek() {
        return this.top?.value ?? null;
    }

    size() {
        return this.length;
    }

    getAll() {
        const result: T[] = [];
        let current = this.top;

        while (current) {
            result.push(current.value);
            current = current.next;
        }

        return result;
    }

    clear() {
        this.top = null;
        this.length = 0;
    }
}
