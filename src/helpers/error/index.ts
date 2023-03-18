import { coloredText, formattedText } from "../cli/chalk-cli.js";

export class CustomError extends Error {
    constructor(title: string, message: string) {
        super(message);
        this.name = title;
    }
}

export const expectMessage = (expected: string, found: string) => {
    return coloredText(`Expected ${coloredText(formattedText(expected).underline()).success()} but got ${coloredText(formattedText(found).underline()).warning()}`).error();
}