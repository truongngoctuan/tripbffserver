const moment = require("moment");
const puppeteer = require('puppeteer');


const url = "http://" + process.env.LOTTIE_WEB_HOST + ":" + process.env.LOTTIE_WEB_PORT;
console.log(url);
async function exportInfo(trip) {
    try {

    const browser = await puppeteer.launch({
         headless: true,
         args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto(url, {waitUntil: 'networkidle2'});  
    
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
        draw(trip, INFOGRAPHIC_TYPE.FIRST_RELEASED);
      }, trip);
    await svgInfoGraphic.screenshot({
        path: 'svg-info-graphic.png',
        // omitBackground: true,
    });

    await browser.close();
    }
    catch(err) {
        console.log("ERR on process chrome", err);
    }

};

// await exportInfo();
module.exports = {
    exportInfo
}