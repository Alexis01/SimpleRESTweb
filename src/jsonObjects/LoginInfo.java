package jsonObjects;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class LoginInfo {

	private String login;
	private String passwd;
	private String result;
	private String nombre;
	private String apellidos;
	
	public LoginInfo(){
		this.login = "";
		this.passwd = "";
		this.result = "";
		this.nombre = "";
		this.apellidos = "";
	}
	public String getLogin() {
		return login;
	}
	public void setLogin(String login) {
		this.login = login;
	}
	public String getPasswd() {
		return passwd;
	}
	public void setPasswd(String passwd) {
		this.passwd = passwd;
	}
	public String getResult() {
		return result;
	}
	public void setResult(String result) {
		this.result = result;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getApellidos() {
		return apellidos;
	}
	public void setApellidos(String apellidos) {
		this.apellidos = apellidos;
	}
	
	public String getLoginResult(){
		return "{\"result\":\"" + this.getResult() + "\"," +
				"\"nombre\":\"" + this.getNombre() + "\"," +
				"\"apellidos\":\"" + this.getApellidos() + "\"}";
	}
}
