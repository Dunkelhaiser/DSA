import chalk from "chalk";
import inquirer from "inquirer";
import { Queue } from "../dataStructures/Queue.js";
import { getInitialValues, separator } from "./utils.js";

export const handleQueue = async () => {
    const initialValues = await getInitialValues();
    const queue = new Queue(...initialValues);

    displayTimeComplexity();
    displayQueue(queue);

    while (true) {
        const { operation } = await inquirer.prompt({
            type: "list",
            name: "operation",
            message: "Choose an operation to perform on the Queue:",
            choices: [
                "Enqueue",
                "Dequeue",
                "Peek",
                "Display queue",
                "Clear queue",
                "Display time complexity",
                "Return to main menu",
            ],
            loop: false,
        });

        switch (operation) {
            case "Enqueue": {
                const { value } = await inquirer.prompt<{ value: string }>({
                    type: "input",
                    name: "value",
                    message: "Enter value to enqueue:",
                });

                const parsedValue = !isNaN(Number(value)) ? Number(value) : value;
                queue.enqueue(parsedValue);
                separator("top");
                console.log(`Enqueued ${value} to the queue`);
                displayQueue(queue);
                break;
            }

            case "Dequeue": {
                const dequeuedValue = queue.dequeue();
                separator("top");
                if (dequeuedValue !== null) console.log(`Dequeued element: ${dequeuedValue}`);
                else console.log("Queue is empty, nothing to dequeue");
                displayQueue(queue);
                break;
            }

            case "Peek": {
                const frontValue = queue.peek();
                separator("top");
                if (frontValue !== null) console.log(`Front element: ${frontValue}`);
                else console.log("Queue is empty, nothing to peek");
                separator("bottom");
                break;
            }

            case "Clear queue":
                queue.clear();
                console.log();
                displayQueue(queue);
                console.log("Cleared the queue");
                break;

            case "Display queue":
                console.log();
                displayQueue(queue);
                break;

            case "Display time complexity":
                displayTimeComplexity();
                break;

            default:
                return;
        }
    }
};

export const displayQueue = <T>(queue: Queue<T>) => {
    separator();
    console.log(chalk.blue("Queue contents:"));
    console.log(`${chalk.cyan("Values:")} [${chalk.bold.cyan(queue.getAll().join(", "))}]`);
    console.log(`${chalk.green("Size:")} ${chalk.bold.green(queue.size())}`);

    const frontValue = queue.peek();
    if (frontValue !== null) {
        console.log(`${chalk.yellow("Front:")} ${chalk.bold.yellow(frontValue)}`);

        const all = queue.getAll();
        if (all.length > 0) {
            console.log(`${chalk.magenta("Back:")} ${chalk.bold.magenta(all[all.length - 1])}`);
        }
    } else {
        console.log(`${chalk.yellow("Front:")} ${chalk.bold.yellow("null")}`);
        console.log(`${chalk.magenta("Back:")} ${chalk.bold.magenta("null")}`);
    }

    separator("bottom");
};

const displayTimeComplexity = () => {
    separator("top");
    console.log(chalk.yellow("Time Complexity (Big O):"));
    console.log(`${chalk.magenta("constructor:")} ${chalk.bold.magenta("O(n)")} - n is the number of initial elements`);
    console.log(`${chalk.magenta("enqueue:")} ${chalk.bold.magenta("O(1)")} - constant time insertion at end`);
    console.log(`${chalk.magenta("dequeue:")} ${chalk.bold.magenta("O(1)")} - constant time removal from front`);
    console.log(`${chalk.magenta("peek:")} ${chalk.bold.magenta("O(1)")} - constant time access to front element`);
    console.log(`${chalk.magenta("size:")} ${chalk.bold.magenta("O(1)")} - returns stored length value`);
    console.log(`${chalk.magenta("getAll:")} ${chalk.bold.magenta("O(n)")} - traverses the entire queue`);
    console.log(`${chalk.magenta("clear:")} ${chalk.bold.magenta("O(1)")} - resets reference pointers`);
    separator("bottom");
};
