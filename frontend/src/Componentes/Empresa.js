import { useEffect, useState } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const API_URL = "http://localhost:8080";

export function AddEmpresa() {
  const [novaEmpresa, setNovaEmpresa] = useState({
    nome: "",
    morada: "",
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
    setNovaEmpresa({ ...novaEmpresa, imagem: aux });
    console.log(aux);
  };
  const [mensagem, setMensagem] = useState();
  const [sucess, setSucess] = useState(true);
  const [mensagemErro, setMensagemErro] = useState();

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

  function AdicionarEmpresa() {
    var data = new FormData();
    var imagedata = document.querySelector('input[type="file"]').files[0];
    data.append(novaEmpresa, imagedata);

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
          console.log(parsedResponse);
          setMensagemErro(parsedResponse.message);
          setSucess(false);
        }
        console.log(response);
        return response.json();
      })
      .then((parsedResponse) => {
        GetEmpresas();
        console.log(parsedResponse.message);
        setMensagem(parsedResponse.message);
        setSucess(true);
      })
      .catch((error) => {});
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
        <button className="btn-Add" onClick={AdicionarEmpresa}>
          Adicionar Empresa
        </button>
        {sucess ? (
          <p id="mensagemSucesso">{mensagem}</p>
        ) : (
          <p id="mensagemErro">{mensagemErro}</p>
        )}
      </div>
    </>
  );
}
