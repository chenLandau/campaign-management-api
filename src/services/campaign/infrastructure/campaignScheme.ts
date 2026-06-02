import Joi from "joi";

export const createCampaignSchema = Joi.object({
  name: Joi.string().required(),
  publisherId: Joi.string().required(),
  status: Joi.string().valid("active", "paused", "ended").default("active"),
  startDate: Joi.string().required(),
});

// Schema for updating a campaign (PATCH)
export const updateCampaignSchema = Joi.object({
  name: Joi.string().optional(),
  status: Joi.string().valid("active", "paused", "ended").optional().messages({
    "any.only": "Status must be one of: active, paused, ended",
  }),
  startDate: Joi.string().optional().messages({
    striDate: "Start date must be a val 8601 date string",
  }),
});

// Full campaign schema (for reference/validation of complete objects)
export const campaignSchema = Joi.object({
  id: Joi.string().uuid().required(),
  name: Joi.string().required(),
  publisherId: Joi.string().required(),
  status: Joi.string().valid("active", "paused", "ended").required(),
  startDate: Joi.string().required(),
  createdAt: Joi.string().required(),
});
