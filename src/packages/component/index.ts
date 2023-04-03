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
        contains: (obj: string | HTMLElement) => {
            const child = ele.childNodes[0];
            if(child === obj){
                console.log('Test passed');
            }else {
                console.log('Test failed');
            }
        },
        not: {
            haveStyle: (style: Object) => {
                console.log(`Test ${!ele.style.cssText.includes(style.toString()) ? 'passed' : 'failed'}`)
            },
            contains: (obj: string | HTMLElement) => {
                const child = ele.childNodes[0];
                if(child === obj){
                    console.log('Test failed');
                }else {
                    console.log('Test passed');
                }
            },
        }
    }

    return result;
}