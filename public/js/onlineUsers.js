var socket = io();

socket.on('send msg to other route', function(item){
  $('#messages').append($('<li>').text(item.name + ': ' +item.message))
});