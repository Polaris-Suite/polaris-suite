#!/usr/bin/env node
import fs from 'fs';

import { joinPathSep } from "./helper.js";
import { testEnv } from "../src/environment/test-environment.js";
import { result } from '../src/global_functions/index.js';

export const run = async () => {
    // correcting the separator for the path given by the users
    const folders = process.argv[2].split("/");

    // joining the current path and the path given by the user
    const finalPath = joinPathSep(process.cwd(), ...folders);

    // reading the files in the given path
    const testFiles = fs.readdirSync(finalPath)
        .filter(file => {
            return file.endsWith('.test.js')
        })
        .map(file => joinPathSep(process.cwd(), ...folders, file));
    
    runTest(testFiles);
}

const runTest = async (testFiles: string[]) => {
    testFiles.forEach(file => {
        const content = fs.readFileSync(file, 'utf-8');
        
        try {
            testEnv.runInCurrentContext(content);
            // summary
            testEnv.runInCurrentContext(`${result()}`);
        } catch (error) {
            console.error(error)
        }
    })
}

run();