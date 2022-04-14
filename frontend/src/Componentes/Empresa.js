import { useEffect, useState } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const API_URL = "http://localhost:8080";

export function AddEmpresa() {
  const [novaEmpresa, setNovaEmpresa] = useState({ nome: "", morada: "" });
  const [listaEmpresas, setListasEmpresas] = useState([]);

  useEffect(() => {
    GetEmpresas();
  }, []);

  function AdicionarEmpresa() {
    if (
      novaEmpresa.nome.trim().length !== 0 &&
      novaEmpresa.morada.trim().length !== 0
    ) {
      fetch(API_URL + "/addEmpresa", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(novaEmpresa),
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
          GetEmpresas();
          console.log(parsedResponse);
          alert(parsedResponse.message);
        })
        .catch((error) => {
          alert(error);
        });
    }
  }

  function GetEmpresas() {
    fetch(API_URL + "/getAllEmpresas", {
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
        setListasEmpresas(parsedResponse);
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
          label="Nome da Empresa"
          variant="filled"
          type="text"
          value={novaEmpresa.nome}
          onChange={(e) => {
            setNovaEmpresa({ ...novaEmpresa, nome: e.target.value });
          }}
        />

        <TextField
          margin="normal"
          required
          id="filled-basic"
          label="Morada da Empresa"
          variant="filled"
          type="text"
          value={novaEmpresa.morada}
          onChange={(e) => {
            setNovaEmpresa({ ...novaEmpresa, morada: e.target.value });
          }}
        />
      </Box>
      <br></br>
      <div>
        <button className="btn-Add" onClick={AdicionarEmpresa}>
          Adicionar Empresa
        </button>
      </div>
    </>
  );
}
