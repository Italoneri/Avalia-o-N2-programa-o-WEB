import { Link } from "react-router-dom";

export default function CardProduto({ produto, onDelete }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card shadow-sm h-100">
        <div className="card-body d-flex flex-column">
          <h5 className="card-title" style={{ color: "rgb(235, 167, 104)" }}>
            {produto.nome}
          </h5>
          <h6 className="card-subtitle mb-3 text-muted">
            R$ {Number(produto.preco).toFixed(2)} | Estoque: {produto.estoque}
          </h6>
          <p className="card-text flex-grow-1">{produto.descricao}</p>
          
          <div className="d-flex justify-content-end mt-3">
            <Link to={`/produtos/editar/${produto.id}`} className="btn btn-sm btn-outline-secondary mr-2">
              Editar
            </Link>
            <button onClick={() => onDelete(produto.id)} className="btn btn-sm btn-outline-danger">
              Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}