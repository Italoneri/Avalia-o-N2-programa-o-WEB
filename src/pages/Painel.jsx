import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Painel() {
  return (
    <>
      <Navbar />
      <br />
      <h2 style={{ color: "rgb(235, 167, 104)", textAlign: "center" }}>
        Painel Administrativo
      </h2>
      <br />
      <div style={{ margin: "3%" }}>
        <p>Bem-vindo ao painel da Pet&amp;Co. Use o menu para navegar entre os módulos de gerenciamento.</p>

        <div className="card-group">
          
          {/* Módulo 1: Animais */}
          <div className="card" style={{ transition: "0.2s" }}>
            <Link to="/animais" style={{ textDecoration: "none", color: "inherit", display: "block", height: "100%" }}>
              <div className="card-body">
                <h5 className="card-title" style={{ color: "rgb(235, 167, 104)" }}>
                  🐶 Animais
                </h5>
                <p className="card-text">Cadastrar, listar, editar e remover animais disponíveis para adoção.</p>
              </div>
            </Link>
          </div>

          <div className="card" style={{ transition: "0.2s" }}>
            <Link to="/clientes" style={{ textDecoration: "none", color: "inherit", display: "block", height: "100%" }}>
              <div className="card-body">
                <h5 className="card-title" style={{ color: "rgb(235, 167, 104)" }}>
                  👤 Clientes
                </h5>
                <p className="card-text">Gerenciar tutores e adotantes cadastrados no sistema.</p>
              </div>
            </Link>
          </div>

          <div className="card" style={{ transition: "0.2s" }}>
            <Link to="/produtos" style={{ textDecoration: "none", color: "inherit", display: "block", height: "100%" }}>
              <div className="card-body">
                <h5 className="card-title" style={{ color: "rgb(235, 167, 104)" }}>
                  📦 Produtos
                </h5>
                <p className="card-text">Gerenciar o catálogo de produtos, preços e controle de estoque.</p>
              </div>
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}