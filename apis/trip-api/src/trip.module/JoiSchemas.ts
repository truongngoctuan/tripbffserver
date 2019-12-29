import Joi from "joi";

export const joiLocationSchema = Joi.object({
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
});

export const joiInfographicSchema = Joi.object({

});

// export interface IInfographic {
//   infographicId: string;
//   status: InfographicStatus;
//   externalStorageId?: string; //this id will exist after image binary is uploaded to server
// }

export const joiTripSchema = Joi.object({
  tripId: Joi.string(),
  name: Joi.string(),
  fromDate: Joi.date(),
  toDate: Joi.date(),
  locations: Joi.array().items(joiLocationSchema),
  infographics: Joi.array().items(joiInfographicSchema),
  isDeleted: Joi.boolean()
});
