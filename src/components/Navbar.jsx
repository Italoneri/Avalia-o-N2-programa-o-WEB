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
      <a className="navbar-brand d-flex align-items-center" href="#" style={{ textDecoration: "none" }}>
        <div style={{
          width: 42, height: 42, borderRadius: "50%",
          backgroundColor: "rgb(235, 167, 104)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "1.3rem", marginRight: 8, flexShrink: 0
        }}>🐾</div>
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
        <ul className="navbar-nav mr-auto">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
            >
              institucional
            </a>
            <div className="dropdown-menu">
              <a className="dropdown-item" href="#">Sobre nós</a>
              <a className="dropdown-item" href="#">Projetos sociais</a>
            </div>
          </li>

          <li className="nav-item">
            <a className="nav-link" href="#">Ongs parceiras</a>
          </li>

          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-toggle="dropdown"
            >
              FAQ
            </a>
            <div className="dropdown-menu">
              <a className="dropdown-item" href="#">Como ajudar</a>
            </div>
          </li>
        </ul>

        <a href="#"><button type="button" className="btn btn-outline-info mr-1">Quero adotar</button></a>
        <a href="#"><button type="button" className="btn btn-outline-warning mr-2">Seja voluntário</button></a>

        {user && (
          <div className="d-flex align-items-center">
            <span className="text-muted mr-2" style={{ fontSize: "0.9rem" }}>
              Olá, {user.name}
            </span>
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
