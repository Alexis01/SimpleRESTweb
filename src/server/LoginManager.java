package server;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import jsonObjects.LoginInfo;

@Path("/login")
public class LoginManager {

	@POST
	@Path("/validateUser")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response validateUser(LoginInfo loginInfo){
		LoginInfo loginResult = new LoginInfo();
		loginResult.setResult("ko");
		if (loginInfo != null && loginInfo.getLogin() != null && !loginInfo.getLogin().isEmpty() && loginInfo.getLogin().equals(loginInfo.getPasswd())){
			loginResult.setResult("ok");
			loginResult.setNombre("Usuario");
			loginResult.setApellidos("Apellidos");
		}
		
		return Response.status(201).entity(loginResult.getLoginResult()).build();
	}
	
	@GET
	@Path("/config")
	@Produces(MediaType.APPLICATION_XML)
	public Response getConfig(){
		String line = null;
		String result = "";
		BufferedReader br = null;
		try{
			
			//br = new BufferedReader(new FileReader("C:\\Users\\Planet Media\\Downloads\\Hause\\SimpleRESTweb\\WebContent\\resources\\config.hausInstallation"));
			br = new BufferedReader(new FileReader("C:\\hlocal\\Hause\\SimpleRESTweb\\WebContent\\resources\\config.hausInstallation"));
			while ((line = br.readLine()) != null) {
				result += line;
			}
		} catch (IOException e){
			e.printStackTrace();
		} finally{
			if (br != null){
				try {
					br.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		
		return Response.status(201).entity(result).build();
	}
	
	@GET
	@Path("/interfaces")
	@Produces(MediaType.APPLICATION_XML)
	public String getXMLInterfaces(){
		
		String line = null;
		String result = "";
		BufferedReader br = null;
		try{
			//br = new BufferedReader(new FileReader("C:\\Users\\Planet Media\\Downloads\\Hause\\SimpleRESTweb\\WebContent\\resources\\HAUSInterfaces.xml"));
			br = new BufferedReader(new FileReader("C:\\hlocal\\Hause\\SimpleRESTweb\\WebContent\\resources\\HAUSInterfaces.xml"));
			
			while ((line = br.readLine()) != null) {
				result += line;
			}
		} catch (IOException e){
			e.printStackTrace();
		} finally{
			if (br != null){
				try {
					br.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		return result;
	}
}
