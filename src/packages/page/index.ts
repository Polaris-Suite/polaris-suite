import puppeteer from 'puppeteer';
import { CustomError } from '../../helpers/error';
import { bgColor, coloredText } from '../../helpers/cli/cli-formatting';

interface PageConfig {
    headless?: boolean;
    slowMo?: number;
}

const defaultConfig: PageConfig = {
    headless: false,
    slowMo: 500,
}

export const page = async (config: PageConfig = defaultConfig) => {
    const browser = await puppeteer.launch({
        headless: config.headless || false,
        slowMo: config.slowMo || 500,
    });

    if(!browser) {
        throw new CustomError("Page function", "Browser not set properly");
    }

    const page = await browser.newPage();

    if(!page) {
        throw new CustomError("Page function", "Page not set properly");
    }

    return {
        open: async (url: string) => await page.goto(url),
        close: async () => {
            await page.close();
            await browser.close();
        },
        click: async (selector: string) => {
            try {
                await page.click(selector)
            } catch (error) {
                // console.log(error);
                throw new CustomError(bgColor("Page function").error(), coloredText(error!.toString()).error());
            }
        },
        type: async (selector: string, text: string) => await page.type(selector, text),
        waitForSelector: async (selector: string) => await page.waitForSelector(selector),
    };
}

export const browser = async (config: PageConfig = defaultConfig) => {
    const browser = await puppeteer.launch({
        headless: config.headless || false,
        slowMo: config.slowMo || 500,
    });
    
    return {
        _ : browser,
        close: async () => await browser.close(),
    }
}