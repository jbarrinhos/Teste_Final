package backend.repository;

import org.springframework.data.repository.CrudRepository;

import backend.model.Salario;

public interface SalarioRepository extends CrudRepository<Salario, Long> {

}
