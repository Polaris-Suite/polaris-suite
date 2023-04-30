
export const bgColor = (text: string) => {
    return {
        success: () => {
            return `\x1b[42m ${text} \x1b[0m`;
        },
        error: () => {
            return `\x1b[41m ${text} \x1b[0m`;
        },
        warning: () => {
            return `\x1b[43m ${text} \x1b[0m`;
        },
    }
}

export const coloredText = (text: string) => {
    return {
        success: () => {
            return `\x1b[32m${text}\x1b[0m`;
        },
        error: () => {
            return `\x1b[31m${text}\x1b[0m`;
        },
        warning: () => {
            return `\x1b[33m${text}\x1b[0m`;
        },
        suppressed: () => {
            return `\x1b[2m${text}\x1b[0m`;
        }
    }
}

export const formattedText = (text: string) => {
    return {
        bold: () => {
            return `\x1b[1m${text}\x1b[0m`;
        },
        italic: () => {
            return `\x1b[3m${text}\x1b[0m`;
        },
        underline: () => {
            return `\x1b[4m${text}\x1b[0m`;
        },
    }
}