import axios from "axios";
import { call } from "./packages/call";
import { expect } from "./packages/expect";

const num = 1;

expect(num).equalsTo(1); 
expect(num).equalsTo(2); 
expect(num).not.equalsTo(4); 
expect(num).toBeNumber(); 
expect(num).toBeString(); 
expect(num).toBeNull(); 
expect(num).toBeArray(); 
expect(num).toBeObject(); 
expect(num).toBeBoolean(); 
expect(num).not.toBeNumber(); 
expect(num).not.toBeString(); 

const add = (a: number, b: number) => a + b;

call(add, [10, 9]).returns(19);
call(add, [10, 9]).not.returns(20);

const data = [
    {
        arg: [1, 3],
        result: 4,
    },
    {
        arg: [1, 3],
        result: 5,
        isNotEqual: true,
    }
]

call(add).iterateWithData(data);

const api = async (id: string) => {
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts/' + id);
    return res.data.userId;
}

call(api).iterateWithData(
    [
        {
            arg: ['1'],
            result: 1,
        },
        {
            arg: ['2'],
            result: 2,
        }
    ],
    {
        async: true,
    }
)