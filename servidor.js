var express = require('express');
var app = express();
var fs = require('fs');
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var bodyParser = require('body-parser');

var productos = [
{id:'producto1', nombre:'GENUINO CERO', MICRO:" ATSAMD21G18", TF:"3.3V", UART:"2 (Nativo y Programación)", FLASH:"256 KB", RAM:"32 KB", V:"48 MHz"},
{id:'producto2', nombre:'ARDUINO UNO', MICRO:"ATmega328P", TF:"5V", UART:"14 (6 proporcionan salida PWM)", FLASH:"32 KB", RAM:"2 KB", V:"16 MHz"},
{id:'producto3', nombre:'GENUINO 101', MICRO:"Intel Curie", TF:"3.3V", UART:"14 I/O (4 proporcionan salida PWM)", FLASH:"196 kB", RAM:"24 kB", V:"32 MHz"}
];

app.set('view engine', 'jade');
app.use(express.static('pagina'));

//------------------SELECT------------------------------//
app.get('/WebService', function(request, response){
	
	productos.forEach(function(productoElegido){
		if(productoElegido.id == request.query.producto){
			console.log(productoElegido.id);
			response.json(productoElegido);
		}

	});


});


//------------------SOCKET------------------------------// 
io.on('connection', function(client){
	console.log('Cliente conectado...')
	//nuevo evento on para la comunicación 'mensajesChat'
	client.on('mensajesChat', function(datos){
		//asignamos un nuevo evento ‘on’ al socket usando el nombre de la nueva comunicación,
		//y definimos la función callback que actúa cuando llega la información. En este caso 
		//se hace un log a consola. Como el objetivo es hacer una sala de chat, queremos que 
		//todos los usuarios que estén conectados, reciban también el nuevo mensaje
		console.log(datos.info);

		//--para enviar a todos menos al remitente
		//client.broadcast.emit('mensajesChat', datos); //no se lo envia al usuario que lo ha escrito
		
		//--para enviar a todos incluido el remitente
		io.emit('mensajesChat', datos);
	});

	//comunicación para gestionar el nombre de usuaio
	client.on('unir', function(nombre){
		client.nickname = nombre ;
		console.log("Se ha unido "+ client.nickname);

		//--para enviar a todos menos al remitente
		//client.broadcast.emit('unir', client.nickname);

		//--para enviar a todos incluido el remitente
		io.emit('unir', client.nickname);
	});

	//comunicación para gestionar el JSIN nombre de usuaio
	// client.on('unir', function(nombre){
	// 	client.nickname = nombre.user ;
	// 	console.log('Se ha unido '+ nombre.user);
	// 	client.broadcast.emit('unir', nombre);
	// });

});

server.listen(8050);