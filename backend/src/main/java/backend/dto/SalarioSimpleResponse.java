package backend.dto;

import java.util.ArrayList;
import java.util.List;

import backend.model.Salario;

public class SalarioSimpleResponse extends SimpleResponse {
	List<Salario> salarios;

	public SalarioSimpleResponse() {
		salarios = new ArrayList<>();
	}

	public List<Salario> getSalarios() {
		return salarios;
	}

	public void setSalarios(List<Salario> aSalarios) {
		salarios = aSalarios;
	}

}
