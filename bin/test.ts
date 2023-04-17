#!/usr/bin/env node
import { SpawnOptions } from "child_process";
import { joinPathSep } from "./helper.js";
import { spawn } from "child_process";

export const run = () => {
    // correcting the separator for the path given by the users
    const folders = process.argv[2].split("/");

    // joining the current path and the path given by the user
    const finalPath = joinPathSep(process.cwd(), ...folders);
    
    // executing the node command to the path 
    const command = "node";
    const args = [finalPath];
    const options: SpawnOptions = {
        stdio: ["inherit", "pipe", "pipe"]
    }

    const childProcess = spawn(command, args, options);

    childProcess.stdout?.on("data", (data) => {
        console.log(data.toString());
    });

    childProcess.on('error', (err) => {
        console.error(`Error starting child process: ${err}`);
    });

    childProcess.on("close", (code) => {
        console.log(`child process exited with code ${code}`);
    })
}

run();