import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import CardProduto from "../../components/CardProduto";
import { getProdutos, deleteProduto, comprarProduto } from "../../services/produtoService";
import { useAuth } from "../../context/AuthContext";

export default function ListarProdutos() {
  const [produtos, setProdutos] = useState([]);
  const { user } = useAuth();
  const isAdmin = user?.tipo === "admin";

  useEffect(() => {
    carregarProdutos();
  }, []);

  async function carregarProdutos() {
    const dados = await getProdutos();
    setProdutos(dados);
  }

  async function handleDelete(id) {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      await deleteProduto(id);
      await carregarProdutos();
    }
  }

  async function handleCompra(id, estoqueAtual) {
    if (!window.confirm("Deseja finalizar a compra?")) return;
    const result = await comprarProduto(id, estoqueAtual);
    if (result.success) await carregarProdutos();
    else alert(result.message || "Erro ao comprar produto.");
  }

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 style={{ color: "rgb(235, 167, 104)" }}>Catálogo de Produtos</h2>
          {isAdmin && (
            <Link to="/produtos/novo" className="btn text-white" style={{ backgroundColor: "rgb(235, 167, 104)" }}>
              + Novo Produto
            </Link>
          )}
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
                onCompra={handleCompra}
                isAdmin={isAdmin}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}