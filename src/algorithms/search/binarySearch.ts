export const binarySearch = <T>(data: T[], target: T) => {
    let left = 0;
    let right = data.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (data[mid] === target) {
            return mid;
        }

        if (data[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return -1;
};
