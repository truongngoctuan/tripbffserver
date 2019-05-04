const puppeteer = require('puppeteer');

const url = "http://localhost:8080";
async function exportInfo() {
    const browser = await puppeteer.launch({
         headless: false
    });
    const page = await browser.newPage();
    await page.goto(url);

    const svgInfoGraphic = await page.$('#info-graphic-base');
    var result = await page.evaluate(() => {
        console.log("AAaa")
        draw();
      });
    await svgInfoGraphic.screenshot({
        path: 'svg-info-graphic.png',
        // omitBackground: true,
    });

    await browser.close();

};

// await exportInfo();
module.exports = {
    exportInfo
}