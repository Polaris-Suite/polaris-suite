import { checkEqual } from "../../helpers/index.js";
import { bgColor } from "../../helpers/cli/chalk-cli.js";
import { CustomError, expectMessage } from "../../helpers/error/index.js";

/**
 * 
 * @param actual actual value to be tested
 * @returns expectation object
 */
export const expect = (actual: any): ExpectationResult => {
    let expectation = {
        equalsTo: (expected: any) => {
            if(!checkEqual(actual, expected)){
                throw new CustomError(bgColor('Test Failed').error(), `${expectMessage(expected.toString(), actual)}`);
            }
        },
        toBeNull: () => {
            if(actual !== null){
                throw new CustomError(bgColor('Test Failed').error(), `${expectMessage('null', typeof actual)}`);
            }
        },
        toBeString: () => {
            if(typeof actual !== 'string'){
                throw new CustomError(bgColor('Test Failed').error(), `${expectMessage('string', typeof actual)}`);
            }
        },
        toBeNumber: () => {
            if(typeof actual !== 'number'){
                throw new CustomError(bgColor('Test Failed').error(), `${expectMessage('number', typeof actual)}`);
            }
        },
        toBeBoolean: () => {
            if(typeof actual !== 'boolean'){
                throw new CustomError(bgColor('Test Failed').error(), `${expectMessage('boolean', typeof actual)}`);
            }
        },
        toBeArray: () => {
            if(actual.length > 0 && typeof actual === 'object'){
                console.log('Test Passed');
            }else {
                throw new CustomError(bgColor('Test Failed').error(), `${expectMessage('array', typeof actual)}`);
            }
        },
        toBeObject: () => {
            if(typeof actual !== 'object'){
                throw new CustomError(bgColor('Test Failed').error(), `${expectMessage('object', typeof actual)}`);
            }
        },
        not: {
            equalsTo: (expected: any) => {
                if(checkEqual(actual, expected)){
                    throw new CustomError(bgColor('Test Failed').error(), `${expectMessage(`not ${expected.toString()}`, actual)}`);
                }
            },
            toBeNull: () => {
                if(actual === null){
                    throw new CustomError(bgColor('Test Failed').error(), `${expectMessage('not be null', typeof actual)}`);
                }
            },
            toBeString: () => {
                if(typeof actual === 'string'){
                    throw new CustomError(bgColor('Test Failed').error(), `${expectMessage('not be string', typeof actual)}`);
                }
            },
            toBeNumber: () => {
                if(typeof actual === 'number'){
                    throw new CustomError(bgColor('Test Failed').error(), `${expectMessage('not be number', typeof actual)}`);
                }
            },
            toBeBoolean: () => {
                if(typeof actual === 'boolean'){
                    throw new CustomError(bgColor('Test Failed').error(), `${expectMessage('not be boolean', typeof actual)}`);
                }
            },
            toBeArray: () => {
                if(actual.length <= 0 && typeof actual != 'object'){
                    console.log('Test Passed');
                }else {
                    throw new CustomError(bgColor('Test Failed').error(), `${expectMessage('not be array', typeof actual)}`);
                }
            },
            toBeObject: () => {
                if(typeof actual === 'object'){
                    throw new CustomError(bgColor('Test Failed').error(), `${expectMessage('not be object', typeof actual)}`);
                }
            },
        },
    }

    return expectation;
}