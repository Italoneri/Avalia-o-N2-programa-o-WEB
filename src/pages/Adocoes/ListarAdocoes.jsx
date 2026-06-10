
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import {desfazerAdocao, getAdocoes} from "../../services/petService.js";

export default function ListarAdocoes() {

  const [adocoes, setAdocoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarAdocoes();
  }, []);

  async function carregarAdocoes() {
    setLoading(true);
    const dados = await getAdocoes();
    setAdocoes(dados);
    setLoading(false);
  }

  async function handleCancelarAdocao(petId) {
    if (window.confirm("Tem certeza que deseja cancelar esta adoção? O pet voltará a ficar disponível.")) {
      await desfazerAdocao(petId);
      await carregarAdocoes();
    }
  }


  return (
      <>
        <Navbar />
        <div className="container mt-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 style={{ color: "rgb(235, 167, 104)" }}>Histórico de Adoções</h2>
          </div>

          {loading ? (
              <div className="text-center mt-5">Carregando adoções...</div>
          ) : adocoes.length === 0 ? (
              <div className="alert alert-info">Nenhuma adoção realizada até o momento.</div>
          ) : (
              <table className="table table-hover shadow-sm bg-white">
                <thead style={{ backgroundColor: "#f8f9fa" }}>
                <tr>
                  <th>Nome do Pet</th>
                  <th>Nome do Dono (Adotante)</th>
                  <th className="text-right">Ações</th>
                </tr>
                </thead>
                <tbody>
                {adocoes.map((pet) => (
                    <tr key={pet.id}>
                      <td><strong>{pet.nome}</strong></td>
                      <td>
                    <span>
                      {pet.usuarios?.nome || "Não identificado"}
                    </span>
                      </td>
                      <td className="text-right">
                        <Link to={`/animais/editar/${pet.id}`} className="btn btn-sm btn-outline-info mr-2">
                          Ver Pet
                        </Link>
                        <button
                            onClick={() => handleCancelarAdocao(pet.id)}
                            className="btn btn-sm btn-outline-danger"
                        >
                          Cancelar Adoção
                        </button>
                      </td>
                    </tr>
                ))}
                </tbody>
              </table>
          )}
        </div>
      </>
  );
}