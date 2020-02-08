const path = require('path');

module.exports = (app) => {
  app.use('/api', require('../routes/index.js'));
  app.use('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });
  app.use('*', (req, res) => {
    res.status(404).send(`<h1>404 Page Not Found</h1>`);
  });
};
