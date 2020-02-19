var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var indexRouter = require('./routes/index');
var productRouter = require('./routes/product');
var mainTypeRouter = require('./routes/mainType');
var enrollRouter = require('./routes/enroll');
var orderRouter = require('./routes/order');
var userRouter = require('./routes/order');

var app = express();
const db = require('./helper/db')();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
var port = 5000;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
app.use('/', indexRouter);
app.use('/product', productRouter);
app.use('/mainType', mainTypeRouter);
app.use('/enroll', enrollRouter);
app.use('/user', userRouter);
app.use('/order', orderRouter);
io.on('connection', function (socket) {
  socket.emit('userId', { userId: socket.id });
  socket.on('messages', function (data) {
    let messageObj = {
      _id: new Date().getTime() + '#' + socket.id,
      text: data.text,
      createdAt: new Date(),
      user: {
        _id: socket.id,
        name: data.username,
        avatar: 'https://facebook.github.io/react/img/logo_og.png',
      }
    };
    console.log('messageObj => ', messageObj);
    socket.broadcast.emit('messages', { 'messages': messageObj });
    socket.emit('messages', { 'messages': messageObj });
  });
});
server.listen(port, () => console.log("server running on port : " + port))
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
