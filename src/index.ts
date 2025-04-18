import { List } from "./List.js";
import { reverseString } from "./reverseString.js";

const list = new List(1, 2, 3);

console.log("------------------");
console.log("Initial list:");
console.log(`Data: [${list.getAll().toString()}]`);
console.log(`Length: ${list.length}`);
console.log("------------------\n");

console.log("------------------");
list.push(5);
list.unshift(0);

console.log(`List after pushing 5 and unshift 0: [${list.getAll().toString()}]`);
console.log(`Length: ${list.length}`);

list.pop();
list.shift();

console.log(`\nList after pop and shift: [${list.getAll().toString()}]`);
console.log(`Length: ${list.length}`);
console.log("------------------\n");

console.log("------------------");
console.log(`Element at index 0: ${list.get(0)}`);
console.log(`Element at index of 3: ${list.getIndex(3)}`);
console.log(`Element at index of 5 (doesn't exist): ${list.getIndex(5)}`);
console.log(`\nIndex of element 3: ${list.getIndex(3)}`);
console.log(`Index of element 5 (doesn't exist): ${list.getIndex(5)}`);
console.log("------------------\n");

console.log("------------------");
list.replace(0, 10);
console.log(`Element at index 0 after being replaced: ${list.get(0)}`);

list.replace(10, 7);
console.log(`Element at index 10 after being replaced: ${list.get(10)}`);

console.log(`\nList after replacing out of bounds element: [${list.getAll().toString()}]`);
console.log(`Length: ${list.length}`);
console.log("------------------\n");

console.log("------------------");
console.log(list);
console.log("------------------\n");

const str = "Hello";
const reversedStr = reverseString(str);

console.log(`Original string: ${str}`);
console.log(`Reversed string: ${reversedStr}`);
