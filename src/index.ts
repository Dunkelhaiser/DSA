import { LinkedList } from "./dataStructures/LinkedList.js";
import { List } from "./dataStructures/List.js";
import { fizzBuzz, fizzBuzzSet } from "./fizzBuzz.js";
import { reverse } from "./reverse.js";

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

console.log("------------------");
const str = "Hello";
const reversedStr = reverse(str);

console.log(`Original string: ${str}`);
console.log(`Reversed string: ${reversedStr}`);

const num = 12345;
const reversedNum = reverse(num);

console.log(`\nOriginal number: ${num}`);
console.log(`Reversed number: ${reversedNum}`);
console.log("------------------\n");

console.log("------------------");
console.log(fizzBuzz(9));
console.log(fizzBuzz(20));
console.log(fizzBuzz(15));
console.log(fizzBuzz(4));
console.log();
console.log(fizzBuzzSet(20));
console.log("------------------\n");

const linkedList = new LinkedList(1, 2, 3);

console.log("------------------");
console.log("Initial linked list:");
console.log(`Length: ${linkedList.size()}`);
console.log(`Head: ${linkedList.getHead()?.value}, Tail: ${linkedList.getTail()?.value}`);
console.log("------------------\n");

console.log("------------------");
console.log("Push:");
linkedList.push(4);
console.log(`After pushing 4, length: ${linkedList.size()}`);
console.log(`Head: ${linkedList.getHead()?.value}, Tail: ${linkedList.getTail()?.value}`);
console.log("------------------\n");

console.log("------------------");
console.log("Pop:");
const poppedNode = linkedList.pop();
console.log(`Popped node value: ${poppedNode?.value}`);
console.log(`After popping, length: ${linkedList.size()}`);
console.log(`Head: ${linkedList.getHead()?.value}, Tail: ${linkedList.getTail()?.value}`);
console.log("------------------\n");

console.log("------------------");
console.log("Unshift:");
linkedList.unshift(0);
console.log(`After unshifting 0, length: ${linkedList.size()}`);
console.log(`Head: ${linkedList.getHead()?.value}, Tail: ${linkedList.getTail()?.value}`);
console.log("------------------\n");

console.log("------------------");
console.log("Shift:");
const shiftedNode = linkedList.shift();
console.log(`Shifted node value: ${shiftedNode?.value}`);
console.log(`After shifting, length: ${linkedList.size()}`);
console.log(`Head: ${linkedList.getHead()?.value}, Tail: ${linkedList.getTail()?.value}`);
console.log("------------------\n");

console.log("------------------");
console.log("Get Element:");
const nodeAtIndex1 = linkedList.getElement(1);
console.log(`Node at index 1 value: ${nodeAtIndex1?.value}`);
const nodeAtInvalidIndex = linkedList.getElement(10);
console.log(`Node at invalid index: ${nodeAtInvalidIndex?.value}`);
console.log("------------------\n");

console.log("------------------");
console.log("Set:");
const setResult = linkedList.set(1, 99);
console.log(`Set index 1 to value 99, success: ${setResult}`);
console.log(`Node at index 1 value after set: ${linkedList.getElement(1)?.value}`);
const invalidSetResult = linkedList.set(10, 100);
console.log(`Set invalid index, failure: ${invalidSetResult}`);
console.log("------------------\n");

console.log("------------------");
console.log("Insert Method Example:");
linkedList.insert(1, 50);
console.log(`After inserting 50 at index 1, length: ${linkedList.size()}`);
console.log(`Head: ${linkedList.getHead()?.value}, Tail: ${linkedList.getTail()?.value}`);
console.log(`Values: [${linkedList.getAll().toString()}]`); // Helper function to display values

linkedList.insert(0, -1);
console.log(`After inserting -1 at index 0, length: ${linkedList.size()}`);
console.log(`Head: ${linkedList.getHead()?.value}, Tail: ${linkedList.getTail()?.value}`);
console.log(`Values: [${linkedList.getAll().toString()}]`);

linkedList.insert(linkedList.size(), 100);
console.log(`After inserting 100 at the end, length: ${linkedList.size()}`);
console.log(`Head: ${linkedList.getHead()?.value}, Tail: ${linkedList.getTail()?.value}`);
console.log(`Values: [${linkedList.getAll().toString()}]`);
console.log("------------------\n");

console.log("------------------");
console.log("Clear Method Example:");
linkedList.clear();
console.log(`After clearing, length: ${linkedList.size()}`);
console.log(`Head: ${linkedList.getHead()?.value}, Tail: ${linkedList.getTail()?.value}`);
console.log("------------------\n");
