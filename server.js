var express = require("express"),
	app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server, { log: false }),
    port = 8080,
    url  = 'http://localhost:' + port + '/',
    socket;


server.listen(port);
console.log("Express server listening on port " + port);
console.log(url);

app.use(express.bodyParser());

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});


app.post('/data', function (req, res) {
	
	console.log('DEBUG: Processing POST request.')

  try {

  		//var body = req.body.toString().split("\n");
  		var body = req.body;

		// Each interaction
  		for(i in body) {
  				
			for(var opengraphIndx in body[i].links.meta.opengraph){ 	
	 			socket.emit('ping', { msg: '<p><img src="' + body[i].links.meta.opengraph[opengraphIndx].image + '" /><br /><br />' + body[i].interaction.content  + '</p><br /><br />' });
			}
	
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