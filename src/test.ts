// import axios from "axios";
// import { call } from "./packages/call";
import { test } from "./index.js";
import { expect } from "./packages/expect/index.js";

const num = 1;

test('Testing expect', () => {
    // expect(num).equalsTo(1); 
    // expect(num).equalsTo(2); 
    expect(num).not.equalsTo(1); 
    // expect(num).toBeNumber(); 
    // expect(num).toBeString(); 
    // expect(num).toBeArray(); 
    // expect(num).toBeObject(); 
    // expect(num).toBeBoolean(); 
    // expect(num).not.toBeNumber(); 
    // expect(num).not.toBeNumber(); 

    // expect(num).not.toBeString(); 
    // expect(null).toBeNull();
})

test('Testing expect 2', () => {
    expect(num).equalsTo(1);
})

// const add = (a: number, b: number) => a + b;

// call(add, [10, 9]).returns(19);
// call(add, [10, 9]).not.returns(20);

// const data = [
//     {
//         arg: [1, 3],
//         result: 4,
//     },
//     {
//         arg: [1, 3],
//         result: 5,
//         isNotEqual: true,
//     }
// ]

// call(add).iterateWithData(data);

// const api = async (id: string) => {
//     const res = await axios.get('https://jsonplaceholder.typicode.com/posts/' + id);
//     return res.data.userId;
// }

// call(api).iterateWithData(
//     [
//         {
//             arg: ['1'],
//             result: 1,
//         },
//         {
//             arg: ['2'],
//             result: 2,
//         }
//     ],
//     {
//         async: true,
//     }
// )