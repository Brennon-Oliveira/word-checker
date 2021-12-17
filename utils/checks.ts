import { IResult } from "../interfaces/interfaces";

function basic(check: string, word: string, result: IResult) {
    let checkAlt = check
        .toLowerCase()
        .trim()
        .replace(/ /g, "")
        .replace(/-/g, "");
    let wordAlt = word.toLowerCase().trim().replace(/ /g, "").replace(/-/g, "");

    if (checkAlt === wordAlt) {
        result.isEqual = true;

        let equalsIndex = findCheckType(result, "basic");
        if (equalsIndex !== -1) {
            result.equals[equalsIndex].words.push(word);
        } else {
            result.equals.push({
                words: [word],
                type: "basic",
            });
        }
    }
}

function smallWrong(check: string, word: string, result: IResult) {
    if (check.length === word.length) {
        let similarChars = 0;
        for (let checkChar = 0; checkChar < check.length; checkChar++) {
            let checkAlt = check[checkChar];
            let wordAlt = word[checkChar];
            if (checkAlt === wordAlt) {
                similarChars++;
            }
        }

        let similarPercent = (100 * similarChars) / check.length;

        if (
            similarPercent >= 85 ||
            (similarChars === check.length - 1 && check.length + 4)
        ) {
            result.isEqual = true;

            let equalsIndex = findCheckType(result, "smallWrong");
            if (equalsIndex !== -1) {
                result.equals[equalsIndex].words.push(word);
            } else {
                result.equals.push({
                    words: [word],
                    type: "smallWrong",
                });
            }
        }
    }
}

function fullWrong(check: string, word: string, result: IResult) {
    let similarChars = 0;
    let useLength = check.length >= word.length ? check.length : word.length;
    for (let useChar = 0; useChar < useLength; useChar++) {
        let checkAlt = check[useChar];
        let wordAlt = word[useChar];
        if (checkAlt === wordAlt) {
            similarChars++;
        }
    }

    let similarPercent = (100 * similarChars) / useLength;

    if (
        similarPercent >= 80 ||
        (similarChars === useLength - 1 && useLength > 4)
    ) {
        result.isEqual = true;

        let equalsIndex = findCheckType(result, "fullWrong");
        if (equalsIndex !== -1) {
            result.equals[equalsIndex].words.push(word);
        } else {
            result.equals.push({
                words: [word],
                type: "fullWrong",
            });
        }
    }
}

function findCheckType(result: IResult, type: string) {
    return result.equals.findIndex((word) => word.type === type);
}

export { basic, smallWrong, fullWrong };
