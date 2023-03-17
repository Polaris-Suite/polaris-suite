import { checkEqual } from "../../helpers";

/**
 * 
 * @param actual actual value to be tested
 * @returns expectation object
 */
export const expect = (actual: any): ExpectationResult => {
    let expectation = {
        equalsTo: (expected: any) => {
            console.log(`Test ${checkEqual(actual, expected) ? 'passed' : 'failed'}`);
        },
        toBeNull: () => {
            if(actual === null){
                console.log('Test Passed');
            }else {
                console.log(`Test Failed: Expected null but got ${typeof actual}`)
            }
        },
        toBeString: () => {
            if(typeof actual === 'string'){
                console.log('Test Passed');
            }else {
                console.log(`Test Failed: Expected string but got ${typeof actual}`)
            }
        },
        toBeNumber: () => {
            if(typeof actual === 'number'){
                console.log('Test Passed');
            }else {
                console.log(`Test Failed: Expected number but got ${typeof actual}`)
            }
        },
        toBeBoolean: () => {
            if(typeof actual === 'boolean'){
                console.log('Test Passed');
            }else {
                console.log(`Test Failed: Expected boolean but got ${typeof actual}`)
            }
        },
        toBeArray: () => {
            if(actual.length > 0 && typeof actual === 'object'){
                console.log('Test Passed');
            }else {
                console.log(`Test Failed: Expected array but got ${typeof actual}`)
            }
        },
        toBeObject: () => {
            if(typeof actual === 'object'){
                console.log('Test Passed');
            }else {
                console.log(`Test Failed: Expected object but got ${typeof actual}`)
            }
        },
        not: {
            equalsTo: (expected: any) => {
                console.log(`Test ${!checkEqual(actual, expected) ? 'passed' : 'failed'}`);
            },
            toBeNull: () => {
                if(actual != null){
                    console.log('Test Passed');
                }else {
                    console.log(`Test Failed: Expected not null but got ${typeof actual}`)
                }
            },
            toBeString: () => {
                if(typeof actual != 'string'){
                console.log('Test Passed');
            }else {
                console.log(`Test Failed: Expected not string but got ${typeof actual}`)
            }
            },
            toBeNumber: () => {
                if(typeof actual != 'number'){
                    console.log('Test Passed');
                }else {
                    console.log(`Test Failed: Expected not number but got ${typeof actual}`)
                }
            },
            toBeBoolean: () => {
                if(typeof actual != 'boolean'){
                    console.log('Test Passed');
                }else {
                    console.log(`Test Failed: Expected not boolean but got ${typeof actual}`)
                }
            },
            toBeArray: () => {
                if(actual.length <= 0 && typeof actual != 'object'){
                    console.log('Test Passed');
                }else {
                    console.log(`Test Failed: Expected not array but got ${typeof actual}`)
                }
            },
            toBeObject: () => {
                if(typeof actual != 'object'){
                    console.log('Test Passed');
                }else {
                    console.log(`Test Failed: Expected not object but got ${typeof actual}`)
                }
            },
        },
    }

    return expectation;
}