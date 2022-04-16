# Teste_Final
 Teste final da unidade curricular Laboratório de Programação
 
 
 ## Primeira Parte: Backend
 
 > Criar um projeto Spring Boot tendo como base o seguinte diagrama:


![Diagrama](https://user-images.githubusercontent.com/96847584/163691630-71c93d50-b354-4c5d-b916-8e36672b3639.png)


> Endpoints a implementar:

```
/addEmpresa
/removeEmpresa
/getAllEmpresas

/addPessoa
/removePessoa
/getPessoasByEmpresa

/addSalario
/remove Salario
/getSalarioByPessoa
```

**Não pode existir pessoas sem empresa associada. Não podem existir salários sem uma pessoa associada**


## Segunda Parte: Frontend

> Criar um projeto React implementando a API desenvolvida no backend;

> Rotas a implementar:

```
/empresas
/funcionarios/:empresaId
/salario/:funcionarioId

/addEmpresa
/addPessoa
/addSalario

```

1. A aplicação deve redirecionar-se para a página principal, onde contém todas as empresas;
2. Todas as páginas devem ter uma navbar que contém *Empresas*, *Add Empresa*, *Add Pessoa* e *Add Salario*;
3. Ao clicar numa empresa, deverá mostrar todos os funcionários dessa empresa (/funcionarios/:empresaId);
4. Ao clicar no funcionário, deverá mostrar uma tabela com os salários recebidos por esse funcionário (/salario/:funcionarioId);
5. Ao clicar no add Empresa, add Pessoa e/ou add Salário deverá apresentar um form para adicionar, respectivamente, uma empresa, uma pessoa e um salário.


*Contêm informações adicionais na resolução do exercício*
