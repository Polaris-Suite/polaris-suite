import { testEnv } from "../environment/test-environment.js";
import { bgColor, coloredText, formattedText } from "../helpers/cli/cli-formatting.js";

/**
 *
 * @param name name of the test
 * @param fn function to be executed
 */
export const test = async (name: string, fn: Function) => {
  const env = testEnv.getCurrentContextResult();
  env.numberOfTestCases++;

  try {
    await fn();

    console.log(`${bgColor("PASS").success()} ${coloredText(`✓ (${name})`).success()}`)
    env.numberOfPassedTestCases++;
    env.testSuites[env.numberOfTestSuites - 1].push(1);
  } catch (error: any) {
    // incrementing the number of failed test
    env.testSuites[env.numberOfTestSuites - 1].push(0);
    env.numberOfFailedTestCases++;

    // catching the error and printing it
    console.error(coloredText(`Test Failed ${formattedText(`(${name})`).bold()}`).error());
    console.log();
    
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
  testEnv.getCurrentContextResult().numberOfTestSuites++;
  testEnv.getCurrentContextResult().testSuites.push([]);

  fn();
};

/**
 * 
 * check for total failed and passed suites
 * @param testSuites 
 * @returns 
 */
const calculateSuiteResult = (testSuites: number[][]) => {
  let result = {
    totalSuites: testSuites.length,
    totalFailedSuites: 0,
    totalPassedSuites: 0,
  };

  testSuites.forEach((suite) => {
    if (suite.includes(0)) {
      result.totalFailedSuites++;
    } else {
      result.totalPassedSuites++;
    }
  });

  return result;
}

/**
 * logs the result summary after running the tests
 */
export const result = () => {
  const globalVars = testEnv.getCurrentContextResult();

  const suiteResult = calculateSuiteResult(globalVars.testSuites);

  console.log(
    formattedText(
      `\n${suiteResult.totalSuites} Suites (${
        suiteResult.totalFailedSuites > 0
          ? `${coloredText(`${suiteResult.totalFailedSuites} failed`).error()}, ${coloredText(`${suiteResult.totalPassedSuites} passed`).success()}`
          : coloredText(`${suiteResult.totalPassedSuites} passed`).success()
      })`
    ).bold()
  );
  console.log(
    formattedText(
      `${globalVars.numberOfTestCases} Test Cases (${
        globalVars.numberOfFailedTestCases > 0
          ? `${coloredText(`${globalVars.numberOfFailedTestCases} failed`).error()}, ${coloredText(`${globalVars.numberOfPassedTestCases} passed`).success()}`
          : coloredText(`${globalVars.numberOfTestCases} passed`).success()
      })`
    ).bold()
  );
};
