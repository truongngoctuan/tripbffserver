const {
  LOCALE_EN,
  FEELING_LABEL_EN,
  FEELING_LABEL_VI
} = require("../configs/constants");
function getFeelingLabel(locale) {
  return locale == LOCALE_EN ? FEELING_LABEL_EN : FEELING_LABEL_VI;
}

function getDayLabel(locale, numberOfDays) {
  let dayLabel = "";

  if (numberOfDays > 1) {
    dayLabel = locale == LOCALE_EN ? DAYS_LABEL_EN : DAY_LABEL_VI;
  } else {
    dayLabel = locale == LOCALE_EN ? DAY_LABEL_EN : DAY_LABEL_VI;
  }

  return dayLabel;
}

function getLocationLabel(locale, numberOfLocations) {
  let locationLabel = "";

  if (numberOfLocations > 1) {
    locationLabel =
      locale == LOCALE_EN ? LOCATIONS_LABEL_EN : LOCATION_LABEL_VI;
  } else {
    locationLabel = locale == LOCALE_EN ? LOCATION_LABEL_EN : LOCATION_LABEL_VI;
  }

  return locationLabel;
}

module.exports = {
  getFeelingLabel: getFeelingLabel,
  getDayLabel: getDayLabel,
  getLocationLabel: getLocationLabel
};
