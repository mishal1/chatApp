var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http)
var port = process.env.PORT || 3000;

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response){
  response.render('index');
});

io.on('connection', function(socket){
  console.log('user connected')
  socket.on('disconnect', function(){
    console.log('user disconnected')
  });
  socket.on('chat message', function(msg){
    socket.broadcast.emit('send chat message', msg);
  });
});

http.listen(port, function(){
  console.log("Server listening on port 3000");
});