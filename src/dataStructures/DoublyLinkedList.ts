class Node<T> {
    value: T;
    next: Node<T> | null;
    prev: Node<T> | null;

    constructor(value: T) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

export class DoublyLinkedList<T> {
    private head: Node<T> | null = null;
    private tail: Node<T> | null = null;
    private length = 0;

    constructor(...initialData: T[]) {
        for (const value of initialData) {
            this.push(value);
        }
    }

    push(value: T) {
        const newNode = new Node(value);

        if (!this.head || !this.tail) {
            this.head = newNode;
            this.tail = this.head;
            this.length = 1;
        } else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
            this.length++;
        }
    }

    pop() {
        if (!this.head || !this.tail) {
            return null;
        }

        const removedNode = this.tail;

        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.tail = this.tail.prev;
            this.tail!.next = null;
            removedNode.prev = null;
        }

        this.length--;
        return removedNode;
    }

    unshift(value: T) {
        const newNode = new Node(value);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
        this.length++;
    }

    shift() {
        if (!this.head) {
            return null;
        }

        const removedNode = this.head;

        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = this.head.next;
            this.head!.prev = null;
            removedNode.next = null;
        }

        this.length--;
        return removedNode;
    }

    getElement(idx: number) {
        if (idx < 0 || idx >= this.length) {
            return null;
        }

        let current: Node<T> | null;

        if (idx < this.length / 2) {
            current = this.head;
            for (let i = 0; i < idx; i++) {
                current = current!.next;
            }
        } else {
            current = this.tail;
            for (let i = this.length - 1; i > idx; i--) {
                current = current!.prev;
            }
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
        const prevNode = this.getElement(index - 1);
        const nextNode = prevNode!.next;

        prevNode!.next = newNode;
        newNode.prev = prevNode;
        newNode.next = nextNode;
        nextNode!.prev = newNode;

        this.length++;
        return true;
    }

    remove(index: number) {
        if (index < 0 || index >= this.length) {
            return null;
        }

        if (index === 0) {
            return this.shift();
        }

        if (index === this.length - 1) {
            return this.pop();
        }

        const removedNode = this.getElement(index);

        removedNode!.prev!.next = removedNode!.next;
        removedNode!.next!.prev = removedNode!.prev;

        removedNode!.next = null;
        removedNode!.prev = null;

        this.length--;
        return removedNode;
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
