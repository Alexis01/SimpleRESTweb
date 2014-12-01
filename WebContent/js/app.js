//Declare Varibales which are using in AJAX method.

var Type;
var Url;
var Data;
var ContentType;
var DataType;
var ProcessData;
var successFunction;

/**
 * Llamada a servicio
 */
function CallService() {
	$.ajax({
		type: Type, //GET or POST or PUT or DELETE verb
		url: Url, // Location of the service
		data: Data, //Data sent to server
		contentType: ContentType, // content type sent to server
		dataType: DataType, //Expected data format from server
		processdata: ProcessData, //True or False
		crossDomain: true,
		success: function (msg) {
			//On Successfull service call
			successFunction(msg);
		},	
		error: ServiceFailed // When Service call fails
	});
}

/**
 * Login de usuario OK
 * @param result
 */
function LoginServiceSucceeded(result) {
	if (DataType == "json") {
		sessionStorage.setItem("userInfo", JSON.stringify(result));
		if (result.result == "ok"){
			sessionStorage.setItem("loginStatus", "OK");

			$.get('http://localhost:8080/SimpleRESTweb/rest/login/interfaces',
					function(ifaces) {
				    	saveInterfacesXML(ifaces);//Almaceno el xml en la sesi�n
				    	saveInterfaces(JSON.stringify(parseInterfaces()));//Almaceno la configuraci�n en la sesi�n (JSON)
				    	$.get('http://localhost:8080/SimpleRESTweb/rest/login/config',
				    			function(config) {
				    				saveConfigXML(config);//Almaceno el xml en la sesi�n
				    				saveConfig(JSON.stringify(parseConfig()));//Almaceno la configuraci�n en la sesi�n (JSON)
				    				//window.location = "home.html";
				    			}
				    	);
		    		}
			);
			
			
		}
		else{
			$('#info').html("Usuario no autorizado");
		}
	}
	else {
		$('#info').html("Result Data type is not JSON");
	}
}

/**
 * Llamada a servicio err�nea
 * @param result
 */
function ServiceFailed(result) {
	alert('Service call failed: ' + result.status + '' + result.statusText);
	Type = null; Url = null; Data = null; ContentType = null; DataType = null; ProcessData = null;
}

/**
 * Login de usuario
 */
function ValidateUser() {
	
	var request = { login: $('#txtUserName').val(), passwd: $('#txtPassword').val()};
	var jsondata = JSON.stringify(request);
	Type = "POST";
	Url = "http://localhost:8080/SimpleRESTweb/rest/login/validateUser";
	Data = jsondata;
	ContentType = "application/json";
	DataType = "json";
	ProcessData = true;
	successFunction = LoginServiceSucceeded;
	CallService(); // Call the Web Service....
}

/**
 * Obtener informaci�n de usuario almacenada en la sesi�n
 * @returns {String}
 */
function getUserInfo(){
	return JSON.parse(sessionStorage.getItem("userInfo"));
}

/**
 * Obtiene par�metro de la url
 * @param param
 * @returns
 */
function getParameter(param) {
    var val = document.URL;
    var url = val.substr(val.indexOf(param));  
    return url.replace(param+"=","");
}

function printUserInfo(divId){
	var userInfo = getUserInfo();
	var userInformation = userInfo.nombre + " " + userInfo.apellidos;
	
	$('#'+divId).append(userInformation);
}

/**
 * Almacena en la sesion el XML de configuracion
 * @param result
 */
function saveConfigXML(xml){
	sessionStorage.setItem("configXML",  new XMLSerializer().serializeToString( xml ));
}

/**
 * Obtiene la configuracion en XML almacenada en la sesion
 * @returns
 */
function getConfigXML(){
	var config = $.parseXML( sessionStorage.getItem("configXML") );
	return config;
}

/**
 * Almacena en la sesi�n la configuraci�n
 * @param config
 */
function saveConfig(config){
	sessionStorage.setItem("config", config);
}

/**
 * Obtiene la configuraci�n almacenada en la sesi�n
 * @returns
 */
function getConfig(){
	return sessionStorage.getItem("config");
}

/**
 * Convierte la configuraci�n en xml en JSON
 * @returns {String}
 */
function parseConfig(){
	return $.xml2json(getConfigXML());
}

/**
 * Convierte la definici�n de interfaces en xml en JSON
 */
function parseInterfaces(){
	return $.xml2json(getInterfacesXML());
}

/**
 * Obtiene el par�metro BASEURL de la configuraci�n XML
 * @returns
 */
function getBaseURL(){
	var config = getConfigXML();
	var baseURL=null;
	$(config).find("InstallationParameters").find("Parameter").each (function(){
		if ($(this).attr("name") == "baseURL"){
			baseURL = $(this).attr("value");
		}
	});
	return baseURL;
}

/**
 * Almacena en la sesi�n el xml de definici�n de interfaces
 * @param xml
 */
function saveInterfacesXML(xml){
	sessionStorage.setItem("interfacesXML",  new XMLSerializer().serializeToString( xml ));
}

/**
 * Recupera de la sesi�n el xml de definici�n de interfaces
 * @returns
 */
function getInterfacesXML(){
	var interfaces = $.parseXML( sessionStorage.getItem("interfacesXML") );
	return interfaces;
}

/**
 * Almacena en la sesi�n la definici�n de interfaces
 * @param interfaces
 */
function saveInterfaces(interfaces){
	sessionStorage.setItem("interfaces", interfaces);
}

/**
 * Recupera de la sesi�n la definici�n de interfaces
 * @returns
 */
function getInterfaces(){
	return sessionStorage.getItem("interfaces");
}