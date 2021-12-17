export interface IResult {
    isEqual: boolean;
    equals: Array<{
        type: string;
        words: Array<string>;
    }>;
}
