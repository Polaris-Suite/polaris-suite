
// Type definitions for expect function return value 1.0.0
type ExpectationResult = {
    equalsTo: (expected: any) => void;
    toBeNull: () => void;
    toBeString: () => void;
    toBeNumber: () => void;
    toBeBoolean: () => void;
    toBeArray: () => void;
    toBeObject: () => void;
    not: {
        equalsTo: (expected: any) => void;
        toBeNull: () => void;
        toBeString: () => void;
        toBeNumber: () => void;
        toBeBoolean: () => void;
        toBeArray: () => void;
        toBeObject: () => void;
    }
}

// Type definitions for datatable parameter of call function
type Datatable = Array<{arg: Array<any>, result: any, isNotEqual?: boolean}>;

// Type definition for options withData function
type WithDataOptions = {async?: boolean};

// Type definitions for call function return value
type CallResult = {
    iterateWithData: (data: Datatable, options?: WithDataOptions) => void;
    returns: (result: any) => void;
    not: {
        returns: (result: any) => void;
    }
}