#!/usr/bin/env node
import { coloredText, formattedText } from "./helpers/cli/chalk-cli.js";

// total number of tests (global variable)
let numberOfTests: number = 0;
// total number of failed tests (global variable)
let numberOfFailedTests: number = 0;

/**
 * 
 * @param name name of the test
 * @param fn function to be executed
 */
export const test = (name: string, fn: Function) => {
    // incrementing the number of tests
    numberOfTests++;

    // try to execute the function
    try {
        fn();
    } catch (error) {
        // incrementing the number of failed test
        numberOfFailedTests++;

        // catching the error and printing it
        console.log(coloredText(`Test ${formattedText(`(${name})`).bold()} Failed`).error());
        console.log('\n');
        console.log(error);
    }
}