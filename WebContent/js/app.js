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
				    	saveInterfacesXML(ifaces);//Almaceno el xml en la sesión
				    	saveInterfaces(JSON.stringify(parseInterfaces()));//Almaceno la configuración en la sesión (JSON)
				    	$.get('http://localhost:8080/SimpleRESTweb/rest/login/config',
				    			function(config) {
				    				saveConfigXML(config);//Almaceno el xml en la sesión
				    				saveConfig(JSON.stringify(parseConfig()));//Almaceno la configuración en la sesión (JSON)
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
 * Llamada a servicio errónea
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
 * Obtener información de usuario almacenada en la sesión
 * @returns {String}
 */
function getUserInfo(){
	return JSON.parse(sessionStorage.getItem("userInfo"));
}

/**
 * Obtiene parámetro de la url
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
 * Almacena en la sesión la configuración
 * @param config
 */
function saveConfig(config){
	sessionStorage.setItem("config", config);
}

/**
 * Obtiene la configuración almacenada en la sesión
 * @returns
 */
function getConfig(){
	return sessionStorage.getItem("config");
}

/**
 * Convierte la configuración en xml en JSON
 * @returns {String}
 */
function parseConfig(){
	return $.xml2json(getConfigXML());
}

/**
 * Convierte la definición de interfaces en xml en JSON
 */
function parseInterfaces(){
	return $.xml2json(getInterfacesXML());
}

/**
 * Obtiene el parámetro BASEURL de la configuración XML
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
 * Almacena en la sesión el xml de definición de interfaces
 * @param xml
 */
function saveInterfacesXML(xml){
	sessionStorage.setItem("interfacesXML",  new XMLSerializer().serializeToString( xml ));
}

/**
 * Recupera de la sesión el xml de definición de interfaces
 * @returns
 */
function getInterfacesXML(){
	var interfaces = $.parseXML( sessionStorage.getItem("interfacesXML") );
	return interfaces;
}

/**
 * Almacena en la sesión la definición de interfaces
 * @param interfaces
 */
function saveInterfaces(interfaces){
	sessionStorage.setItem("interfaces", interfaces);
}

/**
 * Recupera de la sesión la definición de interfaces
 * @returns
 */
function getInterfaces(){
	return sessionStorage.getItem("interfaces");
}