import { test, expect } from '../../src/index.js';

const num = 12;

test("Test expect function 1", () => {
    expect(num).equalsTo(12);   
})

test("Test expect function 2", () => {
    expect(num).toBeNumber();   
});