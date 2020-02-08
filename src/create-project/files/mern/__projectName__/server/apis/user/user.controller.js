const {
  getallusersService,
  createuserService,
  updateuserService,
  deleteuserService
} = require("./user.service.js");

const getallusersController = async (req, res) => {
  const { userlist } = await getallusersService();
  res.send({ userlist });
};
const createuserController = async (req, res) => {
  const { user } = await createuserService(req.body);
  res.send({ user });
};
const updateuserController = async (req, res) => {
  const { user } = await updateuserService(req.body);
  res.send({ user });
};
const deleteuserController = async (req, res) => {
  const { user } = await deleteuserService(req.body);
  res.send({ user });
};

module.exports = {
  getallusersController,
  createuserController,
  updateuserController,
  deleteuserController
};
