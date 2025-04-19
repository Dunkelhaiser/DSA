import { Node } from "./LinkedList.js";

export class Queue<T> {
    private first: Node<T> | null = null;
    private last: Node<T> | null = null;
    private length = 0;

    constructor(...initialData: T[]) {
        for (const value of initialData) {
            this.enqueue(value);
        }
    }

    enqueue(value: T) {
        const newNode = new Node(value);

        if (!this.first || !this.last) {
            this.first = newNode;
            this.last = newNode;
        } else {
            this.last.next = newNode;
            this.last = newNode;
        }

        this.length++;
    }

    dequeue() {
        if (!this.first) {
            return null;
        }

        const removedNode = this.first;
        this.first = this.first.next;
        this.length--;

        if (!this.first) {
            this.last = null;
        }

        removedNode.next = null;
        return removedNode.value;
    }

    peek() {
        return this.first?.value ?? null;
    }

    size() {
        return this.length;
    }

    getAll() {
        const result: T[] = [];
        let current = this.first;

        while (current) {
            result.push(current.value);
            current = current.next;
        }

        return result;
    }

    clear() {
        this.first = null;
        this.last = null;
        this.length = 0;
    }
}
