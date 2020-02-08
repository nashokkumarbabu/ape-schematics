const Joi = require("@hapi/joi");

const userValidator = (res, req, next) => {
  const validatorSchema = Joi.object({
    first_name: Joi.string(),
    last_name: Joi.string(),
    phone_number: Joi.string(),
    email: Joi.string(),
    age: Joi.number()
  });

  let { error } = validatorSchema.validate(req.body);
  if (error) res.status(400).send({ error: error.details });
  else next();
};

const userDelValidator = (res, req, next) => {
  const validatorSchema = Joi.object({
    email: Joi.string()
  });

  let { error } = validatorSchema.validate(req.body);
  if (error) res.status(400).send({ error: error.details });
  else next();
};

module.exports = { userValidator, userDelValidator };
