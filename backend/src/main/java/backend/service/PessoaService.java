package backend.service;

import static java.lang.Float.NaN;
import static java.lang.Long.parseLong;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import backend.model.Pessoa;
import backend.repository.PessoaRepository;


@Service
public class PessoaService {

	private final PessoaRepository pessoaRepository;

	@Autowired
	public PessoaService(PessoaRepository aPessoaRepository) {
		pessoaRepository = aPessoaRepository;
	}

	public boolean addPessoa(Pessoa aPessoa) {
		
		if (aPessoa.getId() == null) {
			pessoaRepository.save(aPessoa);
			return true;
		}
		return false;
	}

	public List<Pessoa> getAllPessoas() {
		List<Pessoa> pessoas = new ArrayList<>();
		pessoaRepository.findAll().forEach(pessoas::add);
		return pessoas;
	}
	

	public boolean removePessoa(String aId) {
		try {
			Long id_long = parseLong(aId);
			Optional<Pessoa> pessoaOptional = pessoaRepository.findById(id_long);
			if (aId == null || id_long == NaN || pessoaOptional.isEmpty()) {
				return false;
			}
			Pessoa pessoa = pessoaOptional.get();
			pessoaRepository.delete(pessoa);
			return true;
		} catch (Exception e) {
			return false;
		}
	}


}
