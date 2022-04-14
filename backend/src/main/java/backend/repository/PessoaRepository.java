package backend.repository;

import org.springframework.data.repository.CrudRepository;

import backend.model.Pessoa;

public interface PessoaRepository extends CrudRepository<Pessoa, Long> {

}
