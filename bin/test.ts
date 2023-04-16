#!/usr/bin/env node
import path from "path";
import shell from "shelljs";

export const run = () => {
    const folders = process.argv[2].split("/");
    const location = [process.cwd(), ...folders].join(path.sep);
    
    shell.exec(`node ${location}`);
}

run();