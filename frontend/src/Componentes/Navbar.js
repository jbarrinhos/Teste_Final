import "./Design.css";
import { useNavigate } from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate();
  return (
    <div class="topnav">
      <button
        onClick={() => {
          navigate("/empresas");
        }}
      >
        Empresas
      </button>
      <button
        onClick={() => {
          navigate("/addEmpresa");
        }}
      >
        ADD Empresa
      </button>
      <button
        onClick={() => {
          navigate("/addPessoa");
        }}
      >
        ADD Pessoa
      </button>
      <button
        onClick={() => {
          navigate("/addSalario");
        }}
      >
        ADD Salário
      </button>
    </div>
  );
}
