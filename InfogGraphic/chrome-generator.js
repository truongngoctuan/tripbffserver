const puppeteer = require('puppeteer');

const url = "http://localhost:4050";
(async () => {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.goto(url);
    // await page.pdf({
    //     path: 'hn.pdf',
    //     format: 'A4'
    // });
    // await page.screenshot({
    //     path: 'screenshot.png'
    // });

    // await page.waitForSelector('#svgExample');

    // // Select the #svg img element and save the screenshot.
    // const svgImage = await page.$('#svgExample');
    // await svgImage.screenshot({
    //     path: 'svg-screenshot.png',
    //     omitBackground: true,
    // });

    const svgInfoGraphic = await page.$('#info-graphic-base');
    await svgInfoGraphic.screenshot({
        path: 'svg-info-graphic.png',
        omitBackground: true,
    });

    await browser.close();

})();