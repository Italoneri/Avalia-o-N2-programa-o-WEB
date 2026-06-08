import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { getProdutoById, saveProduto } from "../../services/produtoService";

export default function FormProduto() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    preco: "",
    estoque: "0"
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      const produtoExistente = getProdutoById(id);
      if (produtoExistente) setForm(produtoExistente);
    }
  }, [id]);

  function validate() {
    const errs = {};
    if (!form.nome.trim()) errs.nome = "O nome do produto é obrigatório.";
    if (!form.preco || Number(form.preco) <= 0) errs.preco = "Informe um preço válido.";
    return errs;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    saveProduto(form);
    navigate("/produtos");
  }

  return (
    <>
      <Navbar />
      <div className="container mt-4" style={{ maxWidth: "600px" }}>
        <h2 style={{ color: "rgb(235, 167, 104)", marginBottom: "20px" }}>
          {id ? "Editar Produto" : "Cadastrar Produto"}
        </h2>

        <form onSubmit={handleSubmit} noValidate className="card p-4 shadow-sm">
          <div className="form-group">
            <label>Nome do Produto *</label>
            <input
              type="text"
              className={`form-control ${errors.nome ? "is-invalid" : ""}`}
              name="nome"
              value={form.nome}
              onChange={handleChange}
              placeholder="Ex: Ração Premier 15kg"
            />
            {errors.nome && <div className="invalid-feedback">{errors.nome}</div>}
          </div>

          <div className="form-group">
            <label>Descrição</label>
            <textarea
              className="form-control"
              name="descricao"
              value={form.descricao}
              onChange={handleChange}
              rows="3"
              placeholder="Detalhes do produto..."
            ></textarea>
          </div>

          <div className="row">
            <div className="form-group col-md-6">
              <label>Preço (R$) *</label>
              <input
                type="number"
                step="0.01"
                className={`form-control ${errors.preco ? "is-invalid" : ""}`}
                name="preco"
                value={form.preco}
                onChange={handleChange}
                placeholder="Ex: 149.90"
              />
              {errors.preco && <div className="invalid-feedback">{errors.preco}</div>}
            </div>

            <div className="form-group col-md-6">
              <label>Quantidade em Estoque</label>
              <input
                type="number"
                className="form-control"
                name="estoque"
                value={form.estoque}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="d-flex justify-content-between mt-4">
            <Link to="/produtos" className="btn btn-outline-secondary">Cancelar</Link>
            <button type="submit" className="btn text-white" style={{ backgroundColor: "rgb(235, 167, 104)" }}>
              Salvar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}