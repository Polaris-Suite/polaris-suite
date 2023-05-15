import { bgColor } from "../../helpers/cli/cli-formatting";
import { CustomError, expectMessage } from "../../helpers/error";
import axios, { Axios, AxiosHeaders, AxiosRequestConfig } from "axios";

type methodTypes = "POST" | "PUT" | "GET" | "DELETE" | "PATCH";

export const api = async (
  url: string,
  method: methodTypes,
  payload?: null | BodyInit,
  header?: AxiosHeaders
) => {
  let options: AxiosRequestConfig<any> = {
    url,
    method,
    headers: header ? header : { "Content-Type": "application/json" },
  };
  if (payload) {
    options.data = payload;
  }
  const response = await axios(options);
  return {
    statusCode: async (code: number) => {
      const status = await response.status;
      if (code !== status) {
        throw new CustomError(
          bgColor("Fail").error(),
          `${expectMessage(code.toString(), status.toString())}`
        );
      }
    },
    // hasResponse: () => {},
  };
};
