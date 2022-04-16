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

import backend.dto.PessoaSimpleResponse;
import backend.dto.SimpleResponse;
import backend.model.Pessoa;
import backend.service.EmpresaPessoaService;
import backend.service.PessoaSalarioService;
import backend.service.PessoaService;


@CrossOrigin
@RestController
public class PessoaController {
	private final PessoaService pessoaService;
	private final EmpresaPessoaService empresaPessoaService;
	private final PessoaSalarioService pessoaSalarioService;

	@Autowired
	public PessoaController(PessoaService aPessoaService, EmpresaPessoaService aEmpresaPessoaService, PessoaSalarioService aPessoaSalarioService) {
		pessoaService = aPessoaService;
		empresaPessoaService = aEmpresaPessoaService;
		pessoaSalarioService=aPessoaSalarioService;
	}
	
	@CrossOrigin
	@GetMapping("/getAllPessoas")
	public List<Pessoa> getPessoas() {
		return pessoaService.getAllPessoas();
	}

	@CrossOrigin
	@PostMapping("/addPessoa")
	public ResponseEntity<SimpleResponse> addPessoa(@RequestBody Pessoa aPessoa) {

		PessoaSimpleResponse psr = new PessoaSimpleResponse();

		if (aPessoa.getNome() == null || aPessoa.getNome().isBlank()) {
			psr.setMessage("Tem de inserir um nome");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(psr);
		}
		if (aPessoa.getIdade() <= 1) {
			psr.setMessage("Tem de inserir a idade");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(psr);
		}
		if (aPessoa.getEmail() == null || aPessoa.getEmail().isBlank()) {
			psr.setMessage("Tem de inserir um email");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(psr);
		}
		if (!pessoaService.validarEmail(aPessoa.getEmail())) {
			psr.setMessage("E-mail incorreto! ");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(psr);
		}
		if (aPessoa.getEmpresa() == null|| aPessoa.getEmpresa().getId()==null) {
			psr.setMessage("A pessoa tem de pertencer a uma Empresa");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(psr);
		}

		if (!empresaPessoaService.VerificarEmpresa(aPessoa)) {
			psr.setMessage("A Empresa nao existe");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(psr);
		}
		if (aPessoa.getImagem() == null || aPessoa.getImagem().isBlank()) {
			psr.setMessage("Tem de inserir uma imagem");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(psr);
		}

		if (pessoaService.addPessoa(aPessoa)) {
			psr.setSucesso("Pessoa adicionada com sucesso");
			psr.setPessoas(pessoaService.getAllPessoas());
			return ResponseEntity.status(HttpStatus.OK).body(psr);
		} else {
			psr.setAsError("Erro ao adicionar a Pessoa");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(psr);
		}
	}

	@CrossOrigin
	@DeleteMapping("/deletePessoa/{aId}")
	public boolean deletePessoa(@PathVariable String aId) {
		return pessoaService.removePessoa(aId);
	}
	
	
	@CrossOrigin
	@GetMapping("/pessoasByEmpresa/{aEmpresa_id}")
	public List<Pessoa> GetPessoasByEmpresa(@PathVariable String aEmpresa_id) {
		return empresaPessoaService.PessoasByEmpresa(aEmpresa_id);
	}
	


}
