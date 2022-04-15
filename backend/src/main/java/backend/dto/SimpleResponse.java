package backend.dto;

public class SimpleResponse {

	private boolean statusOk;
	private String message;

	public SimpleResponse() {
		statusOk = false;
		message = "Ocorreu um erro";
	}

	public void setSucesso(String aMessage) {
		statusOk = true;
		message = aMessage;

	}

	public void setAsError(String aMessage) {
		statusOk = false;
		message = aMessage;
	}

	public boolean isStatus() {
		return statusOk;
	}

	public void setStatus(boolean status) {
		this.statusOk = status;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String aMessage) {
		message = aMessage;
	}

}
