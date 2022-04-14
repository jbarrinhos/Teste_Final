package backend.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Type;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "Empresa")
public class Empresa {

	@Id
	@Column(name = "id", nullable = false)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String nome;
	private String morada;
	@Lob
	@Type(type = "org.hibernate.type.TextType")
	@Column
	private String imagem;

	@OneToMany(mappedBy = "empresa")
	@JsonIgnore
	private List<Pessoa> pessoas = new ArrayList<>();

	
	public void addPessoa(Pessoa aPessoa) {

		pessoas.add(aPessoa);

	}

	public String getNome() {
		return nome;
	}

	public String getMorada() {
		return morada;
	}

	public String getImagem() {
		return imagem;
	}

	public void setNome(String aNome) {
		nome = aNome;
	}

	public void setMorada(String aMorada) {
		morada = aMorada;
	}

	public void setImagem(String aImagem) {
		imagem = aImagem;
	}

	public Long getId() {
		return id;
	}

	public List<Pessoa> getPessoas() {
		
		return pessoas;
	}

	public void setPessoas(List<Pessoa> aPessoas) {
		pessoas = aPessoas;
	}
	

}
