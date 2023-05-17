// import puppeteer from 'puppeteer';

export const Before = async (fn: Function) => {
    fn();
}

export const After = async (fn: Function) => {
    fn();
}

export const BeforeAll = async (fn: Function) => {
    fn();
}

export const AfterAll = async (fn: Function) => {
    fn();
}