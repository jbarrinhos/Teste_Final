package backend.dto;

import java.util.ArrayList;
import java.util.List;

import backend.model.Empresa;

public class EmpresaSimpleResponse extends SimpleResponse {
	List<Empresa> empresas;

	public EmpresaSimpleResponse() {
		empresas = new ArrayList<>();
	}

	public List<Empresa> getEmpresas() {
		return empresas;
	}

	public void setEmpresas(List<Empresa> aEmpresas) {
		empresas = aEmpresas;
	}

}
