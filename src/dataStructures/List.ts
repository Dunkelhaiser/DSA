export class List<T> {
    private length = 0;
    private data: Record<number, T> = {};

    constructor(...initialData: T[]) {
        for (let i = 0; i < initialData.length; i++) {
            this.data[i] = initialData[i];
            this.length++;
        }
    }

    push(item: T) {
        this.data[this.length] = item;
        this.length++;
    }

    pop() {
        if (this.length === 0) return undefined;
        const item = this.data[this.length - 1];
        delete this.data[this.length - 1];
        this.length--;

        return item;
    }

    unshift(item: T) {
        for (let i = this.length; i > 0; i--) {
            this.data[i] = this.data[i - 1];
        }
        this.data[0] = item;
        this.length++;
    }

    shift() {
        if (this.length === 0) return undefined;

        // eslint-disable-next-line prefer-destructuring
        const item = this.data[0];

        for (let i = 0; i < this.length - 1; i++) {
            this.data[i] = this.data[i + 1];
        }
        delete this.data[this.length - 1];
        this.length--;

        return item;
    }

    get(idx: number) {
        return this.data[idx];
    }

    getIndex(element: T) {
        for (let i = 0; i < this.length; i++) {
            if (this.data[i] === element) {
                return i;
            }
        }
        return -1;
    }

    getAll() {
        const result: T[] = [];
        for (let i = 0; i < this.length; i++) {
            result.push(this.data[i]);
        }
        return result;
    }

    replace(idx: number, element: T) {
        if (this.length === 0) this.push(element);
        else if (this.length <= idx) {
            this.data[idx] = element;
            this.length = idx + 1;
        } else this.data[idx] = element;
    }

    size() {
        return this.length;
    }

    clear() {
        this.data = {};
        this.length = 0;
    }
}
