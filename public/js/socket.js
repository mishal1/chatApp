var socket = io();

var username;

$('#userName').keypress(function(key){
  if(key.which === 13){
    username = $('#userName').val()
    $('#enterName').hide();
    $('#userText').show();
  }
});

$('#m').keypress(function(){
  socket.emit('user is typing', username + ' is typing...')
})

$('#userText').submit(function(){
  var message = {name: username, message: $('#m').val()}
  socket.emit('chat message', message);
  appendMessage(message)
  $('#m').val('');
  socket.emit('user is typing', '')
  return false;
});

socket.on('send chat message', function(msg){
  appendMessage(msg);
});

socket.on('display user is typing', function(msg){
  $('#userTyping').text(msg)
})

var appendMessage = function(item){
  $('#messages').append($('<li>').text(item.name + ': ' +item.message));
}