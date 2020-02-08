const {
  getallproductsService,
  createproductService,
  updateproductService,
  deleteproductService
} = require("./product.service.js");

const getallproductsController = async (req, res) => {
  const { productlist } = await getallproductsService();
  res.send({ productlist });
  
};
const createproductController = async (req, res) => {
  const { product } = await createproductService(req.body);
  res.send({ product });
};
const updateproductController = async (req, res) => {
  const { product } = await updateproductService(req.body);
  res.send({ product });
};
const deleteproductController = async (req, res) => {
  const { product } = await deleteproductService(req.body);
  res.send({ product });
};

module.exports = {
  getallproductsController,
  createproductController,
  updateproductController,
  deleteproductController
};
