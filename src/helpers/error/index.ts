import { coloredText, formattedText } from "../cli/cli-formatting.js";

export class CustomError extends Error {
  constructor(title: string, message: string) {
    super(message);
    this.name = title;
  }
}

export const expectMessage = (expected: string, found: string) => {
  return coloredText(
    `Expected ${coloredText(
      formattedText(expected).underline()
    ).success()} ${coloredText("but got").error()} ${coloredText(
      formattedText(found).underline()
    ).warning()}`
  ).error();
};
