import Navbar from "../components/Navbar";

export default function Painel() {
  return (
    <>
      <Navbar />
      <br />
      <h2 style={{ color: "rgb(235, 167, 104)", textAlign: "center" }}>
        Painel Administrativo
      </h2>
      <br />
      <div style={{ margin: "3%" }}>
        <p>Bem-vindo ao painel da Pet&amp;Co. Use o menu para navegar entre os módulos de gerenciamento.</p>

        <div className="card-group">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title" style={{ color: "rgb(235, 167, 104)" }}>🐶 Animais</h5>
              <p className="card-text">Cadastrar, listar, editar e remover animais disponíveis para adoção.</p>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title" style={{ color: "rgb(235, 167, 104)" }}>👤 Clientes</h5>
              <p className="card-text">Gerenciar tutores e adotantes cadastrados no sistema.</p>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title" style={{ color: "rgb(235, 167, 104)" }}>📋 Adoções</h5>
              <p className="card-text">Acompanhar e gerenciar solicitações de adoção.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
