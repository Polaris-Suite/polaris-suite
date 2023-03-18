#!/usr/bin/env node
import { coloredText, formattedText } from "./helpers/cli/chalk-cli.js";

/**
 * 
 * @param name name of the test
 * @param fn function to be executed
 */
export const test = (name: string, fn: Function) => {
    // numberOfTests++;
    try {
        fn();
    } catch (error) {
        console.log(coloredText(`Test ${formattedText(`(${name})`).bold()} Failed`).error());
        console.log('\n');
        console.log(error);
    }
}