const Joi = require('joi');

export const create = {
  body: {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string()
      .email()
      .required(),
    birthdayDate: Joi.date().required(),
    location: Joi.string().required(),
  }
};

export const update = {
  body: {
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string()
      .email()
      .required(),
    birthdayDate: Joi.date(),
    location: Joi.string(),
  }
};
