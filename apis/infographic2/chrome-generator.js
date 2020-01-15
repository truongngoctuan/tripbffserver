const moment = require("moment");
const { INFOGRAPHIC_TYPE } = require("./scripts/info_graphic_type");
const genericDraw = require("./scripts/info_graphic_general_draw");
const axios = require("axios");

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
          fromTime: moment(item.fromTime).format("LL"),
          highlights: item.highlights.join(", "),
          signedUrl: item.signedUrl
        };
      })
    };

    // const fetchedUrl = response.request.res.responseURL;
    console.log("trip", trip);

    const canvasAdaptor = await genericDraw.draw(trip, info_graphic_type);
    canvasAdaptor.draw();
    var resultBuf = await canvasAdaptor.toBufferJpeg();
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
