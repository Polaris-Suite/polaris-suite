import chalk from 'chalk';

export const bgColor = (text: string) => {
    return {
        success: () => {
            return chalk.bgGreen(text+" ");
        },
        error: () => {
            return chalk.bgRed(text+" ");
        },
        warning: () => {
            return chalk.bgYellow(text+" ");
        },
    }
}

export const coloredText = (text: string) => {
    return {
        success: () => {
            return chalk.green(text);
        },
        error: () => {
            return chalk.red(text);
        },
        warning: () => {
            return chalk.yellow(text);
        },
    }
}

export const formattedText = (text: string) => {
    return {
        bold: () => {
            return chalk.bold(text);
        },
        italic: () => {
            return chalk.italic(text);
        },
        underline: () => {
            return chalk.underline(text);
        },
    }
}