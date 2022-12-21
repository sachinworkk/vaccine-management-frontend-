import Joi from "@hapi/joi";

const customJoi = Joi.extend(require("joi-age"));

export const signUpSchema = Joi.object({
  name: customJoi.string().trim().required().messages({
    "string.empty": `Name cannot be empty`,
    "any.required": `Name is a required field`,
    "string.base": `Please provide a valid name`,
  }),
  gender: customJoi.string().trim().required().messages({
    "string.empty": `Gender cannot be empty`,
    "any.required": `Gender is a required field`,
    "string.base": `Please provide a valid gender`,
  }),
  dateOfBirth: customJoi
    .date()
    .minAge(18)
    .required()
    .messages({
      "any.required": `Date of birth is a required field`,
      "date.base": `Please provide a valid date`,
    })
    .label("Date of birth"),
  email: customJoi
    .string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": `Email cannot be empty`,
      "any.required": `Email is a required field`,
      "string.email": `Please provide a valid email`,
    }),
  password: customJoi.string().trim().required().messages({
    "string.empty": `Password cannot be empty`,
    "any.required": `Password is a required field`,
  }),
  confirmPassword: customJoi
    .string()
    .trim()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "string.empty": `Confirm password cannot be empty`,
      "any.required": `Confirm Password is a required field`,
      "any.only": `Password does not match`,
    }),
  address: customJoi.string().trim().messages({
    "string.empty": `Address cannot be empty`,
    "string.base": `Please provide a valid address`,
  }),
});
