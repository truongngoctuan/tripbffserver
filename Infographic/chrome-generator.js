const puppeteer = require('puppeteer');

const url = "http://localhost:8080";
async function exportInfo(trip) {
    const browser = await puppeteer.launch({
         headless: false
    });
    const page = await browser.newPage();
    await page.goto(url);

    const svgInfoGraphic = await page.$('#info-graphic-base');
    var result = await page.evaluate((trip) => {        
        draw(trip);
      }, trip);
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