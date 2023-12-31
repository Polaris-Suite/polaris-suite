import { checkEqual } from "../../helpers/index.js";
import { bgColor } from "../../helpers/cli/cli-formatting.js";
import { CustomError, expectMessage } from "../../helpers/error/index.js";

/**
 *
 * @param actual actual value to be tested
 * @returns expectation object
 */
export const expect = (actual: any): ExpectationResult => {
  let expectation = {
    toBe: (expected: any) => {
      if (!checkEqual(actual, expected)) {
        throw new CustomError(
          bgColor("Fail").error(),
          `${expectMessage(expected.toString(), actual)}`
        );
      }
    },
    toBeNull: () => {
      if (actual !== null) {
        throw new CustomError(
          bgColor("Fail").error(),
          `${expectMessage("null", typeof actual)}`
        );
      }
    },
    toBeUndefined: () => {
      if(actual !== undefined) {
        throw new CustomError(
          bgColor("Fail").error(),
          `${expectMessage("undefined", typeof actual)}`
        );
      }
    },
    toBeString: () => {
      if (typeof actual !== "string") {
        throw new CustomError(
          bgColor("Fail").error(),
          `${expectMessage("string", typeof actual)}`
        );
      }
    },
    toBeNumber: () => {
      if (typeof actual !== "number") {
        throw new CustomError(
          bgColor("Fail").error(),
          `${expectMessage("number", typeof actual)}`
        );
      }
    },
    toBeBoolean: () => {
      if (typeof actual !== "boolean") {
        throw new CustomError(
          bgColor("Fail").error(),
          `${expectMessage("boolean", typeof actual)}`
        );
      }
    },
    toBeArray: () => {
      if (actual.length > 0 && typeof actual === "object") {
        console.log("Test Passed");
      } else {
        throw new CustomError(
          bgColor("Fail").error(),
          `${expectMessage("array", typeof actual)}`
        );
      }
    },
    toBeObject: () => {
      if (typeof actual !== "object") {
        throw new CustomError(
          bgColor("Fail").error(),
          `${expectMessage("object", typeof actual)}`
        );
      }
    },
    not: {
      toBe: (expected: any) => {
        if (checkEqual(actual, expected)) {
          throw new CustomError(
            bgColor("Fail").error(),
            `${expectMessage(`not ${expected.toString()}`, actual)}`
          );
        }
      },
      toBeNull: () => {
        if (actual === null) {
          throw new CustomError(
            bgColor("Fail").error(),
            `${expectMessage("not be null", typeof actual)}`
          );
        }
      },
      toBeUndefined: () => {
        if (actual === undefined) {
          throw new CustomError(
            bgColor("Fail").error(),
            `${expectMessage("not be undefined", typeof actual)}`
          );
        }
      },
      toBeString: () => {
        if (typeof actual === "string") {
          throw new CustomError(
            bgColor("Fail").error(),
            `${expectMessage("not be string", typeof actual)}`
          );
        }
      },
      toBeNumber: () => {
        if (typeof actual === "number") {
          throw new CustomError(
            bgColor("Fail").error(),
            `${expectMessage("not be number", typeof actual)}`
          );
        }
      },
      toBeBoolean: () => {
        if (typeof actual === "boolean") {
          throw new CustomError(
            bgColor("Fail").error(),
            `${expectMessage("not be boolean", typeof actual)}`
          );
        }
      },
      toBeArray: () => {
        if (actual.length <= 0 && typeof actual != "object") {
          console.log("Test Passed");
        } else {
          throw new CustomError(
            bgColor("Fail").error(),
            `${expectMessage("not be array", typeof actual)}`
          );
        }
      },
      toBeObject: () => {
        if (typeof actual === "object") {
          throw new CustomError(
            bgColor("Fail").error(),
            `${expectMessage("not be object", typeof actual)}`
          );
        }
      },
    },
  };

  return expectation;
};
