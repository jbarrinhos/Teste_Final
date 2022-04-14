package backend.dto;

import java.util.ArrayList;
import java.util.List;

import backend.model.Pessoa;

public class PessoaSimpleResponse extends SimpleResponse {
	List<Pessoa> pessoas;

	public PessoaSimpleResponse() {
		pessoas = new ArrayList<>();
	}

	public List<Pessoa> getPessoas() {
		return pessoas;
	}

	public void setPessoas(List<Pessoa> aPessoas) {
		pessoas = aPessoas;
	}

}
