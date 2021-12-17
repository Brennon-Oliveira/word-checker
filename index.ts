import { basic, fullWrong, smallWrong } from "./utils/checks";
import { IResult } from "./interfaces/interfaces";

function compare(check: string, word: string, ignore: Array<string> = []) {
    let result: IResult = {
        isEqual: false,
        equals: [],
    };

    if (!ignore.includes("basic")) basic(check, word, result);
    if (!ignore.includes("smallWrong")) smallWrong(check, word, result);
    if (!ignore.includes("fullWrong")) fullWrong(check, word, result);

    return result;
}

function check(
    check: string,
    words: Array<string>,
    ignore: Array<string> = []
) {
    let result: IResult = {
        isEqual: false,
        equals: [],
    };

    words.forEach((word) => {
        if (!ignore.includes("basic")) basic(check, word, result);
        if (!ignore.includes("smallWrong")) smallWrong(check, word, result);
        if (!ignore.includes("fullWrong")) fullWrong(check, word, result);
    });

    return result;
}

function checkAll(
    checks: Array<string>,
    words: Array<string>,
    ignore: Array<string> = []
) {
    let result: any = {};

    checks.forEach((check) => {
        let checkResult: IResult = {
            isEqual: false,
            equals: [],
        };
        words.forEach((word) => {
            if (!ignore.includes("basic")) basic(check, word, checkResult);
            if (!ignore.includes("smallWrong"))
                smallWrong(check, word, checkResult);
            if (!ignore.includes("fullWrong"))
                fullWrong(check, word, checkResult);
        });
        result[check] = checkResult;
    });

    return result;
}

console.log(compare("arvoree", "arvore"));
