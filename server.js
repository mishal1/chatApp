var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response){
  response.render('index');
});

app.post('/onlineusers', function(request, response){
  response.send(onlineUsers)
});

var onlineUsers = []

io.on('connection', function(socket){
var currentUser;

  console.log('user connected')

  socket.on('disconnect', function(){
    console.log('user disconnected')
    var index = onlineUsers.indexOf(currentUser)
    onlineUsers.splice(index, 1)
    console.log(onlineUsers)
  });

  socket.on('chat message', function(msg){
    socket.broadcast.emit('send chat message', msg);
  });

  socket.on('user is typing', function(msg){
    socket.broadcast.emit('display user is typing', msg)
  });

  socket.on('add user', function(name){
    currentUser = name;
    onlineUsers.push(name)
    console.log(onlineUsers)
  })

});

http.listen(port, function(){
  console.log("Server listening on port 3000");
});