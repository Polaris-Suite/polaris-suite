import { call, component, expect } from ".";
import axios from "axios";


const num = 1;

expect(num).equalsTo(1); // Test passed
expect(num).equalsTo(2); // Test failed
expect(num).not.equalsTo(4); // Test passed

const add = (a: number, b: number) => a + b;

expect(add, [1, 3]).returns(4); // Test passed
expect(add, [1, 3]).returns(5); // Test failed
expect(add, [1, 3]).not.returns(5); // Test passed

expect(add).equalsTo(4); // Error message: Passed argument is a funciton we recommend you use returns for function checking
expect(num).returns(4); // Error message: Passed argument is not a function we recommend you use equalsTo for non-function checking

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

call(add).withData(data);

const api = async (id: string) => {
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts/' + id);
    return res.data.userId;
}

call(api).withData(
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

// const div = document.createElement('div');
// div.innerHTML = 'Hello World';
// div.style.color = 'red';
// div.style.fontSize = '20px';

// component(div).haveStyle({
//     color: 'red',
//     fontSize: '20px',
// }); // Test passed

// component(div).haveStyle({
//     color: 'red',
//     fontSize: '30px',
// }); // Test failed

// component(div).not.haveStyle({
//     color: 'red',
//     fontSize: '30px',
// }); // Test passed