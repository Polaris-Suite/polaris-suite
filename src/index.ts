
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