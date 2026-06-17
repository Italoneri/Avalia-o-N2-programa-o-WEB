import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Cadastro() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm]               = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors]           = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading]         = useState(false);

  function validate() {
    const errs = {};
    if (!form.name.trim())
      errs.name = "O nome é obrigatório.";
    if (!form.email.trim())
      errs.email = "O e-mail é obrigatório.";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      errs.email = "Informe um e-mail válido.";
    if (!form.password)
      errs.password = "A senha é obrigatória.";
    else if (form.password.length < 6)
      errs.password = "A senha deve ter pelo menos 6 caracteres.";
    if (!form.confirm)
      errs.confirm = "Confirme sua senha.";
    else if (form.password !== form.confirm)
      errs.confirm = "As senhas não coincidem.";
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
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    const result = await register(form.name, form.email, form.password);
    if (result.success) navigate("/painel");
    else setServerError(result.message);
    setLoading(false);
  }

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand d-flex align-items-center" href="#" style={{ textDecoration: "none" }}>
          <div style={{
            width: 42, height: 42, borderRadius: "50%",
            backgroundColor: "rgb(235, 167, 104)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1.3rem", marginRight: 8, flexShrink: 0,
          }}>🐾</div>
          <div style={{ lineHeight: 1.1 }}>
            <div style={{ fontSize: "1.2rem", fontWeight: 700, color: "rgb(235, 167, 104)" }}>Pet&amp;Co.</div>
            <div style={{ fontSize: "0.62rem", color: "#888", textTransform: "uppercase", letterSpacing: "0.3px" }}>Adoção responsável</div>
          </div>
        </a>
      </nav>

      {/* Formulário de Cadastro */}
      <br /><br />
      <h2 style={{ color: "rgb(235, 167, 104)", textAlign: "center" }}>
        Criar cadastro — Pet&amp;Co.
      </h2>
      <br />

      <form onSubmit={handleSubmit} noValidate style={{ margin: "0 auto", maxWidth: 480, padding: "0 16px" }}>

        <div className="form-group">
          <label htmlFor="name">Nome completo</label>
          <input
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            id="name" name="name"
            placeholder="Seu nome"
            value={form.name}
            onChange={handleChange}
            autoComplete="name"
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="cad-email">E-mail</label>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            id="cad-email" name="email"
            placeholder="seu@email.com"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="cad-password">Senha</label>
          <input
            type="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            id="cad-password" name="password"
            placeholder="Mínimo 6 caracteres"
            value={form.password}
            onChange={handleChange}
            autoComplete="new-password"
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="confirm">Confirmar senha</label>
          <input
            type="password"
            className={`form-control ${errors.confirm ? "is-invalid" : ""}`}
            id="confirm" name="confirm"
            placeholder="Repita a senha"
            value={form.confirm}
            onChange={handleChange}
            autoComplete="new-password"
          />
          {errors.confirm && <div className="invalid-feedback">{errors.confirm}</div>}
        </div>

        {serverError && <div className="alert alert-danger py-2">{serverError}</div>}

        <button
          type="submit"
          className="btn btn-block"
          disabled={loading}
          style={{ backgroundColor: "rgb(235, 167, 104)", color: "#fff", border: "none", padding: "8px 24px" }}
        >
          {loading ? "Cadastrando..." : "Criar conta"}
        </button>

        <p className="text-center mt-3" style={{ fontSize: "0.9rem" }}>
          Já tem uma conta?{" "}
          <Link to="/login" style={{ color: "rgb(235, 167, 104)" }}>Fazer login</Link>
        </p>
      </form>
    </>
  );
}
