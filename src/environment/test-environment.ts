import fs from "fs";
import path from "path";
import jsdom from "jsdom";
import { createContext, runInContext } from "vm";
import type { Context } from "vm";

export interface ContextVars {
  result: {
    numberOfTestCases: number,
    numberOfFailedTestCases: number,
    numberOfPassedTestCases: number,
    numberOfTestSuites: number,
    numberOfFailedTestSuites: number,
    testSuites: number[][],
  },
  estimatedTime: number,
}

// Test Environment
class TestEnvironment {
  private _context: Context;
  private _contextVars: ContextVars;

  constructor(contextVars: ContextVars) {
    this._contextVars = contextVars;
    this._context = createContext({
      contextVars,
      console,
      setTimeout,
      setInterval,
      clearTimeout,
      clearInterval,
      document: new jsdom.JSDOM().window.document,
      module,
      Promise,
      exports,
      fs,
      path,
      require: (filePath: string) => {
        let absolutePath = '';

        // if the path starts with . then it is a relative path, so we need to join it with the current working directory
        if(filePath.startsWith('.')) {
          absolutePath = path.join(process.cwd(), ...process.argv[2].split("/"), filePath);
        }else {
          // else it is an module and can be resloved by require
          absolutePath = require.resolve(filePath);
        }

        // if the file does not exist then throw an error
        if (!fs.existsSync(absolutePath)) {
          throw new Error(`Module ${filePath} not found`);
        }
        return require(absolutePath);
      },
    });
  }

  public runInVMContext = (code: string, context: Context) => {
    return runInContext(code, context);
  };
  public runInCurrentContext = (code: string) => {
    return runInContext(code, this._context);
  };
  public getCurrentContextResult = () => {
    return this._contextVars.result;
  };
  public getCurrentContextEstimatedTime = () => {
    return this._contextVars.estimatedTime;
  }
  public getCurrentContext = () => {
    return this._context;
  }

  public setCurrentContextResult = (result: ContextVars["result"]) => {
    this._contextVars.result = result;
  }
}


const contextVars: ContextVars = {
  result: {
    numberOfTestCases: 0,
    numberOfFailedTestCases: 0,
    numberOfPassedTestCases: 0,
    numberOfTestSuites: 0,
    numberOfFailedTestSuites: 0,
    testSuites: [],
  },
  estimatedTime: 1000,
}

export const testEnv = new TestEnvironment(contextVars);