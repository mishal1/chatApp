var socket = io();

var username;

$('#userName').keypress(function(key){
  if(key.which === 13){
    username = $('#userName').val()
    $('#enterName').hide();
    $('#chat').show();
  }
});

$('#userText').submit(function(){
  var message = {name: username, message: $('#m').val()}
  socket.emit('chat message', message);
  appendMessage(message)
  $('#m').val('');
  return false;
});

socket.on('send chat message', function(msg){
  appendMessage(msg);
});

var appendMessage = function(item){
  $('#messages').append($('<li>').text(item.name + ': ' +item.message));
}