class Node<T> {
    value: T;
    next: Node<T> | null;

    constructor(value: T) {
        this.value = value;
        this.next = null;
    }
}

export class LinkedList<T> {
    private head: Node<T> | null = null;
    private tail: Node<T> | null = null;
    private length = 0;

    constructor(...initialData: T[]) {
        for (const value of initialData) {
            const newNode = new Node(value);
            this.push(newNode.value);
        }
    }

    push(value: T) {
        const newNode = new Node(value);

        if (!this.head || !this.tail) {
            this.head = newNode;
            this.tail = this.head;
            this.length = 1;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
            this.length++;
        }
    }

    pop() {
        if (!this.head) {
            return null;
        }

        let temp = this.head;
        let prev = this.head;

        while (temp.next) {
            prev = temp;
            temp = temp.next;
        }

        this.tail = prev;
        this.tail.next = null;
        this.length--;

        if (this.length === 0) {
            this.head = null;
            this.tail = null;
        }

        return temp;
    }

    unshift(value: T) {
        const newNode = new Node(value);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }
        this.length++;
    }

    shift() {
        if (!this.head) {
            return null;
        }

        const removedNode = this.head;
        this.head = this.head.next;
        this.length--;

        if (this.length === 0) {
            this.tail = null;
        }

        removedNode.next = null;

        return removedNode;
    }

    getElement(idx: number) {
        if (idx < 0 || idx >= this.length) {
            return null;
        }

        let current = this.head;

        for (let i = 0; i < idx; i++) {
            current = current!.next;
        }

        return current;
    }

    set(index: number, value: T) {
        const node = this.getElement(index);

        if (node) {
            node.value = value;
            return true;
        }

        return false;
    }

    insert(index: number, value: T): boolean {
        if (index < 0 || index > this.length) {
            return false;
        }

        if (index === 0) {
            this.unshift(value);
            return true;
        }

        if (index === this.length) {
            this.push(value);
            return true;
        }

        const newNode = new Node(value);

        const prev = this.getElement(index - 1);

        if (prev) {
            newNode.next = prev.next;
            prev.next = newNode;
            this.length++;
            return true;
        }

        return false;
    }

    clear() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    getAll() {
        const result: T[] = [];
        let current = this.head;

        while (current) {
            result.push(current.value);
            current = current.next;
        }

        return result;
    }

    getHead() {
        return this.head;
    }

    getTail() {
        return this.tail;
    }

    size() {
        return this.length;
    }
}
