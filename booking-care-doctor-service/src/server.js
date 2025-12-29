require('dotenv').config();
const app = require('./app');
const sequelize = require('./config/database');

const PORT = process.env.PORT;

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Doctor DB connected');

    app.listen(PORT, () =>
      console.log(`Doctor Service running on port ${PORT}`)
    );
  } catch (err) {
    console.error('DB connection failed', err);
  }
})();
