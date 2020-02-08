const Joi = require("@hapi/joi");

const productValidator = (res, req, next) => {
  const validatorSchema = Joi.object({
    product_name: Joi.string(),
    product_title: Joi.string(),
    product_number: Joi.string(),
    product_price: Joi.string()
  });

  let { error } = validatorSchema.validate(req.body);
  if (error) res.status(400).send({ error: error.details });
  else next();
};
const productDelValidator = (res, req, next) => {
  const validatorSchema = Joi.object({
    product_number: Joi.string()
  });

  let { error } = validatorSchema.validate(req.body);
  if (error) res.status(400).send({ error: error.details });
  else next();
};

module.exports = { productValidator, productDelValidator };
