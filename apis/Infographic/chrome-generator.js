const moment = require("moment");
const puppeteer = require("puppeteer");
const { INFOGRAPHIC_TYPE } = require("./info_graphic_type");

const url =
  "http://" + process.env.LOTTIE_WEB_HOST + ":" + process.env.LOTTIE_WEB_PORT;
console.log(url);

function imagesHaveLoaded(numberOfElements) {
  var elements = document.getElementsByName("imgLoaded");
  return elements.length == numberOfElements;
}

// function waitForPageLoaded(time) {
//   return new Promise(resolve => {
//     setTimeout(function() {
//       resolve();
//     }, time);
//   });
// }

var browser;

async function initBrowser() {
  return await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
}

async function exportInfo(trip) {
  try {
    if (!browser) {
      browser = await initBrowser();
    }
    const page = await browser.newPage();
    page.on("console", msg => {
      for (let i = 0; i < msg.args().length; ++i)
        console.log(`${i}: ${msg.args()[i]}`);
    });
    page.on("pageerror", err => console.log("pageerror", err));
    function logRequest(interceptedRequest) {
      console.log("A request was made:", interceptedRequest.url());
    }
    page.on("request", logRequest);
    page.on("requestfailed", rq => {
      console.log("on requestfailed", rq.url());
    });
    page.on("requestfinished", rq => {
      console.log("on requestfinished", rq.url());
      //   console.log("on requestfinished", rq.respond().status);
    });

    await page.goto(url, { waitUntil: "networkidle0" });

    const info_graphic_type = INFOGRAPHIC_TYPE.FIRST_RELEASED;
    trip = {
      ...trip,
      numberOfDays: moment(trip.toDate).diff(moment(trip.fromDate), "days") + 1,
      locations: trip.locations.map(item => {
        return {
          ...item,
          fromTime: moment(item.fromTime).format("LL"),
          highlights: item.highlights.join(", ")
        };
      })
    };

    console.log("trip", trip);

    const svgInfoGraphic = await page.$("#info-graphic-base");
    var result = await page.evaluate(
      (trip, info_graphic_type) => {
        draw(trip, info_graphic_type);
      },
      trip,
      info_graphic_type
    );

    // // wait for fonts fully loaded --> can we download fonts and copy to tripbff-infographic image ???
    // if (info_graphic_type == INFOGRAPHIC_TYPE.FIRST_RELEASED)
    //   await waitForPageLoaded(1000);

    // wait for all images fully loaded
    await page
      .waitForFunction(
        imagesHaveLoaded,
        { timeout: 30000 },
        trip.locations.length
      )
      .catch(err => {
        console.log(err);
      });

    // const start = (new Date()).getTime();
    return svgInfoGraphic.screenshot({
      // path: "svg-info-graphic.jpg"
      // omitBackground: true,
      type: "jpeg",
      quality: 85,
    })
    .then((buf) => {
      page.close();
      return buf;
    });

    // const end = (new Date()).getTime();
    // const responseTime = end - start;
    // console.log(`screenshot in ${responseTime}`);

    // await page.close();

    // await browser.close();
  } catch (err) {
    console.log("ERR on process chrome", err);
  }
}

// await exportInfo();
module.exports = {
  exportInfo
};
