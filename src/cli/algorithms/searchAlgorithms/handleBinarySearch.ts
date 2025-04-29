import chalk from "chalk";
import inquirer from "inquirer";
import { binarySearch } from "../../../algorithms/search/binarySearch.js";
import { separator } from "../../utils.js";

export const handleBinarySearch = async () => {
    const { dataType } = await inquirer.prompt<{ dataType: string }>({
        type: "list",
        name: "dataType",
        message: "Choose the type of data to search:",
        choices: ["Numbers", "Strings"],
        loop: false,
    });

    const { elementsInput } = await inquirer.prompt<{ elementsInput: string }>({
        type: "input",
        name: "elementsInput",
        message: "Enter elements separated by commas (will be sorted automatically):",
        validate: (input) => (input.trim() !== "" ? true : chalk.red("Enter at least one element")),
    });

    let elements;
    if (dataType === "Numbers") {
        elements = elementsInput
            .split(",")
            .map((item) => Number(item.trim()))
            .sort((a, b) => a - b);
    } else {
        elements = elementsInput
            .split(",")
            .map((item) => item.trim())
            .sort();
    }

    separator("top");
    console.log(`${chalk.blue("Sorted List:")} ${chalk.cyan(JSON.stringify(elements))}`);
    console.log(chalk.yellow("Note: binary search requires a sorted array"));
    separator();

    displayTimeComplexity();

    while (true) {
        const { operation } = await inquirer.prompt({
            type: "list",
            name: "operation",
            message: "Choose an operation to perform:",
            choices: [
                "Search element",
                "Display sorted elements",
                "Display time complexity",
                "Return to search algorithms menu",
            ],
            loop: false,
        });

        switch (operation) {
            case "Search element": {
                const { target } = await inquirer.prompt<{ target: string }>({
                    type: "input",
                    name: "target",
                    message: "Enter the element to search for:",
                    validate: (input) => (input.trim() !== "" ? true : chalk.red("Enter a search element")),
                });

                const searchTarget = dataType === "Numbers" ? Number(target) : target;
                const result = binarySearch(elements, searchTarget);

                separator("top");
                console.log(`${chalk.blue("Sorted List:")} ${chalk.cyan(JSON.stringify(elements))}`);
                console.log(`${chalk.blue("Target:")} ${chalk.yellow(searchTarget)}`);

                if (result !== -1) {
                    console.log(`${chalk.green("Result:")} Element found at index ${chalk.bold.green(result)}`);
                } else {
                    console.log(`${chalk.red("Result:")} Element ${chalk.bold.red("not found")} in the list`);
                }
                separator("bottom");
                break;
            }

            case "Display sorted elements": {
                separator("top");
                console.log(`${chalk.blue("Sorted List:")} ${chalk.cyan(JSON.stringify(elements))}`);
                separator("bottom");
                break;
            }

            case "Display time complexity": {
                displayTimeComplexity();
                break;
            }

            default:
                return;
        }
    }
};

const displayTimeComplexity = () => {
    separator("top");
    console.log(chalk.yellow("Time Complexity (Big O):"));
    console.log(
        `${chalk.magenta("Binary Search:")} ${chalk.bold.magenta("O(log(n))")} - where n is the number of elements in the list`
    );
    console.log(chalk.cyan("Binary search divides the search interval in half with each step"));
    console.log(chalk.yellow("Note: binary search requires a sorted array to work correctly"));
    separator("bottom");
};
