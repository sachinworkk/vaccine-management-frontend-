import Joi from "@hapi/joi";

export const signInSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": `Email cannot be empty`,
      "any.required": `Email is a required field`,
      "string.email": `Please provide a valid email`,
    }),
  password: Joi.string().trim().required().messages({
    "string.empty": `Password cannot be empty`,
    "any.required": `Password is a required field`,
  }),
});
