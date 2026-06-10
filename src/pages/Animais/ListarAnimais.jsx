import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import {getPets, deletePet, adotarPet} from "../../services/petService";
import {useAuth} from "../../context/AuthContext.jsx";

export default function ListarAnimais() {
  const [pets, setPets] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    carregarPets();
    const idSalvo = localStorage.getItem("userId");
    if (idSalvo) {
      setUserId(idSalvo);
    }
  }, []);

  async function carregarPets() {
    const dados = await getPets();
    setPets(dados);
  }

  async function handleDelete(id) {
    if (window.confirm("Tem certeza que deseja excluir este animal?")) {
      await deletePet(id);
      await carregarPets(); 
    }
  }

  async function handleAdotarPet(petId) {
    if (!user || !user.id) {
      alert("Você precisa estar logado para adotar um animal!");
      return;
    }

    if (window.confirm("Tem certeza que irá adotar este animal?")) {
      await adotarPet(petId, user.id);

      alert("Animal adotado com sucesso!");
      await carregarPets();
    }
  }


  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 style={{ color: "rgb(235, 167, 104)" }}>Gerenciar Animais</h2>
          <Link to="/animais/novo" className="btn text-white" style={{ backgroundColor: "rgb(235, 167, 104)" }}>
            + Novo Animal
          </Link>
        </div>

        {pets.length === 0 ? (
          <div className="alert alert-info">Nenhum animal cadastrado.</div>
        ) : (
          <table className="table table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Raça</th>
                <th>Idade</th>
                <th>Porte</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {pets.map((pet) => (
                <tr key={pet.id}>
                  <td>{pet.id}</td>
                  <td><strong>{pet.nome}</strong></td>
                  <td>{pet.raca}</td>
                  <td>{pet.idade}</td>
                  <td>{pet.porte}</td>
                  <td>
                    <Link to={`/animais/editar/${pet.id}`} className="btn btn-sm btn-outline-secondary mr-2">
                      Editar
                    </Link>
                    {!pet.dono_id && (
                        <button onClick={() => handleAdotarPet(pet.id)} className="btn btn-sm btn-outline-warning mr-2">
                          Adotar
                        </button>
                    )}
                    <button onClick={() => handleDelete(pet.id)} className="btn btn-sm btn-outline-danger">
                      Excluir
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