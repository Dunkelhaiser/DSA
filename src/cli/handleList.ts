import chalk from "chalk";
import inquirer from "inquirer";
import { List } from "../dataStructures/List.js";
import { getInitialValues, separator } from "./utils.js";

export const handleList = async () => {
    const initialValues = await getInitialValues();
    const list = new List(...initialValues);

    displayTimeComplexity();
    displayList(list);

    while (true) {
        const { operation } = await inquirer.prompt({
            type: "list",
            name: "operation",
            message: "Choose an operation to perform on the list:",
            choices: [
                "Push",
                "Pop",
                "Unshift",
                "Shift",
                "Get element at index",
                "Get index of element",
                "Replace element",
                "Display list",
                "Clear list",
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
                list.push(parsedValue);
                separator("top");
                console.log(`Pushed ${value} to the list`);
                displayList(list);
                break;
            }

            case "Pop": {
                const poppedItem = list.pop();
                separator("top");
                if (poppedItem !== undefined) console.log(`Popped element: ${poppedItem}`);
                else console.log("List is empty, nothing to pop");
                displayList(list);
                break;
            }

            case "Unshift": {
                const { value } = await inquirer.prompt<{ value: string }>({
                    type: "input",
                    name: "value",
                    message: "Enter value to unshift:",
                });

                const parsedValue = !isNaN(Number(value)) ? Number(value) : value;
                list.unshift(parsedValue);
                separator("top");
                console.log(`Unshifted ${value} to the list`);
                displayList(list);
                break;
            }

            case "Shift": {
                const shiftedElement = list.shift();
                separator("top");
                if (shiftedElement !== undefined) console.log(`Shifted element: ${shiftedElement}`);
                else console.log("List is empty, nothing to shift");
                displayList(list);
                break;
            }

            case "Get element at index": {
                const { index } = await inquirer.prompt<{ index: number }>({
                    type: "number",
                    name: "index",
                    message: "Enter index to get element from:",
                });

                const element = list.get(index);
                separator("top");
                console.log(`Element at index ${index}: ${element}`);
                separator("bottom");
                break;
            }

            case "Get index of element": {
                const { element } = await inquirer.prompt<{ element: string }>({
                    type: "input",
                    name: "element",
                    message: "Enter element to find index of:",
                });

                const parsedElement = !isNaN(Number(element)) ? Number(element) : element;
                const index = list.getIndex(parsedElement);
                separator("top");
                console.log(index !== -1 ? `Index of element ${element}: ${index}` : `Element ${element} not found`);
                separator("bottom");
                break;
            }

            case "Replace element": {
                const { index, value } = await inquirer.prompt<{
                    index: number;
                    value: string;
                }>([
                    {
                        type: "number",
                        name: "index",
                        message: "Enter index to replace:",
                    },
                    {
                        type: "input",
                        name: "value",
                        message: "Enter new value:",
                    },
                ]);

                const parsedValue = !isNaN(Number(value)) ? Number(value) : value;
                list.replace(index, parsedValue);
                separator("top");
                console.log(`Replaced element at index ${index} with ${value}`);
                displayList(list);
                break;
            }

            case "Clear list":
                list.clear();
                console.log();
                displayList(list);
                console.log("Cleared the list");
                break;

            case "Display list":
                console.log();
                displayList(list);
                break;

            case "Display time complexity":
                displayTimeComplexity();
                break;

            default:
                return;
        }
    }
};

const displayList = <T>(list: List<T>) => {
    separator();
    console.log(chalk.blue("List contents:"));
    console.log(`${chalk.cyan("Values:")} [${chalk.bold.cyan(list.getAll().join(", "))}]`);
    console.log(`${chalk.green("Length:")} ${chalk.bold.green(list.size())}`);
    separator("bottom");
};

const displayTimeComplexity = () => {
    separator("top");
    console.log(chalk.yellow("Time Complexity (Big O):"));
    console.log(`${chalk.magenta("constructor:")} ${chalk.bold.magenta("O(n)")} - n is the number of initial elements`);
    console.log(`${chalk.magenta("push:")} ${chalk.bold.magenta("O(1)")} - constant time`);
    console.log(`${chalk.magenta("pop:")} ${chalk.bold.magenta("O(1)")} - constant time`);
    console.log(`${chalk.magenta("unshift:")} ${chalk.bold.magenta("O(n)")} - must shift all elements`);
    console.log(`${chalk.magenta("shift:")} ${chalk.bold.magenta("O(n)")} - must shift all elements`);
    console.log(`${chalk.magenta("get:")} ${chalk.bold.magenta("O(1)")} - direct index access`);
    console.log(`${chalk.magenta("getIndex:")} ${chalk.bold.magenta("O(n)")} - may need to search entire list`);
    console.log(`${chalk.magenta("getAll:")} ${chalk.bold.magenta("O(n)")} - iterates through all elements`);
    console.log(`${chalk.magenta("replace:")} ${chalk.bold.magenta("O(1)")} - direct index access`);
    console.log(`${chalk.magenta("size:")} ${chalk.bold.magenta("O(1)")} - returns stored length value`);
    console.log(`${chalk.magenta("clear:")} ${chalk.bold.magenta("O(1)")} - resets list`);
    separator("bottom");
};
