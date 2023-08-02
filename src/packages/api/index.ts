import { bgColor, coloredText, formattedText } from "../../helpers/cli/cli-formatting";
import { CustomError, expectMessage } from "../../helpers/error";
import axios, { AxiosHeaders, AxiosRequestConfig, AxiosResponse } from "axios";

type methodTypes = "POST" | "PUT" | "GET" | "DELETE" | "PATCH";

export const api = async (
  url: string,
  method: methodTypes,
  payload?: null | BodyInit,
  header?: AxiosHeaders
): Promise<APIResult> => {
  let options: AxiosRequestConfig<any> = {
    url,
    method,
    headers: header ? header : { "Content-Type": "application/json" },
  };
  if (payload) {
    options.data = payload;
  }
  let hasError = false;

  const response: dynamicObject = await axios(options).then((res) => res).catch((err) => {
    hasError = true;
    return err.response;
  });

  return {
    statusCode: (code: number) => {
      const status = response.status;
      if (code !== status) {
        throw new CustomError(
          bgColor("Fail").error(),
          `${expectMessage(code.toString(), status.toString())}`
        );
      }
    },
    hasResponse: (payload: dynamicObject) => {
      const data = response.data;
      
      const keys = Object.keys(payload);
      keys.forEach((key) => {
        if (!data.hasOwnProperty(key)) {
          throw new CustomError(
            bgColor("Fail").error(),
            `Expected "${formattedText(key).bold()}" to be in response but it was not found`
          );
        } else {
          if (data[key] !== payload[key]) {
            throw new CustomError(
              bgColor("Fail").error(),
              `Expected "${formattedText(key).bold()}" to be "${formattedText(coloredText(payload[key]).success()).underline()}" but it was "${formattedText(coloredText(data[key]).error()).underline()}"`
            );
          }
        }
      });
    },
    throwsError: (message?: string) => {
      const errorMessage = response.statusText;

      if(!hasError) {
        throw new CustomError(
          bgColor("Fail").error(),
          `Expected to throw error but it did not`
        );
      }
      if (message && errorMessage !== message) {
        throw new CustomError(
          bgColor("Fail").error(),
          `Expected error to be "${formattedText(coloredText(message).success()).underline()}" but it was "${formattedText(coloredText(errorMessage).error()).underline()}"`
        );
      }
    },
    not: {
      statusCode: (code: number) => {
        const status = response.status;
        if (code === status) {
          throw new CustomError(
            bgColor("Fail").error(),
            `${expectMessage(`not to be ${code.toString()}`, status.toString())}`
          );
        }
      },
      hasResponse: (payload: dynamicObject) => {
        const data = response.data;
        
        const keys = Object.keys(payload);
        keys.forEach((key) => {
          if (data.hasOwnProperty(key)) {
            throw new CustomError(
              bgColor("Fail").error(),
              `Expected "${formattedText(key).bold()}" not to be in response but it was found`
            );
          }
        });
      },
      throwsError: (message?: string) => {
        const errorMessage = response.statusText;
  
        if(hasError) {
          throw new CustomError(
            bgColor("Fail").error(),
            `Expected not to throw error but it did`
          );
        }
        if(message && message === errorMessage) {
          throw new CustomError(
            bgColor("Fail").error(),
            `Expected error not to be "${formattedText(coloredText(message).success()).underline()}" but it was`
          );
        }
      },
    }
  };
};
