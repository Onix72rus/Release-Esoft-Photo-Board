const express = require('express');
const cors = require('cors');
const fileupload = require('express-fileupload');
const sequelize = require('./db');
const models = require('./models/models');
const router = require('./routers/index');
const path = require('path');
const errorMiddleware = require('./middleWare/errorMiddleware');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileupload({}));
app.use('/api', router);

app.use(errorMiddleware);
const start = async () => {
   await sequelize.authenticate();
   await sequelize.sync();
   app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
};

start();
