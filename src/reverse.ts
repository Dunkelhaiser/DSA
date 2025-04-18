export const reverse = <T extends string | number>(input: T) => {
    const inputStr = String(input);
    const strArr = [];

    for (const char of inputStr) {
        strArr.unshift(char);
    }

    let reversedStr = "";
    for (const char of strArr) {
        reversedStr += char;
    }

    return (typeof input === "number" ? Number(reversedStr) : reversedStr) as T extends string ? string : number;
};
