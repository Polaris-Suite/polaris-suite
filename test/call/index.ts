// test call function here

import { call } from "../../src/packages/call/index.js";

const add = (a: number, b: number) => a + b;

call(add, [1, 2]).returns(3);

call(add, [3, 4]).not.returns(4);

call(add).iterateWithData([
    {arg: [1, 2], result: 3},
    {arg: [3, 4], result: 6, isNotEqual: true},
])

const asyncFunc = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('data');
        }, 1000);
    })
}

call(asyncFunc).iterateWithData([
    {arg: [], result: 'data'},
], { async: true })