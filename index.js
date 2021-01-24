let app = require('express')();
let server = require('http').createServer(app);
let io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});
 
io.on('connection', (socket) => {
 console.log('connection');
 
socket.on('loginqrcoderequest', (data) => {
  console.log(data);
  let userInfo = {
    sessionId: data.sessionId,
    username: data.username,
    password: data.password
  }
  io.emit('loginqrcoderesponse', userInfo);    
});



  socket.on('disconnect', function(){
    io.emit('message', {message: 'disconnect'});   
  });
});
 
var port = process.env.PORT || 3000;
 
server.listen(port, function(){
   console.log('listening in http://localhost:' + port);
});