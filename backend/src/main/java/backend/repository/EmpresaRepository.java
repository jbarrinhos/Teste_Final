package backend.repository;

import org.springframework.data.repository.CrudRepository;

import backend.model.Empresa;

public interface EmpresaRepository extends CrudRepository<Empresa, Long> {

}
