/* eslint-disable no-bitwise */
export class HashTable<K, V> {
    private buckets: [K, V][][];
    private _size: number;
    private capacity: number;
    private readonly CAPACITY_THRESHOLD = 0.75;

    constructor(initialCapacity = 16) {
        this.capacity = initialCapacity;
        this.buckets = new Array(this.capacity).fill(null).map(() => []);
        this._size = 0;
    }

    private hash(key: K) {
        let hashCode: number;

        if (typeof key === "number") {
            hashCode = key;
        } else if (typeof key === "string") {
            hashCode = Array.from(key).reduce((hash, char) => (hash << 5) - hash + char.charCodeAt(0), 0);
        } else {
            hashCode = String(key)
                .split("")
                .reduce((hash, char) => (hash << 5) - hash + char.charCodeAt(0), 0);
        }

        return Math.abs(hashCode) % this.capacity;
    }

    set(key: K, value: V) {
        if (this._size / this.capacity >= this.CAPACITY_THRESHOLD) {
            this.resize();
        }

        const bucketIndex = this.hash(key);
        const bucket = this.buckets[bucketIndex];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket[i] = [key, value];
                return;
            }
        }

        bucket.push([key, value]);
        this._size++;
    }

    get(key: K) {
        const bucketIndex = this.hash(key);
        const bucket = this.buckets[bucketIndex];

        for (const [k, v] of bucket) {
            if (k === key) {
                return v;
            }
        }

        return null;
    }

    has(key: K) {
        const bucketIndex = this.hash(key);
        const bucket = this.buckets[bucketIndex];

        for (const [k] of bucket) {
            if (k === key) {
                return true;
            }
        }

        return false;
    }

    delete(key: K) {
        const bucketIndex = this.hash(key);
        const bucket = this.buckets[bucketIndex];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1);
                this._size--;
                return true;
            }
        }

        return false;
    }

    clear() {
        this.buckets = new Array(this.capacity).fill(null).map(() => []);
        this._size = 0;
    }

    keys() {
        const allKeys: K[] = [];

        for (const bucket of this.buckets) {
            for (const [key] of bucket) {
                allKeys.push(key);
            }
        }

        return allKeys;
    }

    values() {
        const allValues: V[] = [];

        for (const bucket of this.buckets) {
            for (const [, value] of bucket) {
                allValues.push(value);
            }
        }

        return allValues;
    }

    entries() {
        const allEntries: [K, V][] = [];

        for (const bucket of this.buckets) {
            for (const entry of bucket) {
                allEntries.push(entry);
            }
        }

        return allEntries;
    }

    size() {
        return this._size;
    }

    private resize() {
        const oldBuckets = this.buckets;
        this.capacity *= 2;
        this.buckets = new Array(this.capacity).fill(null).map(() => []);
        this._size = 0;

        // rehash all existing entries
        for (const bucket of oldBuckets) {
            for (const [key, value] of bucket) {
                this.set(key, value);
            }
        }
    }
}
