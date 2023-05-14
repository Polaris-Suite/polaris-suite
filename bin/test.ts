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

    // arguments passed by the user
    const args = process.argv.slice(3);

    // index of file to start the test from and end the test at
    const sIndex = args.indexOf("--start");
    const eIndex = args.indexOf("--end");
    const startIndex = sIndex !== -1 ? args[sIndex+1] : null;
    const endIndex = eIndex !== -1 ? args[eIndex+1] : null;

    // index of file the test should run only
    const oIndex = args.indexOf("--only");
    const onlyIndex = oIndex !== -1 ? args[oIndex+1] : null;

    // reading the files in the given path
    const testFiles = fs.readdirSync(finalPath)
        .filter(file => {
            return (file.endsWith('.test.js') || file.endsWith('.js'))
        })
        .filter((file, index) => {
            // if the user has passed the only argument then only run the test for that file
            if (onlyIndex) {
                if (!onlyIndex.includes('.') && index === parseInt(onlyIndex)) {
                    return file;
                } else {
                    if(file === onlyIndex)
                        return file;
                }
            } else {
                // if the user has passed the start and end argument then only run the test for the files in between the start and end index
                if(startIndex) {
                    if(endIndex) {
                        if(index >= parseInt(startIndex) && index <= parseInt(endIndex))
                            return file;
                    }else {
                        if(index >= parseInt(startIndex))
                            return file;
                    }
                } else {
                    if(endIndex) {
                        if(index <= parseInt(endIndex))
                            return file;
                    }
                }
            }

            // if no extra arguments are passed by the user just return all the files
            if(!onlyIndex && !startIndex && !endIndex)
                return file;
            
            return false;
        })
        .map(file => joinPathSep(process.cwd(), ...folders, file));
    
    runTest(testFiles);
}

const runTest = async (testFiles: string[]) => {
    testFiles.forEach((file, index) => {
        const content = fs.readFileSync(file, 'utf-8');

        let contentWithoutPolarisImport = content;

        // removing the polaris import from the test files after the first file
        if(index !== 0) {
            contentWithoutPolarisImport = content.split("\n").filter(line => {
                return (!line.includes("require(\"polaris-suite\")"));
            }).join("\n");
        }
        
        try {
            testEnv.runInCurrentContext(contentWithoutPolarisImport);
        } catch (error) {
            console.error(error)
        }
    })

    testEnv.runInCurrentContext(`${result()}`);
}

run();