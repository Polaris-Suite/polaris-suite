import { bgColor } from "../../helpers/cli/cli-formatting.js";
import { CustomError, callMessage, expectMessage } from "../../helpers/error/index.js";
import { checkEqual } from "../../helpers/index.js";

/**
 *
 * @param fn function to be tested
 * @param params parameters to be passed to the function
 * @returns result object
 */
export const call = (fn: Function, params?: Array<any>): CallResult => {
  const result = {
    iterateWithData: (data: Datatable, options?: WithDataOptions) => {
      for (let i = 0; i < data.length; i++) {
        const { arg, result, isNotEqual } = data[i];
        const isEqual = checkEqual(fn(...arg), result);
        if (options && options.async) {
          (async () => {
            if ((isNotEqual && !isEqual) || (!isNotEqual && !isEqual))
              throw new CustomError(bgColor("Fail").error(), callMessage(result.toString(), fn(...arg).toString(), i + 1));
          })();
        } else {
          if ((isNotEqual && !isEqual) || (!isNotEqual && !isEqual))
            throw new CustomError(bgColor("Fail").error(), callMessage(result.toString(), fn(...arg).toString(), i + 1));
        }
      }
    },
    returns: (result: any) => {
      const res = fn(...params!);

      if (!checkEqual(res, result))
        throw new CustomError(
          bgColor("Fail").error(),
          `${expectMessage(res.toString(), result)}`
        );
    },
    not: {
      returns: (result: any) => {
        const res = fn(...params!);

        if (checkEqual(res, result))
          throw new CustomError(
            bgColor("Fail").error(),
            `${expectMessage(`not to be ${res.toString()}`, result)}`
          );
      },
    },
  };

  return result;
};
