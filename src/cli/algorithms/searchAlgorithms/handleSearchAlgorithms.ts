import inquirer from "inquirer";
import { handleLinearSearch } from "./handleLinearSearch.js";

export const handleSearchAlgorithms = async () => {
    while (true) {
        const { option } = await inquirer.prompt<{ option: string }>({
            type: "list",
            name: "option",
            message: "Choose a search algorithm:",
            choices: ["Linear Search", "Return to algorithms menu"],
            loop: false,
        });

        switch (option) {
            case "Linear Search":
                await handleLinearSearch();
                break;
            default:
                return;
        }
    }
};
