import { testEnv } from "../environment/test-environment.js";
import { bgColor, coloredText, formattedText } from "../helpers/cli/cli-formatting.js";

/**
 *
 * @param name name of the test
 * @param fn function to be executed
 */
export const test = (name: string, fn: Function) => {
  // incrementing the number of tests
  testEnv.getCurrentContextResult().numberOfTestCases++;

  // try to execute the function
  try {
    fn();

    console.log(`${bgColor("PASS").success()} ${coloredText(`✓ (${name})`).success()}`)
  } catch (error: any) {
    // incrementing the number of failed test
    testEnv.getCurrentContextResult().numberOfFailedTestCases++;

    // catching the error and printing it
    console.error(coloredText(`Test Failed ${formattedText(`(${name})`).bold()}`).error());  
    
    const stacks = error.stack.split("\n");
    stacks.splice(1, 1);
    stacks.forEach((stack: string) => {
      if (stacks.indexOf(stack) > 1) {
        stack = stack.replace(/file:\/\//, "");
        console.error(coloredText(stack).suppressed());
        return;
      }
      console.error(stack);
    });
    
    console.log();
  }
};

/**
 *
 * @param name name of the suite
 * @param fn function that contains the test functions
 */
export const suite = (name: string, fn: Function) => {
  // storing the previous number of failed tests
  const numberOfTestCasesFailed = testEnv.getCurrentContextResult().numberOfFailedTestCases;
  const numberOfFailedTestsTillNow = numberOfTestCasesFailed;

  // incrementing number of test suites
  testEnv.getCurrentContextResult().numberOfTestSuites++;

  // executing the function
  fn();

  // incrementing number of failed test suites if the number of previous failed test is less than new number of failed test
  if (numberOfFailedTestsTillNow < testEnv.getCurrentContextResult().numberOfFailedTestCases) {
    testEnv.getCurrentContextResult().numberOfFailedTestSuites++;
  }
};

/**
 * logs the result summary after running the tests
 */
export const result = () => {
  const globalVars = testEnv.getCurrentContextResult();

  console.log(
    formattedText(
      `\nTest Suites: ${
        globalVars.numberOfFailedTestSuites > 0
          ? coloredText(`${globalVars.numberOfFailedTestSuites} failed`).error() + ","
          : ""
      } ${coloredText(
        `${globalVars.numberOfTestSuites - globalVars.numberOfFailedTestSuites} passed`
      ).success()}, ${globalVars.numberOfTestSuites} total`
    ).bold()
  );
  console.log(
    formattedText(
      `Test Cases: ${
        globalVars.numberOfFailedTestCases > 0
          ? coloredText(`${globalVars.numberOfFailedTestCases} failed`).error() + ","
          : ""
      } ${coloredText(
        `${globalVars.numberOfTestCases - globalVars.numberOfFailedTestCases} passed`
      ).success()}, ${globalVars.numberOfTestCases} total`
    ).bold()
  );
};
