/**
 * Construye la pantalla de Estancia para una estancia
 * @param idEstancia
 */
function buildEstancia(idEstancia){
	var config = JSON.parse(getConfig());
	var tieneDispositivos = false;
	jQuery.each(config.Locations.Location, function(i, location){
		if (location.id == idEstancia){
			if (typeof(location.LocationDevices.LocationDevice) !== 'undefined'){
				if($.isArray(location.LocationDevices.LocationDevice)) {
					jQuery.each(location.LocationDevices.LocationDevice, function(j, locationDevice){
						
						var idDevice = locationDevice.idRef;
						
						jQuery.each(config.Devices.Device, function(k, device){
							if (device.id == idDevice){
								var divDispositivo = $('<div id=dispositivo_' + device.name + ' class="dispositivos menuOp">' + device.name + '</div>').click({dispId:device.id},function (e) {
							        window.location = 'device.html?deviceID=' + e.data.dispId;
							    });
								$('#dispositivos').append(divDispositivo);
								
								tieneDispositivos = true;
							}
						});
					});
				}
				else{
					var idDevice = location.LocationDevices.LocationDevice.idRef;
					
					jQuery.each(config.Devices.Device, function(k, device){
						if (device.id == idDevice){
							var divDispositivo = $('<div id=dispositivo_' + device.name + ' class="dispositivos menuOp">' + device.name + '</div>').click({dispId:device.id},function (e) {
						        window.location = 'device.html?deviceID=' + e.data.dispId;
						    });
							$('#dispositivos').append(divDispositivo);
							
							tieneDispositivos = true;
						}
					});
				}
				
			}
		}
	});
	
	if (!tieneDispositivos){
		$('#dispositivos').append("Sin dispositivos asociados");
	}
	
}