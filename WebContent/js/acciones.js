/**
 * Ejecuta la acción del dispositivo.
 * Invoca al servicio REST correspondiente
 * mode: [json/xml]
 * @param url
 * @param payload
 * @param mode
 */
function performAction (url, payload,currentDeviceId){
	data = payload;
	//if ('xml' == mode.toLowerCase()){
		data = $.xml2json(payload);
	//}
	data = JSON.stringify(data);
	$('#info').html('Datos peticion PUT: ' + data);
	$.ajax({
		type: "PUT", //GET or POST or PUT or DELETE verb
		url: url, // Location of the service
		dataType: "jsonp", //Expected data format from server,
		data: data,
		processdata: false, //True or False
	    success: function (msg){
	    	alert(msg.result);
	    	 
	    	buildDevice (currentDeviceId);
	    	
	    },
	    error: ServiceFailed
	});
}