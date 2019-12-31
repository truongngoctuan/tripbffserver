import Joi from "@hapi/joi";

// Joi.extend(require("@hapi/joi-date"));

export const joiLocationSchema = {
  name: Joi.string(),
  fromTime: Joi.string(),
  toTime: Joi.string(),
  location: Joi.object({
    long: Joi.number(),
    lat: Joi.number(),

    address: Joi.string(),
    name: Joi.string()
  }),
  images: Joi.array().items(
    Joi.object({
      url: Joi.string(),
    }),
  ),
};

export const joiInfographicSchema = {

};

// export interface IInfographic {
//   infographicId: string;
//   status: InfographicStatus;
//   externalStorageId?: string; //this id will exist after image binary is uploaded to server
// }

export const joiTripSchema = {
  tripId: Joi.string(),
  name: Joi.string(),
  fromDate: Joi.date(),
  toDate: Joi.date(),
  locations: Joi.array().optional().items(joiLocationSchema),
  infographics: Joi.array().optional().items(joiInfographicSchema),
  isDeleted: Joi.boolean()
};

export const joiTripsSchema = Joi.array().items(joiTripSchema);