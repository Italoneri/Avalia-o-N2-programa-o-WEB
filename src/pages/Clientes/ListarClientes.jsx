import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { getClientes, deleteCliente } from "../../services/clienteService";

export default function ListarClientes() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    carregarClientes();
  }, []);

  async function carregarClientes() {
    const dados = await getClientes();
    // Mapeamento mantido para segurança da interface
    const lista = dados.map((c, index) => ({
      ...c,
      id: c.id || `padrao-${index}` 
    }));
    setClientes(lista);
  }

  async function handleDelete(id) {
    if (String(id).includes("padrao")) {
      alert("Não é possível excluir a conta de administrador padrão do sistema.");
      return;
    }

    if (window.confirm("Tem certeza que deseja excluir este utilizador?")) {
      await deleteCliente(id);
      await carregarClientes();
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
                <td><strong>{cliente.nome || cliente.name}</strong></td>
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