package backend.dto;

public class SimpleResponse {

	private boolean statusOk;
	private String mensagem;

	public SimpleResponse() {
		statusOk = false;
		mensagem = "Ocorreu um erro";
	}

	public void setSucesso(String aMensagem) {
		statusOk = true;
		mensagem = aMensagem;

	}

	public void setAsError(String aMensagem) {
		statusOk = false;
		mensagem = aMensagem;
	}

	public boolean isStatus() {
		return statusOk;
	}

	public void setStatus(boolean status) {
		this.statusOk = status;
	}

	public String getMensagem() {
		return mensagem;
	}

	public void setMensagem(String aMensagem) {
		mensagem = aMensagem;
	}

}
