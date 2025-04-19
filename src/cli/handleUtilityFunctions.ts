import chalk from "chalk";
import inquirer from "inquirer";
import { fizzBuzz, fizzBuzzSet } from "../utils/fizzBuzz.js";
import { reverse } from "../utils/reverse.js";
import { separator } from "./utils.js";

export const handleUtilityFunctions = async () => {
    while (true) {
        const { option } = await inquirer.prompt<{ option: string }>({
            type: "list",
            name: "option",
            message: "Choose a utility function:",
            choices: ["Reverse string/number", "FizzBuzz", "Return to main menu"],
            loop: false,
        });

        switch (option) {
            case "Reverse string/number":
                await handleReverse();
                break;

            case "FizzBuzz":
                await handleFizzBuzzOptions();
                break;

            default:
                return;
        }
    }
};

const handleReverse = async () => {
    const { input } = await inquirer.prompt<{ input: string }>({
        type: "input",
        name: "input",
        message: "Enter string/number to reverse:",
    });

    const result = reverse(input);

    separator("top");
    console.log(`${chalk.blue("Original:")} ${chalk.cyan(input)}`);
    console.log(`${chalk.green("Reversed:")} ${chalk.bold.green(result)}`);
    separator("bottom");
};

const handleFizzBuzzOptions = async () => {
    const { option } = await inquirer.prompt<{ option: string }>({
        type: "list",
        name: "option",
        message: "Choose FizzBuzz option:",
        choices: ["Single number", "Set of numbers", "Return to utility menu"],
        loop: false,
    });

    switch (option) {
        case "Single number":
            await handleFizzBuzzSingle();
            break;

        case "Set of numbers":
            await handleFizzBuzzSet();
            break;
    }
};

const handleFizzBuzzSingle = async () => {
    const { number } = await inquirer.prompt<{ number: number }>({
        type: "number",
        name: "number",
        message: "Enter a number for FizzBuzz:",
        validate: (input) => (input && !isNaN(input) ? true : chalk.red("Enter a valid number")),
    });

    const result = fizzBuzz(number);

    const coloredResult = colorFizzBuzzResult(result);

    separator("top");
    console.log(`${chalk.blue("FizzBuzz result for")} ${chalk.white(number)}: ${coloredResult}`);
    separator("bottom");
};

const handleFizzBuzzSet = async () => {
    const { size } = await inquirer.prompt<{ size: number }>({
        type: "number",
        name: "size",
        message: "Enter the size for FizzBuzz set:",
        validate: (input) =>
            input && !isNaN(input) && input >= 0 ? true : chalk.red("Enter a positive integer number"),
    });

    const results = fizzBuzzSet(size);

    const coloredResults = results.map((item) => colorFizzBuzzResult(item)).join(", ");

    separator("top");
    console.log(`${chalk.blue("FizzBuzz set up to")} ${chalk.white(size)}: ${coloredResults}`);
    separator("bottom");
};

const colorFizzBuzzResult = (result: string | number) => {
    switch (result) {
        case "Fizz":
            return chalk.cyan("Fizz");
        case "Buzz":
            return chalk.yellow("Buzz");
        case "FizzBuzz":
            return chalk.green.bold("FizzBuzz");
        default:
            return chalk.white(result);
    }
};
