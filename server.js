var express = require("express"),
	app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    port = 8080,
    url  = 'http://localhost:' + port + '/',
    socket;


app.use(express.bodyParser());


server.listen(port);
console.log("Express server listening on port " + port);
console.log(url);


app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.post('/data', function (req, res) {
  
  try {
  	
  	var data = req.body;
  	
  	
	for(var opengraphIndx in data.links.meta.opengraph){ 
		
		//console.log(opengraphIndx + ' : ' + data.links.meta.opengraph[opengraphIndx].image);
		
		 socket.emit('ping', { msg: '<p><img src="' + data.links.meta.opengraph[opengraphIndx].image + '" /></p>' });
	}	 	
  	
  	
  	
  } catch (e){
  	console.log('DEBUG: ' + e)
  }
  
  
  
  res.send({"success":true});
});








//Socket.io emits this event when a connection is made.
io.sockets.on('connection', function (s) {

socket = s;
  // Emit a message to send it to the client.
  socket.emit('ping', { msg: 'Connected.' });

  // Print messages from the client.
  socket.on('pong', function (data) {
    console.log(data.msg);
  });

});