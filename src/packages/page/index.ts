import puppeteer from 'puppeteer';
import { CustomError, expectMessage } from '../../helpers/error';
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

export const goto = async (url: string): Promise<PageResult> => {
    const [page] = await global.browser.pages();

    try {
        await page.goto(url);
    } catch (error) {
        throw new CustomError(bgColor("Page function").error(), coloredText(error!.toString()).error());
    }

    const result: PageResult = {
        find: async (selector: string) => {
            const element = await page.$(selector);

            if(element) {
                return element;
            }

            throw new CustomError(bgColor("Page function").error(), coloredText(`Element with selector ${selector} not found`).error());
        },
        click: async (selector: string) => {
            try {
                await page.click(selector);
            } catch (error) {
                throw new CustomError(bgColor("Page function").error(), coloredText(`Element with selector ${selector} not found`).error());
            }
        },
        type: async (selector: string, text: string) => {
            try {
                await page.type(selector, text);
            } catch (error) {
                throw new CustomError(bgColor("Page function").error(), coloredText(`Element with selector ${selector} not found`).error());
            }
        },
        scroll: async (c: number, direction: 'vertical' | 'horizontal' = 'vertical') => {
            await page.evaluate((c, direction) => {
                if (direction === 'vertical') {
                    window.scrollBy(0, c);
                } else {
                    window.scrollBy(c, 0);
                }
            }, c, direction);
        },
        hover: async (x: number, y: number) => {
            try {
                await page.mouse.move(x, y);
            } catch (error) {
                throw new CustomError(bgColor("Page function").error(), coloredText(error!.toString()).error());
            }
        },
        isUrl: (url: string) => {
            const isUrlCorrect = page.url() === url;

            if (!isUrlCorrect) {
                throw new CustomError(bgColor("Page function").error(), expectMessage(page.url(), url));
            }
        },
        dblClick: async (selector: string) => {
            try {
                await page.click(selector, {clickCount: 2});
            } catch (error) {
                throw new CustomError(bgColor("Page function").error(), coloredText(error!.toString()).error());
            }
        },
        rightClick: async (selector: string) => {
            try {
                await page.click(selector, {button: 'right'});
            } catch (error) {
                throw new CustomError(bgColor("Page function").error(), coloredText(error!.toString()).error());
            }
        }
    }

    return result;
}