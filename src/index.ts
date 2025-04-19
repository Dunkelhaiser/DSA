import inquirer from "inquirer";
import { handleDoublyLinkedList } from "./cli/handleDoublyLinkedList.js";
import { handleLinkedList } from "./cli/handleLinkedList.js";
import { handleList } from "./cli/handleList.js";
import { handleUtilityFunctions } from "./cli/handleUtilityFunctions.js";

const mainMenu = async () => {
    while (true) {
        const { option } = await inquirer.prompt<{ option: string }>([
            {
                type: "list",
                name: "option",
                message: "What would you like to work with?",
                choices: ["List", "Linked List", "Doubly Linked List", "Utility Functions", "Exit"],
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
            case "Utility Functions":
                await handleUtilityFunctions();
                break;
            case "Exit":
                process.exit(0);
        }
    }
};

mainMenu().catch((error) => console.error("An error occurred:", error));
