import Joi from "joi";

export const updateCampaignSchema = Joi.object({
  name: Joi.string().optional(),
  status: Joi.string().valid("active", "paused", "ended").optional().messages({
    "any.only": "Status must be one of: active, paused, ended",
  }),
  startDate: Joi.string().optional().messages({
    striDate: "Start date must be a val 8601 date string",
  }),
});

export const campaignSchema = Joi.object({
  id: Joi.string().uuid().required(),
  name: Joi.string().required(),
  publisherId: Joi.string().required(),
  status: Joi.string().valid("active", "paused", "ended").required(),
  startDate: Joi.string().required(),
  createdAt: Joi.string().required(),
});
