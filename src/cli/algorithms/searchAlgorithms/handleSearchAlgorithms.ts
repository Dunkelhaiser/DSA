import inquirer from "inquirer";
import { handleBinarySearch } from "./handleBinarySearch.js";
import { handleLinearSearch } from "./handleLinearSearch.js";

export const handleSearchAlgorithms = async () => {
    while (true) {
        const { option } = await inquirer.prompt<{ option: string }>({
            type: "list",
            name: "option",
            message: "Choose a search algorithm:",
            choices: ["Linear Search", "Binary Search", "Return to algorithms menu"],
            loop: false,
        });

        switch (option) {
            case "Linear Search":
                await handleLinearSearch();
                break;
            case "Binary Search":
                await handleBinarySearch();
                break;
            default:
                return;
        }
    }
};
