import { useEffect, useState } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import "./Design.css";

const API_URL = "http://localhost:8080";

export function AddPessoa() {
  const [novaPessoa, setNovaPessoa] = useState({
    nome: "",
    idade: 1,
    email: "",
    empresa: {
      id: "",
    },
    imagem: "",
  });
  const [listaEmpresas, setListasEmpresas] = useState([]);

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    const base64 = await convertBase64(file);
    let aux = base64;
    console.log(base64);
    console.log(aux);
    setNovaPessoa({ ...novaPessoa, imagem: aux });
    console.log(aux);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  useEffect(() => {
    GetEmpresas();
  }, []);

  function AdicionarPessoa() {
    if (
      novaPessoa.nome.trim().length !== 0 &&
      novaPessoa.idade.trim().length !== 0 &&
      novaPessoa.email.trim().length !== 0
    ) {
      fetch(API_URL + "/addPessoa", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(novaPessoa),
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
          label="Nome da Pessoa"
          variant="filled"
          type="text"
          value={novaPessoa.nome}
          onChange={(e) => {
            setNovaPessoa({ ...novaPessoa, nome: e.target.value });
          }}
        />

        <TextField
          margin="normal"
          required
          id="filled-basic"
          label="idade da Pessoa"
          variant="filled"
          type="text"
          value={novaPessoa.idade}
          onChange={(e) => {
            setNovaPessoa({ ...novaPessoa, idade: e.target.value });
          }}
        />
        <TextField
          margin="normal"
          required
          id="filled-basic"
          label="email da Pessoa"
          variant="filled"
          type="text"
          value={novaPessoa.email}
          onChange={(e) => {
            setNovaPessoa({ ...novaPessoa, email: e.target.value });
          }}
        />
        <br></br>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Empresa</InputLabel>
          <Select
            labelId="Empresa"
            id="filled-basic"
            label="Empresa"
            value={novaPessoa.Empresa}
            onChange={(e) => {
              setNovaPessoa({ ...novaPessoa, empresa: e.target.value });
            }}
          >
            {listaEmpresas.map((element) => (
              <MenuItem value={element} key={element.id}>
                {element.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br></br>
        <input
          type="file"
          onChange={(e) => {
            uploadImage(e);
          }}
        />
      </Box>
      <br></br>
      <div>
        <button className="btn-Add" onClick={AdicionarPessoa}>
          Adicionar Pessoa
        </button>
      </div>
    </>
  );
}
