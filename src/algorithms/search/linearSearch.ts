export const linearSearch = <T>(data: T[], target: T) => {
    let index = 0;

    for (const item of data) {
        if (item === target) return index;

        index++;
    }

    return -1;
};
