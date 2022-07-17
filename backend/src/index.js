require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./database/config');
const routes = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 5005;

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully');
    } catch (e) {
        console.log('Unable to connect to the database: ', e);
    }
})();

app.use(express.json());

app.use(cors());
app.use(routes);

app.listen(PORT, () => {
    console.log(`Server has been started on ${PORT}`);
})