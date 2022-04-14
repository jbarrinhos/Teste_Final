import { useEffect, useState } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const API_URL = "http://localhost:8080";

export function AddSalario() {
  const [novoSalario, setNovoSalario] = useState({
    quantidade: 1,
    data: "",
    pessoa: {
      id: "",
    },
  });

  const [listasPessoas, setListasPessoas] = useState([]);

  useEffect(() => {
    GetPessoas();
  }, []);

  function AdicionarSalario() {
    if (
      novoSalario.quantidade.trim().length !== 0 &&
      novoSalario.data.trim().length !== 0
    ) {
      fetch(API_URL + "/addSalario", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(novoSalario),
      })
        .then(async (response) => {
          if (response.status !== 200) {
            const parsedResponse = await response.json();
            console.log(parsedResponse.message);
            throw new Error(parsedResponse.message);
          }
          console.log(response);
          return response.json();
        })
        .then((parsedResponse) => {
          console.log(parsedResponse);
          alert(parsedResponse.message);
        })
        .catch((error) => {
          alert(error);
        });
    }
  }

  function GetPessoas() {
    fetch(API_URL + "/getAllPessoas", {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);

        if (response.status !== 200) {
          throw new Error("Ocorreu um erro, nenhum Autor disponível");
        }

        return response.json();
      })
      .then((parsedResponse) => {
        console.log(parsedResponse);
        setListasPessoas(parsedResponse);
      })
      .catch((error) => {
        alert(error);
      });
  }
  return (
    <>
      <Box
        component="form"
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          margin="normal"
          required
          id="filled-basic"
          label="quantidade"
          variant="filled"
          type="text"
          value={novoSalario.quantidade}
          onChange={(e) => {
            setNovoSalario({ ...novoSalario, quantidade: e.target.value });
          }}
        />

        <TextField
          margin="normal"
          required
          id="filled-basic"
          label="data"
          variant="filled"
          type="text"
          value={novoSalario.data}
          onChange={(e) => {
            setNovoSalario({ ...novoSalario, data: e.target.value });
          }}
        />

        <br></br>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Pessoa</InputLabel>
          <Select
            labelId="pessoa"
            id="filled-basic"
            label="pessoa"
            value={novoSalario.pessoa}
            onChange={(e) => {
              setNovoSalario({ ...novoSalario, pessoa: e.target.value });
            }}
          >
            {listasPessoas.map((element) => (
              <MenuItem value={element} key={element.id}>
                {element.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <br></br>
      <div>
        <button className="btn-Add" onClick={AdicionarSalario}>
          Adicionar Salário
        </button>
      </div>
    </>
  );
}
