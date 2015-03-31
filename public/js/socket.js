var socket = io();

$('#userText').submit(function(){
  socket.emit('chat message', $('#m').val());
  appendMessage($('#m').val())
  $('#m').val('');
  return false;
});

socket.on('send chat message', function(msg){
  appendMessage(msg);
});

var appendMessage = function(message){
  $('#messages').append($('<li>').text(message));
}