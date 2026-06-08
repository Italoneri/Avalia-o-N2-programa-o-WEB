import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import CardProduto from "../../components/CardProduto";
import { getProdutos, deleteProduto } from "../../services/produtoService";

export default function ListarProdutos() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    carregarProdutos();
  }, []);

  function carregarProdutos() {
    setProdutos(getProdutos());
  }

  function handleDelete(id) {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      deleteProduto(id);
      carregarProdutos();
    }
  }

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 style={{ color: "rgb(235, 167, 104)" }}>Catálogo de Produtos</h2>
          <Link to="/produtos/novo" className="btn text-white" style={{ backgroundColor: "rgb(235, 167, 104)" }}>
            + Novo Produto
          </Link>
        </div>

        {produtos.length === 0 ? (
          <div className="alert alert-info">Nenhum produto cadastrado no catálogo.</div>
        ) : (
          <div className="row">
            {produtos.map((produto) => (
              <CardProduto 
                key={produto.id} 
                produto={produto} 
                onDelete={handleDelete} 
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}