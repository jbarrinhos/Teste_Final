import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Typography } from "@mui/material";

export function Dados(props) {
  const API_URL = "http://localhost:8080";

  const [funcionario, setFuncionario] = useState({});
  const [dadosfuncionarios, setDadosFuncionarios] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    setFuncionario(props.funcionarioInfo);
    console.log(props);

    getSalario();

    if (!params.id) {
      return;
    }
  }, []);

  function getSalario() {
    fetch(API_URL + "/salarioByID/" + props.funcionarioInfo.id, {
      mode: "cors",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        // Validar se o pedido foi feito com sucesso. Pedidos são feitos com sucesso normalmente quando o status é entre 200 e 299
        if (response.status !== 200) {
          throw new Error("There was an error finding pessoas");
        }

        return response.json();
      })
      .then((parsedResponse) => {
        setDadosFuncionarios(parsedResponse);
        console.log(funcionario);
        console.log(parsedResponse);
      })
      .catch((error) => {
        alert(error);
      });
  }

  return props.funcionarioInfo !== {} ? (
    <>
      <table>
        <tbody>
          <tr>
            <th>Nome Funcionário</th>
            <th>Salário</th>
            <th>Data</th>
          </tr>

          {dadosfuncionarios.map((element, index) => (
            <tr key={element.index}>
              <td>{props.funcionarioInfo.nome}</td>
              <td>{element.quantidade}</td>
              <td>{element.data}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  ) : (
    <Typography variant="h1">empresa não encontrado</Typography>
  );
}
