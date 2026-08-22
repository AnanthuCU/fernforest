const app = require('./src/app');

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Fernforest Backend API server listening on port ${PORT}`);
});

module.exports = server;
