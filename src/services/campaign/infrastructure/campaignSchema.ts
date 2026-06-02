import Joi from "joi";

export const campaignSchema = Joi.object({
  id: Joi.string().uuid().required(),
  name: Joi.string().required(),
  publisherId: Joi.string().required(),
  status: Joi.string().valid("active", "paused", "ended").required(),
  startDate: Joi.string().required(),
  createdAt: Joi.string().required(),
});
