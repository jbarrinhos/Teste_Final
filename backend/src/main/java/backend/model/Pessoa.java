package backend.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Type;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "Pessoa")
public class Pessoa {
	@Id
	@Column(name = "id", nullable = false)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String nome;
	private int idade;
	private String email;
	
	@Lob
	@Type(type = "org.hibernate.type.TextType")
	@Column
	private String imagem;

	@ManyToOne
	@JoinColumn(name = "Empresa_id")
	private Empresa empresa;

	@OneToMany(mappedBy = "pessoa") 
	@JsonIgnore
	private List<Salario> salarios = new ArrayList<>();

	public void addSalario(Salario aSalario) {

		salarios.add(aSalario);

	}

	public Long getId() {
		return id;
	}

	public String getNome() {
		return nome;
	}

	public int getIdade() {
		return idade;
	}

	public String getEmail() {
		return email;
	}

	public String getImagem() {
		return imagem;
	}

	public void setNome(String aNome) {
		nome = aNome;
	}

	public void setIdade(int aIdade) {
		idade = aIdade;
	}

	public void setEmail(String aEmail) {
		email = aEmail;
	}

	public void setImagem(String aImagem) {
		imagem = aImagem;
	}

	public Empresa getEmpresa() {
		return empresa;
	}

	public void setEmpresa(Empresa aEmpresa) {
		empresa = aEmpresa;
	}

	public List<Salario> getSalarios() {
		return salarios;
	}

	public void setSalarios(List<Salario> aSalarios) {
		salarios = aSalarios;
	}

}
