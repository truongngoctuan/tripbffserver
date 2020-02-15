import Joi from "@hapi/joi";

export const IdSchema = Joi.object({
  id: Joi.required().description("External Id")
});

// -------------------------------------------------------------------
// trip specific validation

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
      url: Joi.string()
    })
  )
});

export const joiInfographicSchema = Joi.object({
  infographicId: Joi.string().required(),
  status: Joi.string().required(),
  externalStorageId: Joi.string().optional()
});

export const joiTripSchema = Joi.object({
  tripId: Joi.string(),
  name: Joi.string(),
  fromDate: Joi.date(),
  toDate: Joi.date(),
  locations: Joi.array()
    .optional()
    .items(joiLocationSchema),
  infographics: Joi.array()
    .optional()
    .items(joiInfographicSchema),
  isDeleted: Joi.boolean()
});

export const joiTripsSchema = Joi.array().items(joiTripSchema);

export const joiMinimizedTripSchema = Joi.object({
  tripId: Joi.string(),
  name: Joi.string(),
  fromDate: Joi.date(),
  toDate: Joi.date(),
  locationImages: Joi.array()
    .optional()
    .items(Joi.string()),
  isDeleted: Joi.boolean()
});

export const joiMinimizedTripsSchema = Joi.array().items(
  joiMinimizedTripSchema
);
