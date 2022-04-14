import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import { CardActionArea } from "@mui/material";

export function Funcionarios(props) {
  const API_URL = "http://localhost:8080";

  const [empresa, setEmpresa] = useState({});
  const [funcionarios, setListaFuncionarios] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    setEmpresa(props.infoEmpresa);
    console.log(props);

    getFuncionarios();
    if (!params.id) {
      return;
    }
  }, []);

  function getFuncionarios() {
    fetch(API_URL + "/pessoasByEmpresa/" + props.infoEmpresa.id, {
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
        setListaFuncionarios(parsedResponse);
        console.log(funcionarios);
        console.log(parsedResponse);
      })
      .catch((error) => {
        alert(error);
      });
  }
  return props.infoEmpresa !== {} ? (
    <div>
      <p id="textoSobre"> funcionarios</p>
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Grid container>
            <Grid item>
              <FormControl component="fieldset">
                <RadioGroup titulo="spacing" aria-label="spacing" row>
                  {funcionarios.map((element) => (
                    <Card
                      onClick={() => {
                        props.GetFuncionarioInfo(element);
                        navigate("/salario/" + element.id);
                      }}
                      key={element.id}
                      sx={{ margin: 1.5, maxWidth: 180, maxHeight: 340 }}
                    >
                      <br></br>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="180"
                          image={element.imagem}
                          alt="livro"
                        />

                        <CardContent>
                          <Typography gutterBottom variant="h6" component="div">
                            {element.nome}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </div>
  ) : (
    <Typography variant="h1">empresa não encontrado</Typography>
  );
}
