const createApp = require('./src/routes');

const PORT = process.env.PORT || 4000;
const server = createApp();

server.listen(PORT, () => {
  console.log(`Fernforest backend listening on http://localhost:${PORT}`);
});
