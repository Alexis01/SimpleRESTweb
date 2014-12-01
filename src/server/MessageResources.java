package server;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import jsonObjects.LoginInfo;


@Path("/mirecurso")
public class MessageResources {

	@GET
	@Path("/text")
	@Produces("text/html")
	public String responseText(){
		return "Mensaje";
	}
	
	@GET
	@Path("/prueba")
	@Produces(MediaType.APPLICATION_JSON)
	public String respuesta(@QueryParam("callback") String callback){
		return callback + "({\"ok\":\"ok1\"});";
	}
	
	@POST
	@Path("/ppost")
	public void pruebaPost(){
		System.out.println("PruebaPost");
	}
	
	@GET
	@Path("/json")
	@Produces(MediaType.APPLICATION_JSON)
	public LoginInfo responseJSON(){
		LoginInfo li = new LoginInfo();
		li.setLogin("ccc");
		li.setPasswd("ddd");
		
		
		return li;
		
	}
}
