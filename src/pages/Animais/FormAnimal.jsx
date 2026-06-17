import { useState, useEffect } from "react";
import { useNavigate, useParams, Link, useSearchParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { getPetById, savePet } from "../../services/petService";
import { useAuth } from "../../context/AuthContext";

export default function FormAnimal() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const readOnly = user?.tipo !== "admin" || searchParams.get("view") === "true";

  const [form, setForm] = useState({
    nome: "",
    raca: "",
    idade: "",
    porte: "",
    dono_id: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    async function carregar() {
      if (id) {
        const existente = await getPetById(id);
        if (existente) setForm(existente);
      }
    }
    carregar();
  }, [id]);

  function validate() {
    const errs = {};
    if (!form.nome.trim()) errs.nome = "O nome do animal é obrigatório.";
    if (!form.raca.trim()) errs.raca = "A raça é obrigatória.";
    return errs;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    await savePet(form);
    navigate("/animais");
  }

  return (
    <>
      <Navbar />
      <div className="container mt-4" style={{ maxWidth: "600px" }}>
        <h2 style={{ color: "rgb(235, 167, 104)", marginBottom: "20px" }}>
          {readOnly ? "Informações do Animal" : id ? "Editar Animal" : "Cadastrar Animal"}
        </h2>

        <form onSubmit={handleSubmit} noValidate className="card p-4 shadow-sm">
          <div className="form-group">
            <label>Nome</label>
            <input
              type="text"
              className={`form-control ${errors.nome ? "is-invalid" : ""}`}
              name="nome"
              value={form.nome}
              onChange={handleChange}
              placeholder="Ex: Rex"
              disabled={readOnly}
            />
            {errors.nome && <div className="invalid-feedback">{errors.nome}</div>}
          </div>

          <div className="form-group">
            <label>Raça</label>
            <input
              type="text"
              className={`form-control ${errors.raca ? "is-invalid" : ""}`}
              name="raca"
              value={form.raca}
              onChange={handleChange}
              placeholder="Ex: Poodle, Vira-lata..."
              disabled={readOnly}
            />
            {errors.raca && <div className="invalid-feedback">{errors.raca}</div>}
          </div>

          <div className="row">
            <div className="form-group col-md-6">
              <label>Idade</label>
              <input
                type="text"
                className="form-control"
                name="idade"
                value={form.idade}
                onChange={handleChange}
                placeholder="Ex: 2 anos, 5 meses..."
                disabled={readOnly}
              />
            </div>

            <div className="form-group col-md-6">
              <label>Porte</label>
              <select className="form-control" name="porte" value={form.porte} onChange={handleChange} disabled={readOnly}>
                <option value="">Selecione...</option>
                <option value="Pequeno">Pequeno</option>
                <option value="Médio">Médio</option>
                <option value="Grande">Grande</option>
              </select>
            </div>
          </div>

          <div className="d-flex justify-content-between mt-4">
            <Link to="/adocoes" className="btn btn-outline-secondary">Voltar</Link>
            {!readOnly && (
              <button type="submit" className="btn text-white" style={{ backgroundColor: "rgb(235, 167, 104)" }}>
                Salvar
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}