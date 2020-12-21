const express = require('express');
const path = require('path');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const compression = require('compression');
const cors = require('cors');

const notesRouter = require('./routes/notesRouter');
const viewRouter = require('./routes/viewRouter');

const app = express();

//implement CORS
app.use(cors());

app.options('*', cors());

app.use(helmet());
//data sanitization against NoSQL query injection
app.use(mongoSanitize());


//data sanitixzation against xss attacks
app.use(xss());

//prevent parameter pollution
app.use(hpp({
    whitelist: ['name', 'email','item','createdAt']
}));

app.use(compression());

app.use(express.static(`${__dirname}/public`));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json({ limit : '10kb'  }));

app.use('/api/notes', notesRouter);
app.use('/', viewRouter);

module.exports = app;