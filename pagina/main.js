$(document).ready(function(){

	var socket = io.connect() //'http://localhost:8080'

	$('.select').change(function(){
		
		var peticion = 'WebService?producto='.concat($('.select').val());
		console.log(peticion);
		$.ajax('WebService', {
			success: function(response) {
				//Selecciona el #id y busca el hijo strong y lo quita
				$('#nombre').find("strong").remove();
				$('#precio').find("strong").remove();
				$('#MICRO').find("strong").remove();
				$('#TF').find("strong").remove();
				$('#UART').find("strong").remove();
				$('#FLASH').find("strong").remove();
				$('#RAM').find("strong").remove();
				$('#V').find("strong").remove();

				//Selecciona el #id y le añade ()
				$('#nombre').append("<strong>"+response.nombre+"</strong>");
				$('#precio').append("<strong>"+response.precio+"</strong>");
				$('#MICRO').append("<strong>"+response.MICRO+"</strong>");
				$('#TF').append("<strong>"+response.TF+"</strong>");
				$('#UART').append("<strong>"+response.UART+"</strong>");
				$('#FLASH').append("<strong>"+response.FLASH+"</strong>");
				$('#RAM').append("<strong>"+response.RAM+"</strong>");
				$('#V').append("<strong>"+response.V+"</strong>");
			},

		data:{"producto":$('.select').val()}
		});

	});

	$('#buttonEnviar').on("click",function(){
		var mensaje = $('#mensaje').val();
		console.log(mensaje);
		//Lanza el proceso/comunicacion con el nombre mensajesChat en el servidor. Si vas al script
		//hay un metodo para que envie este paquete al resto de usuarios.
		socket.emit('mensajesChat', {info: mensaje});
	});

	//estableces una nueva "escucha" a la comunicación "mensajesChat"
	socket.on('mensajesChat', function(datos) {
		//este metodo lo ejecuta el servidor para que el cliente ponga el mensaje
		// que le ha enviado el servidor en su espacio de mensajes.
		$('#mensajes').append("<div> <p>"+datos.info+"</p></div>")
	});

	// ENVIANDO JSON 
	// $('#botonNombre').on("click", function(){
	// 	var username = $('#nomusuario').val();
	// 	//consola del navegador
	// 	console.log("Nombre check: "+ username);
	// 	socket.emit('unir', {user: username});
	// });

	// socket.on('unir', function(nombre) {
	// 	//este metodo lo ejecuta el servidor para que el cliente ponga el mensaje
	// 	// que le ha enviado el servidor en su espacio de mensajes.
	// 	console.log("Recepción del json nombre");
	// 	$('#mensajes').append("<div> <p>Se ha unido el usuario "+nombre.user+"</p></div>")
	// });

	$('#botonNombre').on("click", function(){
		var username = $('#nomusuario').val();
		socket.nickname = username;
		//consola del navegador
		console.log("Nombre check: "+ socket.nickname);
		socket.emit('unir', username);
	});

	socket.on('unir', function(nombre) {
		//este metodo lo ejecuta el servidor para que el cliente ponga el mensaje
		// que le ha enviado el servidor en su espacio de mensajes.
		console.log("Recepción de la variable nombre");
		$('#userConectados').append("<li>"+nombre+"</li>")
	});

});