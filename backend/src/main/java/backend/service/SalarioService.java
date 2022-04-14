package backend.service;

import static java.lang.Float.NaN;
import static java.lang.Long.parseLong;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.model.Salario;
import backend.repository.SalarioRepository;

@Service
public class SalarioService {

	private final SalarioRepository salarioRepository;

	@Autowired
	public SalarioService(SalarioRepository aSalarioRepository) {
		salarioRepository = aSalarioRepository;
	}

	public boolean addSalario(Salario aSalario) {
		if (aSalario.getId() == null) {
			salarioRepository.save(aSalario);
			return true;
		}
		return false;
	}

	public List<Salario> getAllSalarios() {
		List<Salario> salarios = new ArrayList<>();
		salarioRepository.findAll().forEach(salarios::add);
		return salarios;

	}

	public boolean removeSalario(String aId) {
		try {
			Long id_long = parseLong(aId);
			Optional<Salario> salarioOptional = salarioRepository.findById(id_long);
			if (aId == null || id_long == NaN || salarioOptional.isEmpty()) {
				return false;
			}
			Salario salario = salarioOptional.get();
			salarioRepository.delete(salario);
			return true;
		} catch (Exception e) {
			return false;
		}
	}

}
