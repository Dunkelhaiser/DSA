import chalk from "chalk";
import inquirer from "inquirer";
import { HashTable } from "../dataStructures/HashTable.js";
import { separator } from "./utils.js";

export const handleHashTable = async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const hashTable = new HashTable<string | number, any>();

    displayTimeComplexity();
    displayHashTable(hashTable);

    while (true) {
        const { operation } = await inquirer.prompt({
            type: "list",
            name: "operation",
            message: "Choose an operation to perform on the HashTable:",
            choices: [
                "Set key-value pair",
                "Get value by key",
                "Check if key exists",
                "Delete by key",
                "Get all keys",
                "Get all values",
                "Get all entries",
                "Clear hash table",
                "Display hash table",
                "Display time complexity",
                "Return to main menu",
            ],
            loop: false,
        });

        switch (operation) {
            case "Set key-value pair": {
                const { key, value } = await inquirer.prompt<{ key: string; value: string }>([
                    {
                        type: "input",
                        name: "key",
                        message: "Enter key:",
                    },
                    {
                        type: "input",
                        name: "value",
                        message: "Enter value:",
                    },
                ]);

                const parsedKey = !isNaN(Number(key)) ? Number(key) : key;
                const parsedValue = !isNaN(Number(value)) ? Number(value) : value;
                hashTable.set(parsedKey, parsedValue);
                separator("top");
                console.log(`Set ${key} => ${value} in the hash table`);
                displayHashTable(hashTable);
                break;
            }

            case "Get value by key": {
                const { key } = await inquirer.prompt<{ key: string }>({
                    type: "input",
                    name: "key",
                    message: "Enter key to get value:",
                });

                const parsedKey = !isNaN(Number(key)) ? Number(key) : key;
                const value = hashTable.get(parsedKey);
                separator("top");
                if (value !== null) {
                    console.log(`Value for key "${key}": ${value}`);
                } else {
                    console.log(`No value found for key "${key}"`);
                }
                separator("bottom");
                break;
            }

            case "Check if key exists": {
                const { key } = await inquirer.prompt<{ key: string }>({
                    type: "input",
                    name: "key",
                    message: "Enter key to check:",
                });

                const parsedKey = !isNaN(Number(key)) ? Number(key) : key;
                const exists = hashTable.has(parsedKey);
                separator("top");
                if (exists) {
                    console.log(`Key "${key}" exists in the hash table`);
                } else {
                    console.log(`Key "${key}" does not exist in the hash table`);
                }
                separator("bottom");
                break;
            }

            case "Delete by key": {
                const { key } = await inquirer.prompt<{ key: string }>({
                    type: "input",
                    name: "key",
                    message: "Enter key to delete:",
                });

                const parsedKey = !isNaN(Number(key)) ? Number(key) : key;
                const deleted = hashTable.delete(parsedKey);
                separator("top");
                if (deleted) {
                    console.log(`Deleted key-value pair with key "${key}"`);
                } else {
                    console.log(`No key-value pair found with key "${key}"`);
                }
                displayHashTable(hashTable);
                break;
            }

            case "Get all keys": {
                const keys = hashTable.keys();
                separator("top");
                console.log(chalk.blue("Hash table keys:"));
                console.log(`[${chalk.bold.cyan(keys.join(", "))}]`);
                separator("bottom");
                break;
            }

            case "Get all values": {
                const values = hashTable.values();
                separator("top");
                console.log(chalk.blue("Hash table values:"));
                console.log(`[${chalk.bold.cyan(values.join(", "))}]`);
                separator("bottom");
                break;
            }

            case "Get all entries": {
                const entries = hashTable.entries();
                separator("top");
                console.log(chalk.blue("Hash table entries:"));
                if (entries.length === 0) {
                    console.log(chalk.bold.cyan("Empty hash table"));
                } else {
                    entries.forEach(([key, value]) => {
                        console.log(`${chalk.cyan(key)} => ${chalk.bold.green(value)}`);
                    });
                }
                separator("bottom");
                break;
            }

            case "Clear hash table":
                hashTable.clear();
                console.log();
                displayHashTable(hashTable);
                console.log("Cleared the hash table");
                break;

            case "Display hash table":
                console.log();
                displayHashTable(hashTable);
                break;

            case "Display time complexity":
                displayTimeComplexity();
                break;

            default:
                return;
        }
    }
};

export const displayHashTable = <K, V>(hashTable: HashTable<K, V>) => {
    separator();

    const entries = hashTable.entries();

    if (entries.length === 0) {
        console.log(chalk.cyan("Empty hash table"));
    } else {
        console.log(chalk.blue(`Hash table contents:`));
        entries.forEach(([key, value]) => {
            console.log(`  ${chalk.cyan(String(key))} => ${chalk.bold.yellow(value)}`);
        });
    }

    console.log(`${chalk.green("Size:")} ${chalk.bold.green(hashTable.size())}`);
    separator("bottom");
};

const displayTimeComplexity = () => {
    separator("top");
    console.log(chalk.yellow("Time Complexity (Big O):"));
    console.log(`${chalk.magenta("set:")} ${chalk.bold.magenta("O(1)")} - instant lookup of bucket index`);
    console.log(`${chalk.magenta("get:")} ${chalk.bold.magenta("O(1)")} - instant lookup of bucket index`);
    console.log(`${chalk.magenta("has:")} ${chalk.bold.magenta("O(1)")} - instant lookup of bucket index`);
    console.log(`${chalk.magenta("delete:")} ${chalk.bold.magenta("O(1)")} - instant lookup of bucket index`);
    console.log(
        `${chalk.magenta("keys/values/entries:")} ${chalk.bold.magenta("O(n)")} - must iterate through all buckets`
    );
    console.log(`${chalk.magenta("size:")} ${chalk.bold.magenta("O(1)")} - returns stored size value`);
    console.log(`${chalk.magenta("clear:")} ${chalk.bold.magenta("O(1)")} - resets internal array`);
    console.log(`${chalk.magenta("resize:")} ${chalk.bold.magenta("O(n)")} - must rehash all existing entries`);
    separator("bottom");
};
