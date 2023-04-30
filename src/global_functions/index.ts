import { coloredText, formattedText } from "../helpers/cli/cli-formatting.js";

// total number of tests (global variable)
let numberOfTests: number = 0;
// total number of failed tests (global variable)
let numberOfFailedTests: number = 0;

let numberOfSuites: number = 0;
let numberOfFailedSuites: number = 0;

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
    console.log(
      coloredText(`Test Failed ${formattedText(`(${name})`).bold()}`).error()
    );
    console.log(error);
  }
};

/**
 *
 * @param name name of the suite
 * @param fn function that contains the test functions
 */
export const suite = (name: string, fn: Function) => {
  // storing the previous number of failed tests
  const numberOfFailedTestsTillNow = numberOfFailedTests;

  // incrementing number of test suites
  numberOfSuites++;

  // executing the function
  fn();

  // incrementing number of failed test suites if the number of previous failed test is less than new number of failed test
  if (numberOfFailedTestsTillNow < numberOfFailedTests) {
    numberOfFailedSuites++;
  }
};

/**
 * logs the result summary after running the tests
 */
export const result = () => {
  console.log("\n");
  console.log(
    formattedText(
      `Test Suites: ${
        numberOfFailedSuites > 0
          ? coloredText(`${numberOfFailedSuites} failed`).error() + ","
          : ""
      } ${coloredText(
        `${numberOfSuites - numberOfFailedSuites} passed`
      ).success()}, ${numberOfSuites} total`
    ).bold()
  );
  console.log(
    formattedText(
      `Test Cases: ${
        numberOfFailedTests > 0
          ? coloredText(`${numberOfFailedTests} failed`).error() + ","
          : ""
      } ${coloredText(
        `${numberOfTests - numberOfFailedTests} passed`
      ).success()}, ${numberOfTests} total`
    ).bold()
  );
};
