import inquirer from "inquirer";
import { DoublyLinkedList } from "../dataStructures/DoublyLinkedList.js";
import { displayLinkedList } from "./handleLinkedList.js";
import { getInitialValues, separator } from "./utils.js";

export const handleDoublyLinkedList = async () => {
    const initialValues = await getInitialValues();
    const doublyLinkedList = new DoublyLinkedList(...initialValues);

    console.log();
    displayLinkedList(doublyLinkedList, "Doubly linked list");

    while (true) {
        const { operation } = await inquirer.prompt({
            type: "list",
            name: "operation",
            message: "Choose an operation to perform on the DoublyLinkedList:",
            choices: [
                "Push",
                "Pop",
                "Unshift",
                "Shift",
                "Get element at index",
                "Set element at index",
                "Insert element",
                "Remove element",
                "Display doubly linked list",
                "Clear doubly linked list",
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
                doublyLinkedList.push(parsedValue);
                separator("top");
                console.log(`Pushed ${value} to the doubly linked list`);
                displayLinkedList(doublyLinkedList, "Doubly linked list");
                break;
            }

            case "Pop": {
                const poppedNode = doublyLinkedList.pop();
                separator("top");
                if (poppedNode !== null) console.log(`Popped element: ${poppedNode.value}`);
                else console.log("Doubly linked list is empty, nothing to pop");
                displayLinkedList(doublyLinkedList, "Doubly linked list");
                break;
            }

            case "Unshift": {
                const { value } = await inquirer.prompt<{ value: string }>({
                    type: "input",
                    name: "value",
                    message: "Enter value to unshift:",
                });

                const parsedValue = !isNaN(Number(value)) ? Number(value) : value;
                doublyLinkedList.unshift(parsedValue);
                separator("top");
                console.log(`Unshifted ${value} to the doubly linked list`);
                displayLinkedList(doublyLinkedList, "Doubly linked list");
                break;
            }

            case "Shift": {
                const shiftedNode = doublyLinkedList.shift();
                separator("top");
                if (shiftedNode !== null) console.log(`Shifted element: ${shiftedNode.value}`);
                else console.log("Doubly linked list is empty, nothing to shift");
                displayLinkedList(doublyLinkedList, "Doubly linked list");
                break;
            }

            case "Get element at index": {
                const { index } = await inquirer.prompt<{ index: number }>({
                    type: "number",
                    name: "index",
                    message: "Enter index to get element from:",
                });

                const node = doublyLinkedList.getElement(index);
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
                const success = doublyLinkedList.set(index, parsedValue);
                separator("top");
                if (success) {
                    console.log(`Set element at index ${index} to ${value}`);
                } else {
                    console.log(`Failed to set element at index ${index} (index out of bounds)`);
                }
                displayLinkedList(doublyLinkedList, "Doubly linked list");
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
                const success = doublyLinkedList.insert(index, parsedValue);
                separator("top");
                if (success) {
                    console.log(`Inserted ${value} at index ${index}`);
                } else {
                    console.log(`Failed to insert at index ${index} (index out of bounds)`);
                }
                displayLinkedList(doublyLinkedList, "Doubly linked list");
                break;
            }

            case "Remove element": {
                const { index } = await inquirer.prompt<{ index: number }>({
                    type: "number",
                    name: "index",
                    message: "Enter index to remove element from:",
                });

                const removedNode = doublyLinkedList.remove(index);
                separator("top");
                if (removedNode !== null) {
                    console.log(`Removed element at index ${index}: ${removedNode.value}`);
                } else {
                    console.log(`Failed to remove element at index ${index} (index out of bounds)`);
                }
                displayLinkedList(doublyLinkedList, "Doubly linked list");
                break;
            }

            case "Clear doubly linked list":
                doublyLinkedList.clear();
                console.log();
                displayLinkedList(doublyLinkedList, "Doubly linked list");
                console.log("Cleared the doubly linked list");
                break;

            case "Display doubly linked list":
                console.log();
                displayLinkedList(doublyLinkedList, "Doubly linked list");
                break;

            default:
                return;
        }
    }
};
