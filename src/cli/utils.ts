import chalk from "chalk";
import inquirer from "inquirer";

export const getInitialValues = async () => {
    const { hasInitialValues } = await inquirer.prompt<{ hasInitialValues: boolean }>({
        type: "confirm",
        name: "hasInitialValues",
        message: "Do you want to provide initial values?",
        default: true,
    });

    if (!hasInitialValues) return [];

    const { values } = await inquirer.prompt<{ values: string }>({
        type: "input",
        name: "values",
        message: "Enter initial values separated by commas:",
        default: "1,2,3",
    });

    return values.split(",").map((val: string) => {
        const trimmed = val.trim();
        const num = Number(trimmed);
        return !isNaN(num) ? num : trimmed;
    });
};

export const separator = (margin?: "top" | "bottom") => {
    if (margin === "top") {
        console.log();
        console.log(chalk.dim("-".repeat(25)));
    } else if (margin === "bottom") {
        console.log(chalk.dim("-".repeat(25), "\n"));
    } else {
        console.log(chalk.dim("-".repeat(25)));
    }
};
