var FILTRAR_ESTANCIAS_SIN_DISPOSITIVOS = false;

/**
 * Construye la pantalla de estancias
 */
function buildEstancias(){
	var config = JSON.parse(getConfig());
	var tieneEstancias = false;
	if (typeof(config.Locations.Location) !== 'undefined'){
		if($.isArray(config.Locations.Location)) {
			jQuery.each(config.Locations.Location, function(i, location){
				
				var divEstancia = $('<div id=estancia_' + location.name + ' class="'+location.name+' heighGeneric" >' + location.name + '</div>').click({estId:location.id},function (e) {
			        window.location = 'estancia.html?idEstancia=' + e.data.estId;
			    });
				if ((FILTRAR_ESTANCIAS_SIN_DISPOSITIVOS && typeof(location.LocationDevices) !== 'undefined' != null) || !FILTRAR_ESTANCIAS_SIN_DISPOSITIVOS){
					$('#estancias').append(divEstancia);
				}
			});
		}
		else{
			var divEstancia = $('<div id=estancia_' + config.Locations.Location.name + ' class="config.Locations.Location.name">' + config.Locations.Location.name + '</div>').click({estId:config.Locations.Location.id},function (e) {
		        window.location = 'estancia.html?idEstancia=' + e.data.estId;
		    });
			if ((FILTRAR_ESTANCIAS_SIN_DISPOSITIVOS && config.Locations.Location.LocationDevices != null) || !FILTRAR_ESTANCIAS_SIN_DISPOSITIVOS){
				$('#estancias').append(divEstancia);
			}
		}
		tieneEstancias = true;
	}
	
	if (!tieneEstancias){
		$('#estancias').html('Sin estancias');
	}
	
}