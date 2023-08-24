#!/usr/bin/env node
import fs from 'fs';

import { joinPathSep } from "./helper";
import { testEnv } from "../src/environment/test-environment";
import { result } from '../src/global_functions/index';
import { launch } from '../src/index';

type RunConfig = {
  automation?: boolean;
  headless?: boolean;
}

const getConfigs = (args: string[]): RunConfig => {
  // index of automation flag
  const aIndex = args.indexOf("--automation");
  const automation = aIndex !== -1 ? true : false;

  // index of headless flag
  const hIndex = args.indexOf("--headless");
  const headless = (hIndex !== -1 && args[hIndex+1] === "true") ? true : false;

  const configs = {
    automation,
    headless
  }

  return configs;
}

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

  const config = getConfigs(args);

  // reading the files in the given path
  const testFiles = fs.readdirSync(finalPath)
    .filter(file => {
      return (file.endsWith('.test.js') || file.endsWith('.js') && !file.endsWith('.config.js'))
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

  runTest(testFiles, config);

  process.on('exit', result);
}

const runTest = async (testFiles: string[], config: RunConfig) => {
  testFiles.forEach(async (file, index) => {
    const content = fs.readFileSync(file, 'utf-8');

    let contentWithoutPolarisImport = content;

    // removing the polaris import from the test files after the first file
    if(index !== 0) {
      contentWithoutPolarisImport = content.split("\n").filter(line => {
        return (!line.includes("require(\"polaris-suite\")")) && (!line.includes("require(\"../src\")"));
      }).join("\n");
    }

    try {
      if(config.automation) {
        global.browser = await launch({ headless: config.headless });
      }

      testEnv.runInCurrentContext(contentWithoutPolarisImport);

      if(config.automation) {
        setTimeout(async () => {
          // await global.page.close();
          await global.browser.close();
        }, 10000)
      }
    } catch (error) {
      console.error(error);
    }
  })
}

run();