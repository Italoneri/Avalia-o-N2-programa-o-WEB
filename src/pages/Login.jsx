import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  function validate() {
    const errs = {};
    if (!form.email.trim()) {
      errs.email = "O e-mail é obrigatório.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errs.email = "Informe um e-mail válido.";
    }
    if (!form.password.trim()) {
      errs.password = "A senha é obrigatória.";
    }
    return errs;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    setServerError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setLoading(true);

    try {
      const result = await login(form.email, form.password);

      setTimeout(() => {
        if (result.success) {
          navigate("/painel");
        } else {
          setServerError(result.message);
        }
        setLoading(false);
      }, 500);

    } catch (error) {
      setServerError("Ocorreu um erro inesperado ao tentar fazer login.");
      setLoading(false);
    }
  }

  return (
    <>
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
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown">institucional</a>
              <div className="dropdown-menu">
                <a className="dropdown-item" href="#">Sobre nós</a>
              </div>
            </li>
          </ul>
        </div>
      </nav>

      {/* Formulário de Login */}
      <br /><br />
      <h2 style={{ color: "rgb(235, 167, 104)", textAlign: "center" }}>
        Acesse sua conta — Pet&amp;Co.
      </h2>
      <br />

      <form onSubmit={handleSubmit} noValidate style={{ margin: "3%", maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>

        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            id="email"
            name="email"
            placeholder="seu@email.com"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            id="password"
            name="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            autoComplete="current-password"
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
        </div>

        {serverError && (
          <div className="alert alert-danger py-2">{serverError}</div>
        )}

        <button
          type="submit"
          className="btn btn-block"
          disabled={loading}
          style={{
            backgroundColor: "rgb(235, 167, 104)",
            color: "#fff",
            border: "none",
            padding: "8px 24px",
          }}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>

        <p className="text-center mt-3" style={{ fontSize: "0.9rem" }}>
          Não tem uma conta?{" "}
          <Link to="/cadastro" style={{ color: "rgb(235, 167, 104)" }}>Criar cadastro</Link>
        </p>
      </form>

      <p style={{ textAlign: "center", color: "#bbb", fontSize: "0.78rem", marginTop: "1rem" }}>
        Conta admin: <strong>admin@petco.com</strong> / <strong>123456</strong>
      </p>
    </>
  );
}
