import chalk from "chalk";
import inquirer from "inquirer";
import { linearSearch } from "../../../algorithms/search/linearSearch.js";
import { separator } from "../../utils.js";

export const handleLinearSearch = async () => {
    const { elementsInput } = await inquirer.prompt<{ elementsInput: string }>({
        type: "input",
        name: "elementsInput",
        message: "Enter elements separated by commas:",
        validate: (input) => (input.trim() !== "" ? true : chalk.red("Enter at least one element")),
    });

    const elements = elementsInput.split(",").map((item) => item.trim());

    displayTimeComplexity();

    while (true) {
        const { target } = await inquirer.prompt<{ target: string }>({
            type: "input",
            name: "target",
            message: "Enter the element to search for:",
            validate: (input) => (input.trim() !== "" ? true : chalk.red("Enter a search element")),
        });

        const result = linearSearch(elements, target);

        separator("top");
        console.log(`${chalk.blue("List:")} ${chalk.cyan(JSON.stringify(elements))}`);
        console.log(`${chalk.blue("Target:")} ${chalk.yellow(target)}`);

        if (result !== -1) {
            console.log(`${chalk.green("Result:")} Element found at index ${chalk.bold.green(result)}`);
        } else {
            console.log(`${chalk.red("Result:")} Element ${chalk.bold.red("not found")} in the list`);
        }
        separator("bottom");

        const { option } = await inquirer.prompt<{ option: string }>({
            type: "list",
            name: "option",
            message: "What would you like to do next?",
            choices: ["Search element", "Display time complexity", "Return to search algorithms menu"],
            loop: false,
        });

        if (option === "Return to search algorithms menu") return;
        if (option === "Display time complexity") displayTimeComplexity();
    }
};

const displayTimeComplexity = () => {
    separator("top");
    console.log(chalk.yellow("Time Complexity (Big O):"));
    console.log(
        `${chalk.magenta("Linear Search:")} ${chalk.bold.magenta("O(n)")} - where n is the number of elements in the list`
    );
    separator("bottom");
};
