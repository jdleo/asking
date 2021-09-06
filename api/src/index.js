const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const baseRoute = require('./routes/base');
const pollRoute = require('./routes/poll');

// express app
const app = express();

// configure port for api
app.set('port', process.env.PORT || 3000);

// middleware
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// map routes to routers
app.use('/', baseRoute);
app.use('/poll', pollRoute);

// listen for requests
app.listen(app.get('port'), () => {
  console.info(`api server is listening on port ${app.get('port')}`);
});
