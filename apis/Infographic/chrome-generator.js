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

var browser;
var page;

async function initBrowser() {
  return await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
}

async function initPage() {
  if (page) {
    const startPageClose = new Date().getTime();
    page.close();
    console.log(`TIME: ${new Date().getTime() - startPageClose} ms page close`);
  }

  const startNewPage = new Date().getTime();
  page = await browser.newPage();
  console.log(`TIME: ${new Date().getTime() - startNewPage} ms new page`);

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

  // todo we no longer need to wait for network ??
  const startPageLoad = new Date().getTime();
  await page.goto(url, { waitUntil: "networkidle0" });
  console.log(`TIME: ${new Date().getTime() - startPageLoad} ms page load`);
  return page;
}

async function exportInfo(trip) {
  try {
    // if (!browser) {
    //   browser = await initBrowser();
    // }
    // page = await initPage();

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
    const startSvg = new Date().getTime();
    const svgInfoGraphic = await page.$("#info-graphic-base");
    console.log(`TIME: ${new Date().getTime() - startSvg} ms wait for svg`);

    const startSvgRendered = new Date().getTime();
    var result = await page.evaluate(
      (trip, info_graphic_type) => {
        draw(trip, info_graphic_type);
      },
      trip,
      info_graphic_type
    );
    console.log(
      `TIME: ${new Date().getTime() -
        startSvgRendered} ms wait for image rendered`
    );

    // wait for all images fully loaded
    // todo can we just sign url ourself ?? no need to call api to trip-api ??
    const startImageLoaded = new Date().getTime();
    await page
      .waitForFunction(
        imagesHaveLoaded,
        { timeout: 30000 },
        trip.locations.length
      )
      .catch(err => {
        console.log(err);
      });
    console.log(
      `TIME: ${new Date().getTime() -
        startImageLoaded} ms wait for image loaded`
    );

    const startScreenshot = new Date().getTime();
    return svgInfoGraphic
      .screenshot({
        // path: "svg-info-graphic.jpg"
        // omitBackground: true,
        type: "jpeg",
        quality: 85
      })
      .then(buf => {
        console.log(
          `TIME: ${new Date().getTime() -
            startScreenshot} ms wait for screenshot`
        );

        return buf;
      });

    // await page.close();

    // await browser.close();
  } catch (err) {
    console.log("ERR on process chrome", err);
  }
}

// await exportInfo();
module.exports = {
  exportInfo,
  initPage: async () => {
    if (!browser) {
      browser = await initBrowser();
    }
    page = await initPage();
  }
};
