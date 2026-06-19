import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Cadastro() {
  const { register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [form, setForm]               = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors]           = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading]         = useState(false);


  // Verifica os dados de cadastro
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

  // ── CONTROLLER: atualiza o campo digitado ─────────────────

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    setServerError("");
  }

  // ── CONTROLLER: submit do formulário ─────────────────────

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

 // ── VIEW: interface renderizada para o usuário ────────────
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

        <div style={{ display: "flex", alignItems: "center", margin: "16px 0" }}>
          <hr style={{ flex: 1, borderColor: "#ddd" }} />
          <span style={{ padding: "0 10px", color: "#aaa", fontSize: "0.85rem" }}>ou</span>
          <hr style={{ flex: 1, borderColor: "#ddd" }} />
        </div>

        <button
          type="button"
          onClick={async () => {
            const result = await loginWithGoogle();
            if (result && !result.success) {
              setServerError(result.message || "Erro ao conectar com o Google.");
            }
          }}
          className="btn btn-block"
          style={{
            backgroundColor: "#fff",
            color: "#444",
            border: "1px solid #ddd",
            padding: "8px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            fontWeight: 500,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          Cadastrar com Google
        </button>

        <p className="text-center mt-3" style={{ fontSize: "0.9rem" }}>
          Já tem uma conta?{" "}
          <Link to="/login" style={{ color: "rgb(235, 167, 104)" }}>Fazer login</Link>
        </p>
      </form>
    </>
  );
}
