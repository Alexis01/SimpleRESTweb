/**
 * Tipos de dispositivos
 */
var AIR_CONDITIONING 	= 'HAUS_INTERFACE_KNX_AIR_CONDITIONING_1.0.1';
var ALARM_LIGHT 		= 'HAUS_INTERFACE_KNX_ALARM_LIGHT_1.0.1';
var ALARM_SOUND 		= 'HAUS_INTERFACE_KNX_ALARM_SOUND_1.0.1';
var BLIND				= 'HAUS_INTERFACE_KNX_BLIND_1.0.1';
var DOOR				= 'HAUS_INTERFACE_KNX_DOOR_1.0.1';
var ELECTRO_VALVE		= 'HAUS_INTERFACE_KNX_ELECTRO_VALVE_1.0.1';
var FAN 				= 'HAUS_INTERFACE_KNX_FAN_1.0.1';
var GRADUAL_LIGHTING	= 'HAUS_INTERFACE_KNX_GRADUAL_LIGHTING_1.0.1';
var HEATING				= 'HAUS_INTERFACE_KNX_HEATING_1.0.1';
var LIGHTING			= 'HAUS_INTERFACE_KNX_LIGHTING_1.0.1';
var LISGH_SUPLY			= 'HAUS_INTERFACE_KNX_LIGHT_SUPPLY_1.0.1';

/**
 * Tipos de sensores
 */
var ANEMOMETER 			= 'HAUS_INTERFACE_KNX_ANEMOMETER_1.0.1';
var BAROMETER			= 'HAUS_INTERFACE_KNX_BAROMETER_1.0.1';
var BRIGHTNESS_METER	= 'HAUS_INTERFACE_KNX_BRIGHTNESS_METER_1.0.1';
var CONTACT_DETECTOR	= 'HAUS_INTERFACE_KNX_CONTACT_DETECTOR_1.0.1';
var MOVEMENT_DETECTOR	= 'HAUS_INTERFACE_KNX_MOVEMENT_DETECTOR_1.0.1';
var PLUVIOMETER			= 'HAUS_INTERFACE_KNX_PLUVIOMETER_1.0.1';
var PRESENCE_DETECTOR	= 'HAUS_INTERFACE_KNX_PRESENCE_DETECTOR_1.0.1';
var RAIN_DETECTOR		= 'HAUS_INTERFACE_KNX_RAIN_DETECTOR_1.0.1';
var THERMOMETER			= 'HAUS_INTERFACE_KNX_THERMOMETER_1.0.1';
/**
 * variable que es usada para instanciar un device concreto
 * ya que al llamar a otr
 */
var currentDeviceId;
/**
 * Construye la pantalla del dispositivo indicado
 * @param idDispositivo
 */
function buildDevice (deviceId){
	var config = JSON.parse(getConfig());
	jQuery.each(config.Devices.Device, function(i, device){
		if (device.id == deviceId){
			buildDeviceByInterfaceId(device, device.DeviceInterfaces.DeviceInterface.idRef);
			//
			currentDeviceId=device.id;
		}
	});
}

/**
 * Construye dispositivos según su interfaz
 * @param device
 * @param interfaceId
 */
function buildDeviceByInterfaceId(device, interfaceId){
	var interfaces = JSON.parse(getInterfaces());
	var iface = null;
	
	jQuery.each(interfaces.Interfaces.Interface, function(i, ifc){
		if (device.DeviceInterfaces.DeviceInterface.idRef == ifc.id){
			iface = ifc;
		}
	});

	$.ajax({
		type: 'GET',
		
	    url:'http://localhost:8182/' + iface.name + '/' + device.name,
	    dataType: 'jsonp',
	    success:function(info){
	    	
	    	switch(interfaceId){
			case LIGHTING:
				buildLighting(device, iface, info);
				break;
			case GRADUAL_LIGHTING:
				buildGradualLighting(device, iface, info);
				break;
			case BLIND:
				buildBlind(device, iface, info);
				break;
				
			case AIR_CONDITIONING: 
				buildAirConditioning(device,iface,info);
				break;
			case ALARM_LIGHT:
				buildAlarmLighting(device, iface, info);
				break;
			case ALARM_SOUND:
				buildIndoorAlarmSound(device, iface, info);
				break;
			default:
				buildDefaultDevice(device, iface, info);
	    	}
	    },
	    error:function(httpReq,status,exception){
	    	alert(status+" "+exception);
	     }
	});	
}

/**Tipos de dispositivos**/
//CONSTRUCTORES
//Lighting
function buildLighting(device, iface, info){
	var deviceDiv = $('#device');
	
	if ('OK' == info.result){
		var responseValues = '';
   	 	jQuery.each(info.responseValues, function(i, response){
   	 		responseValues = responseValues + response.name + ': ' + response.value + '<br />';
   	 	});
   	 	
   	 	var html = '';
   	 	//Información general
   	 	html = html + '<span id="deviceName">' + device.name + '</span>';
   		html = html + '<br />';
   		html = html + '<span id="deviceType">' + iface.name + '</span>';
   		html = html + '<br />';
   		
   		//Estado
   		var boolEstado;
   		
   		if ('true' == info.responseValues[0].value){//Lighting
   			html = html + '<span id="deviceStatus">Estado: Lighting</span>';
   			//Variable usada para no tener acciones redundates.
   			boolEstado=true;
   		}
   		else{//Not lighting
   			html = html + '<span id="deviceStatus">Estado: Not lighting</span>';
   			boolEstado=false;	
   		}
   		html = html + '<br />Acciones<br />';
   		
   		deviceDiv.html (html);
  
   		
   		getActionsLighting(device, iface, deviceDiv,boolEstado);
    }
}

//Gradual Lighting
function buildGradualLighting(device, iface,info){
	var deviceDiv = $('#device');
	if ('OK' == info.result){
		var responseValues = '';
   	 	jQuery.each(info.responseValues, function(i, response){
   	 		responseValues = responseValues + response.name + ': ' + response.value + '<br />';
   	 	});
   	 	
   	 	var html = '';
   	 	//Información general
   	 	html = html + '<span id="deviceName">' + device.name + '</span>';
   		html = html + '<br />';
   		html = html + '<span id="deviceType">' + iface.name + '</span>';
   		html = html + '<br />';
   		
   		//Estado
   		var boolEstado;
   		
   		if ('true' == info.responseValues[0].value){//Lighting
   			html = html + '<span id="deviceStatus">Estado: Lighting</span>';
   			//Variable usada para no tener acciones redundates.
   			boolEstado=true;
   		}
   		else{//Not lighting
   			html = html + '<span id="deviceStatus">Estado: Not lighting</span>';
   			boolEstado=false;	
   		}
   		html = html + '<br />Acciones<br />';
   		
   		deviceDiv.html (html);
   		
   		//Acciones
   		
   		getActionsGradualLighting(device, iface, deviceDiv,boolEstado);
   		
   		
    }
	
}
//Blind
function buildBlind(device, iface, info){
	var deviceDiv = $('#device');
	
	if ('OK' == info.result){
		var responseValues = '';
   	 	jQuery.each(info.responseValues, function(i, response){
   	 		responseValues = responseValues + response.name + ': ' + response.value + '<br />';
   	 	});
   	 	
   	 	var html = '';
   	 	//Información general
   	 	html = html + '<span id="deviceName">' + device.name + '</span>';
   		html = html + '<br />';
   		html = html + '<span id="deviceType">' + iface.name + '</span>';
   		html = html + '<br />';
   		
   		
   		html = html + '<br />Acciones<br />';
   		
   		deviceDiv.html (html);
   	

   		getActions(device, iface, deviceDiv);
    }
}
//Air conditioning
function buildAirConditioning(device, iface, info){
	var deviceDiv = $('#device');
	
	if ('OK' == info.result){
		var responseValues = '';
   	 	jQuery.each(info.responseValues, function(i, response){
   	 		responseValues = responseValues + response.name + ': ' + response.value + '<br />';
   	 	});
   	 	
   	 	var html = '';
   	 	//Información general
   	 	html = html + '<span id="deviceName">' + device.name + '</span>';
   		html = html + '<br />';
   		html = html + '<span id="deviceType">' + iface.name + '</span>';
   		html = html + '<br />';
   		
   		
   		html = html + '<br />Acciones<br />';
   		
   		deviceDiv.html (html);
   	
   		
   		getActions(device, iface, deviceDiv);
    }
}
//AlarmLighting
function buildAlarmLighting(device, iface, info){
	var deviceDiv = $('#device');
	if ('OK' == info.result){
		var responseValues = '';
   	 	jQuery.each(info.responseValues, function(i, response){
   	 		responseValues = responseValues + response.name + ': ' + response.value + '<br />';
   	 	});
   	 	
   	 	var html = '';
   	 	//Información general
   	 	html = html + '<span id="deviceName">' + device.name + '</span>';
   		html = html + '<br />';
   		html = html + '<span id="deviceType">' + iface.name + '</span>';
   		html = html + '<br />';
   		
   		
   		
   		var boolEstado;
   		
   		if ('true' == info.responseValues[0].value){//Lighting
   			html = html + '<span id="deviceStatus">Estado: Lighting</span>';
   			//Variable usada para no tener acciones redundates.
   			boolEstado=true;
   		}
   		else{//Not lighting
   			html = html + '<span id="deviceStatus">Estado: Not lighting</span>';
   			boolEstado=false;	
   		}
   		html = html + '<br />Acciones<br />';
   		
   		deviceDiv.html (html);
   		
   		
   		getActionsAlarmLighting(device, iface, deviceDiv,boolEstado);
    }	
}
//Default
function buildDefaultDevice(device, iface){
	var deviceDiv = $('#device');
	deviceDiv.html(iface.name);
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**UTIL**/
function getConfigParameterName(iface, configParameterID){
	var configParameterName = null;
	if (typeof(iface.ConfigParameters.ConfigParameter) !== 'undefined'){
		if($.isArray(iface.ConfigParameters.ConfigParameter)) {
			jQuery.each(iface.ConfigParameters.ConfigParameter, function(c, configParameter){
				if (configParameterID = configParameter.id){
					configParameterName = configParameter.name;
				}
			});
		}
		else{
			configParameterName = iface.ConfigParameters.ConfigParameter.name;
		}
	}
	
	return configParameterName;
}

function getInternalAttributes(device, iface){
	var internalAttributes = '';

	if (typeof(device.DeviceInterfaces.DeviceInterface.ConfigParameter) !== 'undefined'){
		if($.isArray(device.DeviceInterfaces.DeviceInterface.ConfigParameter)) {
			jQuery.each(device.DeviceInterfaces.DeviceInterface.ConfigParameter, function(p, configParameter){
				internalAttributes = internalAttributes + getInternalAttribute(iface, configParameter);
			});
		}
		else{
			internalAttributes = internalAttributes + getInternalAttribute(iface, device.DeviceInterfaces.DeviceInterface.ConfigParameter);
		}
	}
	
	return internalAttributes;
}

function getInternalAttribute(iface, configParameter){
	return '<InternalAttribute name="' + getConfigParameterName(iface, configParameter.idRef) + '" value="' + configParameter.value + '"/>';
}

function getOperationArgumenst(action){
	var operationArguments = '';
	
	if (typeof(action.InterfaceActionArguments) !== 'undefined' && typeof(action.InterfaceActionArguments.Argument) !== 'undefined'){
		if($.isArray(action.InterfaceActionArguments.Argument)) {
			jQuery.each(action.InterfaceActionArguments.Argument, function(ag, argument){
				value = $('#' + argument.name + '_value').val();
				operationArguments = operationArguments + '<Argument name="' + argument.name + '" value="' + value +'"/>';
			});
		}
		else{
			value = $('#' + action.InterfaceActionArguments.Argument.name + '_value').val();
			operationArguments = operationArguments + '<Argument name="' + action.InterfaceActionArguments.Argument.name + '" value="' + value +'"/>';
		}
	}
	return operationArguments;
}

function getActions(device, iface, div){
	var actionDiv = null;
	
	if (typeof(iface.InterfaceActions.InterfaceAction) !== 'undefined'){
		if($.isArray(iface.InterfaceActions.InterfaceAction)) {
			jQuery.each(iface.InterfaceActions.InterfaceAction, function(a, action){
				
				actionDiv = $('<div id=action_' + action.name + ' class="actions menuOp">' + action.name + '</div>').click({dispId:device.id, actionName:action.name},function (e) {
				var url  = 'http://localhost:8182/' + iface.name + '/' + device.name;
	
					var payload = '';
					//Invocation
					payload = payload + '<Invocation>';
					//Device
					payload = payload + '<Device id="' + device.id + '" type="actuator">';
					//Internal atributes
					payload = payload + getInternalAttributes(device, iface);
					payload = payload + '</Device>';
					//Operation
					payload = payload + '<Operation operationName="' + action.name + '">';
					//Operation arguments
					payload = payload + getOperationArgumenst(action);
					payload = payload + '</Operation>';
					payload = payload + '</Invocation>';
					
					performAction(url, payload, device, iface);
				});
				createOperationArgumentsInputs(action, actionDiv);
				div.append(actionDiv);
			});
		}
		else{
			var action = iface.InterfaceActions.InterfaceAction;
			actionDiv = $('<div id=action_' + action.name + ' class="actions menuOp">' + action.name + '</div>').click({dispId:device.id, actionName:action.name},function (e) {
			var url  = 'http://localhost:8182/' + iface.name + '/' + device.name;

				var payload = '';
				//Invocation
				payload = payload + '<Invocation>';
				//Device
				payload = payload + '<Device id="' + device.id + '" type="actuator">';
				//Internal atributes
				payload = payload + getInternalAttributes(device, iface);
				payload = payload + '</Device>';
				//Operation
				payload = payload + '<Operation operationName="' + action.name + '">';
				//Operation arguments
				payload = payload + getOperationArgumenst(action);
				payload = payload + '</Operation>';
				payload = payload + '</Invocation>';
				
				performAction(url, payload);
			});
			createOperationArgumentsInputs(action, actionDiv,device, iface);
			div.append(actionDiv);
		}
	}
	return actionDiv;
}

function createOperationArgumentsInputs(action, div){
	// 
	if (typeof(action.InterfaceActionArguments) !== 'undefined' && typeof(action.InterfaceActionArguments.Argument) !== 'undefined'){
		if($.isArray(action.InterfaceActionArguments.Argument)) {
			jQuery.each(action.InterfaceActionArguments.Argument, function(ag, argument){
				var argumentDiv = $('<div id="' + argument.name + '_value_container">').appendTo(div);
				var label = $("<label>",{
					text: argument.name + ":"
				}).appendTo(argumentDiv);
				
				$input = $("<input>", {
                    type: "text",
                    val: argument.defaultValue,
                    name: argument.name + '_value',
                    id: argument.name + '_value',
                    "class": "text",
                    "css": {
                        "width": "50px"
                    }
                }).appendTo(label);
			});
		}
		else{
			var argument = action.InterfaceActionArguments.Argument;
			var argumentDiv = $('<div id="' + argument.name + '_value_container">').appendTo(div);
			var label = $("<label>",{
				text: argument.name + ":"
			}).appendTo(argumentDiv);
			
			$input = $("<input>", {
                type: "text",
                val: argument.defaultValue,
                name: argument.name + '_value',
                id: argument.name + '_value',
                "class": "text",
                "css": {
                    "width": "50px"
                }
            }).appendTo(label);
		}
	}
}
///////////////////////////////CHANGES BY ALEXIS//////////////////////////////////////

/**
 * Vamos a construir un get acctions distinto para los dispositivos 
 * este 
 * switch on / switch of
 */
function getActionsLighting(device, iface, div,boolEstado){
	var actionDiv = null;
	if (typeof(iface.InterfaceActions.InterfaceAction) !== 'undefined'){
		if($.isArray(iface.InterfaceActions.InterfaceAction)) {
			jQuery.each(iface.InterfaceActions.InterfaceAction, function(a, action){
				
				actionDiv = $('<div id=action_' + action.name + ' class="actions menuOp">' + action.name + '</div>').click({dispId:device.id, actionName:action.name},function (e) {
				var url  = 'http://localhost:8182/' + iface.name + '/' + device.name;
	
					var payload = '';
					//Invocation
					payload = payload + '<Invocation>';
					//Device
					payload = payload + '<Device id="' + device.id + '" type="actuator">';
					//Internal atributes
					payload = payload + getInternalAttributes(device, iface);
					payload = payload + '</Device>';
					//Operation
					payload = payload + '<Operation operationName="' + action.name + '">';
					//Operation arguments
					payload = payload + getOperationArgumenst(action);
					payload = payload + '</Operation>';
					payload = payload + '</Invocation>';
					
					performAction(url, payload,currentDeviceId);
				});
				createOperationArgumentsInputs(action, actionDiv,device);
				////
				if( ((action.name=='switchOff') &&(boolEstado) )||((action.name=='switchOn')&& !boolEstado)){
					
					div.append(actionDiv);
				}			
			});
		}
		else{
			var action = iface.InterfaceActions.InterfaceAction;
			actionDiv = $('<div id=action_' + action.name + ' class="actions menuOp">' + action.name + '</div>').click({dispId:device.id, actionName:action.name},function (e) {
			var url  = 'http://localhost:8182/' + iface.name + '/' + device.name;

				var payload = '';
				//Invocation
				payload = payload + '<Invocation>';
				//Device
				payload = payload + '<Device id="' + device.id + '" type="actuator">';
				//Internal atributes
				payload = payload + getInternalAttributes(device, iface);
				payload = payload + '</Device>';
				//Operation
				payload = payload + '<Operation operationName="' + action.name + '">';
				//Operation arguments
				payload = payload + getOperationArgumenst(action);
				payload = payload + '</Operation>';
				payload = payload + '</Invocation>';
				
				performAction(url, payload,currentDeviceId);
			});
			createOperationArgumentsInputs(action, actionDiv);
			
			if( ((action.name=='switchOff') &&(boolEstado) )||((action.name=='switchOn')&& !boolEstado)){
			
				div.append(actionDiv);
			}
			
		}
	}
	return actionDiv;
}
/**
 * 
 */
function getActionsGradualLighting(device, iface, div,boolEstado){
	var actionDiv = null;
	 
	if (typeof(iface.InterfaceActions.InterfaceAction) !== 'undefined'){
		if($.isArray(iface.InterfaceActions.InterfaceAction)) {
			jQuery.each(iface.InterfaceActions.InterfaceAction, function(a, action){
				if(action.name=='setIntensity'){
					actionDiv=$('<button  id=action_' + action.name + ' type="button">' + action.name + '</button>').change({dispId:device.id, actionName:action.name},function (e) {
						var url  = 'http://localhost:8182/' + iface.name + '/' + device.name;
						var payload = '';
						//Invocation
						payload = payload + '<Invocation>';
						//Device
						payload = payload + '<Device id="' + device.id + '" type="actuator">';
						//Internal atributes
						payload = payload + getInternalAttributes(device, iface);
						payload = payload + '</Device>';
						//Operation
						payload = payload + '<Operation operationName="' + action.name + '">';
						//Operation arguments
						
							payload = payload + getOperationArgumenst(action);
						
						payload = payload + '</Operation>';
						payload = payload + '</Invocation>';
						
						performAction(url, payload,currentDeviceId);
					});
					createOperationArgumentsInputs(action, actionDiv,device);
				}
				else{
					actionDiv = $('<div id=action_' + action.name + ' class="actions menuOp">' + action.name + '</div>').click({dispId:device.id, actionName:action.name},function (e) {
						var url  = 'http://localhost:8182/' + iface.name + '/' + device.name;
			
							var payload = '';
							//Invocation
							payload = payload + '<Invocation>';
							//Device
							payload = payload + '<Device id="' + device.id + '" type="actuator">';
							//Internal atributes
							payload = payload + getInternalAttributes(device, iface);
							payload = payload + '</Device>';
							//Operation
							payload = payload + '<Operation operationName="' + action.name + '">';
							//Operation arguments
							
								payload = payload + getOperationArgumenst(action);
							
							payload = payload + '</Operation>';
							payload = payload + '</Invocation>';
							
							performAction(url, payload,currentDeviceId);
						});
						createOperationArgumentsInputs(action, actionDiv,device);
				}
				
				
				if( ((action.name=='switchOff') &&(boolEstado) )||((action.name=='switchOn')&& !boolEstado) 
						||action.name=='stepUp'||action.name=='stepDown'|| action.name=='setIntensity'){
					div.append(actionDiv);
				}				
			});
		}
		else{
			var action = iface.InterfaceActions.InterfaceAction;
			if(action.name=='setIntensity'){
				actionDiv=$('<button  id=action_' + action.name + ' type="button">' + action.name + '</button>').change({dispId:device.id, actionName:action.name},function (e) {
					var url  = 'http://localhost:8182/' + iface.name + '/' + device.name;
					var payload = '';
					//Invocation
					payload = payload + '<Invocation>';
					//Device
					payload = payload + '<Device id="' + device.id + '" type="actuator">';
					//Internal atributes
					payload = payload + getInternalAttributes(device, iface);
					payload = payload + '</Device>';
					//Operation
					payload = payload + '<Operation operationName="' + action.name + '">';
					//Operation arguments
					
						payload = payload + getOperationArgumenst(action);
					
					payload = payload + '</Operation>';
					payload = payload + '</Invocation>';
					
					performAction(url, payload,currentDeviceId);
				});
				createOperationArgumentsInputs(action, actionDiv,device);
			}
			else{
				actionDiv = $('<div id=action_' + action.name + ' class="actions menuOp">' + action.name + '</div>').click({dispId:device.id, actionName:action.name},function (e) {
					var url  = 'http://localhost:8182/' + iface.name + '/' + device.name;
		
						var payload = '';
						//Invocation
						payload = payload + '<Invocation>';
						//Device
						payload = payload + '<Device id="' + device.id + '" type="actuator">';
						//Internal atributes
						payload = payload + getInternalAttributes(device, iface);
						payload = payload + '</Device>';
						//Operation
						payload = payload + '<Operation operationName="' + action.name + '">';
						//Operation arguments
						
							payload = payload + getOperationArgumenst(action);
						
						payload = payload + '</Operation>';
						payload = payload + '</Invocation>';
						
						performAction(url, payload,currentDeviceId);
					});
					createOperationArgumentsInputs(action, actionDiv,device);
			}
			
			if( ((action.name=='switchOff') &&(boolEstado) )||((action.name=='switchOn')&& !boolEstado) 
					||action.name=='stepUp'||action.name=='stepDown'|| action.name=='setIntensity'){
			
				div.append(actionDiv);
			}	
		}
	}
	return actionDiv;
}
///
function getActionsAlarmLighting(device, iface, div,boolEstado){
	var actionDiv = null;
	if (typeof(iface.InterfaceActions.InterfaceAction) !== 'undefined'){
		if($.isArray(iface.InterfaceActions.InterfaceAction)) {
			jQuery.each(iface.InterfaceActions.InterfaceAction, function(a, action){
				
				actionDiv = $('<div id=action_' + action.name + ' class="actions menuOp">' + action.name + '</div>').click({dispId:device.id, actionName:action.name},function (e) {
				var url  = 'http://localhost:8182/' + iface.name + '/' + device.name;
	
					var payload = '';
					//Invocation
					payload = payload + '<Invocation>';
					//Device
					payload = payload + '<Device id="' + device.id + '" type="actuator">';
					//Internal atributes
					payload = payload + getInternalAttributes(device, iface);
					payload = payload + '</Device>';
					//Operation
					payload = payload + '<Operation operationName="' + action.name + '">';
					//Operation arguments
					payload = payload + getOperationArgumenst(action);
					payload = payload + '</Operation>';
					payload = payload + '</Invocation>';
					
					performAction(url, payload,currentDeviceId);
				});
				createOperationArgumentsInputs(action, actionDiv,device);
				
				if( ((action.name=='stopLighting') &&(boolEstado) )||((action.name=='startLighting')&& !boolEstado)){
					
					div.append(actionDiv);
				}			
			});
		}
		else{
			var action = iface.InterfaceActions.InterfaceAction;
			actionDiv = $('<div id=action_' + action.name + ' class="actions menuOp">' + action.name + '</div>').click({dispId:device.id, actionName:action.name},function (e) {
			var url  = 'http://localhost:8182/' + iface.name + '/' + device.name;

				var payload = '';
				//Invocation
				payload = payload + '<Invocation>';
				//Device
				payload = payload + '<Device id="' + device.id + '" type="actuator">';
				//Internal atributes
				payload = payload + getInternalAttributes(device, iface);
				payload = payload + '</Device>';
				//Operation
				payload = payload + '<Operation operationName="' + action.name + '">';
				//Operation arguments
				payload = payload + getOperationArgumenst(action);
				payload = payload + '</Operation>';
				payload = payload + '</Invocation>';
				
				performAction(url, payload,currentDeviceId);
			});
			createOperationArgumentsInputs(action, actionDiv);
			
			if( ((action.name=='stopLighting') &&(boolEstado) )||((action.name=='startLighting')&& !boolEstado)){
			
				div.append(actionDiv);
			}
			
		}
	}
	return actionDiv;
}




