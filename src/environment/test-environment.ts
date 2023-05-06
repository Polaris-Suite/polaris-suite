import { createContext, runInContext } from "vm";
import type { Context } from "vm";
import { expect, call, component, suite } from "../index.js";
import { result } from "../global_functions/index.js";
import path from "path";
import fs from "fs";

export interface ContextVars {
    result: {
        numberOfTestCases: number,
        numberOfFailedTestCases: number,
        numberOfTestSuites: number,
        numberOfFailedTestSuites: number,
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
            module,
            exports,
            require: (filePath: string) => {

                let absolutePath = '';
                if(filePath.startsWith('.')) {
                    absolutePath = path.resolve(__dirname, filePath);
                }else {
                    absolutePath = require.resolve(filePath);
                }

                if (!fs.existsSync(absolutePath)) {
                  throw new Error(`Module ${filePath} not found`);
                }
                return require(absolutePath);
            },
            expect: expect,
            call: call,
            component: component,
            suite: suite,
            result: result,
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
        numberOfTestSuites: 0,
        numberOfFailedTestSuites: 0,
    },
    estimatedTime: 1000,
}

export const testEnv = new TestEnvironment(contextVars);