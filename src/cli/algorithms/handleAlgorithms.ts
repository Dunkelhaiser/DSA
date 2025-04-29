import inquirer from "inquirer";
import { handleSearchAlgorithms } from "./searchAlgorithms/handleSearchAlgorithms.js";

export const handleAlgorithms = async () => {
    while (true) {
        const { option } = await inquirer.prompt<{ option: string }>({
            type: "list",
            name: "option",
            message: "Choose an algorithm category:",
            choices: ["Search Algorithms", "Return to main menu"],
            loop: false,
        });

        switch (option) {
            case "Search Algorithms":
                await handleSearchAlgorithms();
                break;
            default:
                return;
        }
    }
};
