const moment = require("moment");
const puppeteer = require('puppeteer');


const url = "http://localhost:4050";
async function exportInfo(trip) {
    const browser = await puppeteer.launch({
         headless: true
    });
    const page = await browser.newPage();
    await page.goto(url);

    trip = {
        ...trip,
        numberOfDays: moment(trip.toDate).diff(moment(trip.fromDate), 'days') + 1,
        locations: trip.locations.map(item => {
            return {
                ...item,
                fromTime: moment(item.fromTime).format('LL'),
                highlights: item.highlights.join(', ')
            }
        })
    };

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