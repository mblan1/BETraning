import bcrypt from 'bcrypt';

const convertToNumber = (value: string): number => {
    return parseInt(value);
};

const convertToString = (value: number): string => {
    return value.toString();
};

const hashString = (value: string | undefined): Promise<string> => {
    if (!value) {
        return Promise.reject(new Error('Value is undefined'));
    }
    const hashedValue = bcrypt.hash(value, 10);
    return hashedValue;
};

const verifyHash = (value: string, hash: string): Promise<boolean> => {
    const result = bcrypt.compare(value, hash);
    return result;
};

export { convertToNumber, convertToString, hashString, verifyHash };
