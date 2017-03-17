var socket = io.connect('http://localhost:8050/main.html');

	// //estableces una nueva "escucha" a la comunicación "mensajesChat"
	// socket.on('mensajesChat', function(datos) {
	// 	//este metodo lo ejecuta el servidor para que el cliente ponga el mensaje
	// 	// que le ha enviado el servidor en su espacio de mensajes.
	// 	alert('Mensaje enviado'+datos.info);
	// 	$('#mensajes').append("<div> <p>"+datos.info+"</p></div>")
	// });

	// $(document).ready(function(){
	// //	$('#buttonEnviar').on("click",function(){
	// 	$('#buttonEnviar').submit(function(e){
	// 		var mensaje = $('#mensaje').val();
	// 		console.log(mensaje);
	// 		//Lanza el proceso/comunicacion con el nombre mensajesChat en el servidor. Si vas al script
	// 		//hay un metodo para que envie este paquete al resto de usuarios.
	// 		socket.emit('mensajesChat', {info: mensaje});
	// 	});
	// });