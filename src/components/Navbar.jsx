import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand d-flex align-items-center" href="/painel" style={{ textDecoration: "none" }}>
        <div style={{
          width: 42, height: 42, borderRadius: "50%",
          backgroundColor: "rgb(235, 167, 104)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "1.3rem", marginRight: 8, flexShrink: 0
        }}
        >🐾</div>
        <div style={{ lineHeight: 1.1 }}>
          <div style={{ fontSize: "1.2rem", fontWeight: 700, color: "rgb(235, 167, 104)" }}>Pet&amp;Co.</div>
          <div style={{ fontSize: "0.62rem", color: "#888", textTransform: "uppercase", letterSpacing: "0.3px" }}>Adoção responsável</div>
        </div>
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Alterna navegação"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        {user && (
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link" href="/animais">Animais</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/clientes">Clientes</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/produtos">Produtos</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/adocoes">Pets e Donos</a>
            </li>
          </ul>
        )}

        {user && (
          <div className="d-flex align-items-center">
            <a href="/animais" className="mr-2">
              <button type="button" className="btn btn-outline-info btn-sm">Quero adotar</button>
            </a>
            <span className="text-muted mr-2" style={{ fontSize: "0.9rem" }}>
              Olá, {user.nome}
            </span>
            <a href="/painel">
              <button type="button" className="btn btn-outline-secondary btn-sm mr-2">
                Painel
              </button>
            </a>
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              onClick={handleLogout}
            >
              Sair
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
