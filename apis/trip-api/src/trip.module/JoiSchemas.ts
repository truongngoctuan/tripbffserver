import Joi from "@hapi/joi";

export const IdSchema = Joi.object({
  id: Joi.required().description("External Id")
});

// -------------------------------------------------------------------
// trip specific validation
const joiLocationDetailsSchema = Joi.object({
  long: Joi.number(),
  lat: Joi.number(),

  address: Joi.string()
});

export const joiLocationSchema = Joi.object({
  locationId: Joi.string(),
  name: Joi.string(),
  fromTime: Joi.date(),
  toTime: Joi.date(),
  location: joiLocationDetailsSchema,
  images: Joi.array().items(
    Joi.object({
      imageId: Joi.string(),
      url: Joi.string(),
      time: Joi.date(),
      externalStorageId: Joi.string(),
      externalUrl: Joi.string(),
      isFavorite: Joi.bool()
    })
  ),
  description: Joi.string(),
  feeling: Joi.object({
    feelingId: Joi.string(),
    label_en: Joi.string(),
    label_vi: Joi.string(),
    icon: Joi.string()
  }),
  activity: Joi.object({
    activityId: Joi.string(),
    label_en: Joi.string(),
    label_vi: Joi.string(),
    icon: Joi.string()
  }),
  highlights: Joi.array().items(
    Joi.object({
      highlightId: Joi.string(),
      label_en: Joi.string(),
      label_vi: Joi.string(),
      highlightType: Joi.string()
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

export const joiMinimizedTripSchema = Joi.object({
  tripId: Joi.string(),
  name: Joi.string(),
  fromDate: Joi.date(),
  toDate: Joi.date(),
  locationImages: Joi.array()
    .optional()
    .items(Joi.object({
      name: Joi.string(),
      address: Joi.string(),
      description: Joi.string(),
      imageUrl: Joi.string().optional(),
    })),
  isDeleted: Joi.boolean()
});