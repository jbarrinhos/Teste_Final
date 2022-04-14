package backend.service;

import static java.lang.Float.NaN;
import static java.lang.Long.parseLong;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.model.Empresa;
import backend.model.Pessoa;
import backend.model.Salario;
import backend.repository.EmpresaRepository;
import backend.repository.PessoaRepository;
import backend.repository.SalarioRepository;

@Service
public class EmpresaService {

	private final EmpresaRepository empresaRepository;
	private final SalarioRepository salarioRepository;
	private final PessoaRepository pessoaRepository;

	@Autowired
	public EmpresaService(EmpresaRepository aEmpresaRepository,PessoaRepository aPessoaRepository, SalarioRepository aSalarioRepository) {
		empresaRepository = aEmpresaRepository;
		pessoaRepository=aPessoaRepository;
		salarioRepository=aSalarioRepository;

	}

	public boolean addEmpresa(Empresa aEmpresa) {
		if (aEmpresa.getId() == null) {
			empresaRepository.save(aEmpresa);
			return true;
		}
		return false;
	}
	

	public List<Empresa> getAllEmpresas() {
		List<Empresa> empresas = new ArrayList<>();
		empresaRepository.findAll().forEach(empresas::add);
		return empresas;

	}

	public boolean removeEmpresa(String aId) {
		Long id_long = parseLong(aId);
		Optional<Empresa> empresaOptional = empresaRepository.findById(id_long);

		if (empresaOptional.isEmpty()) {
			return false;
		}

		Empresa empresa = empresaOptional.get();

		for (Pessoa pessoaAux : empresa.getPessoas()) {
			for (Salario salarioAux : pessoaAux.getSalarios()) {
				salarioRepository.delete(salarioAux);

			}
			pessoaRepository.delete(pessoaAux);
		}

		empresaRepository.delete(empresa);

		return true;
	}

	
}