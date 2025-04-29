import inquirer from "inquirer";
import { handleAlgorithms } from "./cli/algorithms/handleAlgorithms.js";
import { handleDoublyLinkedList } from "./cli/handleDoublyLinkedList.js";
import { handleHashTable } from "./cli/handleHashTable.js";
import { handleLinkedList } from "./cli/handleLinkedList.js";
import { handleList } from "./cli/handleList.js";
import { handleQueue } from "./cli/handleQueue.js";
import { handleStack } from "./cli/handleStack.js";
import { handleUtilityFunctions } from "./cli/handleUtilityFunctions.js";

const mainMenu = async () => {
    while (true) {
        const { option } = await inquirer.prompt<{ option: string }>([
            {
                type: "list",
                name: "option",
                message: "What would you like to work with?",
                choices: [
                    "List",
                    "Linked List",
                    "Doubly Linked List",
                    "Stack",
                    "Queue",
                    "Hash Table",
                    "Algorithms",
                    "Utility Functions",
                    "Exit",
                ],
                loop: false,
            },
        ]);

        switch (option) {
            case "List":
                await handleList();
                break;
            case "Linked List":
                await handleLinkedList();
                break;
            case "Doubly Linked List":
                await handleDoublyLinkedList();
                break;
            case "Stack":
                await handleStack();
                break;
            case "Queue":
                await handleQueue();
                break;
            case "Hash Table":
                await handleHashTable();
                break;
            case "Algorithms":
                await handleAlgorithms();
                break;
            case "Utility Functions":
                await handleUtilityFunctions();
                break;
            case "Exit":
                process.exit(0);
        }
    }
};

mainMenu().catch((error) => console.error("An error occurred:", error));
