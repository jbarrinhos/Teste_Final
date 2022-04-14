package backend.model;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "Salario")
public class Salario {
	@Id
	@Column(name = "id", nullable = false)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private float quantidade;

	@JsonFormat(pattern = "dd-MM-yyyy")
	private Date data;

	@ManyToOne
	@JoinColumn(name = "Salario_id")
	private Pessoa pessoa;

	public Long getId() {
		return id;
	}

	public float getQuantidade() {
		return quantidade;
	}

	public Date getData() {
		return data;
	}

	public void setData(Date aData) {
		data = aData;
	}

	public Pessoa getPessoa() {
		return pessoa;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setQuantidade(float quantidade) {
		this.quantidade = quantidade;
	}

	public void setPessoa(Pessoa aPessoa) {
		pessoa = aPessoa;
	}

}
