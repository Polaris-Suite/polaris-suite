type dynamicObject = {
    [key: string]: any;
};

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

// Type definitions for api function return value
type APIResult = {
    statusCode: (code: number) => void,
    hasResponse: (payload: dynamicObject) => void,
    throwsError: (message?: string) => void,
    not: {
        statusCode: (code: number) => void,
        hasResponse: (payload: dynamicObject) => void,
        throwsError: (message?: string) => void,
    }
}

// Type definitions for goto function return value
type PageResult = {
    find: (selector: string) => Promise<ElementHandle<Element>>,
    click: (selector: string) => Promise<ElementHandle<HTMLElement>>,
    dblClick: (selector: string) => Promise<ElementHandle<HTMLElement>>,
    rightClick: (selector: string) => Promise<ElementHandle<HTMLElement>>,
    type: (selector: string, text: string) => Promise<ElementHandle<HTMLElement>>,
    scroll: (c: number, direction?: 'vertical' | 'horizontal' = 'vertical') => Promise<void>,
    hover: (x: number, y: number) => Promise<void>,
    isUrl: (url: string) => boolean
}