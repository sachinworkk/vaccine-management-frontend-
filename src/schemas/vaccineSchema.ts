import Joi from "@hapi/joi";

import { VACCINE_NAME, NUMBER_OF_DOSES } from "./../constants/constants";

export const vaccineSchema = Joi.object({
  id: Joi.number().allow(null),
  name: Joi.string()
    .trim()
    .min(1)
    .required()
    .max(VACCINE_NAME.MAX_NUMBER_OF_CHARACTERS)
    .messages({
      "string.empty": `Name cannot be empty`,
      "any.required": `Name is a required field`,
      "string.max": `Name is too long`,
      "string.base": `Please provide a valid name`,
    }),
  numberOfDoses: Joi.number()
    .min(NUMBER_OF_DOSES.MIN_NUMBER)
    .max(NUMBER_OF_DOSES.MAX_NUMBER)
    .required()
    .messages({
      "any.required": `Number of doses is a required field`,
      "number.base": `Please provide a valid number of doses`,
      "number.min": `Number of doses cannot be less than ${NUMBER_OF_DOSES.MIN_NUMBER}`,
      "number.max": `Number of doses cannot be more than ${NUMBER_OF_DOSES.MAX_NUMBER}`,
    }),
  isMandatory: Joi.boolean().required().messages({
    "any.required": `Is Mandatory is a required field`,
    "boolean.base": `Please provide a valid is mandatory field`,
  }),
  stage: Joi.string().trim().min(1).required().messages({
    "string.empty": `Stage cannot be empty`,
    "string.required": `Stage is a required field`,
    "string.base": `Please provide a valid stage`,
  }),
  file: Joi.object().required().messages({
    "any.required": `Vaccine image is a required field`,
    "object.base": `Please provide a valid vaccine image`,
  }),
  vaccineImageUrl: Joi.string().allow(null, ""),
  description: Joi.string().trim().min(1).messages({
    "string.empty": `Description cannot be empty`,
    "string.required": `Description is a required field`,
    "string.base": `Please provide a valid description`,
  }),
});
