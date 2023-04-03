import { test } from "../../src/index.js";
import { expect } from "../../src/packages/expect/index.js";

const num = 12;

test("Test expect function 1", () => {
    expect(num).equalsTo(12);   
})

test("Test expect function 2", () => {
    expect(num).toBeNumber();   
});