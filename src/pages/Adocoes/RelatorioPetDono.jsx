import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAdocoes } from "../../services/petService.js";
import Navbar from "../../components/Navbar.jsx";

export default function RelatorioPetDono() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [relatorio, setRelatorio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarDadosRelatorio() {
      try {
        setLoading(true);

        const dados = await getAdocoes();

        const pet = dados.find((pet) => String(pet.id) === String(id));
        if (pet) {
          setRelatorio({
            nome: pet.nome,
            raca: pet.raca || "Não informada",
            idade: pet.idade || "-",
            porte: pet.porte || "Não informado",
            donoNome: pet.usuarios?.nome || "Não identificado",
            donoEmail: pet.usuarios?.email || "Não informado",
            donoTipo: pet.usuarios?.tipo || "Cliente",
          });
        } else {
          setRelatorio(null);
        }
      } catch (error) {
        console.error("Erro ao carregar relatório:", error);
      } finally {
        setLoading(false);
      }
    }

    carregarDadosRelatorio();
  }, [id]);

  if (loading) {
    return <div style={{ padding: "20px" }}>Carregando dados do relatório...</div>;
  }

  if (!relatorio) {
    return <div style={{ padding: "20px" }}>Nenhum dado encontrado para este relatório.</div>;
  }

  return (
      <>
        <Navbar />

        <div className="container mt-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 style={{ color: "rgb(235, 167, 104)" }}>Relatório Dono e Pet</h2>
          </div>

          <div className="card shadow-sm bg-white p-4 mb-4" style={{ borderRadius: "10px", border: "none" }}>

            <div className="row">
              <div className="col-md-6 mb-3">
                <h4 className="mb-3" style={{ color: "#495057", borderBottom: "2px solid #f8f9fa", paddingBottom: "8px" }}>
                  🐾 Dados do Pet
                </h4>
                <p><strong>Nome:</strong> <span className="text-muted">{relatorio.nome}</span></p>
                <p><strong>Raça:</strong> <span className="text-muted">{relatorio.raca}</span></p>
                <p><strong>Idade:</strong> <span className="text-muted">{relatorio.idade} meses</span></p>
                <p><strong>Porte:</strong> <span className="text-muted">{relatorio.porte}</span></p>
              </div>

              <div className="col-md-6 mb-3">
                <h4 className="mb-3" style={{ color: "#495057", borderBottom: "2px solid #f8f9fa", paddingBottom: "8px" }}>
                  👤 Dados do Dono
                </h4>
                <p><strong>Nome:</strong> <span className="text-muted">{relatorio.donoNome}</span></p>
                <p><strong>Email:</strong> <span className="text-muted">{relatorio.donoEmail}</span></p>
                <p><strong>Cargo:</strong> <span className="text-muted">{relatorio.donoTipo}</span></p>
              </div>
            </div>

          </div>

          <div className="d-flex justify-content-start">
            <button className="btn btn-outline-secondary shadow-sm" onClick={() => navigate(-1)}>
              Voltar ao Histórico
            </button>
          </div>
        </div>
      </>
  );
}