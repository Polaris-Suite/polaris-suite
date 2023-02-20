
const checkEqual = (actual: any, expected: any) => actual===expected;
const checkIsFunction = (fn: any) => (typeof fn === 'function');

/**
 * 
 * @param actual actual value to be tested
 * @param params array of parameters to be passed to the function
 * @returns expectation object
 */
export const expect = (actual: any, params?: Array<any>) => {
    let expectation = {
        equalsTo: (expected: any) => {
            if (checkIsFunction(actual)) 
                console.log('Error: Passed argument is a funciton we recommend you use returns for function checking');
            else 
                console.log(`Test ${checkEqual(actual, expected) ? 'passed' : 'failed'}`);
        },
        returns: (expected: any) => {
            if (checkIsFunction(actual))
                console.log(`Test ${checkEqual(actual(...params!), expected) ? 'passed' : 'failed'}`);
            else
                console.log('Error: Passed argument is not a function we recommend you use equalsTo for non-function checking');
        },
        not: {
            equalsTo: (expected: any) => {
                if(checkIsFunction(actual)) 
                    console.log('Error: Passed argument is a funciton we recommend you use returns for function checking');
                else 
                    console.log(`Test ${!checkEqual(actual, expected) ? 'passed' : 'failed'}`);
            },
            returns: (expected: any) => {
                if (checkIsFunction(actual))
                    console.log(`Test ${!checkEqual(actual(...params!), expected) ? 'passed' : 'failed'}`);
                else
                    console.log('Error: Passed argument is not a function we recommend you use equalsTo for non-function checking');
            }
        },
    }

    return expectation;
}

/**
 * 
 * @param fn function to be tested
 * @returns result object
 */
export const call = (fn: Function) => {
    const result = {
        withData: (data: Datatable, options?: WithDataOptions) => {
            for (let i = 0; i < data.length; i++) {
                const {arg, result, isNotEqual} = data[i];
                if(options && options.async) {
                    (async () => {
                        if(isNotEqual) console.log(`Itreation ${i+1}: Test ${!checkEqual(await fn(...arg), result) ? 'passed' : 'failed'}`);
                        else console.log(`Itreation ${i+1}: Test ${checkEqual(await fn(...arg), result) ? 'passed' : 'failed'}`);
                    })()
                }else {
                    if(isNotEqual) console.log(`Itreation ${i+1}: Test ${!checkEqual(fn(...arg), result) ? 'passed' : 'failed'}`);
                    else console.log(`Itreation ${i+1}: Test ${checkEqual(fn(...arg), result) ? 'passed' : 'failed'}`);
                }
            }
        }
    }

    return result;
}

/**
 * 
 * @param name name of the suite
 * @param fn function to be executed
 */
export const suite = (name: string, fn: Function) => {
    console.log('Testing suite: ' + name);
    fn();
}

/**
 * 
 * @param name name of the test
 * @param fn function to be executed
 */
export const test = (name: string, fn: Function) => {
    console.log('Testing: ' + name);
    fn();
}

/**
 * 
 * @param ele element to be tested
 * @returns result object
 */
export const component = (ele: HTMLElement) => {
    const result = {
        haveStyle: (style: Object) => {
            console.log(`Test ${ele.style.cssText.includes(style.toString()) ? 'passed' : 'failed'}`)
        },
        not: {
            haveStyle: (style: Object) => {
                console.log(`Test ${!ele.style.cssText.includes(style.toString()) ? 'passed' : 'failed'}`)
            }
        }
    }

    return result;
}