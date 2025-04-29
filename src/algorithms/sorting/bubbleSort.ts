export const bubbleSort = <T>(initialArr: T[]) => {
    const arr = [...initialArr];

    let swapped: boolean;

    for (let i = 0; i < arr.length; i++) {
        swapped = false;

        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }

        if (!swapped) break;
    }

    return arr;
};
