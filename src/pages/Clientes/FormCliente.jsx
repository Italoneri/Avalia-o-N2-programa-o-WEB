import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { getClienteById, saveCliente } from "../../services/clienteService";

export default function FormCliente() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    name: "", 
    email: "",
    password: "", 
    tipo: "cliente"
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    async function carregar() {
      if (id) {
        const clienteExistente = await getClienteById(id);
        if (clienteExistente) {
          setForm({
            name: clienteExistente.nome || "",
            email: clienteExistente.email || "",
            password: clienteExistente.senha || "",
            tipo: clienteExistente.tipo || "cliente",
            id: clienteExistente.id
          });
        }
      }
    }
    carregar();
  }, [id]);

  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = "O nome é obrigatório.";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errs.email = "Informe um e-mail válido.";
    if (!form.password) errs.password = "A senha é obrigatória.";
    return errs;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  // Adicionado async/await no salvamento
  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    await saveCliente(form);
    navigate("/clientes");
  }

  return (
    <>
      <Navbar />
      <div className="container mt-4" style={{ maxWidth: "600px" }}>
        <h2 style={{ color: "rgb(235, 167, 104)", marginBottom: "20px" }}>
          {id ? "Editar Usuário" : "Cadastrar Novo Usuário"}
        </h2>

        <form onSubmit={handleSubmit} noValidate className="card p-4 shadow-sm">
          <div className="form-group">
            <label>Nome Completo *</label>
            <input
              type="text"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              name="name"
              value={form.name}
              onChange={handleChange}
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>

          <div className="form-group">
            <label>E-mail *</label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              name="email"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          <div className="row">
            <div className="form-group col-md-6">
              <label>Senha *</label>
              <input
                type="password"
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                name="password"
                value={form.password}
                onChange={handleChange}
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>

            <div className="form-group col-md-6">
              <label>Tipo de Permissão</label>
              <select className="form-control" name="tipo" value={form.tipo} onChange={handleChange}>
                <option value="cliente">Cliente (Tutor/Adotante)</option>
                <option value="admin">Administrador do Sistema</option>
              </select>
            </div>
          </div>

          <div className="d-flex justify-content-between mt-4">
            <Link to="/clientes" className="btn btn-outline-secondary">Cancelar</Link>
            <button type="submit" className="btn text-white" style={{ backgroundColor: "rgb(235, 167, 104)" }}>
              Guardar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}