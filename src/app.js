require('dotenv').config({ path: './src/.env' });
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
const URL_CONNECT =
  process.env.URL_CONNECT ||
  'mongodb+srv://estebanbugsjrc1107:Juanesteban110703@cluster0.p297jbv.mongodb.net/AppTask?retryWrites=true&w=majority';
const PORT = process.env.PORT || 3000;

const userRoutes = require('./routes/user_routes');

mongoose.Promise = global.Promise;
mongoose
  .connect(URL_CONNECT)
  .then((db) => console.log('db is connected with mongodbAtlas'))
  .catch((err) => console.log(err));

//settings
//const port = process.env.port || 3000;

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());

//routes
app.use('/users_routes', userRoutes);

// start the server
app.listen(PORT, () => {
  console.log('Run app on port', PORT);
});
