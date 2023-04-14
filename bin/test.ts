#!/usr/bin/env node
import shell from "shelljs";

export const run = () => {

    shell.exec(`node ${process.argv[1]}`);
}

run();