import path from "path";

// joining the path with the correct separator
export const joinPathSep = (...paths: string[]) => {
    return paths.join(path.sep);
}