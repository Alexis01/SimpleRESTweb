package server;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;


@Path("/HAUS")
public class DeviceManager {

	@POST
	@Path("/{idDevice}/{accion}")
	public void performAction(@PathParam("idDevice") String idDevice, @PathParam("accion") String accion){
		System.out.println("Accion " + accion + " para dispositivo " + idDevice);
	}
	
	
	@GET
	@Path("/status/{idDevice}")
	public String getStatus(@PathParam("idDevice") String idDevice){
		String status = null;
		if (Math.random() > 0.5){
			status = "ok";
		}
		else{
			status = "ko";
		}
		if ("a".equals(idDevice)){
			status = "estado aaa";
		}
		return status;
	}
}
