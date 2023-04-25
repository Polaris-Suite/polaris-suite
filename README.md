<h1 style="text-align:center">Polaris Suite</h1>

Polaris suite is a easy to use, light and collaborative web tesiting package for javascript and typescript projects.

Visit [polaris-suite.io](https://github.com/Major-Project-BE2018SE/polaris-suite-web) for detailed information.

## Table of Contents

- [Getting Started](#getting-started)
- [Using Typescript](#using-typescript)
- [Documentation](#documentation)
    - [Functions available](#functions-that-can-be-used)
    - [expect()](#expect)
    - [call()](#call)
    - [component()](#component)
    - [test()](#test)
    - [suite()](#suite)
    - [result()](#result)
- [Types](#types)
    - [DataTable](#datatable)
    - [WithDataOptions](#withdataoptions)

<br />

## Getting Started

Install Polaris-suite using [`npm`](https://www.npmjs.com/package/polaris-suite):

```bash
npm install --save-dev polaris-suite
```

Let's create your first test. Start by creating a function in a file `multiplication.js`.

```js
function multiply(a, b) {
    return a * b;
}
module.exports = multiply;
```

Or, for `es6`

```js
export function multiply(a, b) {
    return a * b;
}
```

Then, create the actual test inside file `multiplication.test.js` ideally located inside `test` folder

```js
import { test, expect } from "polaris-suite";
import { multiply } from "path-to-multiplication.js";

test('multiply 3 * 4 equals 12', () => {
    expect(multiply(3, 4)).equalsTo(12);
});
```

___Note: As of now polaris-suite only supports es6 module and not commonJS___

Now, Add the script in `package.json` to run the test

```json
{
    ... ,
    "scripts": {
        ... ,
        "test": "polaris path-to-multiplication.test.js"
    },
    ...
}
```

Finally, run `npm test` in the terminal and the following message will be printed in the console:

```
PASS ✓ (multiply 3 * 4 equals 12)
```

**Contragtulation, you just created your first test case in polaris-suite and executed it**

For other functions and their property that you can use can be found in the [Docs](#documentation)

<br />

## Using Typescript

Polaris Suite will support typescript out of the box. There will be no need for any extra configuration to get started with typescript with polaris suite.

The only thing to consider will be to give the path to `.js` file instead of `.ts` in the script in `package.json`

✅ `.js`
```diff
{
    ... ,
    "scripts": {
        ... ,
+       "test": "polaris path-to-multiplication.test.js"
    },
    ...
}
```

❌ `.ts`
```diff
{
    ... ,
    "scripts": {
        ... ,
-       "test": "polaris path-to-multiplication.test.ts"
    },
    ...
}
```

<br />

## Documentation

For detailed documentation [docs](https://github.com/Major-Project-BE2018SE/polaris-suite-web)

<br/>

### Functions that can be used

**function** | **Parameters** | **Description**
--|--|--
[**expect()**](#expect) | _actual: any_ | This is the most basic function that can be used in polaris-suite. It takes in a parameter that can be anything.
[**call()**](#call) | _fn: function_, _params?: any[ ]_ | This is another basic function that is used to test functions easily. It takes a function and optionally takes params array.
[**component()**](#component) | _ele: HTML element_ | This is another basic function that is used to test component easily. It takes a HTML element.
[**test()**](#test) | _name: string_, _fn: function_ | This is the function that will be treated as a test case in polaris-suite. It takes a name, and a function with no parameters and return value.
[**suite()**](#suite) | _name: string_, _fn: function_ | This is the function that is used to group the test cases and create a test suite in polaris-suite. It takes a name, and a function with no parameters and return value.
[**result()**](#result) |  | This is the function that will soon be not needed to be explicity called but as of now has to be called in order to get summary of results when using `suite`

<br />

## expect

The most basic function that can be used to test the equality or test the expectation of any kind of data _(string, boolean, function, etc)_.

**Parameters:**
- actual: any

**Returns:**
- void

**Properties**
- ***equalsTo()*** : takes a parameter __expected__ of any type to check euqality with the __`actual`__ value
- ***toBeString()*** : check if __`actual`__ is of **string** type
- ***toBeNull()*** : check if __`actual`__ is of **null** type
- ***toBeBoolean()*** : check if __`actual`__ is of **boolean** type
- ***toBeObject()*** : check if __`actual`__ is of **object** type
- ***not*** : check the negation of equality
    - equalsTo()
    - toBeString()
    - toBeNull()
    - toBeBoolean()
    - toBeArray()
    - toBeObject()

<br />

## call

Another basic function that can be used to test the return value or the expected return value of __functions__

**Parameters:**
- fn: any
- params?: any[ ]

**Returns:**
- void

**Properties**
- ***returns()*** : takes a parameter __result__ of any type and an optional parameter of type [__`WithDataOptions`__](#withdataoptions) to check euqality with the return value of the function.
- ***iterateWithData()*** : similar to returns expect it takes in a parameter of type [__`DataTable`__](#datatable) and an optional parameter of type [__`WithDataOptions`__](#withdataoptions) and iterate over those value to check return value for multiple parameters.
- ***not*** : check the negation of returns
    - returns()

<br />

## component

Another basic function that can be used to test the html component 

**Parameters:**
- ele: HTML element

**Returns:**
- void

**Properties**
- ***haveStyle()*** : takes a parameter __style__ of object type to check if the element has the provided style 
- ***contains()*** : takes a parameter __child__ of type either string or HTML element and check if it is the child element of __ele__
- ***not*** : check the negation
    - haveSytle()
    - contains()

<br />

## test

This function is used to create a test case in polaris-suite. It is recommended to use it alongside [suite()](#suite) function but can be used alone too.

**Parameters:**
- name: string
- fn: function

**Returns:**
- void

**Properties:** no properties, standalone function

<br />

## suite

This function is used to group similar test cases together and run at once with detailed result of each test cases.

**Parameters:**
- name: string
- fn: function

**Returns:**
- void

**Properties:** no properties, standalone function

<br />

## result

Helper function that will soon be no longer needed to be explicitly executed but for now needs to be called when using suite function to get result summary.  

**Parameters:** no parameters

**Returns:**
- void

**Properties**: no properties, standalone function

<br />

## Types

It is a bare minimum guide to some custom types in polaris-suite to better understand its functions and functionality.

To dive deeper, head to [docs - types](https://github.com/Major-Project-BE2018SE/polaris-suite-web)

## DataTable

**type**:
```ts
type DataTable = Array<{ arg: Array<any>, result: any, isNotEqual?: boolean }>
```

**description**:

used in parameter typing of [call()](#call) function to take in the array of parameters to be passed in __iterateWithData()__ function.

<br />

## WithDataOptions

**type**:
```ts
type WithDataOptions = {
    async?: boolean;
}
```

**description**:

used in parameter typing of [call()](#call) function as the optional parameters to specify the function has other properties like __asynchronous__, etc
