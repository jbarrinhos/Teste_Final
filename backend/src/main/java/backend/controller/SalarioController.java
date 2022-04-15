package backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import backend.dto.SalarioSimpleResponse;
import backend.dto.SimpleResponse;
import backend.model.Pessoa;
import backend.model.Salario;
import backend.service.PessoaSalarioService;
import backend.service.SalarioService;

@CrossOrigin
@RestController
public class SalarioController {
	private final SalarioService salarioService;
	private final PessoaSalarioService pessoaSalarioService;

	@Autowired
	public SalarioController(SalarioService aSalarioService, PessoaSalarioService aPessoaSalarioService) {
		salarioService = aSalarioService;
		pessoaSalarioService=aPessoaSalarioService;
	}

	@CrossOrigin
	@GetMapping("/getAllSalarios")
	public List<Salario> getSalarios() {
		return salarioService.getAllSalarios();
	}

	@CrossOrigin
	@PostMapping("/addSalario")
	public ResponseEntity<SimpleResponse> addSalario(@RequestBody Salario aSalario) {
		SalarioSimpleResponse ssr = new SalarioSimpleResponse();

		if (aSalario.getQuantidade() <= 1) {
			ssr.setMessage("Tem de inserir a quantidade");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ssr);
		}
		if (aSalario.getData() == null) {
			ssr.setMessage("Tem de inserir uma data (dd-MM-yyyy)");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ssr);
		}
		if (aSalario.getPessoa() == null||aSalario.getPessoa().getId()==null) {
			ssr.setMessage("O salário tem de ter uma pessoa associada");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ssr);
		}

		if (!pessoaSalarioService.VerificarPessoa(aSalario)) {
			ssr.setMessage("A pessoa nao existe");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ssr);
		}

		
		if (salarioService.addSalario(aSalario)) {
			ssr.setSucesso("Salário adicionado com sucesso");
			ssr.setSalarios(salarioService.getAllSalarios());
			return ResponseEntity.status(HttpStatus.OK).body(ssr);
		} else {
			ssr.setAsError("Erro ao adicionar o Salario");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ssr);
		}
	}

	@CrossOrigin
	@DeleteMapping("/deleteSalario/{aId}")
	public boolean deleteSalario(@PathVariable String aId) {
		return salarioService.removeSalario(aId);
	}

	@CrossOrigin
	@GetMapping("/salarioByID/{aPessoa_id}")
	public List<Salario> GetSalarioPessoa(@PathVariable String aPessoa_id) {
		return pessoaSalarioService.SalarioPessoa(aPessoa_id);
	}
	
}
