import {
  LOCALE_EN,
  FEELING_LABEL_EN,
  FEELING_LABEL_VI,
  DAYS_LABEL_EN,
  DAY_LABEL_EN,
  DAY_LABEL_VI,
  LOCATION_LABEL_EN,
  LOCATION_LABEL_VI,
  LOCATIONS_LABEL_EN,
} from "../configs/constants";

export function getFeelingLabel(locale: string): string {
  return locale == LOCALE_EN ? FEELING_LABEL_EN : FEELING_LABEL_VI;
}

export function getDayLabel(locale: string, numberOfDays: number): string {
  let dayLabel = "";

  if (numberOfDays > 1) {
    dayLabel = locale == LOCALE_EN ? DAYS_LABEL_EN : DAY_LABEL_VI;
  } else {
    dayLabel = locale == LOCALE_EN ? DAY_LABEL_EN : DAY_LABEL_VI;
  }

  return dayLabel;
}

export function getLocationLabel(
  locale: string,
  numberOfLocations: number
): string {
  let locationLabel = "";

  if (numberOfLocations > 1) {
    locationLabel =
      locale == LOCALE_EN ? LOCATIONS_LABEL_EN : LOCATION_LABEL_VI;
  } else {
    locationLabel = locale == LOCALE_EN ? LOCATION_LABEL_EN : LOCATION_LABEL_VI;
  }

  return locationLabel;
}
