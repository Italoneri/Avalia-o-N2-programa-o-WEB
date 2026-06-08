import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { getClientes, deleteCliente } from "../../services/clienteService";

export default function ListarClientes() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    carregarClientes();
  }, []);

  function carregarClientes() {
    // Pegamos a lista, mas garantimos que quem não tem ID (como o Admin padrão) ganhe um ID visual
    const lista = getClientes().map((c, index) => ({
      ...c,
      id: c.id || `padrao-${index}` 
    }));
    setClientes(lista);
  }

  function handleDelete(id) {
    // Proteção: Não deixar excluir o admin padrão
    if (String(id).includes("padrao")) {
      alert("Não é possível excluir a conta de administrador padrão do sistema.");
      return;
    }

    if (window.confirm("Tem certeza que deseja excluir este usuário? Ele não poderá mais fazer login.")) {
      deleteCliente(id);
      carregarClientes();
    }
  }

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 style={{ color: "rgb(235, 167, 104)" }}>Gerenciar Clientes / Usuários</h2>
          <Link to="/clientes/novo" className="btn text-white" style={{ backgroundColor: "rgb(235, 167, 104)" }}>
            + Novo Usuário
          </Link>
        </div>

        <table className="table table-hover shadow-sm bg-white">
          <thead style={{ backgroundColor: "#f8f9fa" }}>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Tipo</th>
              <th className="text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id}>
                <td><strong>{cliente.name || cliente.nome}</strong></td>
                <td>{cliente.email}</td>
                <td>
                  <span className={`badge ${cliente.tipo === 'admin' ? 'badge-danger' : 'badge-info'}`}>
                    {cliente.tipo === 'admin' ? 'Administrador' : 'Cliente'}
                  </span>
                </td>
                <td className="text-right">
                  {!String(cliente.id).includes("padrao") && (
                    <>
                      <Link to={`/clientes/editar/${cliente.id}`} className="btn btn-sm btn-outline-secondary mr-2">
                        Editar
                      </Link>
                      <button onClick={() => handleDelete(cliente.id)} className="btn btn-sm btn-outline-danger">
                        Excluir
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}