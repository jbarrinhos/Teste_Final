import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Button, CardActionArea } from "@mui/material";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8080";

export function Empresas(props) {
  const navigate = useNavigate();
  const [todasEmpresas, setTodasEmpresas] = useState([""]);

  useEffect(() => {
    console.log(props);

    fetchEmpresas();
  }, []);

  function fetchEmpresas() {
    fetch(API_URL + "/getAllEmpresas", {
      // mode: "cors",
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
        //Como ele só chega aqui se tiver sucesso basta atualizar a variavel Pessoas
        setTodasEmpresas(parsedResponse);
        //console.log(parsedResponse);
      })
      .catch((error) => {
        alert(error);
      });
  }

  function RemoverEmpresa(element) {
    fetch(API_URL + "/deleteEmpresa/" + element, {
      method: "Delete",
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

        fetchEmpresas();
        alert(parsedResponse.aMessage);
      })
      .catch((error) => {
        alert(error);
      });
  }

  return (
    <div>
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Grid container>
            <Grid item>
              <FormControl component="fieldset">
                <RadioGroup titulo="spacing" aria-label="spacing" row>
                  {todasEmpresas.map((element, index) => (
                    <Card
                      key={element.id}
                      sx={{ margin: 1.5, maxWidth: 250, maxHeight: 350 }}
                    >
                      <CardActionArea
                        onClick={() => {
                          props.GetInfoEmpresa(element);
                          navigate("/funcionarios/" + element.id);
                        }}
                      >
                        <CardMedia
                          component="img"
                          height="300"
                          image={element.imagem}
                          alt="img"
                        />
                      </CardActionArea>

                      <Button
                        onClick={() => {
                          RemoverEmpresa(element.id);
                          console.log(element.id);
                        }}
                      >
                        {" "}
                        REMOVE
                      </Button>
                    </Card>
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
}
