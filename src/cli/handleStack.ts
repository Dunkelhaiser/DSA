import chalk from "chalk";
import inquirer from "inquirer";
import { Stack } from "../dataStructures/Stack.js";
import { getInitialValues, separator } from "./utils.js";

export const handleStack = async () => {
    const initialValues = await getInitialValues();
    const stack = new Stack(...initialValues);

    displayTimeComplexity();
    displayStack(stack);

    while (true) {
        const { operation } = await inquirer.prompt({
            type: "list",
            name: "operation",
            message: "Choose an operation to perform on the Stack:",
            choices: [
                "Push",
                "Pop",
                "Peek",
                "Display stack",
                "Clear stack",
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
                    message: "Enter value to push onto the stack:",
                });

                const parsedValue = !isNaN(Number(value)) ? Number(value) : value;
                stack.push(parsedValue);
                separator("top");
                console.log(`Pushed ${value} onto the stack`);
                displayStack(stack);
                break;
            }

            case "Pop": {
                const poppedValue = stack.pop();
                separator("top");
                if (poppedValue !== null) console.log(`Popped element: ${poppedValue}`);
                else console.log("Stack is empty, nothing to pop");
                displayStack(stack);
                break;
            }

            case "Peek": {
                const topValue = stack.peek();
                separator("top");
                if (topValue !== null) console.log(`Top element: ${topValue}`);
                else console.log("Stack is empty, nothing to peek");
                separator("bottom");
                break;
            }

            case "Clear stack":
                stack.clear();
                console.log();
                displayStack(stack);
                console.log("Cleared the stack");
                break;

            case "Display stack":
                console.log();
                displayStack(stack);
                break;

            case "Display time complexity":
                displayTimeComplexity();
                break;

            default:
                return;
        }
    }
};

export const displayStack = <T>(stack: Stack<T>) => {
    separator();
    console.log(chalk.blue("Stack contents:"));
    console.log(`${chalk.cyan("Values:")} [${chalk.bold.cyan(stack.getAll().join(", "))}]`);
    console.log(`${chalk.green("Size:")} ${chalk.bold.green(stack.size())}`);

    const topValue = stack.peek();
    if (topValue !== null) console.log(`${chalk.yellow("Top:")} ${chalk.bold.yellow(topValue)}`);
    else console.log(`${chalk.yellow("Top:")} ${chalk.bold.yellow("null")}`);

    separator("bottom");
};

const displayTimeComplexity = () => {
    separator("top");
    console.log(chalk.yellow("Time Complexity (Big O):"));
    console.log(`${chalk.magenta("constructor:")} ${chalk.bold.magenta("O(n)")} - n is the number of initial elements`);
    console.log(`${chalk.magenta("push:")} ${chalk.bold.magenta("O(1)")} - constant time insertion at top`);
    console.log(`${chalk.magenta("pop:")} ${chalk.bold.magenta("O(1)")} - constant time removal from top`);
    console.log(`${chalk.magenta("peek:")} ${chalk.bold.magenta("O(1)")} - constant time access to top element`);
    console.log(`${chalk.magenta("size:")} ${chalk.bold.magenta("O(1)")} - returns stored length value`);
    console.log(`${chalk.magenta("getAll:")} ${chalk.bold.magenta("O(n)")} - traverses the entire stack`);
    console.log(`${chalk.magenta("clear:")} ${chalk.bold.magenta("O(1)")} - resets reference pointers`);
    separator("bottom");
};
