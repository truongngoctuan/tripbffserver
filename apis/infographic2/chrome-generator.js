const moment = require("moment");
const { INFOGRAPHIC_TYPE } = require("./scripts/info_graphic_type");
const genericDraw = require("./scripts/info_graphic_general_draw");
const axios = require("axios");
const _ = require("lodash");

const url =
  "http://" + process.env.LOTTIE_WEB_HOST + ":" + process.env.LOTTIE_WEB_PORT;
console.log(url);

async function getRedirectedUrl(redirectUrl) {
  return redirectUrl;
  return axios.get(redirectUrl).then(response => {
    // console.log(response);
    return response.request.res.responseUrl;
  });
}

async function exportInfo(trip) {
  try {
    const startTimer = new Date().getTime();
    const info_graphic_type = INFOGRAPHIC_TYPE.FIRST_RELEASED;
    trip = {
      ...trip,
      numberOfDays: moment(trip.toDate).diff(moment(trip.fromDate), "days") + 1,
      locations: trip.locations.map(item => {
        return {
          ...item,
          fromTime: moment(item.fromTime, "LL").format("LL"),
          highlights: _.isArray(item.highlights) ? item.highlights.join(", ") : item.highlights,
          signedUrl: item.signedUrl
        };
      })
    };

    // const fetchedUrl = response.request.res.responseURL;
    console.log("trip", JSON.stringify(trip));

    const resultBuf = await genericDraw.draw(trip, info_graphic_type);
    console.log(`TIME ${new Date().getTime() - startTimer} ms: completed`);
    return resultBuf;
  } catch (err) {
    console.log("ERR on export infographic", err);
  }
}

// await exportInfo();
module.exports = {
  exportInfo
};
