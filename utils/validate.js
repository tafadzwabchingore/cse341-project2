const Joi = require("joi");

const bookValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    genre: Joi.string().required(),
    publishedDate: Joi.date().required(),
    pages: Joi.number().required(),
    price: Joi.number().required(),
    inStock: Joi.boolean(),
    description: Joi.string().optional(),
  });
  return schema.validate(data);
};

const authorValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    bio: Joi.string().optional(),
    birthdate: Joi.date().optional(),
    nationality: Joi.string().optional(),
    website: Joi.string().uri().optional(),
  });
  return schema.validate(data);
};

module.exports = { bookValidation, authorValidation };