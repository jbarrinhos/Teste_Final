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

import backend.dto.EmpresaSimpleResponse;
import backend.dto.SimpleResponse;
import backend.model.Empresa;
import backend.service.EmpresaService;

@CrossOrigin
@RestController
public class EmpresaController {
	private final EmpresaService empresaService;

	
	@Autowired
	public EmpresaController(EmpresaService aEmpresaService) {
		empresaService = aEmpresaService;
	}

	@CrossOrigin
	@GetMapping("/getAllEmpresas")
	public List<Empresa> getEmpresas() {
		return empresaService.getAllEmpresas();
	}

	@CrossOrigin
	@PostMapping("/addEmpresa")
	public ResponseEntity<SimpleResponse> addEmpresa(@RequestBody Empresa aEmpresa) {

		EmpresaSimpleResponse esr = new EmpresaSimpleResponse();

		if (aEmpresa.getNome() == null || aEmpresa.getNome().isBlank()) {
			esr.setMensagem("Nome inválido");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(esr);
		}
		if (aEmpresa.getMorada() == null || aEmpresa.getMorada().isBlank()) {
			esr.setMensagem("Morada inválida");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(esr);
		}
		if (empresaService.addEmpresa(aEmpresa)) {
			esr.setSucesso("Empresa criada com sucesso");
			esr.setEmpresas(empresaService.getAllEmpresas());
			return ResponseEntity.status(HttpStatus.OK).body(esr);
		} else {
			esr.setAsError("Erro ao criar a Empresa");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(esr);
		}
	}

	@CrossOrigin
	@DeleteMapping("/deleteEmpresa/{aId}")
	public ResponseEntity<SimpleResponse> deleteEmpresa(@PathVariable String aId) {
		EmpresaSimpleResponse esr = new EmpresaSimpleResponse();
		if (empresaService.removeEmpresa(aId)) {
			esr.setSucesso("Sucesso ao remover a empresa");
			return ResponseEntity.status(HttpStatus.OK).body(esr);
		}

		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(esr);
	
	}

}
