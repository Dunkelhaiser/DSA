export const fizzBuzz = (input: number) => {
    if (input === 0) return 0;
    if (input % 3 === 0 && input % 5 === 0) return "FizzBuzz";
    if (input % 3 === 0) return "Fizz";
    if (input % 5 === 0) return "Buzz";
    return input;
};

export const fizzBuzzSet = (size: number) => {
    const result = [];
    for (let i = 0; i <= size; i++) {
        result.push(fizzBuzz(i));
    }
    return result;
};
