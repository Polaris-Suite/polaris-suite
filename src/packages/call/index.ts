// import { checkEqual } from "../../helpers";

/**
 * 
 * @param fn function to be tested
 * @param params parameters to be passed to the function
 * @returns result object
 */
// export const call = (fn: Function, params?: Array<any>): CallResult => {
//     const result = {
//         iterateWithData: (data: Datatable, options?: WithDataOptions) => {
//             for (let i = 0; i < data.length; i++) {
//                 const {arg, result, isNotEqual} = data[i];
//                 if(options && options.async) {
//                     (async () => {
//                         if(isNotEqual) console.log(`Itreation ${i+1}: Test ${!checkEqual(await fn(...arg), result) ? 'passed' : 'failed'}`);
//                         else console.log(`Itreation ${i+1}: Test ${checkEqual(await fn(...arg), result) ? 'passed' : 'failed'}`);
//                     })()
//                 }else {
//                     if(isNotEqual) console.log(`Itreation ${i+1}: Test ${!checkEqual(fn(...arg), result) ? 'passed' : 'failed'}`);
//                     else console.log(`Itreation ${i+1}: Test ${checkEqual(fn(...arg), result) ? 'passed' : 'failed'}`);
//                 }
//             }
//         },
//         returns: (result: any) => {
//             console.log(`Test ${checkEqual(fn(...params!), result) ? 'passed' : 'failed'}`);
//         },
//         not: {
//             returns: (result: any) => {
//                 console.log(`Test ${!checkEqual(fn(...params!), result) ? 'passed' : 'failed'}`);
//             }
//         }
//     }

//     return result;
// }