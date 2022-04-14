import "./App.css";
import { Navbar } from "./Componentes/Navbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AddEmpresa } from "./Componentes/Empresa";
import { AddSalario } from "./Componentes/Salario";
import { Empresas } from "./Componentes/Empresas";
import { Dados } from "./Componentes/DadosFuncionario";
import { Funcionarios } from "./Componentes/Funcionários";
import React, { useState } from "react";
import { AddPessoa } from "./Componentes/Pessoa";

function App() {
  const [infoEmpresa, setInfoEmpresa] = useState();
  const [funcionarioInfo, setFuncionarioInfo] = useState();

  function GetEmpresaInfo(item) {
    return setInfoEmpresa(item);
  }

  function GetFuncionarioInfo(item) {
    return setFuncionarioInfo(item);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route
            path="/empresas"
            element={<Empresas GetInfoEmpresa={GetEmpresaInfo}></Empresas>}
          ></Route>
          <Route path="/addEmpresa" element={<AddEmpresa></AddEmpresa>}></Route>
          <Route path="/addPessoa" element={<AddPessoa></AddPessoa>}></Route>
          <Route path="/addSalario" element={<AddSalario></AddSalario>}></Route>
          <Route
            path="/funcionarios/:empresaId"
            element={
              <Funcionarios
                infoEmpresa={infoEmpresa}
                GetFuncionarioInfo={GetFuncionarioInfo}
              ></Funcionarios>
            }
          ></Route>

          <Route
            path="/salario/:funcionarioId"
            element={
              <Dados
                infoEmpresa={infoEmpresa}
                funcionarioInfo={funcionarioInfo}
              ></Dados>
            }
          ></Route>
          <Route
            path="/*"
            element={<Empresas GetInfoEmpresa={GetEmpresaInfo}></Empresas>}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
