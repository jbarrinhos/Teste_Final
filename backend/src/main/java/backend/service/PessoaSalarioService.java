package backend.service;

import static java.lang.Long.parseLong;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import backend.model.Empresa;
import backend.model.Pessoa;
import backend.model.Salario;
import backend.repository.PessoaRepository;
import backend.repository.SalarioRepository;

@Service
public class PessoaSalarioService {
	private final PessoaRepository pessoaRepository;
	private final SalarioRepository salarioRepository;

	public PessoaSalarioService(PessoaRepository aPessoaRepository, SalarioRepository aSalarioRepository) {
		pessoaRepository = aPessoaRepository;
		salarioRepository = aSalarioRepository;
	}

//	public boolean addSalarioPessoa(Salario aSalario, Pessoa aPessoa) {
//		Optional<Pessoa> pessoaOptional = pessoaRepository.findById(aPessoa.getId());
//
//		if (pessoaOptional.isPresent() && pessoaOptional.isEmpty()) {
//			return false;
//		}
//		Pessoa pessoaAux = pessoaOptional.get();
//		pessoaAux.addSalario(aSalario);
//		aSalario.setPessoa(pessoaAux);
//
//		salarioRepository.save(aSalario);
//		pessoaRepository.save(pessoaAux);
//
//		return true;
//	}

	public boolean VerificarPessoa(Salario aSalario) {

		Optional<Pessoa> pessoa = pessoaRepository.findById(aSalario.getPessoa().getId());

		if (aSalario.getPessoa() == null || !pessoa.isPresent()) {
			return false;
		}
		return true;

	}
	
	public List<Salario> SalarioPessoa(String aPessoa_id) {
		Long id_long = parseLong(aPessoa_id);
		Optional<Pessoa> pessoaOpcional = pessoaRepository.findById(id_long);
		return pessoaOpcional.get().getSalarios();

	}
}
