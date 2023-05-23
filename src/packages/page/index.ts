import puppeteer from 'puppeteer';
import { CustomError } from '../../helpers/error';
import { bgColor, coloredText } from '../../helpers/cli/cli-formatting';

interface LaunchConfig {
    headless?: boolean;
    slowMo?: number;
}

const defaultConfig: LaunchConfig = {
    headless: false,
    slowMo: 500,
}

export const launch = async (config: LaunchConfig = defaultConfig) => {
    const browser = await puppeteer.launch({
        headless: config.headless,
        slowMo: config.slowMo,
    });
    
    return browser;
}

export const goto = async (url: string) => {
    const [page] = await global.browser.pages();

    try {
        await page.goto(url);
    } catch (error) {
        throw new CustomError(bgColor("Page function").error(), coloredText(error!.toString()).error());
    }

    return page;
}