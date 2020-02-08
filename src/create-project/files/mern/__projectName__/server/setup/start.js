const chalk = require('chalk');
const PORT = process.env.PORT || 4200;
module.exports = server => {
  require('../db/index.js')
    .then(() => {
      server.listen(PORT, () => {
        console.log(chalk.green(`Listening on port ${PORT}`));
      });
    })
    .catch(err => {
      console.log(err);
    });
};
