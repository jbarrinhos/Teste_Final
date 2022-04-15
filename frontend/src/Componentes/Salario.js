import { useEffect, useState } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "./Design.css";

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
  const [mensagem, setMensagem] = useState();
  const [sucess, setSucess] = useState(true);
  const [mensagemErro, setMensagemErro] = useState();
  const [value, setValue] = React.useState(new Date("2014-08-18T21:11:54"));

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    GetPessoas();
  }, []);

  function AdicionarSalario() {
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
          setMensagemErro(parsedResponse.message);
          setSucess(false);
        }
        console.log(response);
        return response.json();
      })
      .then((parsedResponse) => {
        console.log(parsedResponse);
        setMensagem(parsedResponse.message);
        setSucess(true);
      })
      .catch((error) => {});
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
        <br></br>
        <TextField
          margin="normal"
          required
          id="filled-basic"
          label="Valor do Salário"
          variant="filled"
          type="text"
          value={novoSalario.quantidade}
          onChange={(e) => {
            setNovoSalario({ ...novoSalario, quantidade: e.target.value });
          }}
        />
        <br></br>
        <LocalizationProvider className="data" dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="Data Lançamento"
            dateFormat="dd/MM/yyyy"
            inputFormat="dd/MM/yyyy"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
              setNovoSalario({
                ...novoSalario,
                data: newValue,
              });
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <br></br>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Pessoa</InputLabel>
          <Select
            labelId="Pessoa"
            id="filled-basic"
            label="Pessoa"
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
        {sucess ? (
          <p id="mensagemSucesso">{mensagem}</p>
        ) : (
          <p id="mensagemErro">{mensagemErro}</p>
        )}
      </div>
    </>
  );
}
