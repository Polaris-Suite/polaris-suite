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