/* eslint-disable */
require('dotenv').config();
const createError = require('http-errors');
const express = require('express');

const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const hbs = require('express-handlebars');
const fs = require('fs');
const app = express();
const session = require('express-session')
/* eslint-enable */


// view engine setup
app.enable('trust proxy');
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts'
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'src')));

app.use(session({
    name: 'Login Session',
    secret: 'ARIA FTW',
    saveUninitialized: true,
    cookie: {},
    resave: false
}));


// Routes
/* eslint-disable */
fs.readdirSync("./routes/").forEach(file => {
    app.use(require("./routes/" + file));
});
/* eslint-enable */



// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});




app.listen(function () {

    console.log("Server is running..");
});

module.exports = app;