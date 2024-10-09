const convertToNumber = (value: string): number => {
    return parseInt(value);
};

const convertToString = (value: number): string => {
    return value.toString();
};

export { convertToNumber, convertToString };
