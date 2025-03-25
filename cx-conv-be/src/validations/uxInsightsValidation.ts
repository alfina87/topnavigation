import Joi from "joi";

const uxInsightsSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: true } })
    .required()
    .messages({
      "string.email": "Please provide a valid email address",
      "string.empty": "Email is required",
      "any.required": "Email is required",
    }),
  additionalInfo: Joi.string().min(10).required().messages({
    "string.min": "Additional information must be at least 10 characters long",
    "string.empty": "Additional information is required",
    "any.required": "Additional information is required",
  }),
});

export default uxInsightsSchema;
