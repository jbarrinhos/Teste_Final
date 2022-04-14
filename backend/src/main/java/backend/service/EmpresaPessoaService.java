package backend.service;


import static java.lang.Long.parseLong;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import backend.model.Empresa;
import backend.model.Pessoa;
import backend.repository.EmpresaRepository;
import backend.repository.PessoaRepository;


@Service
public class EmpresaPessoaService {

	private final EmpresaRepository empresaRepository;
	private final PessoaRepository pessoaRepository;

	public EmpresaPessoaService(EmpresaRepository aEmpresaRepository, PessoaRepository aPessoaRepository) {

		empresaRepository = aEmpresaRepository;
		pessoaRepository = aPessoaRepository;
	}

	
//	//verificar isto que está errado
//	public boolean addPessoaEmpresa(Pessoa aPessoa, Empresa aEmpresa) {
//		Optional<Empresa> empresaOptional = empresaRepository.findById(aEmpresa.getId());
//
//		if (empresaOptional.isPresent() && empresaOptional.isEmpty() ){
//          
//      
//			return false;
//		}
//		Empresa empresaAux = empresaOptional.get();
//		empresaAux.addPessoa(aPessoa);
//		aPessoa.setEmpresa(empresaAux);
//
//		pessoaRepository.save(aPessoa);
//		empresaRepository.save(empresaAux);
//
//		return true;
//	}

//	
	public List<Pessoa> PessoasByEmpresa(String aEmpresa_id) {
		Long id_long = parseLong(aEmpresa_id);
		Optional<Empresa> empresaOpcional = empresaRepository.findById(id_long);
		return empresaOpcional.get().getPessoas();

	}
	
	public boolean VerificarEmpresa(Pessoa aPessoa) {

		Optional<Empresa> empresa = empresaRepository.findById(aPessoa.getEmpresa().getId());

		if (aPessoa.getEmpresa() == null || !empresa.isPresent()) {
			return false;
		}
		return true;

}
	
	
	


	
}
