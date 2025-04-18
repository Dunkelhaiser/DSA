export const reverseString = (str: string) => {
    const strArr = [];

    for (const char of str) {
        strArr.unshift(char);
    }

    let reversedStr = "";

    for (const char of strArr) {
        reversedStr += char;
    }

    return reversedStr;
};
