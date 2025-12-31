const app = require('./app');
const db = require('./models');

const PORT = 5000;

db.sequelize.authenticate()
  .then(() => console.log('DB connected'))
  .catch(console.error);

app.listen(PORT, () => {
  console.log(`Doctor service running on port ${PORT}`);
});
