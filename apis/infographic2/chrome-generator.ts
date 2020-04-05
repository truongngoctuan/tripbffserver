import moment from "moment";
import { INFOGRAPHIC_TYPE } from "./scripts/info_graphic_type";
import { genericDraw } from "./scripts/info_graphic_general_draw";
import axios from "axios";
import _ from "lodash";

const url =
  "http://" + process.env.LOTTIE_WEB_HOST + ":" + process.env.LOTTIE_WEB_PORT;
console.log(url);

async function getRedirectedUrl(redirectUrl) {
  return redirectUrl;
  return axios.get(redirectUrl).then((response) => {
    // console.log(response);
    return response.request.res.responseUrl;
  });
}

export async function exportInfo(trip) {
  try {
    const startTimer = new Date().getTime();
    const infographicType = INFOGRAPHIC_TYPE.NEW_DESIGN;
    trip = {
      ...trip,
      numberOfDays: moment(trip.toDate).diff(moment(trip.fromDate), "days") + 1,
      locations: trip.locations.map((item) => {
        return {
          ...item,
          fromTime: moment(item.fromTime, "LL").format("LL"),
          highlights: _.isArray(item.highlights)
            ? item.highlights.join(", ")
            : item.highlights,
          signedUrl: item.signedUrl,
        };
      }),
    };

    // const fetchedUrl = response.request.res.responseURL;
    console.log("trip", JSON.stringify(trip));

    const canvasAdaptor = await genericDraw(trip, infographicType);
    canvasAdaptor.draw();
    const resultBuf = canvasAdaptor.toBufferJpeg();
    console.log(`TIME ${new Date().getTime() - startTimer} ms: completed`);
    return resultBuf;
  } catch (err) {
    console.log("ERR on export infographic", err);
  }
}
