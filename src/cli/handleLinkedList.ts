import chalk from "chalk";
import inquirer from "inquirer";
import { DoublyLinkedList } from "../dataStructures/DoublyLinkedList.js";
import { LinkedList } from "../dataStructures/LinkedList.js";
import { getInitialValues, separator } from "./utils.js";

export const handleLinkedList = async () => {
    const initialValues = await getInitialValues();
    const linkedList = new LinkedList(...initialValues);

    displayTimeComplexity();
    displayLinkedList(linkedList);

    while (true) {
        const { operation } = await inquirer.prompt({
            type: "list",
            name: "operation",
            message: "Choose an operation to perform on the LinkedList:",
            choices: [
                "Push",
                "Pop",
                "Unshift",
                "Shift",
                "Get element at index",
                "Set element at index",
                "Insert element",
                "Remove element",
                "Display linked list",
                "Clear linked list",
                "Display time complexity",
                "Return to main menu",
            ],
            loop: false,
        });

        switch (operation) {
            case "Push": {
                const { value } = await inquirer.prompt<{ value: string }>({
                    type: "input",
                    name: "value",
                    message: "Enter value to push:",
                });

                const parsedValue = !isNaN(Number(value)) ? Number(value) : value;
                linkedList.push(parsedValue);
                separator("top");
                console.log(`Pushed ${value} to the linked list`);
                displayLinkedList(linkedList);
                break;
            }

            case "Pop": {
                const poppedNode = linkedList.pop();
                separator("top");
                if (poppedNode !== null) console.log(`Popped element: ${poppedNode.value}`);
                else console.log("Linked list is empty, nothing to pop");
                displayLinkedList(linkedList);
                break;
            }

            case "Unshift": {
                const { value } = await inquirer.prompt<{ value: string }>({
                    type: "input",
                    name: "value",
                    message: "Enter value to unshift:",
                });

                const parsedValue = !isNaN(Number(value)) ? Number(value) : value;
                linkedList.unshift(parsedValue);
                separator("top");
                console.log(`Unshifted ${value} to the linked list`);
                displayLinkedList(linkedList);
                break;
            }

            case "Shift": {
                const shiftedNode = linkedList.shift();
                separator("top");
                if (shiftedNode !== null) console.log(`Shifted element: ${shiftedNode.value}`);
                else console.log("Linked list is empty, nothing to shift");
                displayLinkedList(linkedList);
                break;
            }

            case "Get element at index": {
                const { index } = await inquirer.prompt<{ index: number }>({
                    type: "number",
                    name: "index",
                    message: "Enter index to get element from:",
                });

                const node = linkedList.getElement(index);
                separator("top");
                if (node !== null) {
                    console.log(`Element at index ${index}: ${node.value}`);
                } else {
                    console.log(`No element found at index ${index}`);
                }
                separator("bottom");
                break;
            }

            case "Set element at index": {
                const { index, value } = await inquirer.prompt<{
                    index: number;
                    value: string;
                }>([
                    {
                        type: "number",
                        name: "index",
                        message: "Enter index to set:",
                    },
                    {
                        type: "input",
                        name: "value",
                        message: "Enter new value:",
                    },
                ]);

                const parsedValue = !isNaN(Number(value)) ? Number(value) : value;
                const success = linkedList.set(index, parsedValue);
                separator("top");
                if (success) {
                    console.log(`Set element at index ${index} to ${value}`);
                } else {
                    console.log(`Failed to set element at index ${index} (index out of bounds)`);
                }
                displayLinkedList(linkedList);
                break;
            }

            case "Insert element": {
                const { index, value } = await inquirer.prompt<{
                    index: number;
                    value: string;
                }>([
                    {
                        type: "number",
                        name: "index",
                        message: "Enter index to insert at:",
                    },
                    {
                        type: "input",
                        name: "value",
                        message: "Enter value to insert:",
                    },
                ]);

                const parsedValue = !isNaN(Number(value)) ? Number(value) : value;
                const success = linkedList.insert(index, parsedValue);
                separator("top");
                if (success) {
                    console.log(`Inserted ${value} at index ${index}`);
                } else {
                    console.log(`Failed to insert at index ${index} (index out of bounds)`);
                }
                displayLinkedList(linkedList);
                break;
            }

            case "Remove element": {
                const { index } = await inquirer.prompt<{ index: number }>({
                    type: "number",
                    name: "index",
                    message: "Enter index to remove element from:",
                });

                const removedNode = linkedList.remove(index);
                separator("top");
                if (removedNode !== null) {
                    console.log(`Removed element at index ${index}: ${removedNode.value}`);
                } else {
                    console.log(`Failed to remove element at index ${index} (index out of bounds)`);
                }
                displayLinkedList(linkedList);
                break;
            }

            case "Clear linked list":
                linkedList.clear();
                console.log();
                displayLinkedList(linkedList);
                console.log("Cleared the linked list");
                break;

            case "Display linked list":
                console.log();
                displayLinkedList(linkedList);
                break;

            case "Display time complexity":
                displayTimeComplexity();
                break;

            default:
                return;
        }
    }
};

export const displayLinkedList = <T>(linkedList: LinkedList<T> | DoublyLinkedList<T>, name = "Linked list") => {
    separator();
    console.log(chalk.blue(`${name} contents:`));
    console.log(`${chalk.cyan("Values:")} [${chalk.bold.cyan(linkedList.getAll().join(", "))}]`);
    console.log(`${chalk.green("Length:")} ${chalk.bold.green(linkedList.size())}`);

    const head = linkedList.getHead();
    const tail = linkedList.getTail();

    if (head) console.log(`${chalk.yellow("Head:")} ${chalk.bold.yellow(head.value)}`);
    else console.log(`${chalk.yellow("Head:")} ${chalk.bold.yellow("null")}`);

    if (tail) console.log(`${chalk.magenta("Tail:")} ${chalk.bold.magenta(tail.value)}`);
    else console.log(`${chalk.magenta("Tail:")} ${chalk.bold.magenta("null")}`);

    separator("bottom");
};

const displayTimeComplexity = () => {
    separator("top");
    console.log(chalk.yellow("Time Complexity (Big O):"));
    console.log(`${chalk.magenta("constructor:")} ${chalk.bold.magenta("O(n)")} - n is the number of initial elements`);
    console.log(`${chalk.magenta("push:")} ${chalk.bold.magenta("O(1)")} - constant time insertion at tail`);
    console.log(`${chalk.magenta("pop:")} ${chalk.bold.magenta("O(n)")} - must traverse to find new tail`);
    console.log(`${chalk.magenta("unshift:")} ${chalk.bold.magenta("O(1)")} - constant time insertion at head`);
    console.log(`${chalk.magenta("shift:")} ${chalk.bold.magenta("O(1)")} - constant time removal from head`);
    console.log(`${chalk.magenta("getElement:")} ${chalk.bold.magenta("O(n)")} - may need to traverse the whole list`);
    console.log(`${chalk.magenta("set:")} ${chalk.bold.magenta("O(n)")} - uses getElement which is O(n)`);
    console.log(`${chalk.magenta("insert:")} ${chalk.bold.magenta("O(n)")} - may need to traverse to find position`);
    console.log(`${chalk.magenta("remove:")} ${chalk.bold.magenta("O(n)")} - may need to traverse to find position`);
    console.log(`${chalk.magenta("getAll:")} ${chalk.bold.magenta("O(n)")} - traverses the entire list`);
    console.log(`${chalk.magenta("getHead/getTail:")} ${chalk.bold.magenta("O(1)")} - returns stored references`);
    console.log(`${chalk.magenta("size:")} ${chalk.bold.magenta("O(1)")} - returns stored length value`);
    console.log(`${chalk.magenta("clear:")} ${chalk.bold.magenta("O(1)")} - resets reference pointers`);
    separator("bottom");
};
